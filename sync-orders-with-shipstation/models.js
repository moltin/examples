module.exports.billingAddressModel = {
  name: null,
  company: null,
  street1: null,
  street2: null,
  street3: null,
  city: null,
  state: null,
  postalCode: null,
  country: null,
  phone: null,
  residential: null,
}

module.exports.shippingAddressModel = {
  name: null,
  company: null,
  street1: null,
  street2: null,
  street3: null,
  city: null,
  state: null,
  postalCode: null,
  country: null,
  phone: null,
  residential: true,
}

module.exports.orderItemModel = {
  lineItemKey: null,
  sku: null,
  name: null,
  quantity: null,
  unitPrice: null,
  adjustment: false,
}

module.exports.orderModel = {
  orderKey: null,
  orderDate: null,
  orderStatus: 'awaiting_shipment',
  customerEmail: null,
  customerUsername: null,
  billTo: null,
  shipTo: null,
  items: null,
  amountPaid: null,
  requestedShippingService: null,
  carrierCode: null,
  serviceCode: null,
  packageCode: null,
  confirmation: null,
  gift: false,
}
