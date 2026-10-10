import Link from "next/link";
import { requireParent } from "@/lib/account";
import { listProfiles } from "@/lib/profiles";
import { database } from "@/lib/db";
import { paymentSettings } from "@/lib/paystack";
import { PLANS, PLAN_NAMES, PLAN_RANK, naira, isPlanId } from "@/data/plans";
import { CURRICULUM_CLASS } from "@/data/curriculum";
import CheckoutForm from "./checkout-form";
import "./billing.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Learner plans and payments — Edify" };

const date = (value: string) => new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Lagos" }).format(new Date(value));

export default async function BillingPage({ searchParams }: { searchParams: Promise<{ learner?: string; cancelled?: string }> }) {
  const parent = await requireParent();
  const params = await searchParams;
  const profiles = await listProfiles(parent.id);
  const selected = profiles.find((profile) => profile.id === params.learner) ?? profiles[0];
  const settings = paymentSettings();
  const payments = await database()`select reference, profile_id, plan, amount, status, term_end, created_at from public.payments where parent_id = ${parent.id} order by created_at desc limit 12`;

  return <div className="billing-page">
    <Link href="/profiles" className="text-link">Back to your learners</Link>
    <header><span className="kicker">Family plans</span><h1>A plan for each learner.</h1><p>One payment covers 105 days (3½ months) from successful payment. No automatic renewal.</p></header>
    {!settings.enabled && <p className="form-error" role="status">Payments aren’t available yet. Please check back shortly.</p>}
    {settings.enabled && settings.mode === "test" && <p className="form-error" role="status">Test checkout — no real money is collected.</p>}
    {params.cancelled && <p className="form-error" role="status">Checkout was closed. If you made a payment, check its status below before trying again.</p>}
    {!selected ? <p><Link href="/profiles">Add a learner</Link> before choosing a plan.</p> : <>
      <nav className="billing-learners" aria-label="Choose a learner">{profiles.map((profile) => <Link key={profile.id} className="pill-outline small" href={`/billing?learner=${profile.id}`} aria-current={selected.id === profile.id ? "page" : undefined}>{profile.name}</Link>)}</nav>
      <section className="account-card"><h2>{selected.name}’s plan</h2><p>{PLAN_NAMES[selected.plan]}{selected.sponsored ? " · sponsored by your school" : selected.expiresAt ? ` · until ${date(selected.expiresAt)}` : " · choose a plan below to start studying"}</p>
        <p>Currently available: {CURRICULUM_CLASS} Chemistry, First Term. Other classes and subjects will be added as their lessons are ready. Only buy if the available content suits your learner.</p>
        {selected.sponsored && <Link href="/profiles" className="text-link">Open your learner’s study space</Link>}
      </section>
      {!selected.sponsored && <>
        {selected.plan !== "free" && <p>Moving to a higher plan starts a new 105-day period at the full price shown. Unused days aren’t credited. Renewals are available after your current access expires.</p>}
        <div className="billing-plans">{PLANS.map((plan) => <section className="account-card billing-plan" key={plan.id}>
          <div><h2>{plan.name}</h2><strong>{naira(plan.price)} <small>per learner / 105 days</small></strong><ul>{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
          {PLAN_RANK[selected.plan] >= PLAN_RANK[plan.id] ? <p>Included in your current plan</p> : <CheckoutForm profileId={selected.id} plan={plan} disabled={!settings.enabled} />}
        </section>)}</div>
        <p className="account-note">You’ll complete payment on Paystack. Your parent email is shared with Paystack for the payment; Edify never receives your card details.</p>
      </>}
    </>}
    <section className="account-card"><h2>Recent payments</h2>{payments.length ? <ul className="billing-history">{payments.map((payment) => <li key={payment.reference as string}>
      <strong>{profiles.find((profile) => profile.id === payment.profile_id)?.name ?? "Removed learner"} · {isPlanId(payment.plan) ? PLAN_NAMES[payment.plan] : "Plan"} · {naira(Number(payment.amount) / 100)}</strong>
      <span>{payment.status === "success" ? `Paid · access until ${date(String(payment.term_end))}` : "Payment not yet confirmed"}</span>
      {payment.status !== "success" && <Link href={`/billing/return?reference=${encodeURIComponent(payment.reference as string)}`} className="text-link">Check payment status</Link>}
    </li>)}</ul> : <p>No payments yet.</p>}</section>
  </div>;
}
