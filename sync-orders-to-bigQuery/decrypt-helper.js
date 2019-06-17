const GoogleKMS = require('@google-cloud/kms').KeyManagementServiceClient

const decrypt = async ciphertext => {
  const client = new GoogleKMS()
  const locationId = process.env.GOOGLE_LOCATION_ID
  const keyRingId = process.env.GOOGLE_KEYRING_ID
  const cryptoKeyId = process.env.GOOGLE_KEY_ID
  const projectId = process.env.GOOGLE_PROJECT_ID

  const name = client.cryptoKeyPath(
    projectId,
    locationId,
    keyRingId,
    cryptoKeyId
  )

  return new Promise(async (resolve, reject) => {
    try {
      ciphertext = ciphertext.toString('base64')

      const [result] = await client.decrypt({ name, ciphertext })

      const buff = Buffer.from(result.plaintext, 'base64')
      const text = buff.toString('ascii')

      resolve(text)
    } catch (e) {
      reject(JSON.stringify(e))
    }
  })
}

module.exports.decryptVars = async () =>
  new Promise(async (resolve, reject) => {
    try {
      process.env.MOLTIN_CLIENT_SECRET = await decrypt(
        Buffer.from(process.env.MOLTIN_CLIENT_SECRET, 'base64')
      )
      resolve()
    } catch (e) {
      reject(e)
    }
  })
