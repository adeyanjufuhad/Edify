import type { NextRequest } from "next/server";
import { getAuth } from "@/lib/auth/server";

// Signs out-of-date sessions back in (or sends visitors to /login) before protected pages render.
export default function proxy(request: NextRequest) {
  return getAuth().middleware({ loginUrl: "/login" })(request);
}

export const config = { matcher: ["/study/:path*", "/profiles/:path*"] };
