frappe.ui.form.on('Asset', {
    refresh(frm) {
        if (frm.doc.docstatus == 1) {
            frm.add_custom_button(__('Update Cost Center'), function () {
                let d = new frappe.ui.Dialog({
                    title: 'Update Cost Center',
                    fields: [
                        {
                            label: 'Cost Center',
                            fieldname: 'cost_center',
                            fieldtype: 'Link',
                            options: 'Cost Center',
                            reqd: 1,
                            get_query: function(){
                                return {
                                    "filters": {
                                        "is_group": 0,
                                        "disabled": 0,
                                        "company": frm.doc.company
                                    }
                                }
                            }
                        }
                    ],
                    size: 'small', // small, large, extra-large 
                    primary_action_label: 'Submit',
                    primary_action(values) {

                        frappe.call({
                            method: 'asset_update_cost_center.events.update_cost_center',
                            args: {
                                asset: frm.doc.name,
                                cost_center: values.cost_center
                            },
                            callback: function (r) {

                                d.hide();
                                res = r.message;
                                frm.reload_doc();
                            }
                        })

                    }
                });
                d.show();
            }, __('Manage'))

        }
    }
})