import { createNeonAuth } from "@neondatabase/auth/next/server";

type NeonAuth = ReturnType<typeof createNeonAuth>;
let instance: NeonAuth | undefined;

// Created lazily so a missing env var fails the request, not the build.
export function getAuth(): NeonAuth {
  if (instance) return instance;
  const baseUrl = process.env.NEON_AUTH_BASE_URL;
  const secret = process.env.NEON_AUTH_COOKIE_SECRET;
  if (!baseUrl || !secret) throw new Error("Neon Auth is not configured.");
  instance = createNeonAuth({ baseUrl, cookies: { secret } });
  return instance;
}
