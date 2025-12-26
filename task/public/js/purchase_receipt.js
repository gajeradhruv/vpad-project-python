frappe.ui.form.on("Purchase Receipt", {
    refresh(frm) {
        console.log("Radhe Krishna")
        frm.add_custom_field({
            fieldtype: "Data",
            label: "My New Field",
            fieldname: "my_new_field"
        });
    }
});
