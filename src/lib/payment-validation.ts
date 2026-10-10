import { createHmac, timingSafeEqual } from "node:crypto";

export type PaymentRecord = {
  reference: string; amount: number; currency: string; customer_email: string; mode: string;
};

export function validSignature(body: string, signature: string | null, secret: string): boolean {
  if (!signature || !/^[a-f0-9]{128}$/i.test(signature)) return false;
  const expected = createHmac("sha512", secret).update(body).digest();
  return timingSafeEqual(expected, Buffer.from(signature, "hex"));
}

export function matchesPayment(order: PaymentRecord, data: Record<string, unknown>): boolean {
  const customer = data.customer as { email?: unknown } | undefined;
  return data.status === "success" && data.reference === order.reference &&
    data.amount === order.amount && data.currency === order.currency && data.domain === order.mode &&
    typeof customer?.email === "string" && customer.email.toLowerCase() === order.customer_email.toLowerCase() &&
    (typeof data.id === "number" && Number.isSafeInteger(data.id) && data.id > 0);
}

export function paymentExpiry(paidAt: unknown): Date | null {
  if (typeof paidAt !== "string") return null;
  const start = new Date(paidAt);
  if (!Number.isFinite(start.getTime()) || start.getTime() > Date.now() + 5 * 60 * 1000) return null;
  return new Date(start.getTime() + 105 * 24 * 60 * 60 * 1000);
}
