import 'source-map-support/register'

import { 
    ShipstationLineItem,
    ShipstationShippingAddress,
    ShipstationBillingAddress,
    ShipstationOrderValues,
    ShipstationOrderObjects,
    ShipstationFullOrder,
} from "Types"

import * as models from '../models'

export const transformLineItems = (items, shipstationItemModel): Promise<ShipstationLineItem[]> => {
    const lines: any[] = []

    return new Promise((resolve, reject): any => {
        try {
            for (let i = 0; i < items.length; i += 1) {
                const newShipstationItemModel = Object.assign({}, shipstationItemModel)

                newShipstationItemModel.lineItemKey = items[i].id
                newShipstationItemModel.sku = items[i].sku
                newShipstationItemModel.name = items[i].name
                newShipstationItemModel.quantity = items[i].quantity
                newShipstationItemModel.unitPrice = Math.round(items[i].unit_price.amount / 100)

                lines.push(newShipstationItemModel)
                if (lines.length === items.length) {
                    resolve(lines)
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

export const transformShippingAddress = (moltinShippingAddress, shipstationShippingAddress): ShipstationShippingAddress => {
    const newshipstationShippingAddress = Object.assign({}, shipstationShippingAddress)
    const joinedName = moltinShippingAddress.first_name.concat(' ', moltinShippingAddress.last_name)

    newshipstationShippingAddress.name = joinedName
    newshipstationShippingAddress.company = moltinShippingAddress.company_name
    newshipstationShippingAddress.street1 = moltinShippingAddress.line_1
    newshipstationShippingAddress.street2 = moltinShippingAddress.line_2
    newshipstationShippingAddress.city = moltinShippingAddress.city
    newshipstationShippingAddress.postalCode = moltinShippingAddress.postcode
    newshipstationShippingAddress.state = moltinShippingAddress.county
    newshipstationShippingAddress.country = moltinShippingAddress.country
    newshipstationShippingAddress.phone = moltinShippingAddress.phone_number

    return newshipstationShippingAddress
}

export const transformBillingAddress = (moltinBillingAddress, shipstationBillingAddress): ShipstationBillingAddress  => {
    const newshipstationBillingAddress = Object.assign({}, shipstationBillingAddress)
    const joinedName = moltinBillingAddress.first_name.concat(' ', moltinBillingAddress.last_name)

    newshipstationBillingAddress.name = joinedName
    newshipstationBillingAddress.company = moltinBillingAddress.company_name
    newshipstationBillingAddress.street1 = moltinBillingAddress.line_1
    newshipstationBillingAddress.street2 = moltinBillingAddress.line_2
    newshipstationBillingAddress.city = moltinBillingAddress.city
    newshipstationBillingAddress.postalCode = moltinBillingAddress.postcode
    newshipstationBillingAddress.state = moltinBillingAddress.county
    newshipstationBillingAddress.country = moltinBillingAddress.country
    return newshipstationBillingAddress
}

export const buildOrderValues = (moltinOrder, shipstationOrderBody): Promise<ShipstationOrderValues> => {
    return new Promise(
        (resolve, reject): any => {
            try {
                const newShipstationOrderBody = Object.assign({}, shipstationOrderBody)
                newShipstationOrderBody.orderNumber = moltinOrder.id
                newShipstationOrderBody.orderKey = moltinOrder.id
                newShipstationOrderBody.customerEmail = moltinOrder.customer.email
                newShipstationOrderBody.customerUsername = moltinOrder.customer.email
                newShipstationOrderBody.amountPaid = Math.round(
                    moltinOrder.meta.display_price.with_tax.amount / 100,
                )
                newShipstationOrderBody.orderDate = moltinOrder.meta.timestamps.created_at

                return resolve(newShipstationOrderBody)
            } catch (e) {
                return reject(e)
            }
        },
    )
}

export const buildOrderObjects = async (lineItems, shippingAddress, billingAddress): Promise<ShipstationOrderObjects> => {
    let newOrderObjects: any = Object.assign({}, models.orderObjects)

    const transformedLines: ShipstationLineItem[]  = await transformLineItems(lineItems, models.orderItemModel)
    const transformedShipping: ShipstationShippingAddress = transformShippingAddress(shippingAddress, models.billingAddressModel)
    const transformedBilling: ShipstationBillingAddress = transformBillingAddress(billingAddress, models.billingAddressModel)

    newOrderObjects.billTo = transformedBilling
    newOrderObjects.shipTo = transformedShipping
    newOrderObjects.items = transformedLines
    return newOrderObjects
}

export const buildFullOrder = (orderObjects, orderValues): ShipstationFullOrder => {
    return {...orderObjects, ...orderValues }
}
