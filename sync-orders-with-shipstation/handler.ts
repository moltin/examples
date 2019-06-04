'use strict'
import 'source-map-support/register'

import { Handler, APIGatewayEvent } from 'aws-lambda';
import * as transforms from './utils/transforms'
import * as shipstation from './utils/shipstation'
import * as moltin from './utils/moltin'
import * as models from './models'

import {
    LambdaEventBody,
    LambdaResponse,
    MoltinOrderPaidWebhookBody,
    ShipstationOrderShippedWebhookBody,
    ShipstationOrderValues,
    ShipstationFullOrder,
    ShipstationOrderObjects
} from "Types"

const responseBuilder = (code: number): Function => (message: string): LambdaResponse => {
    return {
        statusCode: code,
        body: JSON.stringify({
            message,
        }),
    }
}

/*
newMoltinOrder takes a Moltin webhook payload for order.paid
and sends the order to Shipstation
*/
export const newMoltinOrder: Handler = async (event: APIGatewayEvent): Promise<LambdaResponse> => {
    try {
        if (event.body === null) {
            return responseBuilder(500)('No webhook payload present')
        }
        const eventBody: LambdaEventBody = JSON.parse(event.body as string)
        const moltinOrderBody: MoltinOrderPaidWebhookBody = JSON.parse(eventBody.resources).data
        const { items } = JSON.parse(eventBody.resources).included

        const orderObjects: ShipstationOrderObjects = await transforms.buildOrderObjects(items)(moltinOrderBody.shipping_address)(moltinOrderBody.billing_address)
        const orderValues: ShipstationOrderValues = await transforms.buildOrderValues(moltinOrderBody)(models.orderModel)
        const builtOrder: ShipstationFullOrder = transforms.buildFullOrder(orderObjects)(orderValues)
    
        await shipstation.createShipstationOrder(builtOrder)
        return responseBuilder(200)('Order created in Shipstation')
    } catch (e) {
        return responseBuilder(500)(JSON.stringify(e))
    }
}

/*
newShipstationShipment takes a Shipstation webhook payload for SHIP_NOTIFY
and sends marks the order in Moltin as fulfilled
*/
export const newShipstationShipment: Handler = async (event: APIGatewayEvent): Promise<LambdaResponse> => {
    try {
        if (event.body === null) {
            return responseBuilder(500)('No webhook payload present')
        }
        const { resource_url, resource_type }: ShipstationOrderShippedWebhookBody = JSON.parse(event.body as string)
        
        if(resource_type !== 'SHIP_NOTIFY') {
            return responseBuilder(500)('Webhook is not notifying of shipment')
        }

        const shipmentInfo = await shipstation.getShipStationWebhookResource(resource_url)
        const parsedShipmentInfo = JSON.parse(shipmentInfo)
        const { orderKey } = parsedShipmentInfo.shipments[0]

        await moltin.markOrderAsShipped(orderKey)
        return responseBuilder(200)('Order marked as fulfilled in Moltin')
    } catch (e) {
        return responseBuilder(500)(JSON.stringify(e))
    }
}
