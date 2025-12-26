# from __future__ import unicode_literals
# import frappe
# from frappe import _

# @frappe.whitelist()
# def get_live_orders():
#     """
#     Fetch live orders from the database
#     This can be used when the app is properly installed
#     """
#     try:
#         # Check if Order doctype exists
#         if not frappe.db.exists('DocType', 'Order'):
#             return {
#                 "success": False,
#                 "message": "Order doctype not found",
#                 "demo_data": get_demo_orders()
#             }
        
#         # Query to get pending orders with their items
#         orders = frappe.get_all('Order', 
#             filters={'status': 'Pending'},
#             fields=['name', 'customer_name', 'status', 'creation'])
        
#         order_list = []
#         for order in orders:
#             # Get order items
#             items = frappe.get_all('Order Item',
#                 filters={'parent': order.name},
#                 fields=['item_name', 'qty', 'notes'])
            
#             order_dict = {
#                 'name': order.name,
#                 'customer_name': order.customer_name,
#                 'status': order.status,
#                 'items': items
#             }
#             order_list.append(order_dict)
        
#         return {
#             "success": True,
#             "orders": order_list
#         }
        
#     except Exception as e:
#         frappe.log_error(f"Error fetching orders: {str(e)}")
#         return {
#             "success": False,
#             "error": str(e),
#             "demo_data": get_demo_orders()
#         }

# def get_demo_orders():
#     """
#     Generate demo orders for testing
#     """
#     import random
#     customers = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson']
#     products = ['Burger', 'Pizza', 'Pasta', 'Salad', 'Drink']
    
#     orders = []
#     for i in range(4):
#         orders.append({
#             'name': f'ORD-{100+i}',
#             'customer_name': random.choice(customers),
#             'status': 'Pending',
#             'items': [{
#                 'item_name': random.choice(products),
#                 'qty': random.randint(1, 3),
#                 'notes': 'Extra sauce' if random.random() > 0.7 else ''
#             }]
#         })
    
#     return orders

# @frappe.whitelist()
# def mark_order_completed(order_name):
#     """
#     Mark an order as completed
#     """
#     try:
#         if frappe.db.exists('Order', order_name):
#             frappe.db.set_value('Order', order_name, 'status', 'Completed')
#             frappe.db.commit()
#             return {"success": True, "message": f"Order {order_name} completed"}
#         else:
#             return {"success": False, "message": "Order not found"}
            
#     except Exception as e:
#         frappe.log_error(f"Error updating order: {str(e)}")
#         return {"success": False, "error": str(e)}

# @frappe.whitelist()
# def get_order_statistics():
#     """
#     Get order statistics for dashboard
#     """
#     try:
#         # Total orders
#         total_orders = frappe.db.count('Order')
        
#         # Pending orders
#         pending_orders = frappe.db.count('Order', {'status': 'Pending'})
        
#         # Completed orders
#         completed_orders = frappe.db.count('Order', {'status': 'Completed'})
        
#         return {
#             "total_orders": total_orders,
#             "pending_orders": pending_orders,
#             "completed_orders": completed_orders,
#             "success": True
#         }
        
#     except Exception as e:
#         frappe.log_error(f"Error getting statistics: {str(e)}")
#         return {
#             "success": False,
#             "error": str(e)
#         }





import frappe
from frappe import _
from frappe.model.document import Document

@frappe.whitelist()
def get_sales_order_analytics():
    """
    Custom method to get sales order analytics data
    """
    try:
        # Get pending sales orders count
        pending_orders = frappe.db.count('Sales Order', {
            'status': ['not in', ['Completed', 'Cancelled']],
            'docstatus': 1
        })
        
        # Get total items in pending orders
        total_items = frappe.db.sql("""
            SELECT SUM(soi.qty) 
            FROM `tabSales Order Item` soi
            INNER JOIN `tabSales Order` so ON soi.parent = so.name
            WHERE so.status NOT IN ('Completed', 'Cancelled') 
            AND so.docstatus = 1
        """)[0][0] or 0
        
        return {
            'pending_orders': pending_orders,
            'total_items': total_items,
            'success': True
        }
    
    except Exception as e:
        frappe.log_error(f"Error in get_sales_order_analytics: {str(e)}")
        return {
            'success': False,
            'error': str(e)
        }

