


// // // =========================================
// // // ITEM PERFORMANCE DASHBOARD – SMART VERSION (NO SUMMARY + FIXED EXPORTS)
// // // =========================================

// // frappe.pages['item-performance-das'].on_page_load = function (wrapper) {
// // 	let page = frappe.ui.make_app_page({
// // 		parent: wrapper,
// // 		title: 'Item Performance Dashboard',
// // 		single_column: true
// // 	});

// // 	let default_company = frappe.defaults.get_user_default("Company");

// // 	// -------------------- Filters --------------------
// // 	page.add_field({
// // 		fieldname: 'company',
// // 		label: __('Company'),
// // 		fieldtype: 'Link',
// // 		options: 'Company',
// // 		default: default_company,
// // 		reqd: 1,
// // 		change: () => load_item_sales_data(page)
// // 	});

// // 	page.add_field({
// // 		fieldname: 'item_code',
// // 		label: __('Item'),
// // 		fieldtype: 'Link',
// // 		options: 'Item',
// // 		change: () => load_item_sales_data(page)
// // 	});

// // 	page.add_field({
// // 		fieldname: 'item_group',
// // 		label: __('Item Group'),
// // 		fieldtype: 'Link',
// // 		options: 'Item Group',
// // 		change: () => load_item_sales_data(page)
// // 	});

// // 	page.add_field({
// // 		fieldname: 'customer',
// // 		label: __('Customer'),
// // 		fieldtype: 'Link',
// // 		options: 'Customer',
// // 		change: () => load_item_sales_data(page)
// // 	});

// // 	page.add_field({
// // 		fieldname: 'from_date',
// // 		label: __('From Date'),
// // 		fieldtype: 'Date',
// // 		default: frappe.datetime.add_months(frappe.datetime.get_today(), -6),
// // 		change: () => load_item_sales_data(page)
// // 	});

// // 	page.add_field({
// // 		fieldname: 'to_date',
// // 		label: __('To Date'),
// // 		fieldtype: 'Date',
// // 		default: frappe.datetime.get_today(),
// // 		change: () => load_item_sales_data(page)
// // 	});

// // 	// -------------------- UI Containers --------------------
// // 	$(`
// // 		<div style="margin-top:20px;">
// // 			<!-- Chart -->
// // 			<div id="chart_section" style="padding:15px;background:white;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,0.08);">
// // 				<h4 style="margin-bottom:12px;">Item-wise Sales History</h4>
// // 				<div id="chart_item_sales" style="min-height:420px;"></div>
// // 			</div>

// // 			<!-- Export + Search -->
// // 			<div style="margin-top:20px;display:flex;justify-content:space-between;align-items:center;">
// // 				<input type="text" id="table_search" class="form-control" placeholder="🔍 Search item, customer..." style="max-width:300px;">
// // 				<div>
// // 					<button class="btn btn-sm btn-secondary" id="export_excel">📊 Export Excel</button>
// // 					<button class="btn btn-sm btn-secondary" id="export_pdf">📄 Export PDF</button>
// // 				</div>
// // 			</div>

// // 			<!-- Table -->
// // 			<div id="table_section" style="margin-top:15px;padding:15px;background:white;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,0.08);">
// // 				<div id="item_sales_table" style="overflow-x:auto;"></div>
// // 			</div>
// // 		</div>
// // 	`).appendTo(page.main);

// // 	// Initial Load
// // 	load_item_sales_data(page);

// // 	// Search Filter (live)
// // 	$(document).on("input", "#table_search", function () {
// // 		let term = $(this).val().toLowerCase();
// // 		$("#item_sales_table tbody tr").each(function () {
// // 			$(this).toggle($(this).text().toLowerCase().indexOf(term) > -1);
// // 		});
// // 	});
// // };

// // // --------------------- helpers ---------------------
// // function toNumber(val) {
// // 	if (val === null || val === undefined || val === "") return 0;
// // 	if (typeof val === "number") return val;
// // 	let s = String(val).replace(/[^0-9.\-]/g, "");
// // 	let n = parseFloat(s);
// // 	return isNaN(n) ? 0 : n;
// // }

