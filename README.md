# Moltin Integration Examples

You'll find here various [webhook](https://docs.moltin.com/advanced/events) examples demonstrating how you can use Moltin with various programming languages, frameworks and developer tools you're familiar with.

## Examples

Examples in this repo are designed to contain the least amount of code to demonstrate functionality.

**They are not to be treated as production-ready.**

| Demo                                                            | Webhook           | Description                                                       |
| --------------------------------------------------------------- | ----------------- | ----------------------------------------------------------------- |
| [Order Confirmation via Email](/order-confirmation-email)       | `order.paid`      | Order confirmation email with Postmark.                           |
| [Order Confirmation via SMS](/order-confirmation-sms)           | `order.paid`      | Order confirmation SMS via Twilio.                                |
| [Order Confirmation via Slack](/node-order-confirmation-slack)  | `order.paid`      | Store owner Slack notification for new orders.                    |
| [Shipping Confirmation via Email](/shipping-confirmation-email) | `order.fulfilled` | Shipping confirmation email with SendGrid.                        |
| [Shipping Confirmation via SMS](/shipping-confirmation-sms)     | `order.fulfilled` | Shipping confirmation SMS via Mailgun.                            |
| [Refund Confirmation via Email](/refund-confirmation-email)     | `order.refunded`  | Refund confirmation email with Postmark.                          |
| [Short Order ID](/short-order-id)                               | `order.created`   | Assign a short random ID to new orders.                           |
| [Sync catalog to Algolia](/sync-catalog-to-algolia)             | Multiple          | Sync products, brands, categories and collections to Algolia.     |
| [Customer Forgot Password](/customer-forgot-password)           | N/A               | Enable forgot password functionality for the Moltin Customer API. |
