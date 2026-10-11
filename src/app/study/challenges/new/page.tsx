import Link from "next/link";
import { ArrowLeft } from "@/components/icons";
import { LIMITS } from "@/lib/social-rules";
import { challengeSubjects } from "@/lib/social/challenge-papers";
import { pageActor } from "@/lib/social/guard";
import { listClassmates } from "@/lib/social/links";
import Gate from "../gate";
import NewChallengeForm from "./new-form";
import "../../cbt/cbt.css";
import "../challenges.css";

export const metadata = { title: "New challenge — Edify" };

export default async function NewChallengePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { learner, blocked } = await pageActor();
  if (blocked) return <Gate blocked={blocked} learnerId={learner.id} />;
  const { with: withLink } = await searchParams;
  const classmates = await listClassmates(learner.id, true).catch(() => []);
  const subjects = challengeSubjects();

  return (
    <div className="page challenge-new">
      <Link href="/study/challenges" className="text-link small cbt-back"><ArrowLeft size={14} /> All challenges</Link>
      <header className="page-head">
        <div>
          <span className="kicker">New challenge</span>
          <h1>Send a challenge</h1>
          <p>Choose a classmate, a subject and a term. You both answer the same questions in your own time, and the server marks them.</p>
        </div>
      </header>
      <section className="panel" aria-label="Challenge settings">
        {!classmates.length ? <p className="empty">You need a linked classmate first. <Link href="/study/challenges" className="text-link small">Back to challenges</Link></p>
          : !subjects.length ? <p className="empty">Challenges appear as soon as the first lessons with practice questions are ready.</p>
          : <NewChallengeForm
              classmates={classmates.map(({ linkId, name, classLevel }) => ({ linkId, name, classLevel }))}
              subjects={subjects}
              counts={[...LIMITS.challengeCounts]}
              initialLink={typeof withLink === "string" ? withLink : ""}
              validDays={LIMITS.challengeValidDays}
            />}
      </section>
    </div>
  );
}
