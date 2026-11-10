import { validSignature } from "@/lib/payment-validation";
import { paymentSettings, verifyPayment } from "@/lib/monnify";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const settings = paymentSettings();
  const secret = process.env.MONNIFY_SECRET_KEY;
  if (!settings.enabled || !secret) return new Response("Unavailable", { status: 503 });
  const body = await request.text();
  const signature = request.headers.get("monnify-signature");
  // Monnify signs live notifications only; its sandbox sends no signature. Nothing in the body is trusted either
  // way: it only names an order, which is then checked with Monnify server to server.
  const signed = validSignature(body, signature, secret);
  if (settings.mode === "live" ? !signed : signature !== null && !signed) return new Response("Invalid signature", { status: 401 });
  let event;
  try { event = JSON.parse(body); } catch { return new Response("Invalid JSON", { status: 400 }); }
  if (event?.eventType !== "SUCCESSFUL_TRANSACTION") return new Response("OK");
  const reference = event.eventData?.paymentReference;
  if (typeof reference !== "string") return new Response("Invalid reference", { status: 400 });
  try {
    const result = await verifyPayment(reference);
    if (result === "mismatch") return new Response("Payment mismatch", { status: 400 });
    if (result === "pending") return new Response("Retry verification", { status: 503 });
    return new Response("OK");
  } catch {
    // Non-2xx makes Monnify send the notification again instead of losing a paid order during an outage.
    return new Response("Retry verification", { status: 503 });
  }
}
