# Order Confirmation Email

This example demonstrates how you can send order confirmation emails via Postmark using Moltin webhooks.

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
cd integration-examples/order-confirmation-email
yarn
```

### 2. Configure your ENV variables

You will want to create an `.env` inside the directory `/order-confirmation-email` containing all the keys for the below:

```shell
POSTMARK_API_KEY=
MOLTIN_WEBHOOK_SECRET=
POSTMARK_FROM_ADDRESS=
POSTMARK_CONFIRMATION_TEMPLATE_ID=
```

### 3. Start the server and ngrok

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

### 3. Create a new Moltin integration

You must now tell Moltin the ngrok URL above. Head to the [Moltin Dashboard](), login and go to `Settings > Integrations` and click `Create`.

Enter a name and description for your Integration. We recommend you prefix the name with `DEVELOPMENT:`.

Next, enter the `URL` and `Secret Key` that match those inside `.env`.

![screenshot 2019-02-15 at 09 17 12](https://user-images.githubusercontent.com/950181/52846929-ca957980-3102-11e9-9a20-23b8139767ee.png)

Now finally you'll want to configure when this webhook will be invoked, in this example check the `Paid/Captured` box.

![screenshot 2019-02-15 at 09 18 10](https://user-images.githubusercontent.com/950181/52847107-3a0b6900-3103-11e9-80c7-f5c4bc4b0b53.png)

That's it! Click Save
