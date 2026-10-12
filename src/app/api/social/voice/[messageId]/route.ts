import { hasAcceptedLegal } from "@/lib/consent";
import { getParent, getLearner } from "@/lib/account";
import { parentCanManage } from "@/lib/parent-lock";
import { parseRange } from "@/lib/social-rules";
import { voiceEnabled } from "@/lib/social/flags";
import { actionActor } from "@/lib/social/guard";
import { getClip, type Clip } from "@/lib/social/voice";

export const dynamic = "force-dynamic";

// Plays one voice note. Allowed for the two learners on the link (with voice switched on for both) and for a parent of
// either learner, who can always listen to what their child sent or received. Anyone else gets a 404, as if it did not exist.
// Safari asks for audio in byte ranges, so ranges are supported.
export async function GET(request: Request, { params }: { params: Promise<{ messageId: string }> }) {
  const { messageId } = await params;
  if (!voiceEnabled()) return Response.json({ error: "Not found" }, { status: 404 });
  let clip: Clip | null = null;
  try {
    const parent = await getParent();
    const learner = parent ? await getLearner() : null;
    const actor = learner ? await actionActor() : null;
    // A parent listens from the classmate settings page, so with a parent PIN set the parent area must be unlocked.
    const consented = parent ? (await hasAcceptedLegal(parent.id)) && (await parentCanManage(parent)) : false;
    clip = await getClip({ learnerId: actor?.ok && actor.settings.voice ? actor.learner.id : undefined, parentId: parent && consented ? parent.id : undefined }, messageId);
  } catch {
    return Response.json({ error: "Temporarily unavailable" }, { status: 503 });
  }
  if (!clip) return Response.json({ error: "Not found" }, { status: 404 });

  const headers: Record<string, string> = {
    "Content-Type": clip.contentType,
    "Accept-Ranges": "bytes",
    "Cache-Control": "private, no-cache",
    "X-Content-Type-Options": "nosniff",
    "Cross-Origin-Resource-Policy": "same-origin",
    "Content-Disposition": "inline",
  };
  const size = clip.bytes.byteLength;
  const range = parseRange(request.headers.get("range"), size);
  if (request.headers.get("range") && !range) return new Response(null, { status: 416, headers: { ...headers, "Content-Range": `bytes */${size}` } });
  if (range) {
    const part = clip.bytes.subarray(range.start, range.end + 1);
    return new Response(new Uint8Array(part), { status: 206, headers: { ...headers, "Content-Range": `bytes ${range.start}-${range.end}/${size}`, "Content-Length": String(part.byteLength) } });
  }
  return new Response(new Uint8Array(clip.bytes), { status: 200, headers: { ...headers, "Content-Length": String(size) } });
}
