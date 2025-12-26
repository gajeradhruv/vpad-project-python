import frappe
from frappe.utils import flt

@frappe.whitelist()
def get_live_item_data(filters=None):
    """Fetch live item-wise sales data"""
    if isinstance(filters, str):
        import json
        filters = json.loads(filters)

    company = filters.get("company")
    item_code = filters.get("item_code")
    from_date = filters.get("from_date")
    to_date = filters.get("to_date")

    # Build dynamic SQL filters
    conditions = "1=1"
    if company:
        conditions += f" AND si.company = '{company}'"
    if from_date and to_date:
        conditions += f" AND si.posting_date BETWEEN '{from_date}' AND '{to_date}'"
    if item_code:
        conditions += f" AND sii.item_code = '{item_code}'"

    # SQL Query (fetch live sales data)
    data = frappe.db.sql(f"""
        SELECT
            sii.item_code,
            sii.item_name,
            SUM(sii.qty) AS qty,
            SUM(sii.base_amount) AS amount
        FROM
            `tabSales Invoice Item` AS sii
        JOIN
            `tabSales Invoice` AS si ON sii.parent = si.name
        WHERE
            {conditions} AND si.docstatus = 1
        GROUP BY
            sii.item_code, sii.item_name
        ORDER BY
            amount DESC
    """, as_dict=True)

    return data
product-management-s