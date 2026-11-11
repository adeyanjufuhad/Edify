import { timingSafeEqual } from "node:crypto";
import { RETENTION_DAYS } from "@/lib/social-rules";
import { purgeQueries } from "@/lib/social-queries";
import { chatEnabled, challengesEnabled } from "@/lib/social/flags";
import { run } from "@/lib/social/data";
import { database } from "@/lib/db";

// Payment-record retention promised in the privacy policy (/privacy#payments): a paid record is kept 6 years from
// payment, an order that was never paid 90 days from when it was started. Both are then deleted here, every day.
const PAID_RECORD_YEARS = 6;
const UNPAID_ORDER_DAYS = 90;

async function purgePayments() {
  const sql = database();
  const [paid] = await sql`with gone as (delete from public.payments where status = 'success'
    and coalesce(paid_at, created_at) < now() - make_interval(years => ${PAID_RECORD_YEARS}) returning 1) select count(*)::int as n from gone`;
  const [unpaid] = await sql`with gone as (delete from public.payments where status <> 'success'
    and created_at < now() - make_interval(days => ${UNPAID_ORDER_DAYS}) returning 1) select count(*)::int as n from gone`;
  return { paidPayments: Number(paid?.n ?? 0), unpaidOrders: Number(unpaid?.n ?? 0) };
}

export const dynamic = "force-dynamic";

// Daily clean-up (Vercel Cron calls this with `Authorization: Bearer $CRON_SECRET`; without CRON_SECRET it does nothing):
// expired payment records always, then expired classmate data (docs/challenges.md, "Retention") when that feature is on.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const given = request.headers.get("authorization") ?? "";
  const expected = `Bearer ${secret ?? ""}`;
  const ok = !!secret && secret.length >= 16 && given.length === expected.length && timingSafeEqual(Buffer.from(given), Buffer.from(expected));
  if (!ok) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const removed: Record<string, number> = {};
  try {
    Object.assign(removed, await purgePayments());
  } catch {
    return Response.json({ error: "Payment purge failed" }, { status: 500 });
  }
  if (!challengesEnabled()) return Response.json({ removed, skipped: "Classmate challenges are switched off." });

  try {
    for (const { name, query } of purgeQueries(RETENTION_DAYS, chatEnabled())) removed[name] = ((await run(query))[0]?.n as number) ?? 0;
  } catch {
    return Response.json({ error: "Purge failed", removed }, { status: 500 });
  }
  return Response.json({ removed });
}
