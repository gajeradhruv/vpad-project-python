# import frappe
# from frappe import _

# @frappe.whitelist()
# def get_payment_history():
#     try:
#         payment_data = frappe.db.sql("""
#             SELECT 
#                 posting_date as date,
#                 name as payment_id,
#                 paid_amount as amount,
#                 status,
#                 party as customer
#             FROM `tabPayment Entry`
#             WHERE docstatus = 1
#             ORDER BY posting_date DESC
#             LIMIT 100
#         """, as_dict=True)
        
#         return payment_data
        
#     except Exception as e:
#         frappe.log_error(frappe.get_traceback(), _("Payment History Error"))
#         # Return sample data if app is not installed
#         return [
#             {'date': '2020-09-08', 'payment_id': 'PAY-001', 'amount': 406.27, 'status': 'Not Paid', 'customer': 'Jerome Cooper'},
#             {'date': '2020-02-01', 'payment_id': 'PAY-002', 'amount': 105.55, 'status': 'Paid', 'customer': 'Ronald Richards'},
#             {'date': '2020-10-17', 'payment_id': 'PAY-003', 'amount': 351.02, 'status': 'Premiere', 'customer': 'Annette Black'}
#         ]


import frappe
from frappe import _

def execute(filters=None):
    columns = get_columns()
    data = get_data(filters)
    return columns, data

def get_columns():
    return [
        {
            "fieldname": "name",
            "label": _("Payment ID"),
            "fieldtype": "Link",
            "options": "Payment Entry",
            "width": 120
        },
        {
            "fieldname": "party",
            "label": _("Contact"),
            "fieldtype": "Data",
            "width": 150
        },
        {
            "fieldname": "status",
            "label": _("Status"),
            "fieldtype": "Data",
            "width": 100
        },
        {
            "fieldname": "payment_type",
            "label": _("Type"),
            "fieldtype": "Data",
            "width": 100
        },
        {
            "fieldname": "mode_of_payment",
            "label": _("Method"),
            "fieldtype": "Data",
            "width": 120
        },
        {
            "fieldname": "owner",
            "label": _("Manager"),
            "fieldtype": "Data",
            "width": 150
        },
        {
            "fieldname": "paid_amount",
            "label": _("Amount"),
            "fieldtype": "Currency",
            "width": 120
        },
        {
            "fieldname": "posting_date",
            "label": _("Date"),
            "fieldtype": "Date",
            "width": 100
        }
    ]

def get_data(filters=None):
    conditions = get_conditions(filters)
    
    query = """
        SELECT 
            name,
            party,
            status,
            payment_type,
            mode_of_payment,
            owner,
            paid_amount,
            posting_date
        FROM `tabPayment Entry`
        WHERE docstatus != 2
        {conditions}
        ORDER BY posting_date DESC
        LIMIT 100
    """.format(conditions=conditions)
    
    data = frappe.db.sql(query, as_dict=1)
    return data

def get_conditions(filters):
    conditions = ""
    
    if filters.get("search_term"):
        search_term = f"%{filters['search_term']}%"
        conditions += f" AND (party LIKE '{search_term}' OR name LIKE '{search_term}')"
    
    if filters.get("filter_field") and filters["filter_field"] != "all":
        if filters["filter_field"] == "payment":
            conditions += " AND payment_type = 'Pay'"
        elif filters["filter_field"] == "deposit":
            conditions += " AND payment_type = 'Receive'"
        elif filters["filter_field"] == "cash":
            conditions += " AND mode_of_payment = 'Cash'"
        elif filters["filter_field"] == "card":
            conditions += " AND mode_of_payment LIKE '%Card%'"
        elif filters["filter_field"] == "wire":
            conditions += " AND mode_of_payment = 'Wire Transfer'"
    
    return conditions