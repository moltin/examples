import 'source-map-support/register'

export const billingAddressModel = {
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

export const shippingAddressModel = {
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

export const orderItemModel = {
    lineItemKey: null,
    sku: null,
    name: null,
    quantity: null,
    unitPrice: null,
    adjustment: false,
}

export const orderModel = {
    orderKey: null,
    orderDate: null,
    orderStatus: 'awaiting_shipment',
    customerEmail: null,
    customerUsername: null,
    amountPaid: null,
    requestedShippingService: null,
    carrierCode: null,
    serviceCode: null,
    packageCode: null,
    confirmation: null,
    gift: false,
}

export const orderObjects = {
    billTo: {},
    shipTo: {},
    items: {},
}
