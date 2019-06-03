# Moltin Shipstation Integration

> A simple serverless integration to help you both send Moltin orders to shipstation and automatically sync shipstation + Moltin shipping states.

📚 [Moltin API reference](https://docs.moltin.com/) &mdash; 📚 [Shipstation API reference](https://www.shipstation.com/developer-api/)

## 🛠 Installation

1. Clone the repository.
2. Make sure you have the Serverless CLI installed (`npm install -g serverless`).
3. Make sure you have Serverless [configured to work with AWS](https://serverless.com/framework/docs/providers/aws/guide/credentials/).
4. Change directory into the repository and run `yarn`.
5. In the file `serverless.yml`, add values to the variables found under `environment` on L11.
6. When you're ready to deploy, run `sls deploy` (note the deployed endpoint).
7. In your Moltin dashboard, create a new integration. One to observe `order.paid` and to trigger the deployed URL with `/orders/new` appended.
8. In your Shipstation dashboard, [create a new webhook](https://help.shipstation.com/hc/en-us/articles/360025856252-ShipStation-Webhooks) for the event called `On Items Shipped` and have it trigger the deployed URL with `/shipment/new` appended.

> **Note:** This requires a [Moltin](http://moltin.com) account and a [Shipstation](https://www.shipstation.com) account.

## ⛽️ Usage

There are two specific functions in this repository, found in `handler.ts`

1. `newMoltinOrder`, which should be called whenever a new moltin order is paid for, the observable event for this with Moltin webhooks is `order.paid`. The function transforms that order into the format which Shipstation expects and uploads it to Shipstation via their `orders/createorder` endpoint.

2. `newShipstationShipment` which should be called whenever Shipstation creates a new Shipment. The function parses out the Moltin order ID, assuming it has been uploaded by Moltin through `newMoltinOrder` and therefore the `orderKey` contains a valid Moltin order ID. It then updates that Moltin order to be marked as fulfilled.


## ❤️ Contributing

We love community contributions. Here's a quick guide if you want to submit a pull request:

1.  Fork the repository
2.  Add a test for your change (it should fail)
3.  Make the tests pass
4.  Commit your changes (see note below)
5.  Submit your PR with a brief description explaining your changes

> **Note:** Commits should adhere to the [Angular commit conventions](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines).

Make sure you have [Prettier](https://prettier.io) installed for your editor with ESLint integration enabled to work with [Moltins ESLint configuration](https://www.npmjs.com/package/@moltin/eslint-config)

## ⚡️ Development

For local testing, you can run the functions without deploying by executing `sls offline`, which will make them reachable via localhost and you can use curl or Postman to test sending data in. This functionality is enabled by the [serverless-offline plugin](https://www.npmjs.com/package/serverless-offline).

You can also execute `sls invoke local -f FUNCTION_NAME_HERE` and pass in either a reference to a JSON file or raw JSON as input. Read the [docs for this](https://serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) to find to find out more. There is an example of each payload in the `examples` folder of this repository should you wish to test in this manner.

