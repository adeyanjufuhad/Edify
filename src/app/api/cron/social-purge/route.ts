import { timingSafeEqual } from "node:crypto";
import { RETENTION_DAYS } from "@/lib/social-rules";
import { purgeQueries } from "@/lib/social-queries";
import { chatEnabled, challengesEnabled } from "@/lib/social/flags";
import { run } from "@/lib/social/data";

export const dynamic = "force-dynamic";

// Daily clean-up of expired classmate data (docs/challenges.md, "Retention"). Vercel Cron calls this with
// `Authorization: Bearer $CRON_SECRET`. Without CRON_SECRET set, or with the switches off, it does nothing.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const given = request.headers.get("authorization") ?? "";
  const expected = `Bearer ${secret ?? ""}`;
  const ok = !!secret && secret.length >= 16 && given.length === expected.length && timingSafeEqual(Buffer.from(given), Buffer.from(expected));
  if (!ok) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!challengesEnabled()) return Response.json({ skipped: "Classmate challenges are switched off." });

  const removed: Record<string, number> = {};
  try {
    for (const { name, query } of purgeQueries(RETENTION_DAYS, chatEnabled())) removed[name] = ((await run(query))[0]?.n as number) ?? 0;
  } catch {
    return Response.json({ error: "Purge failed", removed }, { status: 500 });
  }
  return Response.json({ removed });
}
