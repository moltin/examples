import 'source-map-support/register'
import { createClient } from '@moltin/request'

const client = new createClient({
    client_id: process.env.MOLTIN_CLIENT_ID as string,
    client_secret: process.env.MOLTIN_CLIENT_SECRET as string
})

export const markOrderAsShipped = (id): Promise<any> => new Promise((resolve, reject): any => {
    client.put(`orders/${id}`, {
        type: 'order',
        id,
        shipping: 'fulfilled',
    })
        .then((result): any => {
            resolve(result)
        })
   
        .catch((e): any => {
            reject(e)
        })
})
