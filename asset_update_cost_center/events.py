import frappe



@frappe.whitelist()

def update_cost_center(asset,cost_center):
    frappe.db.set_value("Asset",asset,"cost_center",cost_center)
    