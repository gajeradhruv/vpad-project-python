# # item_dashboard.py
# import frappe
# from frappe import _

# @frappe.whitelist()
# def get_item_dashboard_data(item=None, workstation=None, date_range=None):
#     # Example queries—customize logic as per your setup
#     # 1. Production Summary
#     production = frappe.db.get_all(
#         'Production Order', 
#         fields=['item_code', 'sum(produced_qty) as qty'],
#         filters={'docstatus': 1},  # Only submitted
#         group_by='item_code'
#     )
    
#     # 2. Pending Orders
#     pending_orders = frappe.db.get_all(
#         'Stock Entry',
#         fields=['item_code', 'qty', 'status', 'workstation'],
#         filters={'status': ['not in', ['Completed', 'Cancelled']]}
#     )
    
#     # 3. Work Orders by Status
#     work_order_status = frappe.db.sql("""
#         SELECT status, COUNT(*) as total
#         FROM `tabWork Order`
#         WHERE docstatus = 1
#         GROUP BY status
#     """, as_dict=True)
    
#     # 4. Work Order Completion
#     work_order_progress = frappe.db.get_all(
#         'Work Order',
#         fields=['name', 'progress'],
#         filters={'docstatus': 1}
#     )

#     # 5. Overall Metrics
#     total_production = sum([row.qty for row in production])
#     pending_count = len([row for row in pending_orders if row['status'] != "Completed"])
#     delayed_jobs = len([wo for wo in work_order_status if wo['status'] == "Delayed"])
    
#     return {
#         'production_summary': production,
#         'pending_orders': pending_orders,
#         'work_order_status': work_order_status,
#         'work_order_completion': work_order_progress,
#         'total_production': total_production,
#         'pending_orders_count': pending_count,
#         'delayed_jobs': delayed_jobs
#     }
