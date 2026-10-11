import "server-only";
import { LIMITS } from "@/lib/social-rules";
import { heartbeatQuery, onlineQuery } from "@/lib/social-queries";
import { run } from "./data";

// Phase 2. One timestamp per learner, overwritten by a heartbeat; nothing is kept as history.
export async function beat(learnerId: string) {
  await run(heartbeatQuery(learnerId, LIMITS.heartbeatMinGapSeconds));
}

// Link id -> online. A link is missing from the answer unless both learners' parents have switched presence on.
export async function onlineByLink(learnerId: string): Promise<Record<string, boolean>> {
  const rows = await run(onlineQuery(learnerId, LIMITS.onlineWithinSeconds));
  return Object.fromEntries(rows.map((row) => [row.link_id as string, row.online === true]));
}
