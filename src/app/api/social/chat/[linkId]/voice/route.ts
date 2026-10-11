import { LIMITS } from "@/lib/social-rules";
import { openChat } from "@/lib/social/chat";
import { isUuid } from "@/lib/social/data";
import { voiceEnabled } from "@/lib/social/flags";
import { actionActor, sameOrigin } from "@/lib/social/guard";
import { readLimited, sendVoice } from "@/lib/social/voice";

export const dynamic = "force-dynamic";

// Uploads one voice note as the raw recording (the browser's MediaRecorder output). The sender is the learner in the
// session; the file is checked for size, type and its first bytes before it is saved.
export async function POST(request: Request, { params }: { params: Promise<{ linkId: string }> }) {
  const { linkId } = await params;
  if (!voiceEnabled()) return Response.json({ error: "Not found" }, { status: 404 });
  if (!sameOrigin(request)) return Response.json({ error: "Forbidden" }, { status: 403 });
  const actor = await actionActor();
  if (!actor.ok) return Response.json({ error: actor.error }, { status: actor.status });
  if (!isUuid(linkId)) return Response.json({ error: "Not found" }, { status: 404 });
  if (!actor.settings.voice) return Response.json({ error: "A parent has not switched voice notes on for you." }, { status: 403 });

  const declared = Number(request.headers.get("content-length") ?? "0");
  if (declared > LIMITS.voiceMaxBytes) return Response.json({ error: "That recording is too big." }, { status: 413 });
  try {
    const opened = await openChat(actor.learner.id, actor.settings, linkId);
    if ("error" in opened) return Response.json({ error: opened.error }, { status: opened.status });
    if (!opened.link.otherSwitches.voice) return Response.json({ error: `${opened.link.other.name}’s parent has not switched voice notes on.` }, { status: 403 });
    const bytes = await readLimited(request, LIMITS.voiceMaxBytes);
    if (!bytes) return Response.json({ error: "That recording is too big." }, { status: 413 });
    const sent = await sendVoice(actor.learner.id, linkId, request.headers.get("content-type"), new URL(request.url).searchParams.get("seconds"), bytes);
    if ("error" in sent) return Response.json({ error: sent.error }, { status: sent.status });
    return Response.json({ message: sent.message }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Temporarily unavailable" }, { status: 503 });
  }
}
