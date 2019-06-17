# Moltin -> BigQuery

> A simple serverless integration to help you send Moltin order data (including order items) to Google BigQuery.

📚 [Moltin API reference](https://docs.moltin.com/) &mdash; 📚 [BigQuery API reference](https://cloud.google.com/bigquery/docs/reference/rest/)

## Pre-requisites
1. A Google project with a dataset and two tables created. One table will receive orders and the other, order items. Your orders table should have a schema matching the field names in the `filterOrderJson` function in `mapping.js`, your order items table schema should match the field names in the `filterItemJson` in the same mapping file.

2. A Google KMS keyring and key.

3. Serverless CLI installed (`npm install -g serverless`)

## Usage

### 1. Download the example

Clone the repository:

```bash
git clone git@github.com:moltin/integration-examples.git
```

Install dependencies with Yarn

```bash
cd integration-examples/shipping-confirmation-sms
yarn
```

### 3. Configure your ENV variables
Using your Google keyring and key, encrypt your Moltin client secret. You can find the reference for KMS encryption [here](https://cloud.google.com/sdk/gcloud/reference/kms/encrypt)

In the file `serverless.yml`, add values to the `environment` section, make sure you add the encrypted version of the Moltin Client Secret.

### 3. Configure Serverless
Make sure you have Serverless [configured to work with Google](https://serverless.com/framework/docs/providers/google/guide/credentials/) but when creating the service account, add KMS permissions too. You will end up with a JSON file. Create a folder in the root of this project called `.gcloud` and add the JSON file there.

Make sure the `stage` in the `provider` section of `serverless.yml` is set to `DEV` or `PROD` depending on whether you are testing or deploying to production. [This blog post](https://serverless-stack.com/chapters/stages-in-serverless-framework.html) covers the purpose of stages.

### 4. Deploy to Google Cloud Functions
Run `sls deploy` and note the deployed endpoint logged out by the CLI.

### 5. How to use
There is a single handler function in this repository. It's called `updateOrders` and is found in `index.js`. It takes no arguments, and will push new and updated orders within the last day from Moltin to BigQuery. It will delete any orders already in BigQuery that might cause duplicates after the new batch is pushed.

When the deployed endpoint is called via GET, `updateOrders` will run for you. Should you want to automate this, in https://console.cloud.google.com/cloudscheduler, you can set up a job to GET the deployed endpoint at a frequency of your choosing!
