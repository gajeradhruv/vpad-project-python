import frappe
from frappe import _
from frappe.utils import nowdate

@frappe.whitelist()
def get_payment_data(filters=None):
    """Fetch invoice and payment data for the tracker with proper permissions"""
    try:
        # Check if user has permission for Sales Invoice
        if not frappe.has_permission('Sales Invoice', 'read'):
            frappe.throw(_("You do not have permission to access Sales Invoices"))

        if filters and isinstance(filters, str):
            import json
            filters = json.loads(filters)
        
        # Build conditions based on filters
        conditions = ["si.docstatus = 1"]  # Only submitted documents
        params = {}
        
        if filters:
            if filters.get('customer'):
                conditions.append("si.customer = %(customer)s")
                params['customer'] = filters['customer']
            if filters.get('from_date'):
                conditions.append("si.posting_date >= %(from_date)s")
                params['from_date'] = filters['from_date']
            if filters.get('to_date'):
                conditions.append("si.posting_date <= %(to_date)s")
                params['to_date'] = filters['to_date']
        
        where_clause = " AND ".join(conditions)
        
        # Main query to get invoices with payment details
        query = f"""
            SELECT 
                si.name as invoice_no,
                si.posting_date,
                si.customer,
                si.customer_name,
                si.grand_total,
                si.outstanding_amount,
                si.status,
                (si.grand_total - si.outstanding_amount) as paid_amount,
                si.due_date,
                DATEDIFF(CURDATE(), si.due_date) as days_overdue
            FROM `tabSales Invoice` si
            WHERE {where_clause}
            ORDER BY si.posting_date DESC
            LIMIT 1000
        """
        
        data = frappe.db.sql(query, params, as_dict=True)
        
        # Get payment details for each invoice
        for row in data:
            # Determine payment status
            if row['outstanding_amount'] == 0:
                row['payment_status'] = 'Paid'
            elif row['outstanding_amount'] < row['grand_total']:
                row['payment_status'] = 'Partially Paid'
            else:
                row['payment_status'] = 'Unpaid'
            
            # Apply status filter if provided
            if filters and filters.get('status'):
                if filters['status'] == 'Paid' and row['payment_status'] != 'Paid':
                    continue
                elif filters['status'] == 'Partially Paid' and row['payment_status'] != 'Partially Paid':
                    continue
                elif filters['status'] == 'Unpaid' and row['payment_status'] != 'Unpaid':
                    continue
            
            # Get payment references
            payment_query = """
                SELECT 
                    pe.name as payment_entry,
                    pe.posting_date,
                    per.allocated_amount,
                    pe.mode_of_payment,
                    pe.docstatus
                FROM `tabPayment Entry Reference` per
                LEFT JOIN `tabPayment Entry` pe ON pe.name = per.parent
                WHERE per.reference_doctype = 'Sales Invoice' 
                AND per.reference_name = %s
                ORDER BY pe.posting_date DESC
            """
            payments = frappe.db.sql(payment_query, row['invoice_no'], as_dict=True)
            
            row['payment_details'] = []
            for payment in payments:
                payment_info = {
                    'name': payment['payment_entry'],
                    'posting_date': str(payment['posting_date']),
                    'paid_amount': payment['allocated_amount'],
                    'mode_of_payment': payment['mode_of_payment'],
                    'status': 'Submitted' if payment['docstatus'] == 1 else 'Draft'
                }
                row['payment_details'].append(payment_info)
        
        # Apply status filter after processing all data
        if filters and filters.get('status'):
            filtered_data = []
            for row in data:
                if filters['status'] == 'Paid' and row['payment_status'] == 'Paid':
                    filtered_data.append(row)
                elif filters['status'] == 'Partially Paid' and row['payment_status'] == 'Partially Paid':
                    filtered_data.append(row)
                elif filters['status'] == 'Unpaid' and row['payment_status'] == 'Unpaid':
                    filtered_data.append(row)
            data = filtered_data
        
        # Calculate totals
        total_amount = sum((row.get('grand_total') or 0) for row in data)
        total_outstanding = sum((row.get('outstanding_amount') or 0) for row in data)
        total_paid = sum((row.get('paid_amount') or 0) for row in data)
        
        return {
            'success': True,
            'data': data,
            'total_invoices': len(data),
            'total_amount': total_amount,
            'total_outstanding': total_outstanding,
            'total_paid': total_paid
        }
        
    except Exception as e:
        frappe.log_error(f"Error in get_payment_data: {str(e)}")
        return {
            'success': False,
            'error': str(e),
            'data': [],
            'total_invoices': 0,
            'total_amount': 0,
            'total_outstanding': 0,
            'total_paid': 0
        }

@frappe.whitelist()
def create_payment_entry(invoice_no, paid_amount, mode_of_payment=None):
    """Create a draft payment entry for an invoice"""
    try:
        # Check permissions
        if not frappe.has_permission('Payment Entry', 'create'):
            frappe.throw(_("You do not have permission to create Payment Entries"))
        
        # Get sales invoice
        si = frappe.get_doc('Sales Invoice', invoice_no)
        
        # Create payment entry
        pe = frappe.new_doc('Payment Entry')
        pe.payment_type = 'Receive'
        pe.party_type = 'Customer'
        pe.party = si.customer
        pe.paid_amount = float(paid_amount)
        pe.received_amount = float(paid_amount)
        pe.posting_date = nowdate()
        pe.mode_of_payment = mode_of_payment or 'Cash'
        pe.company = si.company
        
        # Add reference to sales invoice
        pe.append('references', {
            'reference_doctype': 'Sales Invoice',
            'reference_name': invoice_no,
            'total_amount': si.grand_total,
            'outstanding_amount': si.outstanding_amount,
            'allocated_amount': float(paid_amount)
        })
        
        pe.save()  # Save as draft
        
        frappe.db.commit()
        
        return {
            'success': True,
            'payment_entry': pe.name,
            'message': f'Draft Payment Entry {pe.name} created successfully'
        }
        
    except Exception as e:
        frappe.log_error(f"Error creating payment entry: {str(e)}")
        return {
            'success': False, 
            'error': str(e)
        }

