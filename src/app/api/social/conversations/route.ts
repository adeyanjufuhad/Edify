import { chatEnabled } from "@/lib/social/flags";
import { actionActor } from "@/lib/social/guard";
import { listConversations } from "@/lib/social/chat";

export const dynamic = "force-dynamic";

// The chat list the Chats page polls: the learner in the session's conversations, newest first.
export async function GET() {
  if (!chatEnabled()) return Response.json({ error: "Not found" }, { status: 404 });
  const actor = await actionActor();
  if (!actor.ok) return Response.json({ error: actor.error }, { status: actor.status });
  if (!actor.settings.chat) return Response.json({ error: "Chat is off for this learner." }, { status: 403 });
  try {
    return Response.json({ conversations: await listConversations(actor.learner.id) }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Temporarily unavailable" }, { status: 503 });
  }
}
