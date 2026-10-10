import Link from "next/link";
import { randomInt } from "node:crypto";
import { redirect } from "next/navigation";
import { ArrowLeft } from "@/components/icons";
import { buildPaper, paperTitle, parsePaperSpec, specParams } from "@/lib/cbt";
import { requireLearner } from "@/lib/session";
import CbtExam from "./cbt-exam";
import "../cbt.css";

export const metadata = { title: "CBT test — Edify" };

export default async function ExamPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const learner = await requireLearner();
  const raw = await searchParams;
  const params = new URLSearchParams(Object.entries(raw).flatMap(([key, value]) => (typeof value === "string" ? [[key, value]] : [])));
  const spec = parsePaperSpec(params);

  if ("error" in spec) {
    return (
      <div className="page">
        <section className="panel cbt-problem" role="alert">
          <h1>This test can’t start</h1>
          <p>{spec.error}</p>
          <Link href="/study/cbt" className="pill-button"><ArrowLeft /> Back to CBT tests</Link>
        </section>
      </div>
    );
  }

  // Every paper gets a seed in its URL, so reloading the page keeps the same questions.
  if (!/^\d{1,10}$/.test(params.get("seed") ?? "") || spec.seed === 0) {
    redirect(`/study/cbt/exam?${specParams({ ...spec, seed: randomInt(1, 2 ** 31) })}`);
  }

  return (
    <CbtExam
      title={paperTitle(spec.mode, spec.lessons)}
      subject={`${spec.bank.subject} · ${spec.bank.term}`}
      questions={buildPaper(spec)}
      minutes={spec.minutes}
      params={specParams(spec)}
      storageKey={`edify-cbt:${learner.id}:${specParams(spec)}`}
    />
  );
}
