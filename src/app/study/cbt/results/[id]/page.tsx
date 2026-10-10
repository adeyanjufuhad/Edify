import { notFound } from "next/navigation";
import { getAttempt } from "@/lib/cbt";
import { requireLearner } from "@/lib/session";
import ResultsView from "./results-view";
import "../../cbt.css";

export const metadata = { title: "CBT result — Edify" };

export default async function ResultsPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ show?: string | string[] }> }) {
  const learner = await requireLearner();
  const { id } = await params;
  const { show } = await searchParams;
  const attempt = await getAttempt(learner.id, id);
  if (!attempt) notFound();
  return <ResultsView attempt={attempt} show={show} />;
}
