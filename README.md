# Moltin Examples

[![Join us on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/moltin)

Here you will find example demo stores and serverless functions that can be used with [Moltin webhooks](https://docs.moltin.com/advanced/events). Pick an example and follow the `README` for usage instructions.

**They are not to be treated as production-ready.**

## Storefronts

Discover how to connect popular frontend frameworks and static site generators with Moltin.

| Example                         | Demo          | Description                    |
| ------------------------------- | ------------- | ------------------------------ |
| [Next.js](/storefronts/nextjs)  | _Coming soon_ | An example store using Next.js |
| [Express](/storefronts/express) | _Coming soon_ | An example store using Express |

## Webhooks (aka "integrations")

Integrate with Moltin using 3rd party services with AWS Lambda, Zeit Now, Netlify Functions & more. [Learn more](https://docs.moltin.com/api/advanced/events).

| Example                                                                  | SDK                                                           | Description                                                   |
| ------------------------------------------------------------------------ | ------------------------------------------------------------- | ------------------------------------------------------------- |
| [Order Confirmation via Email](/webhooks/order-confirmation-email)       | [`@moltin/request`](https://github.com/moltin/moltin-request) | Order confirmation email with Postmark.                       |
| [Order Confirmation via SMS](/webhooks/order-confirmation-sms)           | [`@moltin/request`](https://github.com/moltin/moltin-request) | Order confirmation SMS via Twilio.                            |
| [Shipping Confirmation via Email](/webhooks/shipping-confirmation-email) | [`@moltin/request`](https://github.com/moltin/moltin-request) | Shipping confirmation email with Postmark.                    |
| [Shipping Confirmation via SMS](/webhooks/shipping-confirmation-sms)     | [`@moltin/request`](https://github.com/moltin/moltin-request) | Shipping confirmation SMS via Twilio.                         |
| [Short Order ID](/webhooks/short-order-id)                               | [`@moltin/request`](https://github.com/moltin/moltin-request) | Assign a short random ID to new orders.                       |
| [Sync catalog to Algolia](/webhooks/sync-catalog-to-algolia)             | [`@moltin/request`](https://github.com/moltin/moltin-request) | Sync products, brands, categories and collections to Algolia. |
| [Sync Orders to BigQuery](/webhooks/sync-orders-to-big-query)            | [`@moltin/request`](https://github.com/moltin/moltin-request) | Sync order + order items to Google BigQuery.                  |

## Misc

| Example                              | Demo          | Description                           |
| ------------------------------------ | ------------- | ------------------------------------- |
| [Apollo Server](/misc/apollo-server) | _Coming soon_ | An example GraphQL server with Moltin |
| [CLI](/misc/cli-app)                 | _N/A_         | An example CLI that queries products  |

## Reference applications

If you're looking for more real world examples using Moltin, check out any of the following examples:

| Example                                                           | Description                                    |
| ----------------------------------------------------------------- | ---------------------------------------------- |
| [Gatsby Demo Store](https://github.com/moltin/gatsby-demo-store)  | Built using the `gatsby-source-moltin` plugin. |
| [Next.js Demo Store](https://github.com/moltin/nextjs-demo-store) | React supercharged with Next.js + Moltin       |
| [Vue Demo Store](https://github.com/moltin/vue-demo-store)        | Plain old Vue + Moltin                         |