// // function findNumericField(row, keywords) {
// // 	const keys = Object.keys(row || {});
// // 	for (let k of keys) {
// // 		let lk = k.toLowerCase();
// // 		for (let kw of keywords) {
// // 			if (lk.indexOf(kw) !== -1) return toNumber(row[k]);
// // 		}
// // 	}
// // 	return 0;
// // }

// // function escapeCsvCell(text) {
// // 	if (text === null || text === undefined) return '';
// // 	text = String(text);
// // 	// double quotes and wrap
// // 	if (text.indexOf(',') !== -1 || text.indexOf('"') !== -1 || text.indexOf('\n') !== -1) {
// // 		return '"' + text.replace(/"/g, '""') + '"';
// // 	}
// // 	return text;
// // }

// // // --------------------- load data ---------------------
// // function load_item_sales_data(page) {
// // 	let company = page.fields_dict.company.get_value();
// // 	if (!company) {
// // 		$("#chart_item_sales").html("<p style='text-align:center;color:#888;padding:40px;'>Select a Company</p>");
// // 		$("#item_sales_table").empty();
// // 		return;
// // 	}

// // 	let filters = {
// // 		company: company,
// // 		item_code: page.fields_dict.item_code.get_value() || null,
// // 		item_group: page.fields_dict.item_group.get_value() || null,
// // 		customer: page.fields_dict.customer.get_value() || null,
// // 		from_date: page.fields_dict.from_date.get_value(),
// // 		to_date: page.fields_dict.to_date.get_value()
// // 	};

// // 	$("#chart_item_sales").html(`
// // 		<div style="text-align:center;padding:40px;color:#666;">
// // 			<i class="fa fa-spinner fa-spin fa-2x"></i>
// // 			<div style="margin-top:8px;">Loading data...</div>
// // 		</div>
// // 	`);
// // 	$("#item_sales_table").html("");

// // 	frappe.call({
// // 		method: "frappe.desk.query_report.run",
// // 		args: { report_name: "Item-wise Sales History", filters: filters },
// // 		callback: function (r) {
// // 			let raw = (r.message && r.message.result) ? r.message.result : (r.message || []);
// // 			if (!raw || !raw.length) {
// // 				$("#chart_item_sales").html("<p style='text-align:center;color:#888;padding:40px;'>No data found</p>");
// // 				$("#item_sales_table").html("");
// // 				// disable export buttons if present
// // 				$("#export_excel").prop("disabled", true);
// // 				$("#export_pdf").prop("disabled", true);
// // 				return;
// // 			}
// // 			// render chart & table
// // 			render_item_sales_chart(raw);
// // 			render_item_sales_table_and_totals(raw);
// // 			// enable exports
// // 			enable_exports(raw);
// // 		},
// // 		error: function () {
// // 			$("#chart_item_sales").html("<p style='text-align:center;color:red;padding:40px;'>Error loading data.</p>");
// // 			$("#item_sales_table").html("");
// // 			$("#export_excel").prop("disabled", true);
// // 			$("#export_pdf").prop("disabled", true);
// // 		}
// // 	});
// // }

// // // --------------------- chart ---------------------
// // function render_item_sales_chart(data) {
// // 	$("#chart_item_sales").empty();

// // 	let grouped = {};
// // 	data.forEach(row => {
// // 		let item = (row.item_name || row["Item Name"] || row.item_code || row["Item Code"] || "Unknown").toString().trim();
// // 		if (!item) item = "Unknown";

// // 		let qty = findNumericField(row, ["qty", "quantity"]);
// // 		let amount = findNumericField(row, ["amount", "base_amount", "sales_amount", "total"]);

// // 		if (!grouped[item]) grouped[item] = { qty: 0, amount: 0 };
// // 		grouped[item].qty += qty;
// // 		grouped[item].amount += amount;
// // 	});

