// Runs the real "delete my account" statements against an in-memory Postgres (PGlite), so no customer data is involved.
// The tables come from the project's own migrations; only the Neon Auth tables are stand-ins with the same
// columns and foreign keys that production has (checked against the production schema).
//
//   node --experimental-strip-types --test scripts/account-deletion.test.mjs
// PGlite is not an app dependency: `npm i --no-save @electric-sql/pglite`, or set PGLITE_DIR (see scripts/pglite.mjs).
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { accountDeletionStatements } from "../src/lib/account-deletion-sql.ts";
import { loadPGlite } from "./pglite.mjs";

const PGlite = await loadPGlite();

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");
const PARENT_A = "aaaaaaaa-0000-4000-8000-000000000001";
const PARENT_B = "bbbbbbbb-0000-4000-8000-000000000002";
const LEARNER_A1 = "a1a1a1a1-0000-4000-8000-000000000001";
const LEARNER_A2 = "a2a2a2a2-0000-4000-8000-000000000002";
const LEARNER_B1 = "b1b1b1b1-0000-4000-8000-000000000003";

async function freshDatabase() {
  const db = new PGlite();
  await db.exec(`
    create schema neon_auth;
    create table neon_auth."user" (id uuid primary key, name text not null, email text not null, "emailVerified" boolean not null default true);
    create table neon_auth.session (id uuid primary key, "userId" uuid not null references neon_auth."user"(id) on delete cascade, token text not null);
    create table neon_auth.account (id uuid primary key, "userId" uuid not null references neon_auth."user"(id) on delete cascade, password text);
    create table neon_auth.verification (id uuid primary key, identifier text not null, value text not null);
  `);
  for (const file of ["../neon/schema.sql", "../db/migrations/001_learner_profiles.sql", "../db/migrations/002_learner_school.sql", "../db/migrations/003_learner_plan.sql", "../db/migrations/004_cbt_attempts.sql", "../db/migrations/006_payments.sql", "../db/migrations/007_parent_consents.sql"]) {
    await db.exec(await read(file));
  }
  await db.exec(`
    insert into neon_auth."user" (id, name, email) values ('${PARENT_A}', 'Parent A', 'Parent.A@Example.com'), ('${PARENT_B}', 'Parent B', 'parent.b@example.com');
    insert into neon_auth.session (id, "userId", token) values (gen_random_uuid(), '${PARENT_A}', 't1'), (gen_random_uuid(), '${PARENT_B}', 't2');
    insert into neon_auth.account (id, "userId", password) values (gen_random_uuid(), '${PARENT_A}', 'hash'), (gen_random_uuid(), '${PARENT_B}', 'hash');
    insert into neon_auth.verification (id, identifier, value) values
      (gen_random_uuid(), 'email-verification-otp-parent.a@example.com', '123456:0'), (gen_random_uuid(), 'email-verification-otp-parent.b@example.com', '654321:0');
    insert into public.learner_profiles (id, parent_id, name, pin_hash) values
      ('${LEARNER_A1}', '${PARENT_A}', 'Ada', 'x'), ('${LEARNER_A2}', '${PARENT_A}', 'Bola', 'x'), ('${LEARNER_B1}', '${PARENT_B}', 'Chi', 'x');
    insert into public.lesson_progress (user_id, lesson_id, completed, notes) values
      ('${LEARNER_A1}', 'w1', true, 'notes A1'), ('${LEARNER_A2}', 'w1', true, 'notes A2'), ('${LEARNER_B1}', 'w1', true, 'notes B1'), ('taiwo-old', 'w1', true, 'legacy row');
    insert into public.cbt_attempts (learner_id, mode, lesson_ids, total, score, duration_seconds, answers) values
      ('${LEARNER_A1}', 'week', array['w1'], 10, 7, 300, '[]'), ('${LEARNER_A2}', 'week', array['w1'], 10, 5, 300, '[]'), ('${LEARNER_B1}', 'week', array['w1'], 10, 9, 300, '[]');
    insert into public.parent_consents (parent_id, legal_version) values ('${PARENT_A}', 'v1'), ('${PARENT_B}', 'v1');
    insert into public.payments (reference, parent_id, profile_id, plan, amount, customer_email, mode, status, paid_at, term_end) values
      ('edify-paid-a', '${PARENT_A}', '${LEARNER_A1}', 'silver', 300000, 'Parent.A@Example.com', 'live', 'success', now(), now() + interval '105 days'),
      ('edify-open-a', '${PARENT_A}', '${LEARNER_A2}', 'gold', 500000, 'Parent.A@Example.com', 'live', 'pending', null, null),
      ('edify-paid-b', '${PARENT_B}', '${LEARNER_B1}', 'bronze', 100000, 'parent.b@example.com', 'live', 'success', now(), now() + interval '105 days');
  `);
  return db;
}

async function run(db, parentId, email) {
  await db.query("begin");
  try {
    for (const { text, params } of accountDeletionStatements(parentId, email)) await db.query(text, params);
    await db.query("commit");
  } catch (error) {
    await db.query("rollback");
    throw error;
  }
}

const count = async (db, sql) => Number((await db.query(sql)).rows[0].n);

