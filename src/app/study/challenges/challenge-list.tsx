import Link from "next/link";
import { ArrowRight, Check, Clock, Target, Trophy } from "@/components/icons";
import type { ChallengeItem } from "@/lib/social/challenges";

const WHEN = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "Africa/Lagos" });

export function statusLabel(item: ChallengeItem): { text: string; tone: "ready" | "done" | "idle" } {
  switch (item.slot) {
    case "your-turn": return { text: item.iAmChallenger ? "Take yours" : "Your turn", tone: "ready" };
    case "continue": return { text: "Continue", tone: "ready" };
    case "waiting": return { text: `Waiting for ${item.other.name}`, tone: "idle" };
    case "finished": return item.result === "won" ? { text: "You won", tone: "done" } : item.result === "lost" ? { text: "You lost", tone: "idle" } : { text: "Draw", tone: "idle" };
    default: return { text: item.status === "expired" ? "Ran out of time" : item.status === "declined" ? "Declined" : "Cancelled", tone: "idle" };
  }
}

function Row({ item }: { item: ChallengeItem }) {
  const label = statusLabel(item);
  const Icon = item.slot === "finished" && item.result === "won" ? Trophy : item.slot === "finished" ? Check : item.slot === "waiting" ? Clock : Target;
  const detail = item.slot === "finished" && item.mine.score !== null && item.theirs.score !== null
    ? `You ${item.mine.score} – ${item.theirs.score} ${item.other.name} · ${item.count} questions`
    : `${item.iAmChallenger ? "You challenged" : "From"} ${item.other.name} · ${item.count} questions · ${item.minutes} min`;
  return (
    <li>
      <Link href={`/study/challenges/${item.id}`}>
        <span className={`challenge-mark ${item.slot === "your-turn" || item.slot === "continue" ? "is-turn" : item.slot === "waiting" || item.slot === "ended" ? "is-idle" : ""}`} aria-hidden="true"><Icon size={20} /></span>
        <span className="challenge-info">
          <strong>{item.subject} · {item.term}</strong>
          <small>{detail}{(item.slot === "your-turn") && <> · start by {WHEN.format(new Date(item.expiresAt))}</>}</small>
        </span>
        <span className={`status-pill ${label.tone === "ready" ? "ready" : label.tone === "done" ? "done" : ""}`}>{label.text}</span>
        <ArrowRight size={16} />
      </Link>
    </li>
  );
}

const GROUPS: { title: string; slots: ChallengeItem["slot"][]; limit: number }[] = [
  { title: "Needs you", slots: ["your-turn", "continue"], limit: 20 },
  { title: "Waiting for a classmate", slots: ["waiting"], limit: 20 },
  { title: "Finished", slots: ["finished"], limit: 8 },
  { title: "Ended without a result", slots: ["ended"], limit: 4 },
];

// Challenges in groups, most urgent first. Empty groups are left out.
export default function ChallengeList({ items }: { items: ChallengeItem[] }) {
  return (
    <div>
      {GROUPS.map((group) => {
        const rows = items.filter((item) => group.slots.includes(item.slot)).slice(0, group.limit);
        return rows.length ? (
          <section key={group.title} className="challenge-group" aria-label={group.title}>
            <h3>{group.title}</h3>
            <ul className="challenge-rows">{rows.map((item) => <Row key={item.id} item={item} />)}</ul>
          </section>
        ) : null;
      })}
    </div>
  );
}
