import { redirect } from "next/navigation";

// The classmate settings moved inside the study app (/study/classmates). Old links keep working.
export default async function OldClassmatesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const { learner } = await searchParams;
  redirect(typeof learner === "string" ? `/study/classmates?learner=${encodeURIComponent(learner)}` : "/study/classmates");
}
