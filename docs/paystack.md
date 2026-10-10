# Paystack payments

Bronze costs ₦1,000, Silver ₦3,000 and Gold ₦5,000 per learner for **105 days (3½ months)** from Paystack's successful payment timestamp. There is no automatic renewal. Valid school referrals retain sponsored Gold. Upgrades currently charge the full displayed price for a new 105-day period; unused time is not credited. Equal/lower plans cannot be purchased while that tier is active.

## Deployment

1. Apply `node scripts/migrate-payments.mjs` against the intended `DATABASE_URL` before deploying. It runs the additive migration transactionally. Migration 005 is reserved for the separate consent work.
2. Set `PAYSTACK_SECRET_KEY` in Vercel's **production** environment using the merchant's live key. Never expose it as `NEXT_PUBLIC_*` or commit it. Use a separate test key and database for previews/local testing. Production rejects test checkout and test entitlements.
3. Set `PAYMENT_SITE_URL` to the public origin (currently `https://edify-sigma-plum.vercel.app`). Use `http://localhost:3000` locally.
4. In Paystack's live settings, set the webhook to `https://edify-sigma-plum.vercel.app/api/paystack/webhook`. Checkout supplies `/billing/return` as its callback URL.
5. Redeploy after setting environment variables. Missing keys disable checkout; they do not restore the free beta.
6. Use Paystack test mode in a separate preview database to test successful/cancelled checkout, repeat webhooks, callback before webhook, delayed verification, amount mismatch, expired access, school referrals and each plan tier. Confirm a genuine live transaction in the merchant dashboard after launch; do not use test payments as evidence of live processing.

## Security and operations

- Every checkout belongs to an authenticated parent and one of their learners. Prices come from the server. Only the parent's email goes to Paystack; learner names, schools and PINs do not.
- The raw webhook body is checked against Paystack's HMAC SHA512 signature. Both callbacks and webhooks verify the transaction server-side and compare reference, amount, currency, customer and test/live environment.
- A single atomic pending-to-success update makes repeat notifications idempotent. A unique pending-order index and saved checkout URL allow checkout retries to reuse the same order.
- Access comes from unexpired successful payment records. Study routes and mutation endpoints check access server-side; Bronze responses exclude paid practice questions before sending props to the browser.
- Deleting a learner does not transfer purchased access to a new profile. Payment records remain with a null learner for payment reconciliation; deleting the parent nulls the parent reference. Payment retention and refund policies must be included in the final legal copy.
- Refunds/disputes currently need merchant review and manual access revocation; automatic refund/dispute processing is not implemented. Do not delete financial records as a way to revoke access.
- Never set a real payment to successful manually. Use the verification flow and Paystack dashboard to investigate mismatches.

API references: [accept payments](https://paystack.com/docs/payments/accept-payments/), [verify payments](https://paystack.com/docs/payments/verify-payments/), [signed webhooks](https://paystack.com/docs/payments/webhooks/).
