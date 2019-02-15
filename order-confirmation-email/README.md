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
      Thank you for your order {{customer_name}}. The total for your order was
      {{order_total}}
    </p>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Quantity</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {{#each order_items}}
        <tr>
          <td>{{name}}</td>
          <td>{{quantity}} x {{meta.display_price.with_tax.unit.formatted}}</td>
          <td>{{meta.display_price.with_tax.value.formatted}}</td>
        </tr>
        {{/each}}
      </tbody>
    </table>
  </body>
</html>
```

This template is just an example, but anything you provide inside the `templateModel` object you will have access to inside this template.

Once you've saved the template, you will need to make a note the ID of the template:

![screenshot 2019-02-15 at 09 39 34](https://user-images.githubusercontent.com/950181/52848022-a2f3e080-3105-11e9-9cf2-564d0e6b7a7d.png)

Next you will need a Server API token from the **Credentials** tab.

![screenshot 2019-02-15 at 09 41 04](https://user-images.githubusercontent.com/950181/52848170-f7975b80-3105-11e9-968b-d1555a807b46.png)

### 3. Configure your ENV variables

You will want to create an `.env` inside the directory `/order-confirmation-email` containing all the keys for the below:

```shell
POSTMARK_API_KEY=
MOLTIN_WEBHOOK_SECRET=
POSTMARK_FROM_ADDRESS=
POSTMARK_CONFIRMATION_TEMPLATE_ID=
```

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

![URL and Secret Key](https://user-images.githubusercontent.com/950181/52849390-cff5c280-3108-11e9-8412-b8093a5e526f.png)

Now finally you'll want to configure when this webhook will be invoked, in this example check the `Paid/Captured` box.

![Observes selection](https://user-images.githubusercontent.com/950181/52847107-3a0b6900-3103-11e9-80c7-f5c4bc4b0b53.png)

That's it! Click Save
