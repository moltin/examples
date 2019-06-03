import 'source-map-support/register'
const { createClient } = require('@moltin/request')

const client = new createClient({
  client_id: process.env.MOLTIN_CLIENT_ID,
  client_secret: process.env.MOLTIN_CLIENT_SECRET,
})

module.exports.markOrderAsShipped = id => new Promise((resolve, reject) => {
  client.put(`orders/${id}`, {
    type: 'order',
    id,
    shipping: 'fulfilled',
  })
    .then(result => resolve(result))
    .catch(e => reject(e))
})
