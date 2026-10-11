import { Trash } from "@/components/icons";
import { RETENTION_DAYS } from "@/lib/social-rules";
import { parentConversation, type ParentMessage } from "@/lib/social/chat";
import { deleteMessageAction } from "./actions";

const WHEN = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Africa/Lagos" });

// What a parent can read of one conversation their child is in: every text message and voice note still kept, with a
// delete button for each. Reading works even if chat has since been switched off.
export default async function Conversation({ parentId, learnerId, learnerName, linkId, otherName, voice }: { parentId: string; learnerId: string; learnerName: string; linkId: string; otherName: string; voice: boolean }) {
  let messages: ParentMessage[] = [];
  let failed = false;
  try { messages = await parentConversation(parentId, learnerId, linkId); } catch { failed = true; }
  return (
    <section className="account-card convo" id="conversation" aria-labelledby="convo-title">
      <h2 id="convo-title">{learnerName} and {otherName}</h2>
      <p className="account-note" style={{ marginTop: 0 }}>Text messages are kept for {RETENTION_DAYS.textMessages} days and voice notes for {RETENTION_DAYS.voiceNotes} days, then deleted. You can delete any message now. Deleting a voice note deletes the recording.</p>
      {failed ? <p role="alert" className="form-error">The conversation could not be loaded. Refresh to try again.</p>
        : messages.length === 0 ? <p className="empty">No messages are kept.</p>
        : (
          <ol className="convo-list">
            {messages.map((message) => (
              <li key={message.id} className={message.mine ? "is-mine" : ""}>
                <span className="convo-meta">{message.mine ? learnerName : message.senderName} · {WHEN.format(new Date(message.at))}</span>
                {message.kind === "text" ? <p>{message.body}</p> : voice
                  ? <audio controls preload="none" src={`/api/social/voice/${message.id}`}><a href={`/api/social/voice/${message.id}`}>Voice note, {message.seconds ?? 0} seconds</a></audio>
                  : <p>Voice note, {message.seconds ?? 0} seconds (playback is not switched on).</p>}
                <form action={deleteMessageAction}>
                  <input type="hidden" name="messageId" value={message.id} />
                  <button type="submit" className="text-button small" aria-label={`Delete this message from ${message.mine ? learnerName : message.senderName}`}><Trash size={14} /> Delete</button>
                </form>
              </li>
            ))}
          </ol>
        )}
    </section>
  );
}
