const { json, send } = require('micro')
const cors = require('micro-cors')()
const algoliasearch = require('algoliasearch')

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
)

module.exports = cors(async (req, res) => {
  if (
    (await req.headers['x-moltin-secret-key']) !=
    process.env.MOLTIN_WEBHOOK_SECRET
  )
    return send(res, 401)

  const { triggered_by, resources } = await json(req)
  const [type, trigger] = triggered_by.split('.')

  try {
    const index = client.initIndex(type)

    let body

    if (trigger === 'deleted') {
      body = await index.deleteObject(resources.id)
      return send(res, 202, body)
    }

    const {
      data: { id: objectID, ...rest }
    } = JSON.parse(resources)
    const object = { objectID, ...rest }

    if (trigger === 'created') {
      body = await index.addObject(object)
    } else if (trigger === 'updated') {
      body = await index.saveObject(object)
    } else {
      throw new Error(`'${trigger}' is not a valid trigger`)
    }

    send(res, 200, body)
  } catch (errors) {
    send(res, 500, errors)
  }
})
