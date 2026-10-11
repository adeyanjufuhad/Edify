// The statements that delete a parent's whole account, or one learner. They run in one transaction (all or nothing).
// No imports on purpose: scripts/*.test.mjs run these same statements against a real Postgres engine.
//
// Deleted with a parent: every learner of the parent and their lesson progress and notes (lesson_progress has no
// foreign key, so it is removed first), their CBT attempts, everything the classmate features hold for them (links,
// chat messages, voice-note files, challenges, presence, reports, codes), the parent's agreement records, leftover
// sign-in codes, and the Neon Auth user (which cascades to its sessions, accounts and organisation memberships).
//
// Kept on purpose: public.payments rows. They are unlinked from the parent and the learner but still hold the
// checkout email, plan, amount, reference and dates, for accounting, refunds and disputes. Unpaid orders are
// kept as well, so a checkout that is still open on Paystack can still be matched when its payment arrives.

// The classmate tables (db/migrations 010 to 013). Each also has `on delete cascade` foreign keys, so deleting a
// learner would remove this data anyway; the explicit statements below say so in plain SQL and keep working if a
// foreign key is ever changed. A statement is only produced when every table it touches exists, so deleting an
// account still works on a database where those migrations have not been applied yet.
export const SOCIAL_TABLES = [
  "learner_social_settings", "classmate_invites", "classmate_links", "challenges", "challenge_entries", "classmate_reports",
  "social_events", "learner_presence", "chat_messages", "chat_reads", "chat_voice_clips",
] as const;

// Returns the names, out of SOCIAL_TABLES, that exist in the public schema.
export const PRESENT_SOCIAL_TABLES_QUERY = {
  text: "select name from unnest($1::text[]) as name where to_regclass('public.' || name) is not null",
  params: [SOCIAL_TABLES as unknown as string[]],
};

type Statement = { text: string; params: string[] };

// `scope` is a whole parent account or one learner of a parent. The learner set is always read from
// learner_profiles with the parent id, so the ids come from the session, never from the browser.
function socialDeletionStatements(scope: { parentId: string; learnerId?: string }, present: readonly string[]): Statement[] {
  const has = (...names: string[]) => names.every((name) => present.includes(name));
  const wholeAccount = scope.learnerId === undefined;
  const params = wholeAccount ? [scope.parentId] : [scope.learnerId!, scope.parentId];
  const learners = wholeAccount
    ? "(select id from public.learner_profiles where parent_id = $1)"
    : "(select id from public.learner_profiles where id = $1 and parent_id = $2)";
  const links = `(select id from public.classmate_links where learner_a in ${learners} or learner_b in ${learners})`;
  const out: Statement[] = [];
  const add = (needs: string[], text: string) => { if (has(...needs)) out.push({ text, params }); };

  add(["chat_voice_clips", "chat_messages", "classmate_links"], `delete from public.chat_voice_clips where message_id in (select id from public.chat_messages where link_id in ${links} or sender_id in ${learners})`);
  add(["chat_reads", "classmate_links"], `delete from public.chat_reads where learner_id in ${learners} or link_id in ${links}`);
  add(["chat_messages", "classmate_links"], `delete from public.chat_messages where sender_id in ${learners} or link_id in ${links}`);
  add(["classmate_reports"], `delete from public.classmate_reports where reporter_id in ${learners} or reported_id in ${learners}`);
  add(["challenge_entries", "challenges"], `delete from public.challenge_entries where learner_id in ${learners} or challenge_id in (select id from public.challenges where challenger_id in ${learners} or opponent_id in ${learners})`);
  add(["challenges"], `delete from public.challenges where challenger_id in ${learners} or opponent_id in ${learners}`);
  add(["classmate_links"], `delete from public.classmate_links where learner_a in ${learners} or learner_b in ${learners}`);
  add(["classmate_invites"], `delete from public.classmate_invites where learner_id in ${learners} or used_by_learner in ${learners}${wholeAccount ? " or parent_id = $1" : ""}`);
  add(["learner_presence"], `delete from public.learner_presence where learner_id in ${learners}`);
  add(["learner_social_settings"], `delete from public.learner_social_settings where learner_id in ${learners}`);
  add(["social_events"], `delete from public.social_events where learner_id in ${learners}${wholeAccount ? " or parent_id = $1" : ""}`);
  return out;
}

// `socialTables` are the classmate tables that exist in the database (see PRESENT_SOCIAL_TABLES_QUERY).
export function accountDeletionStatements(parentId: string, parentEmail: string, socialTables: readonly string[] = []): Statement[] {
  return [
    { text: "update public.payments set parent_id = null, profile_id = null where parent_id = $1", params: [parentId] },
    { text: "delete from public.lesson_progress where user_id in (select id::text from public.learner_profiles where parent_id = $1)", params: [parentId] },
    { text: "delete from public.cbt_attempts where learner_id in (select id from public.learner_profiles where parent_id = $1)", params: [parentId] },
    ...socialDeletionStatements({ parentId }, socialTables),
    { text: "delete from public.learner_profiles where parent_id = $1", params: [parentId] },
    { text: "delete from public.parent_consents where parent_id = $1", params: [parentId] },
    // The length check keeps an empty email (which would "match" every row) from ever clearing other people's codes.
    { text: "delete from neon_auth.verification where char_length(btrim($1)) > 3 and position(lower($1) in lower(identifier)) > 0", params: [parentEmail] },
    { text: 'delete from neon_auth."user" where id = $1', params: [parentId] },
  ];
}

// Removing one learner: their progress, notes, test attempts and classmate data, then the learner. The parent id is
// part of every statement, so a learner id that is not this parent's deletes nothing. Payment records stay (the
// foreign key unlinks them from the learner).
export function learnerDeletionStatements(parentId: string, learnerId: string, socialTables: readonly string[] = []): Statement[] {
  const owned = [learnerId, parentId];
  return [
    { text: "delete from public.lesson_progress where user_id in (select id::text from public.learner_profiles where id = $1 and parent_id = $2)", params: owned },
    { text: "delete from public.cbt_attempts where learner_id in (select id from public.learner_profiles where id = $1 and parent_id = $2)", params: owned },
    ...socialDeletionStatements({ parentId, learnerId }, socialTables),
    { text: "delete from public.learner_profiles where id = $1 and parent_id = $2", params: owned },
  ];
}
