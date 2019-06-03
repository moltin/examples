'use strict'
import 'source-map-support/register'
const transforms = require('./utils/transforms')
const models = require('./models')
const shipstation = require('./utils/shipstation')
const moltin = require('./utils/moltin')

const responseBuilder = code => message => ({
  statusCode: code,
  body: JSON.stringify({
    message,
  }),
})

/*
newMoltinOrder takes a Moltin webhook payload for order.paid
and sends the order to Shipstation
*/
module.exports.newMoltinOrder = async (event) => {
  const eventBody = JSON.parse(event.body)
  const moltinOrderBody = JSON.parse(eventBody.resources).data
  const { items } = JSON.parse(eventBody.resources).included

  const transformedLines = await transforms.transformLineItems(items)(models.orderItemModel)
  const transformedShipping = transforms.transformShippingAddress(moltinOrderBody.shipping_address)(models.billingAddressModel)
  const transformedBilling = transforms.transformBillingAddress(moltinOrderBody.billing_address)(models.billingAddressModel)

  const orderBody = transforms.transformBaseOrder(moltinOrderBody)(models.orderModel)
  orderBody.billTo = transformedBilling
  orderBody.shipTo = transformedShipping
  orderBody.items = transformedLines

  try {
    await shipstation.createShipstationOrder(orderBody)
    return responseBuilder(200)('Order created in Shipstation')
  } catch (e) {
    console.log(e)
    return responseBuilder(500)(JSON.stringify(e))
  }
}

/*
newShipstationShipment takes a Shipstation webhook payload for SHIP_NOTIFY
and sends marks the order in Moltin as fulfilled
*/
module.exports.newShipstationShipment = async (event) => {
  try {
    // Shipstation webhooks provide a URL to fetch the changed resource
    const resourceUrl = event.body.resource_url
    const shipmentInfo = await shipstation.getShipStationWebhookResourceUrl(resourceUrl)
    
    const parsedShipmentInfo = JSON.parse(shipmentInfo)
    const orderID = parsedShipmentInfo.shipments[0].orderKey

    await moltin.markOrderAsShipped(orderID)
    return responseBuilder(200)('Order marked as fulfilled in Moltin')
  } catch (e) {
    return responseBuilder(500)(JSON.stringify(e))
  }
}
