import frappe

@frappe.whitelist()
def get_batches_for_warehouse(doctype, txt, searchfield, start, page_len, filters):
    filters = frappe.parse_json(filters or "{}")
    item_code = filters.get("item_code")
    warehouse = filters.get("warehouse")

    if not warehouse:
        return []

    query = """
        SELECT
            b.name AS batch,
            CONCAT('Qty:',IFNULL(SUM(sle.actual_qty), 0),
                IFNULL(CONCAT(',Expiry:',DATE_FORMAT(MAX(b.expiry_date), '%%Y-%%m-%%d')), '')
            ) AS description
        FROM `tabBatch` b
        LEFT JOIN `tabStock Ledger Entry` sle
            ON sle.batch_no = b.name
            AND sle.warehouse = %(warehouse)s
        WHERE 1=1
    """
    values = {"warehouse": warehouse}

    if item_code:
        query += " AND b.item = %(item_code)s"
        values["item_code"] = item_code
    if batch_no:
        query +="AND b.batch_no=%(Batch_no)s"
        values["batch_no"] = batch_no
    if txt:
        query += " AND b.name LIKE %(txt)s"
        values["txt"] = f"%{txt}%"
    query += """
        GROUP BY b.name
        ORDER BY b.name DESC
        LIMIT %(start)s, %(page_len)s
    """
    values.update({"start": start, "page_len": page_len})

    return frappe.db.sql(query, values)
