module.exports = {
  filterOrderJson(order) {
    return {
      id: order.id, // string
      created_at: order.meta.timestamps.created_at, // string
      updated_at: order.meta.timestamps.updated_at, // string
      customer_id: order.relationships.customer ? order.relationships.customer.data.id : null, // string
      customer_email: order.customer.email, // string
      payment: order.payment, // string
      shipping: order.shipping, // string
      status_value: order.status, // string
      subtotal: order.meta.display_price.without_tax.amount, // float
      total: order.meta.display_price.with_tax.amount, // float
      currency_code: order.meta.display_price.without_tax.currency, // string
      ship_to_first_name: order.shipping_address.first_name, // string
      ship_to_last_name: order.shipping_address.last_name, // string
      ship_to_address_1: order.shipping_address.line_1, // string
      ship_to_address_2: order.shipping_address.line_2, // string
      ship_to_postcode: order.shipping_address.postcode, // string
      ship_to_country_code: order.shipping_address.country, // string
      ship_to_company: order.shipping_address.company_name, // string
      ship_to_city: order.shipping_address.city, // string
      ship_to_phone: order.shipping_address.phone_number, // string
      ship_to_county: order.shipping_address.county, // string
      bill_to_first_name: order.billing_address.first_name, // string
      bill_to_last_name: order.billing_address.last_name, // string
      bill_to_address_1: order.billing_address.line_1, // string
      bill_to_address_2: order.billing_address.line_2, // string
      bill_to_postcode: order.billing_address.postcode, // string
      bill_to_country_code: order.billing_address.country, // string
      bill_to_company: order.billing_address.company_name, // string
      bill_to_city: order.billing_address.city, // string
      bill_to_county: order.billing_address.county, // string
      totals_raw_subtotal: order.meta.display_price.without_tax.amount, // float
      totals_raw_total: order.meta.display_price.with_tax.amount, // float
    }
  },

  filterItemJson(item) {
    return {
      id: item.id, // string
      created_at: item.meta.timestamps.created_at, // string
      updated_at: item.meta.timestamps.updated_at, // string
      quantity: item.quantity, // integer
      cart_identifier: item.relationships.cart_item.data.id, // string
      title: item.name, // string
      sku: item.sku, // string
      unit_price: item.meta.display_price.without_tax.unit.formatted, // string
      total_retail: item.meta.display_price.without_tax.value.formatted, // string
      product_id: item.product_id, // string
      type: item.type, // string
    }
  },
}
