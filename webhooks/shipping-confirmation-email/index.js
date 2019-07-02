const { json, send } = require('micro')
const cors = require('micro-cors')()
const { ServerClient: PostmarkClient } = require('postmark')

const postmark = new PostmarkClient(process.env.POSTMARK_API_KEY)

module.exports = cors(async (req, res) => {
  if (
    (await req.headers['x-moltin-secret-key']) !=
    process.env.MOLTIN_WEBHOOK_SECRET
  )
    return send(res, 401)

  const data = await json(req)

  const resource = JSON.parse(data.resources)

  try {
    const {
      data: {
        id,
        customer: { email: to, name },
        shipping_address: { line_1, postcode },
      },
    } = resource

    await postmark.sendEmailWithTemplate({
      from: process.env.POSTMARK_FROM_ADDRESS,
      to,
      templateId: process.env.POSTMARK_SHIPPED_TEMPLATE_ID,
      templateModel: {
        customer_name: name,
        order_ref: id,
        shipping_line_1: line_1,
        shipping_postcode: postcode,
      },
    })

    send(res, 201)
  } catch ({ errors }) {
    send(res, 500, errors)
  }
})
