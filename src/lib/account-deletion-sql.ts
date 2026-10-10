// The statements that delete a parent's whole account. No imports on purpose: scripts/account-deletion.test.mjs
// runs these same statements against a real Postgres engine. They run in one transaction (all or nothing).
//
// Deleted: every learner of the parent and their lesson progress and notes (lesson_progress has no foreign key,
// so it is removed first), their CBT attempts, the parent's agreement records, leftover sign-in codes, and the
// Neon Auth user (which cascades to its sessions, accounts and organisation memberships).
//
// Kept on purpose: public.payments rows. They are unlinked from the parent and the learner but still hold the
// checkout email, plan, amount, reference and dates, for accounting, refunds and disputes. Unpaid orders are
// kept as well, so a checkout that is still open on Paystack can still be matched when its payment arrives.
export function accountDeletionStatements(parentId: string, parentEmail: string): { text: string; params: string[] }[] {
  return [
    { text: "update public.payments set parent_id = null, profile_id = null where parent_id = $1", params: [parentId] },
    { text: "delete from public.lesson_progress where user_id in (select id::text from public.learner_profiles where parent_id = $1)", params: [parentId] },
    { text: "delete from public.cbt_attempts where learner_id in (select id from public.learner_profiles where parent_id = $1)", params: [parentId] },
    { text: "delete from public.learner_profiles where parent_id = $1", params: [parentId] },
    { text: "delete from public.parent_consents where parent_id = $1", params: [parentId] },
    { text: "delete from neon_auth.verification where position(lower($1) in lower(identifier)) > 0", params: [parentEmail] },
    { text: 'delete from neon_auth."user" where id = $1', params: [parentId] },
  ];
}
