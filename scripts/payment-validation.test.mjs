import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { test } from "node:test";
import { matchesPayment, paymentExpiry, validSignature } from "../src/lib/payment-validation.ts";

test("webhooks require the exact body and a valid HMAC signature", () => {
  const body = JSON.stringify({ event: "charge.success" });
  const signature = createHmac("sha512", "test-secret").update(body).digest("hex");
  assert.equal(validSignature(body, signature, "test-secret"), true);
  assert.equal(validSignature(`${body} `, signature, "test-secret"), false);
  assert.equal(validSignature(body, signature, "wrong-secret"), false);
  for (const invalid of [null, "", "abc", "g".repeat(128)]) assert.equal(validSignature(body, invalid, "test-secret"), false);
});

test("only the matching paid reference, amount, currency, environment and customer can unlock access", () => {
  const order = { reference: "edify-order", amount: 300000, currency: "NGN", customer_email: "parent@example.com", mode: "live" };
  const data = { id: 42, reference: order.reference, amount: order.amount, currency: "NGN", domain: "live", customer: { email: "PARENT@example.com" }, status: "success" };
  assert.equal(matchesPayment(order, data), true);
  for (const change of [{ status: "pending" }, { status: "failed" }, { amount: 100000 }, { amount: "300000" }, { currency: "USD" }, { domain: "test" }, { reference: "another-order" }, { customer: { email: "another@example.com" } }, { customer: null }, { id: -1 }]) {
    assert.equal(matchesPayment(order, { ...data, ...change }), false);
  }
});

test("access expires exactly 105 days after payment, independent of delayed confirmation", () => {
  const paidAt = "2026-01-01T12:30:00.000Z";
  assert.equal(paymentExpiry(paidAt)?.toISOString(), "2026-04-16T12:30:00.000Z");
  for (const value of [undefined, null, "bad date", "2999-01-01T00:00:00Z"]) assert.equal(paymentExpiry(value), null);
});
