import 'source-map-support/register'
const userpass = `${process.env.SHIPSTATION_KEY}:${process.env.SHIPSTATION_TOKEN}`
const buff = Buffer.from(userpass)
const base64auth = buff.toString('base64')
const request = require('request')

module.exports.createShipstationOrder = requestBody => new Promise((resolve, reject) => {
  const options = {
    uri: 'https://ssapi.shipstation.com/orders/createorder',
    headers: { Authorization: `Basic  ${base64auth}` },
    method: 'POST',
    json: requestBody,
  }

  request(options, (error, response, responseBody) => {
    if (error) {
      reject(error)
    }

    if(response.statusCode !== 200 || 201) {
      reject(responseBody)
    }

    resolve(responseBody)
  })
})

module.exports.getShipStationWebhookResourceUrl = url => new Promise((resolve, reject) => {
  const options = {
    uri: url,
    headers: { Authorization: `Basic  ${base64auth}` },
    method: 'GET',
  }

  request(options, (error, response, body) => {

    if (error) {
      reject(error)
    }

    if(response.statusCode !== 200) {
      reject(body)
    }
    
    resolve(body)
  })
})
