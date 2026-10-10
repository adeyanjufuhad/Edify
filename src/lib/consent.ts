import "server-only";
import { cache } from "react";
import { database } from "@/lib/db";
import { LEGAL_VERSION } from "@/data/legal";

// Has this parent agreed to the privacy policy and terms as they read today?
// Cached for one request, because every study page asks.
export const hasAcceptedLegal = cache(async (parentId: string): Promise<boolean> => {
  const rows = await database()`select 1 from public.parent_consents where parent_id = ${parentId} and legal_version = ${LEGAL_VERSION}`;
  return rows.length > 0;
});

// The version and time come from the server, never from the browser. Safe to repeat.
export async function recordLegalConsent(parentId: string) {
  await database()`insert into public.parent_consents (parent_id, legal_version) values (${parentId}, ${LEGAL_VERSION}) on conflict (parent_id, legal_version) do nothing`;
}
