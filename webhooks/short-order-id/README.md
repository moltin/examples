# Short Order ID

This example demonstrates how you can create short order IDs using Moltin webhooks.

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
cd integration-examples/short-order-id
yarn
```

### 2. Configure Flows

Moltin provides you the ability to extend core resources with the Flows feature. Go to the [Moltin Dashboard](https://dashboard.moltin.com/app/settings/flows) and navigate to `Settings > Flows`.

Here you will want to create a new Flow (or edit if it already exists) for extending Products. Give it a name and description you will recognise, but **make sure** the `slug` is set to `products`.

![Create New Flow](https://user-images.githubusercontent.com/950181/52850827-65468600-310c-11e9-9caa-c82a0175acd9.png)

Next you will want to create a new Field for the Flow you just created.

![Create New Field Button](https://user-images.githubusercontent.com/950181/52850885-96bf5180-310c-11e9-93d0-85821730d0d9.png)

Give the new Field a name and description you will recognise. **Make sure** the `slug` is set to `short_id` as this is what the serverless function expects.

![Create New Field Form](https://user-images.githubusercontent.com/950181/52850990-dbe38380-310c-11e9-95b1-dc07b753a3a9.png)

Save this Field

### 3. Configure your ENV variables

You will want to create an `.env` inside the directory `/short-order-id` containing all the keys for the below:

```shell
MOLTIN_CLIENT_ID=
MOLTIN_CLIENT_SECRET=
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

Now finally you'll want to configure when this webhook will be invoked, in this example check the `Created` box.

![Observes selection](https://user-images.githubusercontent.com/950181/52851227-76dc5d80-310d-11e9-9dff-70b7daaf21e8.png)

That's it! Click Save
