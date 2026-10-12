import Link from "next/link";
import { ArrowLeft, Trophy } from "@/components/icons";
import { RETENTION_DAYS } from "@/lib/social-rules";
import { challengeSubjects } from "@/lib/social/challenge-papers";
import { leaderboard, type BoardEntry } from "@/lib/social/challenges";
import { pageActor } from "@/lib/social/guard";
import Gate from "../gate";
import "../../cbt/cbt.css";
import "../challenges.css";

export const metadata = { title: "Leaderboard — Edify" };

export default async function LeaderboardPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { learner, blocked } = await pageActor();
  if (blocked) return <Gate blocked={blocked} learnerId={learner.id} />;
  const { subject } = await searchParams;
  const subjects = challengeSubjects(learner.stream);
  const chosen = typeof subject === "string" && subjects.some((entry) => entry.slug === subject) ? subject : null;
  let board: BoardEntry[] = [];
  let loadFailed = false;
  try { board = await leaderboard(learner.id, chosen); } catch { loadFailed = true; }
  const anyPlayed = board.some((entry) => entry.played > 0);

  return (
    <div className="page">
      <Link href="/study/challenges" className="text-link small cbt-back"><ArrowLeft size={14} /> All challenges</Link>
      <header className="page-head">
        <div>
          <span className="kicker">Classmate leaderboard</span>
          <h1>Who is winning?</h1>
          <p>You and the classmates you are linked with, from challenges finished in the last {RETENTION_DAYS.leaderboardWindow} days. Most wins first.</p>
        </div>
      </header>
      {subjects.length > 1 && (
        <nav className="board-filters" aria-label="Filter by subject">
          <Link href="/study/challenges/leaderboard" className={chosen === null ? "is-on" : ""} aria-current={chosen === null ? "true" : undefined}>All subjects</Link>
          {subjects.map((entry) => <Link key={entry.slug} href={`/study/challenges/leaderboard?subject=${entry.slug}`} className={chosen === entry.slug ? "is-on" : ""} aria-current={chosen === entry.slug ? "true" : undefined}>{entry.name}</Link>)}
        </nav>
      )}
      <section className="panel" aria-label="Leaderboard">
        {loadFailed ? <p role="alert" className="form-error">The leaderboard could not be loaded. Refresh the page to try again.</p>
          : board.length <= 1 && !anyPlayed ? <div className="empty"><Trophy size={22} /><p>Nobody has finished a challenge yet. Challenge a classmate to get on the board.</p></div>
          : (
            <div className="board-wrap">
              <table className="board">
                <caption className="sr-only">Challenge results</caption>
                <thead><tr><th scope="col">#</th><th scope="col">Classmate</th><th scope="col">Played</th><th scope="col">Won</th><th scope="col">Drawn</th><th scope="col">Lost</th><th scope="col">Average</th></tr></thead>
                <tbody>
                  {board.map((entry) => (
                    <tr key={entry.learnerId} className={entry.isMe ? "is-me" : ""}>
                      <td>{entry.rank ?? "–"}</td>
                      <td><strong>{entry.isMe ? `${entry.name} (you)` : entry.name}</strong><small>{entry.classLevel}</small></td>
                      <td>{entry.played}</td><td>{entry.wins}</td><td>{entry.draws}</td><td>{entry.losses}</td>
                      <td>{entry.played ? `${entry.avgPercent}%` : "–"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        <p className="board-note">Ranked by wins, then draws, then average score. Only first names and classes are shown, and only to classmates you are linked with.</p>
      </section>
    </div>
  );
}