// // 	let combined = Object.keys(grouped).map(item => ({
// // 		item,
// // 		qty: grouped[item].qty,
// // 		amount: grouped[item].amount
// // 	}));

// // 	combined.sort((a, b) => b.amount - a.amount);
// // 	combined = combined.slice(0, 10);

// // 	new frappe.Chart("#chart_item_sales", {
// // 		title: "Top 10 Items by Sales Amount",
// // 		data: {
// // 			labels: combined.map(d => d.item),
// // 			datasets: [
// // 				{ name: "Quantity", type: "bar", values: combined.map(d => d.qty) },
// // 				{ name: "Amount", type: "line", values: combined.map(d => d.amount) }
// // 			]
// // 		},
// // 		type: "axis-mixed",
// // 		height: 420,
// // 		colors: ["#00bcd4", "#9c27b0"],
// // 		barOptions: { spaceRatio: 0.6 },
// // 		lineOptions: { regionFill: 1, spline: 1 },
// // 		animate: 1,
// // 		axisOptions: { xIsSeries: true },
// // 		tooltipOptions: {
// // 			formatTooltipY: (val, i) => i === 0 ? `${val} Units` : frappe.format(val, { fieldtype: "Currency" })
// // 		}
// // 	});
// // }

// // // --------------------- table + totals ---------------------
// // function render_item_sales_table_and_totals(data) {
// // 	let total_qty = 0;
// // 	let total_amount = 0;
// // 	let rows_html = "";

// // 	data.forEach(row => {
// // 		let item_code = row.item_code || row["Item Code"] || "";
// // 		let item_name = row.item_name || row["Item Name"] || "";
// // 		let qty = findNumericField(row, ["qty", "quantity"]);
// // 		let rate = findNumericField(row, ["rate", "price", "base_rate"]);
// // 		let amount = findNumericField(row, ["amount", "base_amount", "sales_amount", "total"]);

// // 		// Ensure consistency between qty, rate, amount
// // 		if (amount === 0 && rate > 0 && qty > 0) amount = rate * qty;
// // 		if (rate === 0 && qty > 0 && amount > 0) rate = amount / qty;

// // 		let customer = row.customer_name || row.customer || row["Customer"] || "";
// // 		let transaction_date = row.transaction_date || row["Transaction Date"] || row.posting_date || row["Posting Date"] || "";

// // 		total_qty += qty;
// // 		total_amount += amount;

// // 		rows_html += `
// // 			<tr>
// // 				<td>${frappe.utils.escape_html(item_code)}</td>
// // 				<td>${frappe.utils.escape_html(item_name)}</td>
// // 				<td>${Number(qty || 0).toFixed(2)}</td>
// // 				<td style="text-align:right;">${frappe.format(rate, { fieldtype: "Currency" })}</td>
// // 				<td style="text-align:right;">${frappe.format(amount, { fieldtype: "Currency" })}</td>
// // 				<td>${frappe.utils.escape_html(customer)}</td>
// // 				<td>${frappe.utils.escape_html(transaction_date)}</td>
// // 			</tr>
// // 		`;
// // 	});

// // 	// Total calculation (average rate weighted)
// // 	let avg_rate = total_qty > 0 ? total_amount / total_qty : 0;

// // 	let table_html = `
// // 		<table id="item_perf_table" class="table table-bordered table-sm" style="text-align:left;">
// // 			<thead>
// // 				<tr style="font-weight:600;">
// // 					<th>Item Code</th><th>Item Name</th><th style="text-align:left;">Qty</th>
// // 					<th style="text-align:right;">Rate</th><th style="text-align:right;">Amount</th>
// // 					<th>Customer</th><th>Date</th>
// // 				</tr>
// // 			</thead>
// // 			<tbody>
// // 				${rows_html}
// // 				<tr style="font-weight:700;background:#f8f9fa;">
// // 					<td colspan="2">Total</td>
// // 					<td style="text-align:right;">${Number(total_qty || 0).toFixed(2)}</td>
// // 					<td style="text-align:right;">${frappe.format(avg_rate, { fieldtype: "Currency" })}</td>
// // 					<td style="text-align:right;">${frappe.format(total_amount, { fieldtype: "Currency" })}</td>
// // 					<td colspan="2"></td>
// // 				</tr>
// // 			</tbody>
// // 		</table>
// // 	`;
// // 	$("#item_sales_table").html(table_html);

