# Sync catalog to Algolia

This example demonstrates how you can sync products, collections, categories and brands to Algolia using Moltin webhooks.

## How to use locally

When running this example locally it's recommended you use a service like [ngrok](https://ngrok.com) to tunnel your dev environment to the outside world.

Once you have the repo running locally, you'll want to add the integration via the [Moltin Dashboard](https://dashboard.moltin.com/app/settings/integrations). The `URL` will be the one provided by ngrok.

### 1. Download the example

Clone the repository:

```bash
git clone git@github.com:moltin/integration-examples.git
```

Install dependencies with Yarn

```bash
cd integration-examples/sync-catalog-to-algolia
yarn
```

### 2. Configure Algolia

In this example we will sync data to [Algolia](https://www.algolia.com). You will need an account an account to continue.

Once you've signed up to Algolia, create a new app and give it a name.

Next head to the `API keys` section and make a note of your `Application ID` and `Admin API Key`, we will need these next.

### 3. Configure your ENV variables

You will want to create an `.env` inside the directory `/sync-catalog-to-algolia` containing all the keys for the below:

```shell
ALGOLIA_APP_ID=
ALGOLIA_API_KEY=
MOLTIN_WEBHOOK_SECRET=
```

`MOLTIN_WEBHOOK_SECRET` can be anything you want.

### 4. Start the server and ngrok

Start the development server

```bash
yarn dev
```

The server will typically start on PORT `3000`, if not, make a note for the next step.

Start ngrok

```bash
ngrok http 3000
```

This will expose PORT `3000` to the outside world. Make a note of the `http` URL ngrok provides.

### 5. Create a new Moltin integration

You must now tell Moltin the ngrok URL above. Head to the [Moltin Dashboard](https://dashboard.moltin.com/app/settings/integrations), login and go to `Settings > Integrations` and click `Create`.

Enter a name and description for your Integration. We recommend you prefix the name with `DEVELOPMENT:`.

Next, enter the `URL` and `Secret Key` that match those inside `.env`.

![URL and Secret Key](https://user-images.githubusercontent.com/950181/52846929-ca957980-3102-11e9-9a20-23b8139767ee.png)

Now finally you'll want to configure when this webhook will be invoked, in this example check any of `created`/`updated`/`deleted` observables for Product, Collection, Category or Brand.

![Observes selection](https://user-images.githubusercontent.com/950181/52856400-33d5b680-311c-11e9-9a08-684b6edf5d4d.png)

That's it! Click Save
