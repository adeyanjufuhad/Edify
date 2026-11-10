import { createHmac, timingSafeEqual } from "node:crypto";

export type PaymentRecord = {
  reference: string; amount: number; currency: string; customer_email: string; mode: string;
};

export function validSignature(body: string, signature: string | null, secret: string): boolean {
  if (!signature || !/^[a-f0-9]{128}$/i.test(signature)) return false;
  const expected = createHmac("sha512", secret).update(body).digest();
  return timingSafeEqual(expected, Buffer.from(signature, "hex"));
}

// Monnify reports naira (3000 or "3000.00"); orders are stored in kobo.
function kobo(value: unknown): number | null {
  const naira = typeof value === "number" ? value : typeof value === "string" && /^\d+(\.\d{1,2})?$/.test(value) ? Number(value) : NaN;
  return Number.isFinite(naira) && naira > 0 ? Math.round(naira * 100) : null;
}

// `data` is the body of Monnify's transaction query, fetched server to server. Test and live orders live on
// separate Monnify hosts, so the caller checks the environment before asking.
export function matchesPayment(order: PaymentRecord, data: Record<string, unknown>): boolean {
  const customer = (data.customerDTO ?? data.customer) as { email?: unknown } | null | undefined;
  const paid = kobo(data.amountPaid);
  // OVERPAID (a bank transfer of more than the price) still pays for the plan in full.
  return (data.paymentStatus === "PAID" || data.paymentStatus === "OVERPAID") && data.paymentReference === order.reference &&
    paid !== null && paid >= order.amount && (data.currencyCode ?? data.currency) === order.currency &&
    typeof customer?.email === "string" && customer.email.toLowerCase() === order.customer_email.toLowerCase() &&
    typeof data.transactionReference === "string" && data.transactionReference.length > 0;
}

// Monnify's query answers in ISO time with an offset ("2024-06-01T10:45:00.000+0000"); some of its payloads use
// Lagos local time with no offset ("2021-11-17 11:28:42.615", "17/11/2021 3:48:10 PM"). Lagos is UTC+1 all year.
// A time we cannot read, or one in the future, falls back to the moment we confirmed the payment, so a paid
// order is never left without access over a date format.
export function providerPaidAt(value: unknown, now: number = Date.now()): Date {
  let time = NaN;
  if (typeof value === "string") {
    const iso = value.trim().match(/^(\d{4}-\d{2}-\d{2})[T ](\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?)\d*(Z|[+-]\d{2}:?\d{2})?$/);
    const local = value.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4}) (\d{1,2}):(\d{2}):(\d{2}) (AM|PM)$/i);
    const two = (part: string | number) => String(part).padStart(2, "0");
    if (iso) {
      const offset = !iso[3] ? "+01:00" : iso[3] === "Z" ? "Z" : iso[3].replace(/^([+-]\d{2}):?(\d{2})$/, "$1:$2");
      time = Date.parse(`${iso[1]}T${iso[2]}${offset}`);
    } else if (local) {
      const hour = (Number(local[4]) % 12) + (local[7].toUpperCase() === "PM" ? 12 : 0);
      time = Date.parse(`${local[3]}-${two(local[2])}-${two(local[1])}T${two(hour)}:${local[5]}:${local[6]}+01:00`);
    }
  }
  return new Date(Number.isFinite(time) && time <= now ? time : now);
}

export function paymentExpiry(paidAt: unknown): Date | null {
  if (typeof paidAt !== "string") return null;
  const start = new Date(paidAt);
  if (!Number.isFinite(start.getTime()) || start.getTime() > Date.now() + 5 * 60 * 1000) return null;
  return new Date(start.getTime() + 105 * 24 * 60 * 60 * 1000);
}