test("deleting a parent removes the parent, learners, progress, notes, attempts, consents and sign-in data", async () => {
  const db = await freshDatabase();
  await run(db, PARENT_A, "parent.a@example.com");
  assert.equal(await count(db, `select count(*) n from neon_auth."user" where id = '${PARENT_A}'`), 0);
  assert.equal(await count(db, `select count(*) n from neon_auth.session where "userId" = '${PARENT_A}'`), 0);
  assert.equal(await count(db, `select count(*) n from neon_auth.account where "userId" = '${PARENT_A}'`), 0);
  assert.equal(await count(db, `select count(*) n from neon_auth.verification where identifier like '%parent.a@%'`), 0);
  assert.equal(await count(db, `select count(*) n from public.learner_profiles where parent_id = '${PARENT_A}'`), 0);
  assert.equal(await count(db, `select count(*) n from public.lesson_progress where user_id in ('${LEARNER_A1}', '${LEARNER_A2}')`), 0);
  assert.equal(await count(db, `select count(*) n from public.cbt_attempts where learner_id in ('${LEARNER_A1}', '${LEARNER_A2}')`), 0);
  assert.equal(await count(db, `select count(*) n from public.parent_consents where parent_id = '${PARENT_A}'`), 0);
});

test("another family and old progress rows are untouched", async () => {
  const db = await freshDatabase();
  await run(db, PARENT_A, "parent.a@example.com");
  assert.equal(await count(db, `select count(*) n from neon_auth."user" where id = '${PARENT_B}'`), 1);
  assert.equal(await count(db, `select count(*) n from neon_auth.session where "userId" = '${PARENT_B}'`), 1);
  assert.equal(await count(db, `select count(*) n from neon_auth.verification where identifier like '%parent.b@%'`), 1);
  assert.equal(await count(db, `select count(*) n from public.learner_profiles where parent_id = '${PARENT_B}'`), 1);
  assert.equal(await count(db, `select count(*) n from public.lesson_progress where user_id = '${LEARNER_B1}'`), 1);
  assert.equal(await count(db, `select count(*) n from public.cbt_attempts where learner_id = '${LEARNER_B1}'`), 1);
  assert.equal(await count(db, `select count(*) n from public.parent_consents where parent_id = '${PARENT_B}'`), 1);
  assert.equal(await count(db, `select count(*) n from public.lesson_progress where user_id = 'taiwo-old'`), 1);
  const paid = (await db.query(`select parent_id, profile_id from public.payments where reference = 'edify-paid-b'`)).rows[0];
  assert.deepEqual(paid, { parent_id: PARENT_B, profile_id: LEARNER_B1 });
});

test("payment records are kept, unlinked from the parent and learners, with their amounts and dates", async () => {
  const db = await freshDatabase();
  await run(db, PARENT_A, "parent.a@example.com");
  const rows = (await db.query(`select reference, parent_id, profile_id, plan, amount, status, customer_email, (paid_at is not null) as has_paid_at from public.payments where reference like 'edify-%-a' order by reference`)).rows;
  assert.deepEqual(rows, [
    { reference: "edify-open-a", parent_id: null, profile_id: null, plan: "gold", amount: 500000, status: "pending", customer_email: "Parent.A@Example.com", has_paid_at: false },
    { reference: "edify-paid-a", parent_id: null, profile_id: null, plan: "silver", amount: 300000, status: "success", customer_email: "Parent.A@Example.com", has_paid_at: true },
  ]);
});

test("an unknown parent id deletes nothing", async () => {
  const db = await freshDatabase();
  await run(db, "cccccccc-0000-4000-8000-000000000003", "nobody@example.com");
  assert.equal(await count(db, "select count(*) n from neon_auth.\"user\""), 2);
  assert.equal(await count(db, "select count(*) n from public.learner_profiles"), 3);
  assert.equal(await count(db, "select count(*) n from public.lesson_progress"), 4);
  assert.equal(await count(db, "select count(*) n from public.cbt_attempts"), 3);
  assert.equal(await count(db, "select count(*) n from public.payments where parent_id is not null"), 3);
});

test("an empty email cannot clear other people's sign-in codes", async () => {
  const db = await freshDatabase();
  await run(db, PARENT_A, "");
  assert.equal(await count(db, "select count(*) n from neon_auth.verification"), 2, "an empty email must match no sign-in codes at all");
});

test("running the deletion twice is harmless", async () => {
  const db = await freshDatabase();
  await run(db, PARENT_A, "parent.a@example.com");
  await run(db, PARENT_A, "parent.a@example.com");
  assert.equal(await count(db, "select count(*) n from neon_auth.\"user\""), 1);
});

test("ids and emails travel as parameters, never inside the SQL text", () => {
  const statements = accountDeletionStatements(PARENT_A, "o'brien@example.com");
  for (const { text } of statements) assert.ok(!text.includes(PARENT_A) && !text.includes("brien"), text);
  assert.ok(statements.every(({ params }) => params.length === 1));
});

test("recording consent twice for the same version keeps one row", async () => {
  const db = await freshDatabase();
  const insert = "insert into public.parent_consents (parent_id, legal_version) values ($1, $2) on conflict (parent_id, legal_version) do nothing";
  await db.query(insert, [PARENT_A, "v2"]);
  await db.query(insert, [PARENT_A, "v2"]);
  assert.equal(await count(db, `select count(*) n from public.parent_consents where parent_id = '${PARENT_A}' and legal_version = 'v2'`), 1);
  assert.equal(await count(db, `select count(*) n from public.parent_consents where parent_id = '${PARENT_A}'`), 2);
});
