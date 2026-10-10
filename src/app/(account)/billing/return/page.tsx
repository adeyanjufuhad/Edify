import Link from "next/link";
import { requireParent } from "@/lib/account";
import { verifyPayment } from "@/lib/paystack";

export const dynamic = "force-dynamic";
export const metadata = { title: "Payment status — Edify" };

export default async function PaymentReturn({ searchParams }: { searchParams: Promise<{ reference?: string }> }) {
  const parent = await requireParent();
  const { reference } = await searchParams;
  let result: string = "unknown";
  try { if (reference) result = await verifyPayment(reference, parent.id); } catch { result = "unavailable"; }
  const success = result === "success";
  return <section className="account-card">
    <span className="kicker">Paystack payment</span>
    <h1>{success ? "Payment confirmed." : "Payment not confirmed yet."}</h1>
    <p role="status">{success ? "Your payment has been verified. View your plan’s expiry date in billing, then open your learner’s space." : "We haven’t confirmed this payment. If you’ve been debited, don’t pay again. Check the status from your recent payments; confirmation can take a little time."}</p>
    <Link href={success ? "/profiles" : "/billing"} className="pill-button">{success ? "Go to your learners" : "Check recent payments"}</Link>
    {success && <p><Link href="/billing" className="text-link">View plan and expiry date</Link></p>}
  </section>;
}
