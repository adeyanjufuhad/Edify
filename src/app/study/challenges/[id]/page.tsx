import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "@/components/icons";
import { formatDuration } from "@/lib/cbt";
import { getChallenge, type ChallengeDetail } from "@/lib/social/challenges";
import { pageActor } from "@/lib/social/guard";
import Gate from "../gate";
import { cancelChallengeAction, declineChallengeAction, startChallengeAction } from "../actions";
import { statusLabel } from "../challenge-list";
import "../../cbt/cbt.css";
import "../challenges.css";

export const metadata = { title: "Challenge — Edify" };

const WHEN = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", timeZone: "Africa/Lagos" });
const LETTERS = ["A", "B", "C", "D"];

export default async function ChallengePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { learner, blocked } = await pageActor();
  if (blocked) return <Gate blocked={blocked} learnerId={learner.id} />;
  const { id } = await params;
  const { problem } = await searchParams;
  const challenge = await getChallenge(learner.id, id).catch(() => null);
  if (!challenge) notFound();
  const label = statusLabel(challenge);

  return (
    <div className="page">
      <Link href="/study/challenges" className="text-link small cbt-back"><ArrowLeft size={14} /> All challenges</Link>
      <header className="page-head">
        <div>
          <span className="kicker">Challenge · {label.text}</span>
          <h1>{challenge.subject} · {challenge.term}</h1>
          <p>{challenge.iAmChallenger ? "You challenged" : "Challenged by"} {challenge.other.name} ({challenge.other.classLevel}) · {challenge.count} questions · {challenge.minutes} minutes</p>
        </div>
      </header>
      {problem === "start" && <p role="alert" className="form-error">That challenge could not be started. It may have ended, or been handed in already.</p>}
      <Body challenge={challenge} />
      {challenge.review && <Review challenge={challenge} review={challenge.review} />}
    </div>
  );
}

