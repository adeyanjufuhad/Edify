import "server-only";
import { randomUUID } from "node:crypto";
import { database } from "@/lib/db";
import { PLANS, type PlanId } from "@/data/plans";
import { matchesPayment, paymentExpiry, providerPaidAt, type PaymentRecord } from "@/lib/payment-validation";

type Mode = "test" | "live";
type Order = PaymentRecord & { status: string; checkout_url: string | null; created_at: string };

const HOSTS: Record<Mode, string> = { test: "https://sandbox.monnify.com", live: "https://api.monnify.com" };
const MINUTE = 60 * 1000;
// Monnify closes a checkout 40 minutes after it is opened. A saved one is reused without asking while it is
// clearly open, and replaced only once it is clearly closed, so a payment made near the end is not orphaned.
const REUSE_WITHOUT_ASKING = 30 * MINUTE;
const CHECKOUT_CLOSED = 45 * MINUTE;

export function paymentSettings(): { enabled: boolean; mode: Mode | null } {
  const apiKey = process.env.MONNIFY_API_KEY ?? "";
  const configured = !!process.env.MONNIFY_SECRET_KEY && !!process.env.MONNIFY_CONTRACT_CODE;
  const mode = !configured ? null : apiKey.startsWith("MK_PROD_") ? "live" : apiKey.startsWith("MK_TEST_") ? "test" : null;
  // Test transactions must never grant access on the public production deployment.
  const enabled = !!mode && !(process.env.VERCEL_ENV === "production" && mode !== "live");
  return { enabled, mode };
}

let cachedToken: { apiKey: string; token: string; expires: number } | null = null;

async function accessToken(mode: Mode) {
  const apiKey = process.env.MONNIFY_API_KEY ?? "";
  if (cachedToken && cachedToken.apiKey === apiKey && cachedToken.expires > Date.now() + MINUTE) return cachedToken.token;
  const response = await fetch(`${HOSTS[mode]}/api/v1/auth/login`, {
    method: "POST",
    headers: { Authorization: `Basic ${Buffer.from(`${apiKey}:${process.env.MONNIFY_SECRET_KEY}`).toString("base64")}` },
    cache: "no-store",
    signal: AbortSignal.timeout(12000),
  });
  const result = await response.json();
  const token = result?.responseBody?.accessToken;
  if (!response.ok || result?.requestSuccessful !== true || typeof token !== "string") throw new Error("Monnify is temporarily unavailable.");
  const seconds = Number(result.responseBody.expiresIn);
  cachedToken = { apiKey, token, expires: Date.now() + (seconds > 0 ? seconds : 300) * 1000 };
  return token;
}

