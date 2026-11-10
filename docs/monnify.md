# Monnify payments

Monnify replaced Paystack as the payment provider in November 2026. Bronze costs ₦1,000, Silver ₦3,000 and Gold ₦5,000 per learner for **105 days (3½ months)** from the time Monnify reports the payment (`paidOn`). Parents pay by card or bank transfer on Monnify's hosted checkout. There is no automatic renewal. Valid school referrals keep sponsored Gold. Upgrades charge the full price for a new 105-day period; unused time is not credited. Equal or lower plans cannot be bought while that tier is active.

Code: `src/lib/monnify.ts` (checkout and verification), `src/lib/payment-validation.ts` (signature, amount and date checks, tested in `scripts/payment-validation.test.mjs`), `src/app/api/monnify/webhook/route.ts`, `src/app/(account)/billing/`.

## Setting up the keys

1. **Database first.** Run `node scripts/migrate-payments.mjs` against the intended `DATABASE_URL`. It applies `006_payments.sql` and `016_payment_provider.sql` (renames `paystack_id` to `provider_id`; safe to run twice). Confirming a payment writes `provider_id`, so this must happen before the keys go live.
2. **Find the keys.** Monnify dashboard > Developer > API Keys & Contracts. You need the **API key**, the **secret key** and the **contract code**. All three must come from the same environment.
3. **Local and preview (sandbox).** In `.env.local`: `MONNIFY_API_KEY=MK_TEST_…`, `MONNIFY_SECRET_KEY=…`, `MONNIFY_CONTRACT_CODE=…` (the sandbox contract) and `PAYMENT_SITE_URL=http://localhost:3000`. Use a separate test database.
4. **Production (live).** In Vercel > Settings > Environment Variables, **Production** only: the `MK_PROD_…` API key, the live secret key and the live contract code, plus `PAYMENT_SITE_URL=https://edify-sigma-plum.vercel.app`. Never prefix them with `NEXT_PUBLIC_` and never commit them. Redeploy afterwards.
5. **Webhook.** Monnify dashboard > Developer > Webhook URLs > Transaction completion: `https://edify-sigma-plum.vercel.app/api/monnify/webhook`. Checkout sends the parent back to `/billing/return` itself.
6. Remove the old `PAYSTACK_SECRET_KEY` from Vercel once Monnify is live.

The mode comes from the API key prefix (`MK_TEST_` = sandbox host, `MK_PROD_` = live host). A missing key, or a test key on the production deployment, turns checkout off; it never turns on free access.

## Testing in the sandbox

Pay with Monnify's sandbox test cards or its simulated bank transfer. Check: a successful card payment, a bank transfer, a cancelled checkout, paying again for the same learner and plan (the open checkout is reused), the return page before the webhook arrives, a repeated webhook, and each plan tier. Then make one real live payment and confirm it in the Monnify dashboard; test payments are not evidence of live processing.

## Security and operations

- Every checkout belongs to a signed-in parent and one of their learners. Prices come from the server. Only the parent's email, the amount and our order reference go to Monnify; learner names, schools and PINs do not.
- Webhooks are checked against the `monnify-signature` header (HMAC SHA512 of the raw body with the secret key). Live webhooks must be signed. Nothing in a webhook or the return URL is trusted: both only name an order, which is then looked up with Monnify server to server, and its reference, amount paid (at least the price), currency, customer email and status (`PAID` or `OVERPAID`) are compared.
- One atomic pending-to-success update makes repeat notifications idempotent. A saved checkout URL is reused for 30 minutes, and replaced with a fresh reference only once Monnify's 40-minute checkout has clearly closed, so a late payment is never orphaned.
- `PARTIALLY_PAID`, `REVERSED` and other states a person must look at never grant access and never open a second checkout; the parent sees the status page. Resolve them in the Monnify dashboard.
- Access comes from unexpired successful payment records. Study routes and mutation endpoints check access server-side.
- Deleting a learner or account unlinks payment rows but keeps them (see `src/lib/account-deletion-sql.ts` and the privacy policy) for accounting, refunds and disputes.
- Refunds and disputes are handled by hand in the Monnify dashboard; revoke access by hand. Never delete financial records to revoke access, and never mark a real payment successful by hand.

API references: [authentication](https://developers.monnify.com/docs/authentication), [initialise transaction](https://developers.monnify.com/api#initialize-transaction), [transaction status](https://developers.monnify.com/api#get-transaction-status-v2), [webhooks](https://developers.monnify.com/docs/webhooks).
