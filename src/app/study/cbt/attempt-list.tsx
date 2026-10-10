import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { formatDuration, type AttemptSummary } from "@/lib/cbt";

const WHEN = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Africa/Lagos" });

// Recent CBT attempts, newest first, each linking to its full results.
export default function AttemptList({ attempts }: { attempts: AttemptSummary[] }) {
  return (
    <ol className="attempt-list">
      {attempts.map((attempt) => (
        <li key={attempt.id}>
          <Link href={`/study/cbt/results/${attempt.id}`}>
            <span className="attempt-grade" data-grade={attempt.grade[0]}>{attempt.grade}</span>
            <span className="attempt-info">
              <strong>{attempt.title}</strong>
              <small>{WHEN.format(new Date(attempt.createdAt))} · {formatDuration(attempt.durationSeconds)}</small>
            </span>
            <span className="attempt-score"><strong>{attempt.score}/{attempt.total}</strong><small>{attempt.percent}%</small></span>
            <ArrowRight size={16} />
          </Link>
        </li>
      ))}
    </ol>
  );
}
