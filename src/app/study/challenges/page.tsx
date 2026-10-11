import Link from "next/link";
import { ArrowRight, Plus, Trophy, Users } from "@/components/icons";
import Mascot from "@/components/mascot";
import { CURRICULUM_CLASS } from "@/data/curriculum";
import { leaderboard, listChallenges, type BoardEntry, type ChallengeItem } from "@/lib/social/challenges";
import { classDirectory, listClassmates, listRequests, type ClassEntry, type Classmate, type Request } from "@/lib/social/links";
import { pageActor } from "@/lib/social/guard";
import ChallengeList from "./challenge-list";
import ClassmateList from "./classmate-list";
import { ClassList, RequestList } from "./class-list";
import { PulseProvider } from "./use-pulse";
import Gate from "./gate";
import "../cbt/cbt.css";
import "./challenges.css";

export const metadata = { title: "Challenges — Edify" };

const NOTICES: Record<string, string> = {
  blocked: "You blocked that classmate. You won’t see each other any more.",
  accepted: "You are classmates now. You can challenge each other, and chat if your parents switched chat on.",
  declined: "Done. They won’t be able to ask you again.",
  unavailable: "That classmate isn’t available any more.",
  reported: "Thank you. We saved your report and blocked that classmate. Please tell a parent or a teacher you trust as well.",
};

export default async function ChallengesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { learner, settings, blocked } = await pageActor();
  if (blocked) return <Gate blocked={blocked} learnerId={learner.id} />;
  const { notice } = await searchParams;

  let classmates: Classmate[] = [];
  let items: ChallengeItem[] = [];
  let board: BoardEntry[] = [];
  let classList: ClassEntry[] = [];
  let requests: Request[] = [];
  let loadFailed = false;
  try {
    [classmates, items, board, classList, requests] = await Promise.all([
      listClassmates(learner.id), listChallenges(learner.id), leaderboard(learner.id, null),
      settings.classVisible ? classDirectory(learner) : Promise.resolve([]), listRequests(learner.id),
    ]);
  } catch { loadFailed = true; }
  const live = settings.presence || settings.chat;

  return (
    <PulseProvider enabled={live}>
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

      {requests.length > 0 && (
        <section className="panel" aria-labelledby="requests-title">
          <header className="panel-head"><h2 id="requests-title">Classmate requests</h2></header>
          <RequestList requests={requests} />
        </section>
      )}

      <div className="challenge-layout">
        <div className="challenge-column">
        <section className="panel" aria-labelledby="class-title">
          <header className="panel-head"><h2 id="class-title">In your class</h2><span className="panel-sub">{learner.classLevel}{learner.school && <> · {learner.school}</>}</span></header>
          {!settings.classVisible ? (
            <div className="empty">
              <Users size={22} />
              <p>See who in your class is online and challenge them. A parent switches on <b>Visible to my class</b> for you first, and only classmates whose parents did the same appear here.</p>
              <p><Link href={`/study/classmates?learner=${learner.id}#step-switches`} className="pill-outline small">Open classmate settings (for parents)</Link></p>
            </div>
          ) : classList.length ? <ClassList entries={classList} showOnline={settings.presence} /> : (
            <div className="empty"><Users size={22} /><p>Nobody else in your class has joined yet. When classmates’ parents switch on <b>Visible to my class</b>, they appear here.</p></div>
          )}
        </section>

        <section className="panel" aria-labelledby="classmates-title">
          <header className="panel-head"><h2 id="classmates-title">Your classmates</h2><Link href={`/study/classmates?learner=${learner.id}#step-add`} className="text-link small"><Plus size={14} /> Add a classmate</Link></header>
          {classmates.length ? <><ClassmateList classmates={classmates} features={{ presence: settings.presence, chat: settings.chat, voice: settings.voice }} /><p className="classmate-add-note">These are the classmates you can challenge and chat with. Want someone else? Challenge them from <b>In your class</b>, or ask a parent to use <b>Add a classmate</b>.</p></> : (
            <div className="empty">
              <Users size={22} />
              <p>No classmates yet. Challenge someone from <b>In your class</b>, or ask a parent to add a classmate with a one-time code.</p>
              <p><Link href={`/study/classmates?learner=${learner.id}#step-add`} className="pill-outline small"><Plus size={14} /> Ask a parent to add a classmate</Link></p>
            </div>
          )}
        </section>
        </div>

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
    </PulseProvider>
  );
}
