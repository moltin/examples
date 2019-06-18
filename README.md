# Moltin Examples

[![Join us on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/moltin)

Here you will find example demo stores and serverless functions that can be used with [Moltin webhooks](https://docs.moltin.com/advanced/events). Pick an example and follow the README for usage instructions.

**They are not to be treated as production-ready.**

## Storefronts

Discover how to connect popular frontend frameworks and static site generators with Moltin.

| Example             | Demo                                                                                 | Description                             |
| ------------------- | ------------------------------------------------------------------------------------ | --------------------------------------- |
| [Gatsby](/nextjs)   | [https://gatsby-demo-store.moltin.now.sh](https://gatsby-demo-store.moltin.now.sh)   | An example store using Gatsby           |
| [React](/react)     | [https://react-demo-store.moltin.now.sh](https://react-demo-store.moltin.now.sh)     | An example store using Create React App |
| [Next.js](/nextjs)  | [https://nextjs-demo-store.moltin.now.sh](https://nextjs-demo-store.moltin.now.sh)   | An example store using Next.js          |
| [Vue](/vue)         | [https://vue-demo-store.moltin.now.sh](https://vue-demo-store.moltin.now.sh)         | An example store using Vue              |
| [Nuxt.js](/nuxtjs)  | [https://nuxt-demo-store.moltin.now.sh](https://nuxt-demo-store.moltin.now.sh)       | An example store using Nuxt.js          |
| [Express](/express) | [https://express-demo-store.moltin.now.sh](https://express-demo-store.moltin.now.sh) | An example store using Express          |

## Webhooks (aka "integrations")

Integrate with Moltin using 3rd party services with AWS Lambda, Zeit Now, Netlify Functions & more.

| Example                                                         | SDK                                                           | Description                                                   |
| --------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------- |
| [Order Confirmation via Email](/order-confirmation-email)       | [`@moltin/request`](https://github.com/moltin/moltin-request) | Order confirmation email with Postmark.                       |
| [Order Confirmation via SMS](/order-confirmation-sms)           | [`@moltin/request`](https://github.com/moltin/moltin-request) | Order confirmation SMS via Twilio.                            |
| [Shipping Confirmation via Email](/shipping-confirmation-email) | [`@moltin/request`](https://github.com/moltin/moltin-request) | Shipping confirmation email with Postmark.                    |
| [Shipping Confirmation via SMS](/shipping-confirmation-sms)     | [`@moltin/request`](https://github.com/moltin/moltin-request) | Shipping confirmation SMS via Twilio.                         |
| [Short Order ID](/short-order-id)                               | [`@moltin/request`](https://github.com/moltin/moltin-request) | Assign a short random ID to new orders.                       |
| [Sync catalog to Algolia](/sync-catalog-to-algolia)             | [`@moltin/request`](https://github.com/moltin/moltin-request) | Sync products, brands, categories and collections to Algolia. |
| [Sync Orders to BigQuery](/sync-orders-to-big-query)            | [`@moltin/js-sdk`](https://github.com/moltin/js-sdk)          | Sync order + order items to Google BigQuery.                  |

## Misc

| Example                         | Demo                                                                                 | Description                           |
| ------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------- |
| [Apollo Server](/apollo-server) | [https://apollo-server-demo.moltin.now.sh](https://apollo-server-demo.moltin.now.sh) | An example GraphQL server with Moltin |
| [CLI](/cli-app)                 |                                                                                      | An example CLI that queries products  |

## Reference implementations

If you're looking for more real world examples using Moltin, check out any of the following examples:

| Example                                                          | Description |
| ---------------------------------------------------------------- | ----------- |
| [Gatsby Demo Store](https://github.com/moltin/gatsby-demo-store) |             |
| [Next.js Demo Store](https://github.com/moltin/next-demo-store)  |             |
| [Vue Demo Store](https://github.com/moltin/gatsby-demo-store)    |             |
