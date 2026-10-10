import { getAuth } from "@/lib/auth/server";

type AuthContext = { params: Promise<{ path: string[] }> };

export async function GET(request: Request, context: AuthContext) {
  return getAuth().handler().GET(request, context);
}

export async function POST(request: Request, context: AuthContext) {
  return getAuth().handler().POST(request, context);
}
