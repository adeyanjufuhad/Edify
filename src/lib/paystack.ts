import "server-only";
import { randomUUID } from "node:crypto";
import { database } from "@/lib/db";
import { PLANS, type PlanId } from "@/data/plans";
import { matchesPayment, paymentExpiry, type PaymentRecord } from "@/lib/payment-validation";

export function paymentSettings() {
  const secret = process.env.PAYSTACK_SECRET_KEY ?? "";
  const mode = secret.startsWith("sk_live_") ? "live" : secret.startsWith("sk_test_") ? "test" : null;
  // Test transactions must never grant access on the public production deployment.
  const enabled = !!mode &&
    !(process.env.VERCEL_ENV === "production" && mode !== "live");
  return { enabled, mode };
}

async function paystack(path: string, body?: Record<string, unknown>) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) throw new Error("Payments are not configured.");
  const response = await fetch(`https://api.paystack.co/${path}`, {
    method: body ? "POST" : "GET",
    headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
    signal: AbortSignal.timeout(12000),
  });
  const result = await response.json();
  if (!response.ok || result.status !== true || !result.data) throw new Error("Paystack is temporarily unavailable.");
  return result.data;
}

export async function initializePayment(parent: { id: string; email: string }, profileId: string, planId: PlanId) {
  const settings = paymentSettings();
  const plan = PLANS.find((item) => item.id === planId);
  if (!settings.enabled || !settings.mode || !plan) throw new Error("Checkout is not available yet.");
  const origin = process.env.PAYMENT_SITE_URL ?? "https://edify-sigma-plum.vercel.app";
  const newReference = `edify-${randomUUID()}`;
  const sql = database();
  // Ownership is checked again here; no client-provided email, price or expiry is trusted.
  const created = await sql`insert into public.payments (reference, parent_id, profile_id, plan, amount, customer_email, mode)
    select ${newReference}, ${parent.id}, id, ${plan.id}, ${plan.price * 100}, ${parent.email}, ${settings.mode}
    from public.learner_profiles where id = ${profileId} and parent_id = ${parent.id}
    on conflict (profile_id, plan, mode) where status = 'pending' do update set profile_id = excluded.profile_id
    returning reference, checkout_url, customer_email`;
  if (!created.length) throw new Error("Learner not found.");
  const reference = String(created[0].reference);
  if (created[0].checkout_url) return String(created[0].checkout_url);
  const data = await paystack("transaction/initialize", {
    email: String(created[0].customer_email), amount: plan.price * 100, currency: "NGN", reference,
    callback_url: `${origin}/billing/return`,
    metadata: { cancel_action: `${origin}/billing?cancelled=1` },
  });
  const checkout = new URL(data.authorization_url);
  if (checkout.protocol !== "https:" || checkout.hostname !== "checkout.paystack.com" || data.reference !== reference) throw new Error("Invalid checkout response.");
  await sql`update public.payments set checkout_url = ${checkout.href} where reference = ${reference}`;
  return checkout.href;
}

export async function verifyPayment(reference: string, parentId?: string): Promise<"success" | "pending" | "unknown" | "mismatch"> {
  if (!/^edify-[0-9a-f-]{36}$/.test(reference)) return "unknown";
  const sql = database();
  const rows = parentId
    ? await sql`select * from public.payments where reference = ${reference} and parent_id = ${parentId}`
    : await sql`select * from public.payments where reference = ${reference}`;
  if (!rows[0]) return "unknown";
  const order = rows[0] as PaymentRecord & { status: string };
  if (order.status === "success") return "success";
  const data = await paystack(`transaction/verify/${encodeURIComponent(reference)}`);
  if (data.status !== "success") return "pending";
  if (!matchesPayment(order, data)) return "mismatch";
  const expiry = paymentExpiry(data.paid_at);
  if (!expiry) return "mismatch";
  // One atomic state transition handles webhook/callback races and retries.
  await sql`update public.payments set status = 'success', paystack_id = ${String(data.id)}, paid_at = ${data.paid_at}, term_end = ${expiry.toISOString()}
    where reference = ${reference} and status = 'pending'`;
  return "success";
}