async function monnify(mode: Mode, path: string, body?: Record<string, unknown>): Promise<Record<string, unknown>> {
  const response = await fetch(`${HOSTS[mode]}/${path}`, {
    method: body ? "POST" : "GET",
    headers: { Authorization: `Bearer ${await accessToken(mode)}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
    signal: AbortSignal.timeout(12000),
  });
  if (response.status === 401) cachedToken = null;
  const result = await response.json();
  if (!response.ok || result?.requestSuccessful !== true || !result.responseBody) throw new Error("Monnify is temporarily unavailable.");
  return result.responseBody;
}

// Only a checkout page on Monnify's own domain is ever saved or sent to a parent.
function monnifyCheckout(value: unknown): URL | null {
  if (typeof value !== "string" || !URL.canParse(value)) return null;
  const url = new URL(value);
  return url.protocol === "https:" && (url.hostname === "monnify.com" || url.hostname.endsWith(".monnify.com")) ? url : null;
}

// Asks Monnify about one of our orders and, if it was paid in full, records it. One atomic state transition
// handles webhook/redirect races and retries.
async function confirm(order: Order, mode: Mode): Promise<{ result: "success" | "pending" | "mismatch"; status: string }> {
  const data = await monnify(mode, `api/v2/merchant/transactions/query?paymentReference=${encodeURIComponent(order.reference)}`);
  const status = typeof data.paymentStatus === "string" ? data.paymentStatus : "";
  if (status !== "PAID" && status !== "OVERPAID") return { result: "pending", status };
  if (!matchesPayment(order, data)) return { result: "mismatch", status };
  const paidAt = providerPaidAt(data.paidOn);
  const expiry = paymentExpiry(paidAt.toISOString());
  if (!expiry) return { result: "mismatch", status };
  await database()`update public.payments set status = 'success', provider_id = ${String(data.transactionReference)}, paid_at = ${paidAt.toISOString()}, term_end = ${expiry.toISOString()}
    where reference = ${order.reference} and status = 'pending'`;
  return { result: "success", status };
}

export async function initializePayment(parent: { id: string; email: string }, profileId: string, planId: PlanId) {
  const settings = paymentSettings();
  const plan = PLANS.find((item) => item.id === planId);
  if (!settings.enabled || !settings.mode || !plan) throw new Error("Checkout is not available yet.");
  const mode = settings.mode;
  const origin = process.env.PAYMENT_SITE_URL ?? "https://edify-sigma-plum.vercel.app";
  const reference = `edify-${randomUUID()}`;
  const sql = database();
  // Ownership is checked again here; no client-provided email, price or expiry is trusted.
  const created = await sql`insert into public.payments (reference, parent_id, profile_id, plan, amount, customer_email, mode)
    select ${reference}, ${parent.id}, id, ${plan.id}, ${plan.price * 100}, ${parent.email}, ${mode}
    from public.learner_profiles where id = ${profileId} and parent_id = ${parent.id}
    on conflict (profile_id, plan, mode) where status = 'pending' do update set profile_id = excluded.profile_id
    returning *`;
  if (!created.length) throw new Error("Learner not found.");
  const order = created[0] as Order;

  if (order.reference !== reference) {
    // An unfinished order for this learner and plan already exists.
    const saved = monnifyCheckout(order.checkout_url);
    const age = Date.now() - new Date(order.created_at).getTime();
    if (saved) {
      if (age < REUSE_WITHOUT_ASKING) return saved.href;
      const { result, status } = await confirm(order, mode);
      const unpaid = status === "PENDING" || status === "FAILED" || status === "EXPIRED";
      // Paid, or in a state a person must look at (part-paid, reversed): show the status page, never a second checkout.
      if (result !== "pending" || !unpaid) return `${origin}/billing/return?paymentReference=${encodeURIComponent(order.reference)}`;
      if (status !== "EXPIRED" && age < CHECKOUT_CLOSED) return saved.href;
    } else if (age < MINUTE) {
      // Another request for this order is opening its checkout right now; replacing its reference would orphan it.
      throw new Error("Checkout is already opening.");
    }
    // The old checkout is closed (or never opened). Monnify refuses a reference twice, so the order gets a new one.
    const renewed = await sql`update public.payments set reference = ${reference}, checkout_url = null, amount = ${plan.price * 100}, customer_email = ${parent.email}, created_at = now()
      where reference = ${order.reference} and status = 'pending' returning reference`;
    if (!renewed.length) throw new Error("Order changed while opening checkout.");
  }

  const data = await monnify(mode, "api/v1/merchant/transactions/init-transaction", {
    amount: plan.price, currencyCode: "NGN", customerEmail: parent.email, paymentReference: reference,
    paymentDescription: `Edify ${plan.name} plan, 105 days`, contractCode: process.env.MONNIFY_CONTRACT_CODE,
    redirectUrl: `${origin}/billing/return`,
  });
  const checkout = monnifyCheckout(data.checkoutUrl);
  if (!checkout || data.paymentReference !== reference) throw new Error("Invalid checkout response.");
  const stored = await sql`update public.payments set checkout_url = ${checkout.href} where reference = ${reference} and status = 'pending' returning reference`;
  if (!stored.length) throw new Error("Order changed while opening checkout.");
  return checkout.href;
}

export async function verifyPayment(reference: string, parentId?: string): Promise<"success" | "pending" | "unknown" | "mismatch"> {
  if (!/^edify-[0-9a-f-]{36}$/.test(reference)) return "unknown";
  const sql = database();
  const rows = parentId
    ? await sql`select * from public.payments where reference = ${reference} and parent_id = ${parentId}`
    : await sql`select * from public.payments where reference = ${reference}`;
  if (!rows[0]) return "unknown";
  const order = rows[0] as Order;
  if (order.status === "success") return "success";
  const settings = paymentSettings();
  // A test order cannot be looked up with live keys (or the reverse), and an order whose checkout never opened on
  // Monnify (including orders started before the move from Paystack) has nothing to look up.
  if (!settings.enabled || settings.mode !== order.mode) return "unknown";
  if (!monnifyCheckout(order.checkout_url)) return "pending";
  return (await confirm(order, settings.mode)).result;
}
