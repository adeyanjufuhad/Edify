import "server-only";
import { database } from "@/lib/db";
import { isPlanId, PLAN_RANK, type PlanId } from "@/data/plans";
import type { LearnerProfile } from "@/lib/profiles";

export async function paidAccess(profileId: string): Promise<{ plan: PlanId; expiresAt: string | null }> {
  const liveOnly = process.env.VERCEL_ENV === "production" || process.env.PAYSTACK_SECRET_KEY?.startsWith("sk_live_") === true;
  const rows = await database()`select plan, term_end from public.payments
    where profile_id = ${profileId} and status = 'success' and term_end > now()
    and (${!liveOnly} or mode = 'live')
    order by case plan when 'gold' then 3 when 'silver' then 2 else 1 end desc, term_end desc limit 1`;
  return { plan: isPlanId(rows[0]?.plan) ? rows[0].plan : "free", expiresAt: rows[0]?.term_end ? new Date(rows[0].term_end as string).toISOString() : null };
}

export function hasPlan(learner: LearnerProfile, minimum: Exclude<PlanId, "free">) {
  return PLAN_RANK[learner.plan] >= PLAN_RANK[minimum];
}
