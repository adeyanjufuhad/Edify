import { chatEnabled, presenceEnabled } from "@/lib/social/flags";
import { actionActor } from "@/lib/social/guard";
import { onlineByLink } from "@/lib/social/presence";
import { unreadByLink } from "@/lib/social/chat";
import { classDirectory } from "@/lib/social/links";

export const dynamic = "force-dynamic";

// What the classmate list polls every 25 seconds: which classmates are online, and unread chat counts. Only for the
// learner in the session, and only for features that are switched on for them.
export async function GET() {
  const actor = await actionActor();
  if (!actor.ok) return Response.json({ error: actor.error }, { status: actor.status });
  try {
    const sharesOnline = presenceEnabled() && actor.settings.presence;
    const [online, unread, classOnline] = await Promise.all([
      presenceEnabled() && actor.settings.presence ? onlineByLink(actor.learner.id) : Promise.resolve({}),
      chatEnabled() && actor.settings.chat ? unreadByLink(actor.learner.id) : Promise.resolve({}),
      sharesOnline && actor.settings.classVisible
        ? classDirectory(actor.learner).then((list) => Object.fromEntries(list.filter((entry) => entry.online !== null).map((entry) => [entry.learnerId, entry.online === true])))
        : Promise.resolve({}),
    ]);
    return Response.json({ online, unread, classOnline }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Temporarily unavailable" }, { status: 503 });
  }
}
