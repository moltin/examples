# Shipping Confirmation Email

This example demonstrates how you can send shipping confirmation emails via Postmark using Moltin webhooks.

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
cd integration-examples/shipping-confirmation-email
yarn
```

### 2. Configure Postmark

In this example we will use [Postmark](https://postmarkapp.com) to send our emails. They also take care of hosting the email template.

Once you signed up to Postmark, create a new server and add a new template with the following code:

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title></title>
    <style type="text/css"></style>
  </head>
  <body>
    <p>
      Hey, {{customer_name}}! Your order {{order_ref}} has been shipped to
      {{shipping_line_1}}, {{shipping_postcode}}
    </p>
  </body>
</html>
```

This template is just an example, but anything you provide inside the `templateModel` object you will have access to inside this template.

Once you've saved the template, you will need to make a note the ID of the template:

![Postmark template ID](https://user-images.githubusercontent.com/950181/52849390-cff5c280-3108-11e9-8412-b8093a5e526f.png)

Next you will need a Server API token from the **Credentials** tab.

![Postmark API tokens](https://user-images.githubusercontent.com/950181/52848170-f7975b80-3105-11e9-968b-d1555a807b46.png)

### 3. Configure your ENV variables

You will want to create an `.env` inside the directory `/shipping-confirmation-email` containing all the keys for the below:

```shell
POSTMARK_API_KEY=
MOLTIN_WEBHOOK_SECRET=
POSTMARK_FROM_ADDRESS=
POSTMARK_SHIPPED_TEMPLATE_ID=
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
