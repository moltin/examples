const { json, send } = require('micro')
const cors = require('micro-cors')()
const { createClient } = require('@moltin/request')
const twilio = require('twilio')

const twilioClient = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

const moltin = new createClient({
  client_id: process.env.MOLTIN_CLIENT_ID,
  client_secret: MOLTIN_CLIENT_SECRET,
  application: 'example-order-confirmation-sms'
})

module.exports = cors(async (req, res) => {
  if (
    (await req.headers['x-moltin-secret-key']) !=
    process.env.MOLTIN_WEBHOOK_SECRET
  )
    return send(res, 401)

  const payload = await json(req)

  const {
    data: { id }
  } = JSON.parse(payload.resources)

  try {
    // We need to make a call to Moltin to get number
    // as Flows aren't sent with the webhook
    const {
      data: { phone_number: to }
    } = await moltin.get(`orders/${id}`)

    const body = await twilioClient.messages.create({
      to,
      from: process.env.TWILIO_FROM_NUMBER,
      body: `Your order ${id} is on the way!`
    })

    send(res, 200, body)
  } catch (errors) {
    send(res, 500, errors)
  }
})
