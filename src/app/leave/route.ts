import { NextResponse } from "next/server";
import { PROFILE_COOKIE } from "@/lib/account";

// "Switch learner": forget the chosen child and go back to the family's profile list.
export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/profiles", request.url));
  response.cookies.delete(PROFILE_COOKIE);
  return response;
}
