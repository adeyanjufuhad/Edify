import { redirect } from "next/navigation";
import { getPlay } from "@/lib/social/challenges";
import { pageActor } from "@/lib/social/guard";
import CbtExam from "../../../cbt/exam/cbt-exam";
import "../../../cbt/cbt.css";

export const metadata = { title: "Challenge — Edify" };

// The exam screen for a challenge. Only reachable once the learner has started it (the server stamped their start
// time), and only while their paper is still open. The questions carry no answers.
export default async function PlayPage({ params }: { params: Promise<{ id: string }> }) {
  const { learner, blocked } = await pageActor();
  const { id } = await params;
  if (blocked) redirect("/study/challenges");
  const play = await getPlay(learner.id, id).catch(() => null);
  if (!play) redirect(`/study/challenges/${encodeURIComponent(id)}`);
  return (
    <CbtExam
      title={play.title}
      subject={play.subject}
      questions={play.questions}
      minutes={play.minutes}
      params=""
      storageKey={`edify-challenge:${learner.id}:${id}`}
      challenge={{ id, secondsLeft: play.secondsLeft }}
    />
  );
}
