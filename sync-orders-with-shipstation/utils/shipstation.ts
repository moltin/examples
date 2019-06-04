import 'source-map-support/register'
const userpass = `${process.env.SHIPSTATION_KEY}:${process.env.SHIPSTATION_TOKEN}`
const buff = Buffer.from(userpass)
const base64auth = buff.toString('base64')
const request = require('request')

export const createShipstationOrder = (requestBody): Promise<any> => {
    return new Promise((resolve, reject): any => {
  
        const options = {
            uri: 'https://ssapi.shipstation.com/orders/createorder',
            headers: { Authorization: `Basic  ${base64auth}` },
            method: 'POST',
            json: requestBody,
        }

        request(options, (error, response, responseBody): any => {
            if (error) {
                reject(error)
            }

            if(response.statusCode !== 200 || 201) {
                reject(responseBody)
            }

            resolve(responseBody)
        })

    })
}

export const getShipStationWebhookResource = (url): Promise<any> => {
    return new Promise((resolve, reject): any => {
        const options = {
            uri: url,
            headers: { Authorization: `Basic  ${base64auth}` },
            method: 'GET',
        }

        request(options, (error, response, body): any => {

            if (error) {
                return reject(error)
            }

            if(response.statusCode !== 200) {
                return reject(body)
            }
        
            return resolve(body)
        })
    })
}
