const { BigQuery } = require('@google-cloud/bigquery')
const fs = require('fs')

let bigquery

async function deleteObjects(filter, dataset, table) {
  return new Promise(async (resolve, reject) => {
    try {
      filter = filter.substring(0, filter.length - 1)
      const query = `delete from ${dataset}.${table} where id in (${filter})`
      const options = { query, location: 'US' }
      // Wait for all rows to delete
      const deletes = await bigquery.query(options)
      resolve(deletes)
    } catch (e) {
      reject(e)
    }
  })
}

async function writeObjectUpdates(objects, table) {
  return new Promise(async (resolve, reject) => {
    try {
      // insert updates
      const file = fs.createWriteStream(`/tmp/${table}.json`, {
        flags: 'a'
      })
      file.on('error', err => {
        console.error('error writeObjectUpdates', err)
      })
      objects.forEach(v => {
        file.write(`${JSON.stringify(v)}\r\n`)
      })
      file.end()
      resolve(true)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = {
  async createBigQueryClient() {
    bigquery = new BigQuery({
      projectId: process.env.GOOGLE_PROJECT_ID
    })
  },

  async cleanGoogleCredentials() {
    bigquery = null
    fs.unlinkSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)
  },

  loadObjects(dataset, table) {
    return new Promise(async (resolve, reject) => {
      try {
        await bigquery
          .dataset(dataset)
          .table(table)
          .load(`/tmp/${table}.json`)
        fs.unlink(`/tmp/${table}.json`, err => {
          if (err) throw err
          console.log(`${table}.json was deleted`)
        })
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  },
  async generateUpdates(objects, filterJson, dataset, table) {
    return new Promise(async (resolve, reject) => {
      try {
        // Need to delete previous records of the orders and then update.
        let objectsToDelete = ''
        const objectsToInsert = []
        objects.forEach(object => {
          objectsToDelete += `"${object.id}",`
          objectsToInsert.push(filterJson(object))
        })
        resolve(
          deleteObjects(objectsToDelete, dataset, table).then(() => {
            writeObjectUpdates(objectsToInsert, table)
          })
        )
      } catch (e) {
        reject(e)
      }
    })
  },
  async retrieveObjects(filter, dataset, table) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `select * from ${dataset}.${table} where ${filter}`
        const options = { query, location: 'US' }
        const results = await bigquery.query(options)
        resolve(results)
      } catch (e) {
        reject(e)
      }
    })
  }
}
