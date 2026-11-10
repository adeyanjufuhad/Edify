import Link from "next/link";
import { requireConsentedParent } from "@/lib/account";
import { verifyPayment } from "@/lib/monnify";

export const dynamic = "force-dynamic";
export const metadata = { title: "Payment status — Edify" };

// Monnify sends the parent back with ?paymentReference=…&transactionReference=…&paymentStatus=…. Only our own
// reference is read, and the payment is then checked with Monnify from the server; the status in the URL is ignored.
export default async function PaymentReturn({ searchParams }: { searchParams: Promise<{ paymentReference?: string | string[] }> }) {
  const parent = await requireConsentedParent();
  const { paymentReference } = await searchParams;
  const reference = typeof paymentReference === "string" ? paymentReference : undefined;
  let result: string = "unknown";
  try { if (reference) result = await verifyPayment(reference, parent.id); } catch { result = "unavailable"; }
  const success = result === "success";
  return <section className="account-card">
    <span className="kicker">Monnify payment</span>
    <h1>{success ? "Payment confirmed." : "Payment not confirmed yet."}</h1>
    <p role="status">{success ? "Your payment has been verified. View your plan’s expiry date in billing, then open your learner’s space." : "We haven’t confirmed this payment. If you’ve been debited, don’t pay again. Check the status from your recent payments; confirmation can take a little time."}</p>
    <Link href={success ? "/profiles" : "/billing"} className="pill-button">{success ? "Go to your learners" : "Check recent payments"}</Link>
    {success && <p><Link href="/billing" className="text-link">View plan and expiry date</Link></p>}
  </section>;
}
