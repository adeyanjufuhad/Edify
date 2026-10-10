import { Monitor } from "@/components/icons";
import Mascot from "@/components/mascot";
import { CURRICULUM_CLASS } from "@/data/curriculum";
import { bankSummaries, listAttempts, type AttemptSummary } from "@/lib/cbt";
import { requireLearner } from "@/lib/session";
import { hasPlan } from "@/lib/access";
import Link from "next/link";
import AttemptList from "./attempt-list";
import CbtSetup from "./cbt-setup";
import "./cbt.css";

export const metadata = { title: "CBT tests — Edify" };

export default async function CbtPage() {
  const learner = await requireLearner();
  if (!hasPlan(learner, "gold")) return <div className="page"><section className="panel"><h1>CBT tests are included in Gold.</h1><p>Ask your parent to choose Gold for timed exam-style tests and a full review of your answers.</p><Link href={`/billing?learner=${learner.id}`} className="pill-button">View plans</Link></section></div>;
  const banks = bankSummaries();
  let attempts: AttemptSummary[] = [];
  let loadFailed = false;
  try { attempts = await listAttempts(learner.id, 8); } catch { loadFailed = true; }

  return (
    <div className="page">
      <header className="page-head hello-head">
        <Mascot pose="read" className="hello-mascot" />
        <div>
          <span className="kicker">Computer-based tests</span>
          <h1>CBT tests</h1>
          <p>Answer exam-style questions on screen, one at a time, against the clock, just like a real CBT exam. You’ll get your grade and every answer explained at the end.</p>
        </div>
      </header>

      {learner.classLevel !== CURRICULUM_CLASS && <p className="form-success">{learner.classLevel} lessons are still being written, so these tests use the {CURRICULUM_CLASS} lessons that are ready.</p>}

      <div className="cbt-layout">
        <section className="panel" aria-labelledby="cbt-new">
          <header className="panel-head"><h2 id="cbt-new">Start a new test</h2></header>
          {banks.length ? <CbtSetup banks={banks} /> : <p className="empty">Tests appear here as soon as the first lessons with practice questions are ready.</p>}
        </section>

        <section className="panel cbt-history" aria-labelledby="cbt-recent">
          <header className="panel-head"><h2 id="cbt-recent">Recent attempts</h2></header>
          {loadFailed ? <p role="alert" className="form-error">Your past attempts could not be loaded. Refresh the page to try again.</p>
            : attempts.length ? <AttemptList attempts={attempts} />
            : <div className="empty"><Monitor size={22} /><p>Your finished tests will be listed here with their grades, so you can see yourself improve.</p></div>}
          <ul className="cbt-tips">
            <li>Use <kbd>A</kbd>–<kbd>D</kbd> to answer, <kbd>N</kbd> and <kbd>P</kbd> to move, and <kbd>F</kbd> to flag a question to come back to.</li>
            <li>The test hands itself in when the timer reaches zero.</li>
            <li>Your answers are kept on this device if the connection drops.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