// // 	// enable exports now that table is rendered
// // 	$("#export_excel").prop("disabled", false);
// // 	$("#export_pdf").prop("disabled", false);
// // }

// // // --------------------- Export Buttons (client-side, reliable) ---------------------
// // function enable_exports(data) {
// // 	// get table rows for export when clicked
// // 	$("#export_excel").off("click").on("click", function () {
// // 		let $table = $("#item_perf_table");
// // 		if (!$table.length) {
// // 			frappe.msgprint("No table data to export.");
// // 			return;
// // 		}
// // 		// Build CSV from table
// // 		let csv = [];
// // 		$table.find("thead tr").each(function () {
// // 			let row = [];
// // 			$(this).find("th").each(function () { row.push(escapeCsvCell($(this).text().trim())); });
// // 			csv.push(row.join(","));
// // 		});
// // 		$table.find("tbody tr").each(function () {
// // 			let row = [];
// // 			$(this).find("td").each(function () { row.push(escapeCsvCell($(this).text().trim())); });
// // 			csv.push(row.join(","));
// // 		});
// // 		let csvContent = csv.join("\n");
// // 		let blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
// // 		let url = URL.createObjectURL(blob);
// // 		let a = document.createElement("a");
// // 		a.href = url;
// // 		a.download = `Item_Performance_Report_${frappe.datetime.nowdate()}.csv`;
// // 		document.body.appendChild(a);
// // 		a.click();
// // 		a.remove();
// // 		URL.revokeObjectURL(url);
// // 	});

// // 	$("#export_pdf").off("click").on("click", function () {
// // 		let $table = $("#item_perf_table");
// // 		if (!$table.length) {
// // 			frappe.msgprint("No table data to export.");
// // 			return;
// // 		}
// // 		// Open print window with minimal styling
// // 		let style = `
// // 			<style>
// // 				body{font-family:Arial,Helvetica,sans-serif;padding:20px;}
// // 				table{border-collapse:collapse;width:100%;}
// // 				th,td{border:1px solid #ddd;padding:8px;text-align:left;}
// // 				th{background:#f3f4f6;font-weight:600;}
// // 				tfoot td{font-weight:700;background:#f8f9fa;}
// // 			</style>
// // 		`;
// // 		let html = `<html><head><title>Item Performance Report</title>${style}</head><body>`;
// // 		html += `<h3>Item Performance Report</h3>`;
// // 		html += $table.prop('outerHTML');
// // 		html += `</body></html>`;

// // 		let printWindow = window.open('', '_blank', 'width=900,height=700');
// // 		printWindow.document.open();
// // 		printWindow.document.write(html);
// // 		printWindow.document.close();
// // 		// Give browser a moment to render then print
// // 		setTimeout(() => {
// // 			printWindow.focus();
// // 			printWindow.print();
// // 		}, 500);
// // 	});
// // }





// =========================================
// ITEM PERFORMANCE DASHBOARD 
// =========================================

