import "server-only";
import { database } from "@/lib/db";
import { accountDeletionStatements } from "@/lib/account-deletion-sql";

// `parentId` and `parentEmail` must come from the signed-in session, never from the browser.
export async function deleteParentAccount(parentId: string, parentEmail: string) {
  const sql = database();
  await sql.transaction(accountDeletionStatements(parentId, parentEmail).map(({ text, params }) => sql.query(text, params)));
}
