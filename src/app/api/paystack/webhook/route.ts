import { validSignature } from "@/lib/payment-validation";
import { verifyPayment } from "@/lib/paystack";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) return new Response("Unavailable", { status: 503 });
  const body = await request.text();
  if (!validSignature(body, request.headers.get("x-paystack-signature"), secret)) return new Response("Invalid signature", { status: 401 });
  let event;
  try { event = JSON.parse(body); } catch { return new Response("Invalid JSON", { status: 400 }); }
  if (event?.event !== "charge.success") return new Response("OK");
  if (typeof event.data?.reference !== "string") return new Response("Invalid reference", { status: 400 });
  try {
    const result = await verifyPayment(event.data.reference);
    if (result === "mismatch") return new Response("Payment mismatch", { status: 400 });
    if (result === "pending") return new Response("Retry verification", { status: 503 });
    return new Response("OK");
  } catch {
    // Non-2xx makes Paystack retry instead of losing a paid order during an outage.
    return new Response("Retry verification", { status: 503 });
  }
}
