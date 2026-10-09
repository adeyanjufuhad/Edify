import { NextResponse } from "next/server";
import { LEARNER_COOKIE, findLearner } from "@/lib/learners";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export async function GET(request: Request, { params }: { params: Promise<{ learner: string }> }) {
  const profile = findLearner((await params).learner);
  if (!profile) return NextResponse.redirect(new URL("/#who", request.url));
  const response = NextResponse.redirect(new URL("/study", request.url));
  response.cookies.set(LEARNER_COOKIE, profile.slug, { path: "/", maxAge: ONE_YEAR_SECONDS, sameSite: "lax", httpOnly: true });
  return response;
}