frappe.pages['item-performance-das'].on_page_load = function (wrapper) {
	let page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Item Performance Dashboard',
		single_column: true
	});
	let default_company = frappe.defaults.get_user_default("Company");

	// -------------------- Filters --------------------
	page.add_field({
		fieldname: 'company',
		label: __('Company'),
		fieldtype: 'Link',
		options: 'Company',
		default: default_company,
		reqd: 1,
		change: () => load_item_sales_data(page)
	});

	page.add_field({
		fieldname: 'item_code',
		label: __('Item'),
		fieldtype: 'Link',
		options: 'Item',
		change: () => load_item_sales_data(page)
	});

	page.add_field({
		fieldname: 'item_group',
		label: __('Item Group'),
		fieldtype: 'Link',
		options: 'Item Group',
		change: () => load_item_sales_data(page)
	});

	// FIXED CUSTOMER FIELD (Proper Suggestion + Filter)
	page.add_field({
		fieldname: 'customer',
		label: __('Customer'),
		fieldtype: 'Link',
		options: 'Customer',
		get_query: function() {
			return {
				query: "frappe.desk.search.search_link",
				filters: { doctype: "Customer" }
			};
		},
		onchange: function() {
			load_item_sales_data(page);
		}
	});

	page.add_field({
		fieldname: 'from_date',
		label: __('From Date'),
		fieldtype: 'Date',
		default: frappe.datetime.add_months(frappe.datetime.get_today(), -6),
		change: () => load_item_sales_data(page)
	});

	page.add_field({
		fieldname: 'to_date',
		label: __('To Date'),
		fieldtype: 'Date',
		default: frappe.datetime.get_today(),
		change: () => load_item_sales_data(page)
	});

	// -------------------- UI Containers --------------------
	$(`
		<div style="margin-top:20px;">
			<!-- Chart -->
			<div id="chart_section" style="padding:15px;background:white;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,0.08);">
				<h4 style="margin-bottom:12px;">Item-wise Sales History</h4>
				<div id="chart_item_sales" style="min-height:420px;"></div>
			</div>
			<!-- Export + Search -->
			<div style="margin-top:20px;display:flex;justify-content:space-between;align-items:center;">
				<input type="text" id="table_search" class="form-control" placeholder="🔍 Search item, customer..." style="max-width:300px;">
				<div>
					<button class="btn btn-sm btn-secondary" id="export_excel">📊 Export Excel</button>
					<button class="btn btn-sm btn-secondary" id="export_pdf">📄 Export PDF</button>
				</div>
			</div>
			<!-- Table -->
			<div id="table_section" style="margin-top:15px;padding:15px;background:white;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,0.08);">
				<div id="item_sales_table" style="overflow-x:auto;"></div>
			</div>
		</div>
	`).appendTo(page.main);

	// Initial Load
	load_item_sales_data(page);

	// Search Filter (live)
	$(document).on("input", "#table_search", function () {
		let term = $(this).val().toLowerCase();
		$("#item_sales_table tbody tr").each(function () {
			$(this).toggle($(this).text().toLowerCase().indexOf(term) > -1);
		});
	});
};

// --------------------- helpers ---------------------
function toNumber(val) {
	if (val === null || val === undefined || val === "") return 0;
	if (typeof val === "number") return val;
	let s = String(val).replace(/[^0-9.\-]/g, "");
	let n = parseFloat(s);
	return isNaN(n) ? 0 : n;
}

