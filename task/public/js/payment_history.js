frappe.pages['payment_history'].on_page_load = function(wrapper) {
    var page = frappe.ui.make_app_page({
        parent: wrapper,
        title: 'Payments',
        single_column: true
    });
}