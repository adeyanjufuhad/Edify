import "server-only";
import { database } from "@/lib/db";
import { PRESENT_SOCIAL_TABLES_QUERY, accountDeletionStatements, learnerDeletionStatements } from "@/lib/account-deletion-sql";

// Which optional tables (classmate tables, parent_settings) exist in this database (migrations are applied by hand).
async function presentSocialTables() {
  const rows = await database().query(PRESENT_SOCIAL_TABLES_QUERY.text, PRESENT_SOCIAL_TABLES_QUERY.params);
  return rows.map((row) => String((row as { name: string }).name));
}

// `parentId` and `parentEmail` must come from the signed-in session, never from the browser.
export async function deleteParentAccount(parentId: string, parentEmail: string) {
  const sql = database();
  const statements = accountDeletionStatements(parentId, parentEmail, await presentSocialTables());
  await sql.transaction(statements.map(({ text, params }) => sql.query(text, params)));
}

// `parentId` comes from the session. A learner id that is not this parent's deletes nothing.
export async function deleteLearnerData(parentId: string, learnerId: string) {
  const sql = database();
  const statements = learnerDeletionStatements(parentId, learnerId, await presentSocialTables());
  await sql.transaction(statements.map(({ text, params }) => sql.query(text, params)));
}
