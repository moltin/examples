'use strict'

const { MoltinClient } = require('@moltin/request')
const moment = require('moment')
const datahelper = require('./bq-helper')
const decryptHelper = require('./decrypt-helper')
const mapping = require('./mapping')

async function getUpdatedOrders(moltin, date, offset = 0, limit = 1) {
  return new Promise(async (resolve, reject) => {
    moltin.get(`orders?include=items&page[limit]=${limit}&filter=ge(updated_at,${date})&page[offset]=${offset}`)
      .then(resolve)
      .catch(reject)
  })
}

module.exports.updateOrders = async (request, response) => {
  try {
    await datahelper.createBigQueryClient()
    await decryptHelper.decryptVars()

    const moltin = new MoltinClient({
      client_id: process.env.MOLTIN_CLIENT_ID,
      client_secret: process.env.MOLTIN_CLIENT_SECRET,
    })

    const date = moment().subtract(1, 'days').format('YYYY-MM-DD')

    const limit = 100; let offset = 0; let resultSize = 0; let
      result

    do {
      // Get Order Updates and delete older versions
      const orders = await getUpdatedOrders(moltin, date, offset, limit)
      if (orders.data && orders.data.length > 0) {
        resultSize = orders.data.length
        offset += resultSize
        // Order Updates
        result = await datahelper.generateUpdates(
          orders.data,
          mapping.filterOrderJson,
          process.env.ORDERS_DATASET,
          process.env.ORDERS_TABLE,
        )

        // Update items
        await datahelper.generateUpdates(
          orders.included.items,
          mapping.filterItemJson, process.env.ORDERS_DATASET,
          process.env.ORDER_ITEMS_TABLE,
        )
      } else {
        resultSize = -1
      }
    } while (resultSize === limit)
    // Load new Orders
    await datahelper.loadObjects(process.env.ORDERS_DATASET, process.env.ORDERS_TABLE)
    // Load new Items
    await datahelper.loadObjects(process.env.ORDERS_DATASET, process.env.ORDER_ITEMS_TABLE)

    return response.status(200).send('success')
  } catch (e) {
    console.log(e)
    return response.status(500).send(JSON.stringify(e))
  }
}