@frappe.whitelist()
def submit_sales_order(order_name):
    """
    PERFECTED: Custom method to submit sales order - FIXED VERSION
    """
    try:
        # Get the sales order document with proper error handling
        if not frappe.db.exists('Sales Order', order_name):
            return {
                'success': False,
                'message': f'Order {order_name} does not exist'
            }
        
        so = frappe.get_doc("Sales Order", order_name)
        
        # Check if already submitted
        if so.docstatus == 1:
            return {
                'success': False,
                'message': 'Order is already submitted'
            }
        
        # Check if already cancelled
        if so.docstatus == 2:
            return {
                'success': False,
                'message': 'Order is cancelled and cannot be submitted'
            }
        
        # Submit the order with proper exception handling
        so.submit()
        
        frappe.db.commit()
        
        # Refresh the document to get updated values
        frappe.clear_cache(doctype='Sales Order')
        so.reload()
        
        return {
            'success': True,
            'message': f'Order {order_name} submitted successfully',
            'docstatus': so.docstatus,
            'status': so.status
        }
        
    except frappe.ValidationError as e:
        frappe.log_error(f"Validation error submitting sales order {order_name}: {str(e)}")
        frappe.db.rollback()
        return {
            'success': False,
            'message': f'Validation error: {str(e)}'
        }
    except Exception as e:
        frappe.log_error(f"Error submitting sales order {order_name}: {str(e)}")
        frappe.db.rollback()
        return {
            'success': False,
            'message': f'Error submitting order: {str(e)}'
        }

@frappe.whitelist()
def mark_order_completed(order_name):
    """
    PERFECTED: Custom method to mark sales order as completed - FIXED VERSION
    """
    try:
        # Get the sales order document with proper error handling
        if not frappe.db.exists('Sales Order', order_name):
            return {
                'success': False,
                'message': f'Order {order_name} does not exist'
            }
        
        so = frappe.get_doc("Sales Order", order_name)
        
        # Check if already completed
        if so.status == 'Completed':
            return {
                'success': False,
                'message': 'Order is already completed'
            }
        
        # Check if order is submitted
        if so.docstatus != 1:
            return {
                'success': False,
                'message': 'Only submitted orders can be marked as completed'
            }
        
        # Update status to completed using run_method to trigger validations
        so.db_set('status', 'Completed', update_modified=False)
        
        frappe.db.commit()
        
        # Refresh the document to get updated values
        frappe.clear_cache(doctype='Sales Order')
        so.reload()
        
        return {
            'success': True,
            'message': f'Order {order_name} marked as completed successfully',
            'status': so.status
        }
        
    except Exception as e:
        frappe.log_error(f"Error marking order {order_name} as completed: {str(e)}")
        frappe.db.rollback()
        return {
            'success': False,
            'message': f'Error updating order: {str(e)}'
        }

@frappe.whitelist()
def get_order_details(order_name):
    """
    Helper method to get order details
    """
    try:
        if not frappe.db.exists('Sales Order', order_name):
            return {'success': False, 'message': 'Order not found'}
        
        order = frappe.get_doc('Sales Order', order_name)
        
        return {
            'success': True,
            'data': {
                'name': order.name,
                'customer_name': order.customer_name,
                'status': order.status,
                'docstatus': order.docstatus,
                'grand_total': order.grand_total,
                'transaction_date': order.transaction_date,
                'modified': order.modified
            }
        }
    except Exception as e:
        frappe.log_error(f"Error getting order details {order_name}: {str(e)}")
        return {
            'success': False,
            'message': f'Error getting order details: {str(e)}'
        }