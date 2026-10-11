import Link from "next/link";
import { ArrowRight, Trophy, Users } from "@/components/icons";
import Mascot from "@/components/mascot";
import { CURRICULUM_CLASS } from "@/data/curriculum";
import { leaderboard, listChallenges, type BoardEntry, type ChallengeItem } from "@/lib/social/challenges";
import { listClassmates, type Classmate } from "@/lib/social/links";
import { pageActor } from "@/lib/social/guard";
import ChallengeList from "./challenge-list";
import ClassmateList from "./classmate-list";
import Gate from "./gate";
import "../cbt/cbt.css";
import "./challenges.css";

export const metadata = { title: "Challenges — Edify" };

const NOTICES: Record<string, string> = {
  blocked: "You blocked that classmate. You won’t see each other any more.",
  reported: "Thank you. We saved your report and blocked that classmate. Please tell a parent or a teacher you trust as well.",
};

export default async function ChallengesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { learner, settings, blocked } = await pageActor();
  if (blocked) return <Gate blocked={blocked} learnerId={learner.id} />;
  const { notice } = await searchParams;

  let classmates: Classmate[] = [];
  let items: ChallengeItem[] = [];
  let board: BoardEntry[] = [];
  let loadFailed = false;
  try {
    [classmates, items, board] = await Promise.all([listClassmates(learner.id), listChallenges(learner.id), leaderboard(learner.id, null)]);
  } catch { loadFailed = true; }

  return (
    <div className="page">
      <header className="page-head hello-head">
        <Mascot pose="cheer" className="hello-mascot" />
        <div>
          <span className="kicker">Classmate challenges</span>
          <h1>Challenge a classmate</h1>
          <p>You and a classmate answer the same exam-style questions, each in your own time. The higher score wins, and a tie goes to whoever finished faster.</p>
        </div>
      </header>

      {typeof notice === "string" && NOTICES[notice] && <p role="status" className="form-success challenge-note">{NOTICES[notice]}</p>}
      {learner.classLevel !== CURRICULUM_CLASS && <p className="form-success challenge-note">{learner.classLevel} lessons are still being written, so challenges use the {CURRICULUM_CLASS} lessons that are ready.</p>}
      {loadFailed && <p role="alert" className="form-error challenge-note">Your classmates and challenges could not be loaded. Refresh the page to try again.</p>}

      <div className="challenge-layout">
        <section className="panel" aria-labelledby="classmates-title">
          <header className="panel-head"><h2 id="classmates-title">Your classmates</h2></header>
          {classmates.length ? <ClassmateList classmates={classmates} features={{ presence: settings.presence, chat: settings.chat, voice: settings.voice }} /> : (
            <div className="empty">
              <Users size={22} />
              <p>You aren’t linked with a classmate yet. A link needs both parents: one makes a one-time classmate code and sends it to the other. Only learners in your school and class can be linked.</p>
              <p><Link href={`/profiles/classmates?learner=${learner.id}`} className="text-link small">Parents: open the classmate settings <ArrowRight size={14} /></Link></p>
            </div>
          )}
        </section>

        <section className="panel" aria-labelledby="board-title">
          <header className="panel-head"><h2 id="board-title">Leaderboard</h2><Link href="/study/challenges/leaderboard" className="text-link small">Full table <ArrowRight size={14} /></Link></header>
          {board.some((entry) => entry.played > 0) ? (
            <ol className="board-mini">
              {board.filter((entry) => entry.played > 0).slice(0, 5).map((entry) => (
                <li key={entry.learnerId} className={entry.isMe ? "is-me" : ""}><b>{entry.rank}</b><strong>{entry.isMe ? "You" : entry.name}</strong><span>{entry.wins} won of {entry.played}</span></li>
              ))}
            </ol>
          ) : <div className="empty"><Trophy size={22} /><p>The leaderboard fills up as you and your classmates finish challenges.</p></div>}
        </section>
      </div>

      <section className="panel" aria-labelledby="challenges-title">
        <header className="panel-head"><h2 id="challenges-title">Challenges</h2></header>
        {items.length ? <ChallengeList items={items} /> : <p className="empty">{classmates.length ? "No challenges yet. Pick a classmate above and press Challenge." : "Your challenges will appear here."}</p>}
      </section>
    </div>
  );
}
