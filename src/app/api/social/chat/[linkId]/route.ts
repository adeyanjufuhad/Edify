import { actionActor, sameOrigin } from "@/lib/social/guard";
import { listMessages, markRead, openChat, sendText } from "@/lib/social/chat";
import { isUuid } from "@/lib/social/data";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };

// Messages newer than `after` (a sequence number the page already has; 0 gives the latest ones).
export async function GET(request: Request, { params }: { params: Promise<{ linkId: string }> }) {
  const { linkId } = await params;
  const actor = await actionActor();
  if (!actor.ok) return Response.json({ error: actor.error }, { status: actor.status });
  if (!isUuid(linkId)) return Response.json({ error: "Not found" }, { status: 404 });
  const opened = await openChat(actor.learner.id, actor.settings, linkId).catch(() => null);
  if (!opened) return Response.json({ error: "Temporarily unavailable" }, { status: 503 });
  if ("error" in opened) return Response.json({ error: opened.error }, { status: opened.status });
  const after = Number(new URL(request.url).searchParams.get("after") ?? "0");
  try {
    const messages = await listMessages(actor.learner.id, linkId, Number.isFinite(after) ? after : 0);
    if (messages.length || !after) await markRead(actor.learner.id, linkId);
    return Response.json({ messages }, { headers: NO_STORE });
  } catch {
    return Response.json({ error: "Temporarily unavailable" }, { status: 503 });
  }
}

// Sends one text message. The sender is the learner in the session; only the text comes from the browser.
export async function POST(request: Request, { params }: { params: Promise<{ linkId: string }> }) {
  const { linkId } = await params;
  if (!sameOrigin(request)) return Response.json({ error: "Forbidden" }, { status: 403 });
  const actor = await actionActor();
  if (!actor.ok) return Response.json({ error: actor.error }, { status: actor.status });
  if (!isUuid(linkId)) return Response.json({ error: "Not found" }, { status: 404 });
  if (!(request.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json")) return Response.json({ error: "Send JSON." }, { status: 415 });
  if (Number(request.headers.get("content-length") ?? "0") > 4096) return Response.json({ error: "That message is too long." }, { status: 413 });
  let body: { text?: unknown };
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid message" }, { status: 400 }); }
  try {
    const opened = await openChat(actor.learner.id, actor.settings, linkId);
    if ("error" in opened) return Response.json({ error: opened.error }, { status: opened.status });
    const sent = await sendText(actor.learner.id, linkId, body?.text);
    if ("error" in sent) return Response.json({ error: sent.error }, { status: sent.status });
    return Response.json({ message: sent.message }, { headers: NO_STORE });
  } catch {
    return Response.json({ error: "Temporarily unavailable" }, { status: 503 });
  }
}
