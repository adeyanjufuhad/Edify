import { NextResponse } from "next/server";
import { LEARNER_COOKIE } from "@/lib/learners";

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/#who", request.url));
  response.cookies.delete(LEARNER_COOKIE);
  return response;
}
