const { json, send } = require('micro')
const cors = require('micro-cors')()
const { createClient } = require('@moltin/request')
const cuid = require('cuid')

const moltin = new createClient({
  client_id: process.env.MOLTIN_CLIENT_ID,
  client_secret: MOLTIN_CLIENT_SECRET,
  application: 'example-short-order-id',
})

module.exports = cors(async (req, res) => {
  if (
    (await req.headers['x-moltin-secret-key']) !=
    process.env.MOLTIN_WEBHOOK_SECRET
  )
    return send(res, 401)

  const payload = await json(req)

  const {
    data: { id },
  } = JSON.parse(payload.resources)

  try {
    const short_id = cuid.slug().toUpperCase()

    await moltin.put(`orders/${id}`, {
      type: 'order',
      short_id,
    })

    send(res, 200)
  } catch (errors) {
    send(res, 500, errors)
  }
})
