# Shipping Confirmation SMS

This example demonstrates how you can send an shipping confirmation SMS via Twilio using Moltin webhooks.

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
cd integration-examples/shipping-confirmation-sms
yarn
```

### 2. Configure Twilio

In this example we will send our shipping confirmation via [Twilio](https://www.twilio.com). You will need an account an account to continue.

Once you've signed up, head over to their [Programmable SMS](https://www.twilio.com/console/sms/dashboard) page and **Get a number**. You'll have to enter your address to comply with local regulations but once done, you'll have a new phone number.

Next you will need to get your `Account SID` and `Auth Token`. You can get these by clicking on the `Show API credentials` dropdown.

![Show API credentials](https://user-images.githubusercontent.com/950181/52860550-a9934f80-3127-11e9-92dc-84554bda513a.png)

### 3. Configure your ENV variables

You will want to create an `.env` inside the directory `/shipping-confirmation-sms` containing all the keys for the below:

```shell
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_FROM_NUMBER=
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

Now finally you'll want to configure when this webhook will be invoked, in this example check the `Fulfilled` box.

![Observes selection](https://user-images.githubusercontent.com/950181/52848579-02062500-3107-11e9-94b9-7e974eacb550.png)

That's it! Click Save
