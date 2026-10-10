"use client";

import { useActionState } from "react";
import { checkout } from "./actions";
import { naira, type Plan } from "@/data/plans";

export default function CheckoutForm({ profileId, plan, disabled }: { profileId: string; plan: Plan; disabled: boolean }) {
  const [state, action, pending] = useActionState(checkout, {});
  return <form action={action}>
    <input type="hidden" name="profileId" value={profileId} />
    <input type="hidden" name="plan" value={plan.id} />
    <button type="submit" className="pill-button small" disabled={disabled || pending}>{pending ? "Opening Paystack…" : `Pay ${naira(plan.price)}`}</button>
    {state.error && <p className="form-error" role="alert">{state.error}</p>}
  </form>;
}