function findNumericField(row, keywords) {
	const keys = Object.keys(row || {});
	for (let k of keys) {
		let lk = k.toLowerCase();
		for (let kw of keywords) {
			if (lk.indexOf(kw) !== -1) return toNumber(row[k]);
		}
	}
	return 0;
}
function escapeCsvCell(text) {
	if (text === null || text === undefined) return '';
	text = String(text);
	if (text.indexOf(',') !== -1 || text.indexOf('"') !== -1 || text.indexOf('\n') !== -1) {
		return '"' + text.replace(/"/g, '""') + '"';
	}
	return text;
}

// --------------------- load data ---------------------
function load_item_sales_data(page) {
	let company = page.fields_dict.company.get_value();
	if (!company) {
		$("#chart_item_sales").html("<p style='text-align:center;color:#888;padding:40px;'>Select a Company</p>");
		$("#item_sales_table").empty();
		return;
	}
	let filters = {
		company: company,
		item_code: page.fields_dict.item_code.get_value() || null,
		item_group: page.fields_dict.item_group.get_value() || null,
		customer: page.fields_dict.customer.get_value() || null,
		from_date: page.fields_dict.from_date.get_value(),
		to_date: page.fields_dict.to_date.get_value()
	};
	$("#chart_item_sales").html(`
		<div style="text-align:center;padding:40px;color:#666;">
			<i class="fa fa-spinner fa-spin fa-2x"></i>
			<div style="margin-top:8px;">Loading data...</div>
		</div>
	`);
	$("#item_sales_table").html("");
	frappe.call({
		method: "frappe.desk.query_report.run",
		args: { report_name: "Item-wise Sales History", filters: filters },
		callback: function (r) {
			let raw = (r.message && r.message.result) ? r.message.result : (r.message || []);
			if (!raw || !raw.length) {
				$("#chart_item_sales").html("<p style='text-align:center;color:#888;padding:40px;'>No data found</p>");
				$("#item_sales_table").html("");
				$("#export_excel").prop("disabled", true);
				$("#export_pdf").prop("disabled", true);
				return;
			}
			render_item_sales_chart(raw);
			render_item_sales_table_and_totals(raw);
			enable_exports(raw);
		},
		error: function () {
			$("#chart_item_sales").html("<p style='text-align:center;color:red;padding:40px;'>Error loading data.</p>");
			$("#item_sales_table").html("");
			$("#export_excel").prop("disabled", true);
			$("#export_pdf").prop("disabled", true);
		}
	});
}
// --------------------- chart ---------------------
function render_item_sales_chart(data) {
	$("#chart_item_sales").empty();
	let grouped = {};
	data.forEach(row => {
		let item = (row.item_name || row["Item Name"] || row.item_code || row["Item Code"] || "Unknown").toString().trim();
		if (!item) item = "Unknown";
		let qty = findNumericField(row, ["qty", "quantity"]);
		let amount = findNumericField(row, ["amount", "base_amount", "sales_amount", "total"]);
		if (!grouped[item]) grouped[item] = { qty: 0, amount: 0 };
		grouped[item].qty += qty;
		grouped[item].amount += amount;
	});
	let combined = Object.keys(grouped).map(item => ({
		item,
		qty: grouped[item].qty,
		amount: grouped[item].amount
	}));
	combined.sort((a, b) => b.amount - a.amount);
	combined = combined.slice(0, 10);
	new frappe.Chart("#chart_item_sales", {
		title: "Top 10 Items by Sales Amount",
		data: {
			labels: combined.map(d => d.item),
			datasets: [
				{ name: "Quantity", type: "bar", values: combined.map(d => d.qty) },
				{ name: "Amount", type: "line", values: combined.map(d => d.amount) }
			]
		},
		type: "axis-mixed",
		height: 420,
		colors: ["#b3e9f0ff", "#e198eeff"],
		barOptions: { spaceRatio: 0.6 },
		lineOptions: { regionFill: 1, spline: 1 },
		animate: 1,
		axisOptions: { xIsSeries: true },
		tooltipOptions: {
			formatTooltipY: (val, i) => i === 0 ? `${val} Units` : frappe.format(val, { fieldtype: "Currency" })
		}
	});
}
// --------------------- table + totals ---------------------
function render_item_sales_table_and_totals(data) {
	let total_qty = 0;
	let total_amount = 0;
	let rows_html = "";
	data.forEach(row => {
		let item_code = row.item_code || row["Item Code"] || "";
		let item_name = row.item_name || row["Item Name"] || "";
		let qty = findNumericField(row, ["qty", "quantity"]);
		let rate = findNumericField(row, ["rate", "price", "base_rate"]);
		let amount = findNumericField(row, ["amount", "base_amount", "sales_amount", "total"]);
		if (amount === 0 && rate > 0 && qty > 0) amount = rate * qty;
		if (rate === 0 && qty > 0 && amount > 0) rate = amount / qty;
		let customer = row.customer_name || row.customer || row["Customer"] || "";
		let transaction_date = row.transaction_date || row["Transaction Date"] || row.posting_date || row["Posting Date"] || "";
		total_qty += qty;
		total_amount += amount;
		rows_html += `
			<tr>
				<td>${frappe.utils.escape_html(item_code)}</td>
				<td>${frappe.utils.escape_html(item_name)}</td>
				<td>${Number(qty || 0).toFixed(2)}</td>
				<td style="text-align:right;">${frappe.format(rate, { fieldtype: "Currency" })}</td>
				<td style="text-align:right;">${frappe.format(amount, { fieldtype: "Currency" })}</td>
				<td>${frappe.utils.escape_html(customer)}</td>
				<td>${frappe.utils.escape_html(transaction_date)}</td>  
			</tr>
		`;
	});
	let avg_rate = total_qty > 0 ? total_amount / total_qty : 0;
	let table_html = `
		<table id="item_perf_table" class="table table-bordered table-sm" style="text-align:left;">
			<thead>
				<tr style="font-weight:600;">
					<th>Item Code</th><th>Item Name</th><th style="text-align:left;">Qty</th>
					<th style="text-align:right;">Rate</th><th style="text-align:right;">Amount</th>
					<th>Customer</th><th>Date</th>
				</tr>
			</thead>
			<tbody>
				${rows_html}
				<tr style="font-weight:700;background:#f8f9fa;">
					<td colspan="2">Total</td>
					<td style="text-align:left;">${Number(total_qty || 0).toFixed(2)}</td>
					<td style="text-align:right;">${frappe.format(avg_rate, { fieldtype: "Currency" })}</td>
					<td style="text-align:right;">${frappe.format(total_amount, { fieldtype: "Currency" })}</td>
					<td colspan="2"></td>
				</tr>
				<tr style="font-weight:700;background:#f8f9fa;">
					<td colspan="2">Average Rate</td>
					<td colspan="3" style="text-align:right;">${frappe.format(avg_rate, { fieldtype: "Currency" })}</td>
					<td colspan="2"></td>
				</tr>
			</tbody>
		</table>
	`;
	$("#item_sales_table").html(table_html);
	$("#export_excel").prop("disabled", false);
	$("#export_pdf").prop("disabled", false);
	$("#export_csv").prop("disabled", false);
	$("#export_print").prop("disabled", false);
}
// --------------------- Export Buttons ---------------------
function enable_exports(data) {
	$("#export_excel").off("click").on("click", function () {
		let $table = $("#item_perf_table");
		if (!$table.length) {
			frappe.msgprint("No table data to export.");
			return;
		}
		let csv = [];
		$table.find("thead tr").each(function () {
			let row = [];
			$(this).find("th").each(function () { row.push(escapeCsvCell($(this).text().trim())); });
			csv.push(row.join(","));
		});
		$table.find("tbody tr").each(function () {
			let row = [];
			$(this).find("td").each(function () { row.push(escapeCsvCell($(this).text().trim())); });
			csv.push(row.join(","));
		});
		let csvContent = csv.join("\n");
		let blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
		let url = URL.createObjectURL(blob);
		let a = document.createElement("a");
		a.href = url;
		a.download = `Item_Performance_Report_${frappe.datetime.nowdate()}.csv`;
		document.body.appendChild(a);
		a.click();
		a.remove();
		URL.revokeObjectURL(url);
	});
	$("#export_pdf").off("click").on("click", function () {
		let $table = $("#item_perf_table");
		if (!$table.length) {
			frappe.msgprint("No table data to export.");
			return;
		}
		let style = `
			<style>
				body{font-family:Arial,Helvetica,sans-serif;padding:20px;}
				table{border-collapse:collapse;width:100%;}
				th,td{border:1px solid #ddd;padding:8px;text-align:left;}
				th{background:#f3f4f6;font-weight:600;}
				tfoot td{font-weight:700;background:#f8f9fa;}
			</style>
		`;
		let html = `<html><head><title>Item Performance Report</title>${style}</head><body>`;
		html += `<h3>Item Performance Report</h3>`;
		html += $table.prop('outerHTML');
		html += `</body></html>`;
		let printWindow = window.open('', '_blank', 'width=900,height=700');
		printWindow.document.open();
		printWindow.document.write(html);
		printWindow.document.close();
		setTimeout(() => {
			printWindow.focus();
			printWindow.print();
            
		}, 500);
	});
}




