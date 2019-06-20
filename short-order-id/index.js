const { json, send } = require('micro')
const cors = require('micro-cors')()
import { gateway } from '@moltin/sdk'
const cuid = require('cuid')

const moltin = gateway({
  client_id: clientId,
  client_secret: clientSecret,
})

module.exports = cors(async (req, res) => {
  if (req.headers['x-moltin-secret-key']) !== process.env.MOLTIN_WEBHOOK_SECRET) {
    return send(res, 401)
  }

  const { body } = req
  const { data: { id } } = JSON.parse(body.resources)

  try {
    // The slug() here is just an example.
    // It is not recommended to use it to generate id entities in the database.
    const short_id = cuid.slug().toUpperCase()

    await moltin.Orders.Update(id, { type: 'order', short_id })

    send(res, 200)
  } catch (errors) {
    send(res, 500, errors)
  }
})