function Body({ challenge }: { challenge: ChallengeDetail }) {
  const { slot, other } = challenge;
  if (slot === "your-turn" || slot === "continue") {
    return (
      <section className="panel" aria-labelledby="ready-title">
        <header className="panel-head"><h2 id="ready-title">{slot === "continue" ? "Your paper is open" : "Ready when you are"}</h2></header>
        <ul className="challenge-rules">
          <li>{challenge.count} questions, {challenge.minutes} minutes. You and {other.name} get exactly the same questions.</li>
          <li>{slot === "continue" ? "Your clock is already running, even if the page is closed. Carry on where you stopped." : "The clock starts when you press the button and keeps running if you close the page. You only get one try."}</li>
          <li>Your answers are marked on the server. You see {other.name}’s score and every answer once you have both finished.</li>
          <li>{slot === "your-turn" ? <>Start before {WHEN.format(new Date(challenge.expiresAt))}, or the challenge ends with no winner.</> : <>If time runs out before you hand in, the paper counts as zero.</>}</li>
        </ul>
        <div className="challenge-actions">
          <form action={startChallengeAction}>
            <input type="hidden" name="challengeId" value={challenge.id} />
            <button type="submit" className="pill-button">{slot === "continue" ? "Continue" : "Start the challenge"} <ArrowRight /></button>
          </form>
          {slot === "your-turn" && !challenge.iAmChallenger && (
            <form action={declineChallengeAction}><input type="hidden" name="challengeId" value={challenge.id} /><button type="submit" className="text-button">No thanks, decline</button></form>
          )}
          {slot === "your-turn" && challenge.iAmChallenger && challenge.theirs.phase === "new" && (
            <form action={cancelChallengeAction}><input type="hidden" name="challengeId" value={challenge.id} /><button type="submit" className="text-button">Cancel this challenge</button></form>
          )}
        </div>
      </section>
    );
  }
  if (slot === "waiting") {
    return (
      <section className="panel" aria-labelledby="waiting-title">
        <header className="panel-head"><h2 id="waiting-title">You’re done. Now we wait for {other.name}.</h2></header>
        <p>You scored <strong>{challenge.mine.score} out of {challenge.mine.total}</strong> in {formatDuration(challenge.mine.durationSeconds ?? 0)}. {other.name}’s score, the winner and every answer appear here once {other.name} has finished too.</p>
        <p className="muted">{challenge.theirs.phase === "new" ? <>{other.name} has until {WHEN.format(new Date(challenge.expiresAt))} to start.</> : <>{other.name} has started and is working on it.</>}</p>
        {challenge.iAmChallenger && challenge.theirs.phase === "new" && (
          <form action={cancelChallengeAction}><input type="hidden" name="challengeId" value={challenge.id} /><button type="submit" className="text-button">Cancel this challenge</button></form>
        )}
      </section>
    );
  }
  if (slot === "finished") {
    const mine = challenge.mine;
    const theirs = challenge.theirs;
    const won = challenge.result === "won";
    const lost = challenge.result === "lost";
    return (
      <section aria-labelledby="result-title">
        <h2 id="result-title" className="sr-only">Result</h2>
        <div className="versus">
          <div className={`versus-side ${won ? "is-winner" : ""}`}>
            <strong className="versus-name">You</strong>
            <span className="versus-score">{mine.score}<small> / {mine.total}</small></span>
            <span className="versus-time">{formatDuration(mine.durationSeconds ?? 0)}</span>
            {won && <span className="versus-tag">Winner</span>}
          </div>
          <span className="versus-mid" aria-hidden="true">vs</span>
          <div className={`versus-side ${lost ? "is-winner" : ""}`}>
            <strong className="versus-name">{other.name}</strong>
            <span className="versus-score">{theirs.score}<small> / {theirs.total}</small></span>
            <span className="versus-time">{formatDuration(theirs.durationSeconds ?? 0)}</span>
            {lost && <span className="versus-tag">Winner</span>}
          </div>
        </div>
        <p className="muted" style={{ marginTop: 14 }}>{won ? "You won! " : lost ? `${other.name} won this one. ` : "It’s a draw, with the same score and the same time. "}{mine.score === theirs.score && mine.durationSeconds !== theirs.durationSeconds ? "The scores were level, so the faster finish won." : ""}</p>
        <div className="challenge-actions" style={{ marginTop: 10 }}>
          <Link href={`/study/challenges/new?with=${challenge.linkId}`} className="pill-button small">Challenge {other.name} again <ArrowRight /></Link>
          <Link href="/study/challenges/leaderboard" className="pill-outline small">See the leaderboard</Link>
        </div>
      </section>
    );
  }
  return (
    <section className="panel" aria-labelledby="ended-title">
      <header className="panel-head"><h2 id="ended-title">{challenge.status === "declined" ? "This challenge was declined." : challenge.status === "cancelled" ? "This challenge was cancelled." : "This challenge ran out of time."}</h2></header>
      <p>It has no winner and doesn’t count on the leaderboard.</p>
      <Link href="/study/challenges" className="pill-outline small">Back to challenges</Link>
    </section>
  );
}

function Review({ challenge, review }: { challenge: ChallengeDetail; review: NonNullable<ChallengeDetail["review"]> }) {
  const name = challenge.other.name;
  return (
    <section className="cbt-review" aria-labelledby="review-title">
      <header className="cbt-review-head"><h2 id="review-title">Every question, with both answers</h2></header>
      <ol className="cbt-review-list">
        {review.map((item, index) => {
          const status = item.mine === null ? "blank" : item.mine === item.correct ? "right" : "wrong";
          return (
            <li key={index} className={`cbt-review-item is-${status}`}>
              <div className="question-meta">
                <span>Q{String(index + 1).padStart(2, "0")}</span>
                <span className={`cbt-verdict is-${status}`}>{status === "right" ? "You were right" : status === "wrong" ? "You were wrong" : "You left it blank"}</span>
              </div>
              <h3>{item.prompt}</h3>
              <ul className="cbt-review-options">
                {item.options.map((option, optionIndex) => {
                  const isCorrect = optionIndex === item.correct;
                  return (
                    <li key={optionIndex} className={isCorrect ? "is-correct" : item.mine === optionIndex ? "is-wrong" : ""}>
                      <b>{LETTERS[optionIndex]}</b>
                      <span>{option}</span>
                      {isCorrect && <em><Check size={14} /> Correct</em>}
                      {item.mine === optionIndex && <em className="review-pick">You</em>}
                      {item.theirs === optionIndex && <em className="review-pick">{name}</em>}
                    </li>
                  );
                })}
              </ul>
              {item.explanation && <div className="answer"><p>{item.explanation}</p></div>}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
