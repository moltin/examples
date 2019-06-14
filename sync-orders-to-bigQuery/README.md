# Moltin -> BigQuery

> A simple serverless integration to help you send Moltin order data (including order items) to Google BigQuery.

📚 [Moltin API reference](https://docs.moltin.com/) &mdash; 📚 [BigQuery API reference](https://cloud.google.com/bigquery/docs/reference/rest/)

## 🛠 Pre-requisites
1. A Google project with a dataset and two tables created. One table will receive orders and the other, order items. Your orders table should have a schema matching the field names in the `filterOrderJson` function in `mapping.js`, your order items table schema should match the field names in the `filterItemJson` in the same mapping file.

2. A Google KMS keyring and key.

3. Serverless CLI installed (`npm install -g serverless`)

## 🛠 Setup

1. Clone the repository.
2. Encrypt your Moltin Client Secret using your Google keyring and key.
3. Change directory into the repository (`cd integration-examples/sync-moltin-bigQuery`) and run `yarn`.
4. Make sure you have Serverless [configured to work with Google](https://serverless.com/framework/docs/providers/google/guide/credentials/) but when creating the service account, add KMS permissions too. You will end up with a JSON file. Create a folder in the root of this project called `.gcloud` and add the JSON file there.
5. In the file `serverless.yml`, add values to the `environment` section, make sure you add the encrypted version of the Moltin Client Secret.
6. Make sure the `stage` in the `provider` section of `serverless.yml` is set to `DEV` or `PROD` depending on whether you are testing or deploying to production. [This blog post](https://serverless-stack.com/chapters/stages-in-serverless-framework.html) covers the purpose of stages.
7. Run `sls deploy` and make note of the deployed endpoint logged out by the CLI.
8. In https://console.cloud.google.com/cloudscheduler, set up a job to GET the deployed endpoint at a frequency of your choosing!

## ⛽️ Usage

There is a single handler function in this repository. It's called `updateOrders` and is found in `index.js`. It takes no arguments, and will push new and updated orders within the last day from Moltin to BigQuery. It will delete any orders already in BigQuery that might cause duplicates after the new batch is pushed.

## ❤️ Contributing

We love community contributions. Here's a quick guide, if you want to submit a pull request:

1.  Fork the repository.
2.  Commit your changes.
3.  Submit your PR with a brief description explaining your changes.

Make sure you have [Prettier](https://prettier.io) installed for your editor with ESLint integration enabled to work with [Moltins ESLint configuration](https://www.npmjs.com/package/@moltin/eslint-config)
