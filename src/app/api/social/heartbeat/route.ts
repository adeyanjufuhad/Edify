import { presenceEnabled } from "@/lib/social/flags";
import { actionActor, sameOrigin } from "@/lib/social/guard";
import { beat } from "@/lib/social/presence";

export const dynamic = "force-dynamic";

// "I'm here": sent every 30 seconds by a learner's open tab, only when a parent has switched presence on.
// The learner comes from the session and cookie, never from the request.
export async function POST(request: Request) {
  if (!presenceEnabled()) return Response.json({ error: "Not found" }, { status: 404 });
  if (!sameOrigin(request)) return Response.json({ error: "Forbidden" }, { status: 403 });
  const actor = await actionActor();
  if (!actor.ok) return Response.json({ error: actor.error }, { status: actor.status });
  if (!actor.settings.presence) return Response.json({ error: "Presence is off for this learner." }, { status: 403 });
  try {
    await beat(actor.learner.id);
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Temporarily unavailable" }, { status: 503 });
  }
}
