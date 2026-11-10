import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { test } from "node:test";
import { matchesPayment, paymentExpiry, providerPaidAt, validSignature } from "../src/lib/payment-validation.ts";

test("webhooks require the exact body and a valid HMAC SHA512 signature (Monnify's monnify-signature header)", () => {
  const body = JSON.stringify({ eventType: "SUCCESSFUL_TRANSACTION", eventData: { paymentReference: "edify-x" } });
  const signature = createHmac("sha512", "test-secret").update(body).digest("hex");
  assert.equal(validSignature(body, signature, "test-secret"), true);
  assert.equal(validSignature(`${body} `, signature, "test-secret"), false);
  assert.equal(validSignature(body, signature, "wrong-secret"), false);
  for (const invalid of [null, "", "abc", "g".repeat(128)]) assert.equal(validSignature(body, invalid, "test-secret"), false);
});

test("only the matching paid reference, amount, currency and customer can unlock access", () => {
  // Monnify's transaction query reports naira; orders are stored in kobo.
  const order = { reference: "edify-order", amount: 300000, currency: "NGN", customer_email: "parent@example.com", mode: "live" };
  const data = { paymentReference: order.reference, transactionReference: "MNFY|20261110|000001", amountPaid: "3000.00", currency: "NGN", customer: { email: "PARENT@example.com" }, paymentStatus: "PAID" };
  assert.equal(matchesPayment(order, data), true);
  assert.equal(matchesPayment(order, { ...data, amountPaid: 3000 }), true);
  assert.equal(matchesPayment(order, { ...data, paymentStatus: "OVERPAID", amountPaid: "3500.00" }), true);
  assert.equal(matchesPayment(order, { ...data, customer: undefined, customerDTO: { email: "parent@example.com" }, currency: undefined, currencyCode: "NGN" }), true);
  for (const change of [{ paymentStatus: "PENDING" }, { paymentStatus: "PARTIALLY_PAID" }, { paymentStatus: "FAILED" }, { paymentStatus: "REVERSED" }, { amountPaid: "1000.00" }, { amountPaid: "2999.99" }, { amountPaid: "abc" }, { amountPaid: -3000 }, { currency: "USD" }, { paymentReference: "another-order" }, { customer: { email: "another@example.com" } }, { customer: null }, { transactionReference: "" }, { transactionReference: 7 }]) {
    assert.equal(matchesPayment(order, { ...data, ...change }), false, JSON.stringify(change));
  }
});

test("Monnify's payment times are read in every format it sends", () => {
  const now = Date.parse("2026-11-10T12:00:00Z");
  assert.equal(providerPaidAt("2026-11-10T10:45:00.000+0000", now).toISOString(), "2026-11-10T10:45:00.000Z");
  assert.equal(providerPaidAt("2026-11-10T10:45:00Z", now).toISOString(), "2026-11-10T10:45:00.000Z");
  // No offset means Lagos time (UTC+1).
  assert.equal(providerPaidAt("2026-11-10 11:45:00.615", now).toISOString(), "2026-11-10T10:45:00.615Z");
  assert.equal(providerPaidAt("10/11/2026 3:48:10 AM", now).toISOString(), "2026-11-10T02:48:10.000Z");
  // Unreadable or future times fall back to the moment of confirmation.
  for (const value of [undefined, null, "bad date", "2999-01-01T00:00:00Z"]) assert.equal(providerPaidAt(value, now).getTime(), now);
});

test("access expires exactly 105 days after payment, independent of delayed confirmation", () => {
  const paidAt = "2026-01-01T12:30:00.000Z";
  assert.equal(paymentExpiry(paidAt)?.toISOString(), "2026-04-16T12:30:00.000Z");
  for (const value of [undefined, null, "bad date", "2999-01-01T00:00:00Z"]) assert.equal(paymentExpiry(value), null);
});
