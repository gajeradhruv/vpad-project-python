import frappe

@frappe.whitelist()
def get_sales_history(company, item, from_date, to_date, frequency="Monthly"):
    query = f"""
        SELECT
            CASE
                WHEN %(frequency)s='Daily' THEN DATE_FORMAT(posting_date, '%%Y-%%m-%%d')
                WHEN %(frequency)s='Monthly' THEN DATE_FORMAT(posting_date, '%%Y-%%m')
                WHEN %(frequency)s='Quarterly' THEN CONCAT(YEAR(posting_date), '-Q', QUARTER(posting_date))
                WHEN %(frequency)s='Yearly' THEN YEAR(posting_date)
            END AS period,
            SUM(qty) AS total_qty
        FROM `tabSales Invoice Item`
        WHERE docstatus=1 AND company=%(company)s AND item_code=%(item)s
        AND posting_date BETWEEN %(from_date)s AND %(to_date)s
        GROUP BY period
        ORDER BY MIN(posting_date)
    """
    data = frappe.db.sql(query, {
        "frequency": frequency,
        "company": company,
        "item": item,
        "from_date": from_date,
        "to_date": to_date
    }, as_dict=True)
    return data
