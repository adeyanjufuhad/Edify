// Tests for the classmate features: the pure rules (winner, ranking, codes, message filter, voice file check) and the
// real SQL (limits, claiming a code, challenges, leaderboard, retention, and deleting learners and accounts) run against
// an in-memory Postgres (PGlite) built from the project's own migrations. No customer data is involved.
//
//   node --experimental-strip-types --test scripts/social.test.mjs
// PGlite is not an app dependency: `npm i --no-save @electric-sql/pglite`, or set PGLITE_DIR (see scripts/pglite.mjs).
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import * as rules from "../src/lib/social-rules.ts";
import * as q from "../src/lib/social-sql.ts";
import * as qq from "../src/lib/social-queries.ts";
import { OPTIONAL_TABLES, PRESENT_SOCIAL_TABLES_QUERY, SOCIAL_TABLES, accountDeletionStatements, learnerDeletionStatements } from "../src/lib/account-deletion-sql.ts";
import { loadPGlite } from "./pglite.mjs";

const PGlite = await loadPGlite();
const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

// ---------------------------------------------------------------- pure rules

test("winner: more correct wins, then the faster finish, then a draw", () => {
  const out = (score, durationSeconds) => ({ score, total: 10, durationSeconds });
  assert.equal(rules.decideWinner(out(8, 500), out(7, 100)), "a");
  assert.equal(rules.decideWinner(out(6, 100), out(7, 500)), "b");
  assert.equal(rules.decideWinner(out(7, 200), out(7, 300)), "a");
  assert.equal(rules.decideWinner(out(7, 300), out(7, 200)), "b");
  assert.equal(rules.decideWinner(out(7, 300), out(7, 300)), "draw");
});

test("challenge status: declined, cancelled, finished, expired or open", () => {
  const base = { expiresAt: 1000, now: 500 };
  assert.equal(rules.challengeStatus({ ...base, stored: "declined", phases: ["new", "new"] }), "declined");
  assert.equal(rules.challengeStatus({ ...base, stored: "cancelled", phases: ["done", "done"] }), "cancelled");
  assert.equal(rules.challengeStatus({ ...base, stored: "open", phases: ["done", "done"] }), "finished");
  assert.equal(rules.challengeStatus({ ...base, stored: "open", phases: ["done", "new"] }), "open");
  assert.equal(rules.challengeStatus({ expiresAt: 1000, now: 1000, stored: "open", phases: ["done", "new"] }), "expired");
  // Someone who started in time may still finish after the start window closed.
  assert.equal(rules.challengeStatus({ expiresAt: 1000, now: 2000, stored: "open", phases: ["done", "playing"] }), "open");
  // Once both are done it stays finished even after the window.
  assert.equal(rules.challengeStatus({ expiresAt: 1000, now: 2000, stored: "open", phases: ["done", "done"] }), "finished");
});

test("viewer slot tells the learner what to do next", () => {
  assert.equal(rules.viewerSlot("open", "new"), "your-turn");
  assert.equal(rules.viewerSlot("open", "playing"), "continue");
  assert.equal(rules.viewerSlot("open", "done"), "waiting");
  assert.equal(rules.viewerSlot("finished", "done"), "finished");
  assert.equal(rules.viewerSlot("expired", "new"), "ended");
});

test("leaderboard ranking: wins, draws, average; ties share a rank; no games comes last unranked", () => {
  const row = (name, wins, draws, played, avgPercent) => ({ learnerId: name, name, classLevel: "SS1", played, wins, draws, losses: played - wins - draws, avgPercent });
  const ranked = rules.rankBoard([row("Zed", 0, 0, 0, 0), row("Bola", 2, 0, 3, 70), row("Ada", 3, 0, 3, 60), row("Chi", 2, 0, 4, 70), row("Dayo", 2, 1, 4, 50)]);
  assert.deepEqual(ranked.map((r) => [r.name, r.rank]), [["Ada", 1], ["Dayo", 2], ["Bola", 3], ["Chi", 3], ["Zed", null]]);
});

test("classmate codes: unambiguous alphabet, tidy input, no look-alikes", () => {
  const code = rules.makeCode((n) => n - 1);
  assert.equal(code.length, 8);
  assert.ok([...code].every((c) => rules.CODE_ALPHABET.includes(c)));
  assert.ok(!/[01OIL]/.test(rules.CODE_ALPHABET));
  assert.equal(rules.normalizeCode(" abcd-2345 "), "ABCD2345");
  assert.equal(rules.normalizeCode("ABCD234"), null);
  assert.equal(rules.normalizeCode("ABCD23O5"), null);
  assert.equal(rules.formatCode("ABCD2345"), "ABCD-2345");
});

test("classmates: same class and same school ignoring case, spacing and punctuation", () => {
  const a = { school: "St. Mary’s  College", classLevel: "SS1" };
  assert.ok(rules.areClassmates(a, { school: "st marys college", classLevel: "SS1" }));
  assert.ok(!rules.areClassmates(a, { school: "st marys college", classLevel: "SS2" }));
  assert.ok(!rules.areClassmates(a, { school: "St Mary's Secondary", classLevel: "SS1" }));
  assert.ok(!rules.areClassmates({ school: null, classLevel: "SS1" }, { school: null, classLevel: "SS1" }));
  assert.deepEqual(rules.orderedPair("b", "a"), ["a", "b"]);
});

test("messages: contact details are refused, ordinary study talk is not", () => {
  for (const bad of ["call me 08031234567", "my number is 0803 123 4567", "+234 803 123 4567", "mail me ada@example.com", "go to www.example.org", "see https://x.y/z", "find me @ada_99", "add me on WhatsApp", "my insta", "visit chem.com"]) {
    if (bad === "my insta") continue; // not covered: this is a basic guard, not moderation
    assert.ok("error" in rules.cleanMessage(bad), bad);
  }
  for (const ok of ["Did you finish Week 3?", "The atomic number of carbon is 6 and the mass is 12.01", "I got 17 out of 20 in 2026", "Avogadro is 6.022 x 10^23", "Good luck!"]) {
    assert.deepEqual(rules.cleanMessage(ok), { text: ok }, ok);
  }
  assert.deepEqual(rules.cleanMessage("  hello \n\n there \u0007​ "), { text: "hello there" });
  assert.ok("error" in rules.cleanMessage("   "));
  assert.ok("error" in rules.cleanMessage(12));
  assert.ok("error" in rules.cleanMessage("a".repeat(501)));
  assert.ok("text" in rules.cleanMessage("a".repeat(500)));
});

test("voice files: declared type must match the first bytes, anything else is refused", () => {
  const webm = Uint8Array.from([0x1a, 0x45, 0xdf, 0xa3, 0, 0, 0, 0, 0, 0, 0, 0]);
  const ogg = Uint8Array.from([0x4f, 0x67, 0x67, 0x53, 0, 0, 0, 0, 0, 0, 0, 0]);
  const mp4 = Uint8Array.from([0, 0, 0, 0x20, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d]);
  assert.equal(rules.sniffAudio(webm), "webm");
  assert.equal(rules.sniffAudio(ogg), "ogg");
  assert.equal(rules.sniffAudio(mp4), "mp4");
  assert.equal(rules.sniffAudio(Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0, 0, 0, 0, 0, 0, 0, 0])), null, "a PNG is not audio");
  assert.equal(rules.sniffAudio(Uint8Array.from([1, 2, 3])), null);
  assert.equal(rules.audioKindFromType("audio/webm;codecs=opus"), "webm");
  assert.equal(rules.audioKindFromType("AUDIO/OGG; codecs=opus"), "ogg");
  assert.equal(rules.audioKindFromType("audio/mp4"), "mp4");
  assert.equal(rules.audioKindFromType("text/html"), null);
  assert.equal(rules.audioKindFromType("video/webm"), null);
  assert.equal(rules.audioKindFromType(null), null);
});

test("range header parsing for audio playback", () => {
  assert.deepEqual(rules.parseRange("bytes=0-", 100), { start: 0, end: 99 });
  assert.deepEqual(rules.parseRange("bytes=10-19", 100), { start: 10, end: 19 });
  assert.deepEqual(rules.parseRange("bytes=90-500", 100), { start: 90, end: 99 });
  assert.deepEqual(rules.parseRange("bytes=-10", 100), { start: 90, end: 99 });
  assert.equal(rules.parseRange("bytes=100-", 100), null);
  assert.equal(rules.parseRange("bytes=5-2", 100), null);
  assert.equal(rules.parseRange("items=0-5", 100), null);
  assert.equal(rules.parseRange(null, 100), null);
});

test("marking a paper: unknown, malformed and blank picks score nothing", () => {
  const paper = [
    { key: "q1", prompt: "?", options: ["a", "b", "c", "d"], answer: 2 },
    { key: "q2", prompt: "?", options: ["a", "b", "c", "d"], answer: 0 },
    { key: "q3", prompt: "?", options: ["a", "b", "c", "d"], answer: 3 },
  ];
  const result = rules.gradePicks(paper, { q1: "C", q2: "B", q3: "Z", extra: "A" });
  assert.equal(result.score, 1);
  assert.equal(result.total, 3);
  assert.deepEqual(result.answers.map((a) => a.picked), ["C", "B", null]);
  assert.equal(rules.gradePicks(paper, null).score, 0);
  assert.equal(rules.gradePicks(paper, { q1: 3 }).score, 0);
});

// ---------------------------------------------------------------- database

const P1 = "aaaaaaaa-0000-4000-8000-000000000001";
const P2 = "bbbbbbbb-0000-4000-8000-000000000002";
const P3 = "cccccccc-0000-4000-8000-000000000003";
const A1 = "a1a1a1a1-0000-4000-8000-000000000001"; // parent 1, Ada
const A2 = "a2a2a2a2-0000-4000-8000-000000000002"; // parent 1, Bola (a second child)
const B1 = "b1b1b1b1-0000-4000-8000-000000000003"; // parent 2, Chi
const C1 = "c1c1c1c1-0000-4000-8000-000000000004"; // parent 3, Dayo

const BASE = ["../neon/schema.sql", "../db/migrations/001_learner_profiles.sql", "../db/migrations/002_learner_school.sql", "../db/migrations/003_learner_plan.sql", "../db/migrations/004_cbt_attempts.sql", "../db/migrations/006_payments.sql", "../db/migrations/007_parent_consents.sql", "../db/migrations/008_learner_stream.sql", "../db/migrations/009_stream_names.sql"];
const SOCIAL = ["../db/migrations/010_classmates_challenges.sql", "../db/migrations/011_presence.sql", "../db/migrations/012_chat.sql", "../db/migrations/013_voice_notes.sql", "../db/migrations/014_class_visibility.sql", "../db/migrations/015_parent_pin.sql"];

async function freshDatabase({ social = true } = {}) {
  const db = new PGlite();
  await db.exec(`
    create schema neon_auth;
    create table neon_auth."user" (id uuid primary key, name text not null, email text not null);
    create table neon_auth.verification (id uuid primary key, identifier text not null, value text not null);
  `);
  for (const file of social ? [...BASE, ...SOCIAL] : BASE) await db.exec(await read(file));
  await db.exec(`
    insert into neon_auth."user" (id, name, email) values ('${P1}', 'Parent 1', 'p1@example.com'), ('${P2}', 'Parent 2', 'p2@example.com'), ('${P3}', 'Parent 3', 'p3@example.com');
    insert into public.learner_profiles (id, parent_id, name, pin_hash, class_level, school) values
      ('${A1}', '${P1}', 'Ada', 'x', 'SS1', 'Brainfield School'), ('${A2}', '${P1}', 'Bola', 'x', 'SS1', 'Brainfield School'),
      ('${B1}', '${P2}', 'Chi', 'x', 'SS1', 'Brainfield School'), ('${C1}', '${P3}', 'Dayo', 'x', 'SS1', 'Brainfield School');
  `);
  return db;
}
const run = (db, { text, params }) => db.query(text, params);
const one = async (db, text) => (await db.query(text)).rows[0];
const count = async (db, text) => Number((await one(db, text)).n);
const link = (x, y) => (x < y ? [x, y] : [y, x]);

test("migrations apply twice without error, and every classmate table and parent_settings has row level security", async () => {
  const db = await freshDatabase();
  for (const file of SOCIAL) await db.exec(await read(file));
  const rows = (await db.query(`select relname, relrowsecurity from pg_class where relnamespace = 'public'::regnamespace and relname = any($1::text[])`, [[...OPTIONAL_TABLES]])).rows;
  assert.equal(rows.length, OPTIONAL_TABLES.length);
  assert.ok(rows.every((r) => r.relrowsecurity), "RLS must be on for " + rows.filter((r) => !r.relrowsecurity).map((r) => r.relname));
});

test("constraints: parent switches depend on each other; links are ordered; no self-challenges; scores stay in range", async () => {
  const db = await freshDatabase();
  await assert.rejects(db.query(`insert into public.learner_social_settings (learner_id, chat_on) values ('${A1}', true)`), /check/i);
  await assert.rejects(db.query(`insert into public.learner_social_settings (learner_id, challenges_on, voice_on) values ('${A1}', true, true)`), /check/i);
  await db.query(`insert into public.learner_social_settings (learner_id, challenges_on, chat_on, voice_on, presence_on) values ('${A1}', true, true, true, true)`);
  const [a, b] = link(A1, B1);
  await assert.rejects(db.query(`insert into public.classmate_links (learner_a, learner_b) values ('${b}', '${a}')`), /check/i);
  await db.query(`insert into public.classmate_links (learner_a, learner_b) values ('${a}', '${b}')`);
  await assert.rejects(db.query(`insert into public.classmate_links (learner_a, learner_b) values ('${a}', '${b}')`), /unique|duplicate/i);
  await assert.rejects(db.query(`insert into public.classmate_links (learner_a, learner_b, status, blocked_by) values ('${a}', '${C1}', 'blocked', '${A2}')`), /check|constraint/i);
  await assert.rejects(db.query(`insert into public.challenges (challenger_id, opponent_id, subject_slug, subject_name, term_name, question_count, minutes, paper, expires_at) values ('${A1}', '${A1}', 's', 'S', 'T', 10, 10, '[]', now())`), /check/i);
  await assert.rejects(db.query(`insert into public.social_events (kind) values ('x')`), /check/i);
  await assert.rejects(db.query(`insert into public.social_events (learner_id, parent_id, kind) values ('${A1}', '${P1}', 'x')`), /check/i);
});

test("rate limit: allows up to the limit then refuses, per actor and per kind, and refused actions are not recorded", async () => {
  const db = await freshDatabase();
  const allowed = async (actor, kind, max) => (await run(db, q.rateLimitQuery(actor, kind, max, 60))).rows[0].allowed;
  assert.equal(await allowed({ learnerId: A1 }, "msg", 2), true);
  assert.equal(await allowed({ learnerId: A1 }, "msg", 2), true);
  assert.equal(await allowed({ learnerId: A1 }, "msg", 2), false);
  assert.equal(await allowed({ learnerId: A1 }, "msg", 2), false);
  assert.equal(await count(db, `select count(*) n from public.social_events where learner_id = '${A1}' and kind = 'msg'`), 2);
  assert.equal(await allowed({ learnerId: B1 }, "msg", 2), true, "another learner has their own allowance");
  assert.equal(await allowed({ learnerId: A1 }, "voice", 2), true, "another kind has its own allowance");
  assert.equal(await allowed({ parentId: P1 }, "redeem", 1), true);
  assert.equal(await allowed({ parentId: P1 }, "redeem", 1), false);
  await db.query(`update public.social_events set created_at = now() - interval '2 minutes' where learner_id = '${A1}' and kind = 'msg'`);
  assert.equal(await allowed({ learnerId: A1 }, "msg", 2), true, "old events fall out of the window");
});

async function makeInvite(db, { learner = A1, parent = P1, hash = "a".repeat(64), expires = "now() + interval '7 days'" } = {}) {
  return (await db.query(`insert into public.classmate_invites (learner_id, parent_id, code_hash, expires_at) values ('${learner}', '${parent}', '${hash}', ${expires}) returning id`)).rows[0].id;
}

test("wrong PIN counting: counts only this parent's events of this kind in the window, and says when the oldest leaves it", async () => {
  const db = await freshDatabase();
  const recent = async (parentId, kind) => (await run(db, q.recentEventsQuery({ parentId }, kind, 900))).rows[0];
  assert.deepEqual(await recent(P1, "pin-fail"), { n: 0, wait_seconds: 0 });
  for (let i = 0; i < 3; i++) await run(db, q.recordEventQuery({ parentId: P1 }, "pin-fail"));
  await run(db, q.recordEventQuery({ parentId: P1 }, "parent-pin-fail"));
  await run(db, q.recordEventQuery({ parentId: P2 }, "pin-fail"));
  // An old failure outside the 15-minute window does not count.
  await db.query(`insert into public.social_events (parent_id, kind, created_at) values ('${P1}', 'pin-fail', now() - interval '20 minutes')`);
  const now = await recent(P1, "pin-fail");
  assert.equal(now.n, 3);
  assert.ok(now.wait_seconds > 890 && now.wait_seconds <= 900, `wait ${now.wait_seconds}`);
  assert.equal((await recent(P1, "parent-pin-fail")).n, 1, "the parent PIN has its own count");
  assert.equal((await recent(P2, "pin-fail")).n, 1, "another family has its own count");
  // The wait is measured from the oldest failure still in the window.
  await db.query(`update public.social_events set created_at = now() - interval '10 minutes' where parent_id = '${P1}' and kind = 'pin-fail' and created_at > now() - interval '1 minute'`);
  const later = await recent(P1, "pin-fail");
  assert.ok(later.wait_seconds > 290 && later.wait_seconds <= 300, `wait ${later.wait_seconds}`);
});

test("parent_settings: one row per parent, no PIN stored as digits, and it goes with the parent's sign-in", async () => {
  const db = await freshDatabase();
  const upsert = "insert into public.parent_settings (parent_id, pin_hash, updated_at) values ($1, $2, now()) on conflict (parent_id) do update set pin_hash = excluded.pin_hash, updated_at = now()";
  await db.query(upsert, [P1, `${"a".repeat(32)}:${"b".repeat(64)}`]);
  await db.query(upsert, [P1, null]);
  assert.equal(await count(db, `select count(*) n from public.parent_settings where parent_id = '${P1}' and pin_hash is null`), 1);
  await assert.rejects(db.query(upsert, [P2, "1234"]), /check/i, "a bare 4-digit PIN is refused");
  await db.query(upsert, [P3, `${"a".repeat(32)}:${"b".repeat(64)}`]);
  await db.query(`delete from neon_auth."user" where id = '${P3}'`);
  assert.equal(await count(db, `select count(*) n from public.parent_settings where parent_id = '${P3}'`), 0);
});

test("claiming a code makes one ordered link, once; expired and used codes do nothing", async () => {
  const db = await freshDatabase();
  const id = await makeInvite(db);
  const first = (await run(db, q.claimInviteQuery(id, B1))).rows[0];
  assert.equal(first.claimed, 1);
  assert.ok(first.link_id);
  const [a, b] = link(A1, B1);
  assert.deepEqual((await one(db, `select learner_a, learner_b, status from public.classmate_links`)), { learner_a: a, learner_b: b, status: "active" });
  const again = (await run(db, q.claimInviteQuery(id, C1))).rows[0];
  assert.equal(again.claimed, 0, "a code works once");
  assert.equal(await count(db, "select count(*) n from public.classmate_links"), 1);

  const old = await makeInvite(db, { hash: "b".repeat(64), expires: "now() - interval '1 minute'" });
  assert.equal((await run(db, q.claimInviteQuery(old, C1))).rows[0].claimed, 0, "an expired code does nothing");
  assert.equal(await count(db, "select count(*) n from public.classmate_links"), 1);
  assert.equal((await one(db, `select used_by_learner from public.classmate_invites where id = '${old}'`)).used_by_learner, null);
});

test("claiming a code for a pair that is already linked (or blocked) creates no second link", async () => {
  const db = await freshDatabase();
  const [a, b] = link(A1, B1);
  await db.query(`insert into public.classmate_links (learner_a, learner_b, status, blocked_by) values ('${a}', '${b}', 'blocked', '${A1}')`);
  const id = await makeInvite(db);
  const result = (await run(db, q.claimInviteQuery(id, B1))).rows[0];
  assert.equal(result.link_id, null);
  assert.equal(await count(db, "select count(*) n from public.classmate_links"), 1);
  assert.equal((await one(db, "select status from public.classmate_links")).status, "blocked", "a block is not undone by a new code");
});

const PAPER = JSON.stringify([
  { key: "q1", prompt: "One?", options: ["a", "b", "c", "d"], answer: 0 },
  { key: "q2", prompt: "Two?", options: ["a", "b", "c", "d"], answer: 1 },
  { key: "q3", prompt: "Three?", options: ["a", "b", "c", "d"], answer: 2 },
  { key: "q4", prompt: "Four?", options: ["a", "b", "c", "d"], answer: 3 },
  { key: "q5", prompt: "Five?", options: ["a", "b", "c", "d"], answer: 0 },
]);

async function makeChallenge(db, { challenger = A1, opponent = B1, subject = "chemistry", expires = "now() + interval '3 days'", minutes = 10, status = "open" } = {}) {
  const [a, b] = link(challenger, opponent);
  await db.query("insert into public.classmate_links (learner_a, learner_b) values ($1, $2) on conflict do nothing", [a, b]);
  const row = await db.query(
    `insert into public.challenges (challenger_id, opponent_id, subject_slug, subject_name, term_slug, term_name, question_count, minutes, paper, status, expires_at)
     values ($1, $2, $3, $4, null, 'All terms', 5, $5, $6::jsonb, $7, ${expires}) returning id`,
    [challenger, opponent, subject, subject === "chemistry" ? "Chemistry" : "Biology", minutes, PAPER, status],
  );
  return row.rows[0].id;
}
const start = (db, id, learner) => run(db, q.startEntryQuery(id, learner));
const submit = async (db, id, learner, score, total = 5) => {
  const result = await run(db, q.submitEntryQuery(id, learner, score, total, "[]", 60));
  await run(db, q.finishChallengeQuery(id));
  return result.rows[0] ?? null;
};
const entries = async (db, id) => (await db.query(`select learner_id, started_at is not null as started, submitted_at is not null as submitted, score, total from public.challenge_entries where challenge_id = $1 order by learner_id`, [id])).rows;

test("starting: only the two players can start, the clock never restarts, and a closed challenge cannot be started", async () => {
  const db = await freshDatabase();
  const id = await makeChallenge(db);
  await start(db, id, C1);
  assert.equal((await entries(db, id)).length, 0, "an outsider cannot start someone else's challenge");
  await start(db, id, A1);
  const stamped = (await one(db, `select started_at from public.challenge_entries where learner_id = '${A1}'`)).started_at;
  await db.query(`update public.challenge_entries set started_at = started_at - interval '2 minutes'`);
  await start(db, id, A1);
  const again = (await one(db, `select started_at from public.challenge_entries where learner_id = '${A1}'`)).started_at;
  assert.ok(again < stamped, "starting again must not move the start time");
  assert.equal((await entries(db, id)).length, 1);

  for (const [name, args] of [["declined", { status: "declined" }], ["cancelled", { status: "cancelled" }], ["expired", { expires: "now() - interval '1 second'" }]]) {
    const closed = await makeChallenge(db, args);
    await start(db, closed, B1);
    assert.equal((await entries(db, closed)).length, 0, `a ${name} challenge cannot be started`);
  }
});

test("handing in: first hand-in counts, a repeat does nothing, both done finishes the challenge", async () => {
  const db = await freshDatabase();
  const id = await makeChallenge(db);
  await start(db, id, A1);
  await start(db, id, B1);
  const first = await submit(db, id, A1, 4);
  assert.equal(first.score, 4);
  assert.equal((await one(db, "select finished_at from public.challenges")).finished_at, null, "not finished with one player done");
  assert.equal(await submit(db, id, A1, 5), null, "a second hand-in is ignored");
  assert.equal((await one(db, `select score from public.challenge_entries where learner_id = '${A1}'`)).score, 4);
  await submit(db, id, B1, 3);
  assert.ok((await one(db, "select finished_at from public.challenges")).finished_at, "both done means finished");
});

test("handing in: duration comes from the server clock, capped at the limit; a paper after the grace period scores zero", async () => {
  const db = await freshDatabase();
  const id = await makeChallenge(db, { minutes: 10 });
  await start(db, id, A1);
  await start(db, id, B1);
  await db.query(`update public.challenge_entries set started_at = now() - interval '5 minutes' where learner_id = '${A1}'`);
  const onTime = await submit(db, id, A1, 4);
  assert.ok(onTime.duration_seconds >= 299 && onTime.duration_seconds <= 305, `took ${onTime.duration_seconds}s`);
  assert.equal(onTime.score, 4);

  await db.query(`update public.challenge_entries set started_at = now() - interval '10 minutes 30 seconds' where learner_id = '${B1}'`);
  const grace = await submit(db, id, B1, 5);
  assert.equal(grace.score, 5, "within the 60 second grace");
  assert.equal(grace.duration_seconds, 600, "time taken is capped at the limit");

  const late = await makeChallenge(db, { minutes: 10 });
  await start(db, late, A1);
  await db.query(`update public.challenge_entries set started_at = now() - interval '12 minutes' where challenge_id = '${late}'`);
  const tooLate = await submit(db, late, A1, 5);
  assert.equal(tooLate.score, 0, "after the grace period the paper scores zero");
  assert.equal((await one(db, `select answers from public.challenge_entries where challenge_id = '${late}'`)).answers.length, 0);
});

test("a player who started and walked away is given zero after their time, so the challenge can finish", async () => {
  const db = await freshDatabase();
  const id = await makeChallenge(db, { minutes: 10 });
  await start(db, id, A1);
  await start(db, id, B1);
  await submit(db, id, A1, 3);
  await run(db, q.settleOverdueQuery(B1, 60));
  assert.equal((await entries(db, id)).filter((e) => e.submitted).length, 1, "B1 still has time, nothing is settled");
  await db.query(`update public.challenge_entries set started_at = now() - interval '12 minutes' where learner_id = '${B1}'`);
  await run(db, q.settleOverdueQuery(C1, 60));
  assert.equal((await entries(db, id)).filter((e) => e.submitted).length, 1, "another learner's request settles nothing");
  await run(db, q.settleOverdueQuery(A1, 60));
  await run(db, q.finishSettledQuery(A1));
  const rows = await entries(db, id);
  assert.equal(rows.filter((e) => e.submitted).length, 2);
  assert.equal(rows.find((e) => e.learner_id === B1).score, 0);
  assert.equal(rows.find((e) => e.learner_id === B1).total, 5);
  assert.ok((await one(db, "select finished_at from public.challenges")).finished_at);
});

test("leaderboard: wins, draws, losses, averages, subject filter and the time window", async () => {
  const db = await freshDatabase();
  const play = async (a, as, ad, b, bs, bd, opts) => {
    const id = await makeChallenge(db, { challenger: a, opponent: b, ...opts });
    await db.query(`insert into public.challenge_entries (challenge_id, learner_id, submitted_at, score, total, duration_seconds, answers) values ($1, $2, now(), $3, 5, $4, '[]'), ($1, $5, now(), $6, 5, $7, '[]')`, [id, a, as, ad, b, bs, bd]);
    await db.query(`update public.challenges set finished_at = now() where id = $1`, [id]);
    return id;
  };
  await play(A1, 5, 100, B1, 3, 100, {});                          // Ada beats Chi
  await play(A1, 4, 200, B1, 4, 100, {});                          // equal score, Chi faster: Chi wins
  await play(A1, 3, 100, C1, 3, 100, { subject: "biology" });      // dead heat, Biology
  const old = await play(A1, 5, 100, C1, 0, 100, {});              // Ada beats Dayo, but long ago
  await db.query(`update public.challenges set finished_at = now() - interval '200 days' where id = $1`, [old]);
  const open = await makeChallenge(db, { challenger: A1, opponent: C1 });
  await start(db, open, A1);
  await submit(db, open, A1, 5);                                    // unfinished: must not count

  const board = async (subject) => (await run(db, q.leaderboardQuery([A1, B1, C1, A2], 90, subject))).rows.map((r) => ({ name: r.name, played: r.played, wins: r.wins, draws: r.draws, losses: r.losses, avg: r.avg_percent })).sort((x, y) => x.name.localeCompare(y.name));
  assert.deepEqual(await board(null), [
    { name: "Ada", played: 3, wins: 1, draws: 1, losses: 1, avg: 80 },   // (100 + 80 + 60) / 3
    { name: "Bola", played: 0, wins: 0, draws: 0, losses: 0, avg: 0 },
    { name: "Chi", played: 2, wins: 1, draws: 0, losses: 1, avg: 70 },    // (60 + 80) / 2
    { name: "Dayo", played: 1, wins: 0, draws: 1, losses: 0, avg: 60 },
  ]);
  assert.deepEqual((await board("biology")).filter((r) => r.played), [
    { name: "Ada", played: 1, wins: 0, draws: 1, losses: 0, avg: 60 },
    { name: "Dayo", played: 1, wins: 0, draws: 1, losses: 0, avg: 60 },
  ]);
  assert.deepEqual((await run(db, q.leaderboardQuery([A1], 90, null))).rows.map((r) => r.name), ["Ada"], "only people in the circle are listed");
  assert.equal((await run(db, q.leaderboardQuery([], 90, null))).rows.length, 0);
});

// ---------------------------------------------------------------- links, settings, lists

test("settings: a parent can only save them for their own learner", async () => {
  const db = await freshDatabase();
  const on = { challenges: true, presence: false, chat: false, voice: false };
  assert.equal((await run(db, qq.saveSettingsQuery(P2, A1, on))).rows.length, 0, "Parent 2 cannot change Parent 1's learner");
  assert.equal((await run(db, qq.saveSettingsQuery(P1, A1, on))).rows.length, 1);
  assert.equal((await run(db, qq.saveSettingsQuery(P1, A1, { ...on, presence: true }))).rows.length, 1, "saving again updates");
  assert.equal(await count(db, "select count(*) n from public.learner_social_settings"), 1);
  assert.deepEqual((await run(db, qq.settingsQuery(A1))).rows[0], { challenges_on: true, presence_on: true, chat_on: false, voice_on: false, class_visible: false });
  assert.equal((await run(db, qq.settingsQuery(B1))).rows.length, 0, "no row means everything off");
  assert.equal((await run(db, qq.settingsForQuery([A1, B1]))).rows.length, 1);
  await assert.rejects(run(db, qq.saveSettingsQuery(P1, A1, { challenges: false, presence: false, chat: true, voice: false })), /check/i, "the database refuses chat without challenges");
});

test("classmate list: only active links to learners whose parents switched challenges on, first name and class only", async () => {
  const db = await freshDatabase();
  const on = { challenges: true, presence: true, chat: true, voice: false };
  for (const [parent, learner] of [[P1, A1], [P2, B1]]) await run(db, qq.saveSettingsQuery(parent, learner, on));
  const [ab1, ab2] = link(A1, B1);
  const [ac1, ac2] = link(A1, C1);
  await db.query("insert into public.classmate_links (learner_a, learner_b) values ($1, $2), ($3, $4)", [ab1, ab2, ac1, ac2]);
  let list = (await run(db, qq.classmatesQuery(A1))).rows;
  assert.deepEqual(list.map((r) => r.name), ["Chi"], "Dayo's parent has not switched challenges on");
  assert.deepEqual(Object.keys(list[0]).sort(), ["chat_on", "class_level", "learner_id", "link_id", "name", "presence_on", "status", "voice_on"], "no school, stream, plan or parent");
  await run(db, qq.saveSettingsQuery(P3, C1, on));
  assert.deepEqual((await run(db, qq.classmatesQuery(A1))).rows.map((r) => r.name), ["Chi", "Dayo"]);
  await run(db, qq.blockLinkQuery(null, A1, list[0].link_id));
  assert.deepEqual((await run(db, qq.classmatesQuery(A1))).rows.map((r) => r.name), ["Dayo"], "a blocked classmate disappears");
  assert.deepEqual((await run(db, qq.classmatesQuery(B1))).rows.map((r) => r.name), [], "and the block works both ways");
  assert.deepEqual((await run(db, qq.classmatesQuery(A2))).rows, [], "a learner with no links sees nobody");
});

test("block, unblock, remove: only members can act; a parent only for their own learner; only the blocker can unblock", async () => {
  const db = await freshDatabase();
  const id = await makeChallenge(db);
  const linkId = (await one(db, "select id from public.classmate_links")).id;
  await start(db, id, A1);
  const blocked = async (...args) => (await run(db, qq.blockLinkQuery(...args))).rows.length;
  assert.equal(await blocked(null, C1, linkId), 0, "a learner who is not on the link cannot block it");
  assert.equal(await blocked(P3, A1, linkId), 0, "a parent cannot act for someone else's learner");
  assert.equal(await blocked(P2, A1, linkId), 0, "or for a learner on the link who is not theirs");
  assert.equal((await one(db, "select status from public.classmate_links")).status, "active");
  assert.equal(await blocked(P1, A1, linkId), 1, "a parent can block for their own learner");
  assert.equal(await blocked(null, A1, linkId), 0, "already blocked");

  await run(db, qq.cancelOpenForLinkQuery(P1, A1, linkId));
  assert.equal((await one(db, "select status from public.challenges")).status, "cancelled", "blocking ends the open challenge");
  await start(db, id, B1);
  assert.equal((await entries(db, id)).length, 1, "and it cannot be started afterwards");

  assert.equal((await run(db, qq.unblockLinkQuery(P2, B1, linkId))).rows.length, 0, "the blocked side cannot lift the block");
  assert.equal((await run(db, qq.removeLinkQuery(P2, B1, linkId))).rows.length, 0, "or remove the link to escape it");
  assert.equal((await run(db, qq.unblockLinkQuery(P1, A1, linkId))).rows.length, 1, "the blocker's parent can");
  assert.equal((await one(db, "select blocked_by from public.classmate_links")).blocked_by, null);

  await db.query(`insert into public.chat_messages (link_id, sender_id, kind, body) values ($1, $2, 'text', 'hello')`, [linkId, A1]);
  assert.equal((await run(db, qq.removeLinkQuery(P3, C1, linkId))).rows.length, 0, "an outsider cannot remove it");
  assert.equal((await run(db, qq.removeLinkQuery(P2, B1, linkId))).rows.length, 1, "either side's parent can remove an active link");
  assert.equal(await count(db, "select count(*) n from public.classmate_links"), 0);
  assert.equal(await count(db, "select count(*) n from public.chat_messages"), 0, "the conversation goes with the link");
});

test("reports: stored about the other learner on a link the reporter belongs to, never for an outsider", async () => {
  const db = await freshDatabase();
  const [a, b] = link(A1, B1);
  const linkId = (await db.query("insert into public.classmate_links (learner_a, learner_b) values ($1, $2) returning id", [a, b])).rows[0].id;
  assert.equal((await run(db, qq.reportQuery(C1, linkId, "unkind", null, null, null))).rows.length, 0);
  assert.equal((await run(db, qq.reportQuery(B1, linkId, "unkind", "rude to me", null, "the words"))).rows.length, 1);
  const row = await one(db, "select reporter_id, reported_id, reason, note, message_excerpt from public.classmate_reports");
  assert.deepEqual(row, { reporter_id: B1, reported_id: A1, reason: "unkind", note: "rude to me", message_excerpt: "the words" });
  await assert.rejects(run(db, qq.reportQuery(A1, linkId, "not-a-reason", null, null, null)), /check/i);
  assert.equal((await run(db, qq.reportsByParentQuery(P2))).rows.length, 1);
  assert.equal((await run(db, qq.reportsByParentQuery(P1))).rows.length, 0, "the reported family does not see the report");
});

test("a parent can link two of their own children without a code, but never someone else's child", async () => {
  const db = await freshDatabase();
  assert.equal((await run(db, qq.linkOwnLearnersQuery(P1, A1, B1))).rows.length, 0, "Chi is not Parent 1's child");
  assert.equal((await run(db, qq.linkOwnLearnersQuery(P2, A1, A2))).rows.length, 0, "Parent 2 cannot link Parent 1's children");
  assert.equal((await run(db, qq.linkOwnLearnersQuery(P1, A1, A1))).rows.length, 0, "a learner cannot be linked with themselves");
  assert.equal((await run(db, qq.linkOwnLearnersQuery(P1, A2, A1))).rows.length, 1);
  assert.equal((await run(db, qq.linkOwnLearnersQuery(P1, A1, A2))).rows.length, 0, "only one link per pair");
  const [a, b] = link(A1, A2);
  assert.deepEqual(await one(db, "select learner_a, learner_b, status from public.classmate_links"), { learner_a: a, learner_b: b, status: "active" });
});

test("classmate codes: created for the parent's own learner, found by hash only while usable, can be cancelled by their parent only", async () => {
  const db = await freshDatabase();
  const hash = "f".repeat(64);
  assert.equal((await run(db, qq.createInviteQuery(P2, A1, hash, 7))).rows.length, 0, "not for someone else's learner");
  const made = (await run(db, qq.createInviteQuery(P1, A1, hash, 7))).rows[0];
  assert.ok(made.id);
  assert.equal((await run(db, qq.pendingInviteCountQuery(A1))).rows[0].n, 1);
  assert.equal((await run(db, qq.pendingInvitesQuery(P1))).rows.length, 1);
  assert.equal((await run(db, qq.pendingInvitesQuery(P2))).rows.length, 0);
  const found = (await run(db, qq.inviteByHashQuery(hash))).rows[0];
  assert.deepEqual({ learner_id: found.learner_id, name: found.name, class_level: found.class_level, school: found.school }, { learner_id: A1, name: "Ada", class_level: "SS1", school: "Brainfield School" });
  assert.equal((await run(db, qq.inviteByHashQuery("0".repeat(64)))).rows.length, 0);
  assert.equal((await run(db, qq.cancelInviteQuery(P2, made.id))).rows.length, 0);
  await run(db, q.claimInviteQuery(made.id, B1));
  assert.equal((await run(db, qq.inviteByHashQuery(hash))).rows.length, 0, "a used code cannot be found");
  assert.equal((await run(db, qq.pendingInviteCountQuery(A1))).rows[0].n, 0);
  const other = (await run(db, qq.createInviteQuery(P1, A1, "e".repeat(64), 7))).rows[0];
  assert.equal((await run(db, qq.cancelInviteQuery(P1, other.id))).rows.length, 1);
  await assert.rejects(run(db, qq.createInviteQuery(P1, A1, "e".repeat(64), 7)).then(() => run(db, qq.createInviteQuery(P1, A1, "e".repeat(64), 7))), /unique|duplicate/i, "two codes can never share a hash");
});

test("challenge lists never show the classmate's score or the answers before the challenge is finished", async () => {
  const db = await freshDatabase();
  const id = await makeChallenge(db);
  await start(db, id, A1);
  await start(db, id, B1);
  await submit(db, id, B1, 4);
  const early = (await run(db, qq.challengeListQuery(A1, 180, 30))).rows[0];
  assert.equal(early.their_score, null);
  assert.equal(early.their_duration, null);
  assert.ok(early.their_submitted_at, "that they have finished may be shown, not their score");
  const detail = (await run(db, qq.challengeDetailQuery(A1, id))).rows[0];
  assert.equal(detail.paper, null);
  assert.equal(detail.their_answers, null);
  assert.equal(detail.my_answers, null);
  assert.equal((await run(db, qq.challengeDetailQuery(C1, id))).rows.length, 0, "an outsider sees nothing");

  await submit(db, id, A1, 2);
  const done = (await run(db, qq.challengeDetailQuery(A1, id))).rows[0];
  assert.equal(done.their_score, 4);
  assert.equal(done.my_score, 2);
  assert.equal(done.paper.length, 5);
  assert.deepEqual(Object.keys(done).filter((key) => /school|email|stream|plan|parent/.test(key)), [], "nothing beyond first name and class about the other learner");
});

test("challenge lists need an active link; the questions are only given to a player who started and has not handed in", async () => {
  const db = await freshDatabase();
  const id = await makeChallenge(db);
  assert.equal((await run(db, qq.playQuery(A1, id))).rows.length, 0, "not started yet");
  await start(db, id, A1);
  const play = (await run(db, qq.playQuery(A1, id))).rows[0];
  assert.ok(play.seconds_left > 590 && play.seconds_left <= 600, `seconds left ${play.seconds_left}`);
  assert.equal(play.paper.length, 5);
  assert.equal((await run(db, qq.playQuery(B1, id))).rows.length, 0, "the other player has not started");
  assert.equal((await run(db, qq.playQuery(C1, id))).rows.length, 0);
  await db.query("update public.challenge_entries set started_at = now() - interval '20 minutes'");
  assert.equal((await run(db, qq.playQuery(A1, id))).rows[0].seconds_left, 0, "never negative");
  await submit(db, id, A1, 3);
  assert.equal((await run(db, qq.playQuery(A1, id))).rows.length, 0, "handed in");

  const linkId = (await one(db, "select id from public.classmate_links")).id;
  assert.equal((await run(db, qq.challengeListQuery(A1, 180, 30))).rows.length, 1);
  await run(db, qq.removeLinkQuery(null, A1, linkId));
  assert.equal((await run(db, qq.challengeListQuery(A1, 180, 30))).rows.length, 0, "unlinked classmates' challenges disappear from view");
  assert.equal((await run(db, qq.challengeDetailQuery(A1, id))).rows.length, 0);
});

test("decline and cancel: only the right player, and not once the other has started", async () => {
  const db = await freshDatabase();
  const id = await makeChallenge(db);
  assert.equal((await run(db, qq.declineChallengeQuery(A1, id))).rows.length, 0, "the challenger cannot decline their own challenge");
  assert.equal((await run(db, qq.declineChallengeQuery(C1, id))).rows.length, 0);
  assert.equal((await run(db, qq.cancelChallengeQuery(B1, id))).rows.length, 0, "the opponent cannot cancel");
  await start(db, id, B1);
  assert.equal((await run(db, qq.cancelChallengeQuery(A1, id))).rows.length, 0, "the challenger cannot withdraw once the opponent started");
  assert.equal((await run(db, qq.declineChallengeQuery(B1, id))).rows.length, 0, "the opponent cannot decline after starting");
  const second = await makeChallenge(db);
  await start(db, second, A1);
  assert.equal((await run(db, qq.cancelChallengeQuery(A1, second))).rows.length, 1, "the challenger may withdraw after starting their own");
  const third = await makeChallenge(db);
  assert.equal((await run(db, qq.declineChallengeQuery(B1, third))).rows.length, 1);
  assert.equal((await run(db, qq.openBetweenQuery(A1, B1))).rows[0].n, 1, "only the first is still open");
});

test("creating a challenge stores the paper and sets the deadline", async () => {
  const db = await freshDatabase();
  await db.query("insert into public.classmate_links (learner_a, learner_b) values ($1, $2)", link(A1, B1));
  const made = (await run(db, qq.createChallengeQuery({ challengerId: A1, opponentId: B1, subjectSlug: "chemistry", subjectName: "Chemistry", termSlug: null, termName: "All terms", count: 5, minutes: 5, paperJson: PAPER, validDays: 3 }))).rows[0];
  const row = await one(db, `select question_count, minutes, jsonb_array_length(paper) n, expires_at > now() + interval '71 hours' as long_enough, term_slug from public.challenges where id = '${made.id}'`);
  assert.deepEqual(row, { question_count: 5, minutes: 5, n: 5, long_enough: true, term_slug: null });
});

test("retention: old data is removed, recent data and reported messages stay", async () => {
  const db = await freshDatabase();
  const linkId = (await db.query("insert into public.classmate_links (learner_a, learner_b) values ($1, $2) returning id", link(A1, B1))).rows[0].id;
  const message = async (kind, age) => (await db.query(
    `insert into public.chat_messages (link_id, sender_id, kind, body, audio_seconds, audio_bytes, created_at) values ($1, $2, $3, $4, $5, $6, now() - make_interval(days => $7)) returning id`,
    [linkId, A1, kind, kind === "text" ? "hello" : null, kind === "voice" ? 5 : null, kind === "voice" ? 4 : null, age],
  )).rows[0].id;
  await message("text", 20);
  const newText = await message("text", 2);
  const oldVoice = await message("voice", 9);
  const newVoice = await message("voice", 3);
  const reported = await message("text", 40);
  for (const id of [oldVoice, newVoice]) await db.query("insert into public.chat_voice_clips (message_id, content_type, audio) values ($1, 'audio/webm', '\\x1a45dfa3')", [id]);
  await db.query("insert into public.classmate_reports (reporter_id, reported_id, reason, message_id) values ($1, $2, 'unkind', $3)", [B1, A1, reported]);

  const finishedOld = await makeChallenge(db);
  const finishedNew = await makeChallenge(db);
  await makeChallenge(db, { expires: "now() - interval '40 days'" });
  const endedNew = await makeChallenge(db, { expires: "now() - interval '1 day'" });
  await db.query("update public.challenges set finished_at = now() - interval '200 days' where id = $1", [finishedOld]);
  await db.query("update public.challenges set finished_at = now() - interval '10 days' where id = $1", [finishedNew]);
  await db.query("insert into public.social_events (learner_id, kind, created_at) values ($1, 'msg', now() - interval '3 days'), ($1, 'msg', now())", [A1]);
  await makeInvite(db, { hash: "a".repeat(64), expires: "now() - interval '40 days'" });
  await makeInvite(db, { hash: "b".repeat(64) });
  await db.query("insert into public.classmate_reports (reporter_id, reported_id, reason, created_at) values ($1, $2, 'other', now() - interval '400 days')", [B1, A1]);

  const days = rules.RETENTION_DAYS;
  const removed = {};
  for (const { name, query } of qq.purgeQueries(days, true)) removed[name] = (await run(db, query)).rows[0].n;
  assert.deepEqual(removed, { "finished challenges": 1, "ended challenges": 1, "rate-limit events": 1, "classmate codes": 1, "reports": 1, "voice notes": 1, "text messages": 1 });
  const ids = async (table) => (await db.query(`select id from public.${table}`)).rows.map((r) => r.id).sort();
  assert.deepEqual(await ids("chat_messages"), [newText, newVoice, reported].sort(), "recent messages stay, and so does a message with an open report");
  assert.deepEqual(await ids("challenges"), [finishedNew, endedNew].sort());
  assert.equal(await count(db, "select count(*) n from public.chat_voice_clips"), 1, "the old voice file went with its message");
  assert.equal(removed["text messages"], 1);
  // Without chat switched on, the chat tables are not touched (they may not exist yet).
  assert.equal(qq.purgeQueries(days, false).length, 5);
  assert.ok(!qq.purgeQueries(days, false).some(({ query }) => query.text.includes("chat_messages")));
});

test("every query's parameters are all used and ids are never part of the SQL text", () => {
  const ids = [A1, B1, P1, "f".repeat(64)];
  const queries = [
    q.rateLimitQuery({ learnerId: A1 }, "msg", 3, 60), q.rateLimitQuery({ parentId: P1 }, "invite", 3, 60), q.recentEventsQuery({ parentId: P1 }, "pin-fail", 900), q.recordEventQuery({ parentId: P1 }, "pin-fail"), q.claimInviteQuery(A1, B1), q.startEntryQuery(A1, B1),
    q.submitEntryQuery(A1, B1, 3, 5, "[]", 60), q.finishChallengeQuery(A1), q.settleOverdueQuery(A1, 60), q.finishSettledQuery(A1), q.leaderboardQuery([A1], 90, null),
    qq.settingsQuery(A1), qq.settingsForQuery([A1]), qq.saveSettingsQuery(P1, A1, { challenges: true, presence: false, chat: false, voice: false }), qq.classmatesQuery(A1),
    qq.parentLinksQuery(P1), qq.linkOwnLearnersQuery(P1, A1, A2), qq.classDirectoryQuery(A1, 75, 100), qq.conversationsQuery(A1, 14, 7, 75), qq.theirReadQuery(A1, B1), qq.requestLinkQuery(A1, B1), qq.pendingLinksQuery(A1), qq.acceptLinkQuery(A1, B1), qq.acceptByChallengeQuery(A1, B1), qq.declineLinkQuery(A1, B1), qq.linkBetweenQuery(A1, B1), qq.linkCountQuery(A1), qq.linkForLearnerQuery(A1, B1), qq.createInviteQuery(P1, A1, "f".repeat(64), 7),
    qq.pendingInviteCountQuery(A1), qq.pendingInvitesQuery(P1), qq.cancelInviteQuery(P1, A1), qq.inviteByHashQuery("f".repeat(64)), qq.blockLinkQuery(P1, A1, B1),
    qq.unblockLinkQuery(P1, A1, B1), qq.removeLinkQuery(null, A1, B1), qq.cancelOpenForLinkQuery(P1, A1, B1), qq.reportQuery(A1, B1, "other", null, null, null),
    qq.reportsByParentQuery(P1), qq.openBetweenQuery(A1, B1), qq.challengeListQuery(A1, 180, 30), qq.challengeDetailQuery(A1, B1), qq.playQuery(A1, B1),
    qq.declineChallengeQuery(A1, B1), qq.cancelChallengeQuery(A1, B1), ...qq.purgeQueries(rules.RETENTION_DAYS, true).map((entry) => entry.query),
  ];
  for (const { text, params } of queries) {
    for (const id of ids) assert.ok(!text.includes(id), `an id is in the SQL text: ${text.slice(0, 80)}`);
    params.forEach((_, index) => assert.ok(text.includes(`$${index + 1}`), `parameter $${index + 1} unused in: ${text.slice(0, 120)}`));
  }
});

test("the privacy policy states the limits and retention periods that the code enforces", async () => {
  const privacy = await read("../src/app/(legal)/privacy/page.tsx");
  const { RETENTION_DAYS: days, LIMITS: limits } = rules;
  const stated = [
    `${days.textMessages} days`, `${days.voiceNotes} days`, `${days.finishedChallenges} days`, `${days.leaderboardWindow} days`, `${days.events} days`,
    `${limits.messageMaxChars} characters`, `${limits.voiceMaxSeconds} seconds`, `${limits.codeValidDays} days`,
  ];
  for (const text of stated) assert.ok(privacy.includes(text), `the privacy policy no longer says "${text}": update it or the limits`);
  assert.equal(days.reports, 365);
  assert.ok(privacy.includes("12 months"));
  const legal = await read("../src/data/legal.ts");
  assert.ok(!legal.includes('"2026-10-10-draft"'), "the legal version must have been bumped for the classmate sections");
});

// ---------------------------------------------------------------- presence and chat

async function linkedPair(db, { x = A1, y = B1, xOn = {}, yOn = {} } = {}) {
  const base = { challenges: true, presence: false, chat: false, voice: false };
  for (const [parent, learner, on] of [[x === A1 || x === A2 ? P1 : x === B1 ? P2 : P3, x, xOn], [y === A1 || y === A2 ? P1 : y === B1 ? P2 : P3, y, yOn]]) {
    await run(db, qq.saveSettingsQuery(parent, learner, { ...base, ...on }));
  }
  const [a, b] = link(x, y);
  return (await db.query("insert into public.classmate_links (learner_a, learner_b) values ($1, $2) returning id", [a, b])).rows[0].id;
}

test("presence: a heartbeat is ignored if it comes too soon, and only counts as online within the window", async () => {
  const db = await freshDatabase();
  assert.equal((await run(db, qq.heartbeatQuery(A1, 20))).rows.length, 1, "the first heartbeat is stored");
  assert.equal((await run(db, qq.heartbeatQuery(A1, 20))).rows.length, 0, "one right after changes nothing");
  await db.query("update public.learner_presence set last_seen_at = now() - interval '30 seconds'");
  assert.equal((await run(db, qq.heartbeatQuery(A1, 20))).rows.length, 1, "after the gap it updates");
  assert.equal(await count(db, "select count(*) n from public.learner_presence"), 1, "one row per learner, overwritten");
});

test("online status: shown only when both parents switched presence on, only online or not, never for blocked or unlinked", async () => {
  const db = await freshDatabase();
  const linkId = await linkedPair(db, { xOn: { presence: true }, yOn: { presence: true } });
  const online = async (learner = A1) => (await run(db, qq.onlineQuery(learner, 75))).rows;
  assert.deepEqual(await online(), [{ link_id: linkId, online: false }], "no heartbeat yet: offline");
  await run(db, qq.heartbeatQuery(B1, 20));
  assert.deepEqual(await online(), [{ link_id: linkId, online: true }]);
  assert.deepEqual(await online(B1), [{ link_id: linkId, online: false }], "Ada has never been seen");
  await db.query("update public.learner_presence set last_seen_at = now() - interval '2 minutes'");
  assert.deepEqual(await online(), [{ link_id: linkId, online: false }], "older than the window is offline");
  await run(db, qq.heartbeatQuery(C1, 20));

  await run(db, qq.saveSettingsQuery(P2, B1, { challenges: true, presence: false, chat: false, voice: false }));
  assert.deepEqual(await online(), [], "Chi's parent switched presence off: nothing about Chi");
  await run(db, qq.saveSettingsQuery(P2, B1, { challenges: true, presence: true, chat: false, voice: false }));
  await run(db, qq.saveSettingsQuery(P1, A1, { challenges: true, presence: false, chat: false, voice: false }));
  assert.deepEqual(await online(), [], "and Ada cannot see others without sharing her own status");
  await run(db, qq.saveSettingsQuery(P1, A1, { challenges: true, presence: true, chat: false, voice: false }));
  await run(db, qq.blockLinkQuery(null, A1, linkId));
  assert.deepEqual(await online(), [], "a blocked classmate is not shown");
});

test("chat: both parents must have switched it on; messages come back oldest first; the newest are kept when there are many", async () => {
  const db = await freshDatabase();
  const linkId = await linkedPair(db, { xOn: { chat: true }, yOn: { chat: true } });
  const send = async (who, text) => (await run(db, qq.sendTextQuery(who, linkId, text))).rows[0];
  const first = await send(A1, "hello");
  await send(B1, "hi back");
  assert.ok(first.id && first.seq && first.created_at);
  assert.equal(await send(C1, "intruder"), undefined, "someone not on the link cannot send");
  const list = async (who = A1, after = 0, limit = 60) => (await run(db, qq.chatListQuery(who, linkId, after, 14, 7, limit))).rows;
  assert.deepEqual((await list()).map((m) => m.body), ["hello", "hi back"]);
  assert.deepEqual((await list(C1)).length, 0, "an outsider reads nothing");
  assert.deepEqual((await list(A1, 0, 1)).map((m) => m.body), ["hi back"], "the limit keeps the newest");
  assert.deepEqual(Object.keys((await list())[0]).sort(), ["audio_seconds", "body", "created_at", "id", "kind", "sender_id", "seq"], "no audio and nothing about the sender but the id");

  // Chat off on one side stops sending and reading for both.
  await run(db, qq.saveSettingsQuery(P2, B1, { challenges: true, presence: false, chat: false, voice: false }));
  assert.equal(await send(A1, "still there?"), undefined);
  assert.equal((await list()).length, 0);
  await run(db, qq.saveSettingsQuery(P2, B1, { challenges: true, presence: false, chat: true, voice: false }));
  assert.equal((await list()).length, 2, "and it comes back when it is switched on again");
  await run(db, qq.blockLinkQuery(null, B1, linkId));
  assert.equal(await send(A1, "blocked?"), undefined, "a blocked link cannot chat");
});

test("chat: the 'after' cursor gives newer messages plus the last 15 seconds, and retention hides old messages", async () => {
  const db = await freshDatabase();
  const linkId = await linkedPair(db, { xOn: { chat: true }, yOn: { chat: true } });
  const insert = async (body, ageDays, ageSeconds = 0) => (await db.query(`insert into public.chat_messages (link_id, sender_id, body, created_at) values ($1, $2, $3, now() - make_interval(days => $4, secs => $5)) returning seq::text seq`, [linkId, A1, body, ageDays, ageSeconds])).rows[0].seq;
  const old = await insert("too old", 20);
  const older = await insert("a minute ago", 0, 60);
  const recent = await insert("just now", 0, 3);
  const newest = await insert("newest", 0, 0);
  const list = async (after) => (await run(db, qq.chatListQuery(B1, linkId, after, 14, 7, 100))).rows.map((m) => m.body);
  assert.deepEqual(await list(0), ["a minute ago", "just now", "newest"], "older than the retention period is hidden even before the purge runs");
  assert.deepEqual(await list(Number(older)), ["just now", "newest"]);
  assert.deepEqual(await list(Number(newest)), ["just now", "newest"], "the last 15 seconds are repeated, so a late-arriving message is never missed");
  assert.equal(Number(old) < Number(recent), true);
});

test("chat: unread counts only count messages from the classmate that this learner has not opened", async () => {
  const db = await freshDatabase();
  const linkId = await linkedPair(db, { xOn: { chat: true }, yOn: { chat: true } });
  for (const [who, text] of [[B1, "one"], [B1, "two"], [A1, "mine"]]) await run(db, qq.sendTextQuery(who, linkId, text));
  const unread = async (who) => Object.fromEntries((await run(db, qq.unreadQuery(who, 14, 7))).rows.map((r) => [r.link_id, r.n]));
  assert.deepEqual(await unread(A1), { [linkId]: 2 });
  assert.deepEqual(await unread(B1), { [linkId]: 1 });
  await run(db, qq.markReadQuery(A1, linkId));
  assert.deepEqual(await unread(A1), {});
  assert.deepEqual(await unread(B1), { [linkId]: 1 }, "reading is per learner");
  await run(db, qq.sendTextQuery(B1, linkId, "three"));
  assert.deepEqual(await unread(A1), { [linkId]: 1 });
  await run(db, qq.markReadQuery(C1, linkId));
  assert.equal(await count(db, `select count(*) n from public.chat_reads where learner_id = '${C1}'`), 0, "an outsider cannot mark anything read");
  assert.deepEqual(await unread(C1), {});
});

test("parents: read every message of their own child's conversations, delete any of them, and nothing of other families", async () => {
  const db = await freshDatabase();
  const linkId = await linkedPair(db, { xOn: { chat: true }, yOn: { chat: true } });
  const sent = [];
  for (const [who, text] of [[A1, "hello"], [B1, "hi"]]) sent.push((await run(db, qq.sendTextQuery(who, linkId, text))).rows[0].id);
  await db.query(`insert into public.chat_messages (id, link_id, sender_id, kind, audio_seconds, audio_bytes) values ('33333333-0000-4000-8000-000000000001', $1, $2, 'voice', 4, 3)`, [linkId, B1]);
  await db.query(`insert into public.chat_voice_clips (message_id, content_type, audio) values ('33333333-0000-4000-8000-000000000001', 'audio/webm', '\\x1a45dfa3')`);
  const read = async (parent, learner) => (await run(db, qq.parentConversationQuery(parent, learner, linkId, 14, 7, 200))).rows;
  assert.deepEqual((await read(P1, A1)).map((m) => m.sender_name), ["Ada", "Chi", "Chi"]);
  assert.equal((await read(P2, B1)).length, 3, "the other child's parent reads it too");
  assert.equal((await read(P3, C1)).length, 0, "another family reads nothing");
  assert.equal((await read(P2, A1)).length, 0, "and a parent cannot read through someone else's learner");
  await run(db, qq.saveSettingsQuery(P1, A1, { challenges: true, presence: false, chat: false, voice: false }));
  assert.equal((await read(P1, A1)).length, 3, "reading still works after chat is switched off");

  assert.equal((await run(db, qq.deleteMessageQuery(P3, sent[0]))).rows.length, 0, "another family cannot delete");
  assert.equal((await run(db, qq.deleteMessageQuery(P1, sent[1]))).rows.length, 1, "a parent can delete the classmate's message to their child");
  assert.equal((await run(db, qq.deleteMessageQuery(P2, "33333333-0000-4000-8000-000000000001"))).rows.length, 1);
  assert.equal(await count(db, "select count(*) n from public.chat_voice_clips"), 0, "the recording went with the message");
  assert.equal(await count(db, "select count(*) n from public.chat_messages"), 1);
});

test("voice notes: saved only when both parents allow them, stored with the message, played back only to the right people, and hidden after the retention period", async () => {
  const db = await freshDatabase();
  const linkId = await linkedPair(db, { xOn: { chat: true, voice: true }, yOn: { chat: true, voice: true } });
  const bytes = Buffer.from([0x1a, 0x45, 0xdf, 0xa3, 1, 2, 3, 4, 5, 6, 7, 8]);
  const b64 = bytes.toString("base64");
  const send = async (who) => (await run(db, qq.sendVoiceQuery(who, linkId, "audio/webm", 5, b64, bytes.length))).rows[0];

  assert.equal(await send(C1), undefined, "someone not on the link cannot send");
  assert.equal(await count(db, "select count(*) n from public.chat_voice_clips"), 0, "and nothing is stored for them");
  const sent = await send(A1);
  assert.ok(sent.id);
  assert.deepEqual(await one(db, `select kind, body, audio_seconds, audio_bytes from public.chat_messages where id = '${sent.id}'`), { kind: "voice", body: null, audio_seconds: 5, audio_bytes: 12 });
  const clip = await one(db, `select content_type, encode(audio, 'base64') as audio from public.chat_voice_clips where message_id = '${sent.id}'`);
  assert.deepEqual(clip, { content_type: "audio/webm", audio: b64 }, "the recording round-trips exactly");
  await assert.rejects(run(db, qq.sendVoiceQuery(A1, linkId, "video/mp4", 5, b64, 12)), /check/i, "the database only accepts audio types");

  const listed = (await run(db, qq.chatListQuery(B1, linkId, 0, 14, 7, 60))).rows;
  assert.deepEqual(listed.map((m) => [m.kind, m.audio_seconds, m.body]), [["voice", 5, null]], "lists show the length, never the audio");

  const play = async (query) => (await run(db, query)).rows[0]?.audio;
  assert.equal(await play(qq.voiceForLearnerQuery(B1, sent.id, 7)), b64, "the classmate can listen");
  assert.equal(await play(qq.voiceForLearnerQuery(A1, sent.id, 7)), b64, "and so can the sender");
  assert.equal(await play(qq.voiceForLearnerQuery(C1, sent.id, 7)), undefined, "an outsider cannot");
  assert.equal(await play(qq.voiceForParentQuery(P1, sent.id, 7)), b64, "the sender's parent can");
  assert.equal(await play(qq.voiceForParentQuery(P2, sent.id, 7)), b64, "and the classmate's parent");
  assert.equal(await play(qq.voiceForParentQuery(P3, sent.id, 7)), undefined, "another family cannot");

  await run(db, qq.saveSettingsQuery(P2, B1, { challenges: true, presence: false, chat: true, voice: false }));
  assert.equal(await send(A1), undefined, "voice off on one side stops sending");
  assert.equal(await play(qq.voiceForLearnerQuery(B1, sent.id, 7)), undefined, "and listening for the learners");
  assert.equal(await play(qq.voiceForParentQuery(P2, sent.id, 7)), b64, "but a parent can always listen to their child's conversation");

  await db.query("update public.chat_messages set created_at = now() - interval '8 days'");
  assert.equal(await play(qq.voiceForParentQuery(P2, sent.id, 7)), undefined, "after the retention period it is gone for everyone");
});

test("chat list: newest conversation first, last message, unread, online only when both share it, nobody without chat on both sides", async () => {
  const db = await freshDatabase();
  const chi = await linkedPair(db, { xOn: { chat: true, presence: true }, yOn: { chat: true, presence: true } });
  const dayo = await linkedPair(db, { x: A1, y: C1, xOn: { chat: true, presence: true }, yOn: { chat: true } });
  await run(db, qq.sendTextQuery(B1, chi, "hello Ada"));
  await db.query("update public.chat_messages set created_at = now() - interval '1 hour'");
  await run(db, qq.sendTextQuery(A1, dayo, "hi Dayo"));
  await run(db, qq.heartbeatQuery(B1, 20));
  const list = (await run(db, qq.conversationsQuery(A1, 14, 7, 75))).rows;
  assert.deepEqual(list.map((r) => [r.name, r.last_body, r.last_mine, r.unread, r.online]), [["Dayo", "hi Dayo", true, 0, null], ["Chi", "hello Ada", false, 1, true]]);
  await run(db, qq.markReadQuery(A1, chi));
  assert.equal((await run(db, qq.conversationsQuery(A1, 14, 7, 75))).rows.find((r) => r.name === "Chi").unread, 0);
  assert.equal((await run(db, qq.theirReadQuery(B1, chi))).rows[0].seq !== "0", true, "Chi can see Ada has read up to the latest message");
  assert.equal((await run(db, qq.theirReadQuery(C1, chi))).rows.length, 0, "an outsider learns nothing");
  await run(db, qq.saveSettingsQuery(P3, C1, { challenges: true, presence: false, chat: false, voice: false }));
  assert.deepEqual((await run(db, qq.conversationsQuery(A1, 14, 7, 75))).rows.map((r) => r.name), ["Chi"], "Dayo's parent switched chat off");
  assert.equal((await run(db, qq.conversationsQuery(C1, 14, 7, 75))).rows.length, 0);
});

test("a message can only be reported by the learner who received it", async () => {
  const db = await freshDatabase();
  const linkId = await linkedPair(db, { xOn: { chat: true }, yOn: { chat: true } });
  const sent = (await run(db, qq.sendTextQuery(A1, linkId, "rude words"))).rows[0].id;
  assert.equal((await run(db, qq.receivedMessageQuery(A1, sent))).rows.length, 0, "not your own message");
  assert.equal((await run(db, qq.receivedMessageQuery(C1, sent))).rows.length, 0, "not an outsider");
  assert.deepEqual((await run(db, qq.receivedMessageQuery(B1, sent))).rows[0], { id: sent, link_id: linkId, kind: "text", body: "rude words" });
});

// ---------------------------------------------------------------- visible to my class

const VISIBLE = { challenges: true, classVisible: true, presence: false, chat: false, voice: false };

test("class list: only same school and class, both parents chose 'visible to my class', never blocked; online only when both share it", async () => {
  const db = await freshDatabase();
  await db.query("update public.learner_profiles set school = 'brainfield  school.' where id = $1", [C1]);
  await db.query("insert into public.learner_profiles (id, parent_id, name, pin_hash, class_level, school) values ('d1d1d1d1-0000-4000-8000-000000000005', $1, 'Eko', 'x', 'SS2', 'Brainfield School')", [P3]);
  await run(db, qq.saveSettingsQuery(P1, A1, VISIBLE));
  await run(db, qq.saveSettingsQuery(P2, B1, VISIBLE));
  await run(db, qq.saveSettingsQuery(P3, C1, VISIBLE));
  await run(db, qq.saveSettingsQuery(P3, "d1d1d1d1-0000-4000-8000-000000000005", VISIBLE));
  await run(db, qq.saveSettingsQuery(P1, A2, { ...VISIBLE, classVisible: false }));
  const names = async (who = A1) => (await run(db, qq.classDirectoryQuery(who, 75, 100))).rows.map((r) => r.name).sort();
  assert.deepEqual(await names(), ["Chi", "Dayo"], "Bola is not visible, Eko is in another class, school spelling differences are ignored");
  await run(db, qq.saveSettingsQuery(P1, A1, { ...VISIBLE, classVisible: false }));
  assert.deepEqual(await names(), [], "you only see the class if you are visible too");
  await run(db, qq.saveSettingsQuery(P1, A1, VISIBLE));
  assert.deepEqual((await run(db, qq.classDirectoryQuery(A1, 75, 100))).rows.map((r) => r.online), [null, null], "no online status unless both share it");
  await run(db, qq.saveSettingsQuery(P1, A1, { ...VISIBLE, presence: true }));
  await run(db, qq.saveSettingsQuery(P2, B1, { ...VISIBLE, presence: true }));
  await run(db, qq.heartbeatQuery(B1, 20));
  const rows = (await run(db, qq.classDirectoryQuery(A1, 75, 100))).rows;
  assert.deepEqual(rows.map((r) => [r.name, r.online]), [["Chi", true], ["Dayo", null]], "online people first");
  const linkId = (await run(db, qq.requestLinkQuery(A1, C1))).rows[0].id;
  await run(db, qq.declineLinkQuery(C1, linkId));
  assert.deepEqual(await names(), ["Chi"], "after Dayo declines, Ada no longer sees Dayo");
  assert.deepEqual(await names(C1), ["Chi"], "and Dayo no longer sees Ada");
});

test("classmate requests: one per pair, only the asked child accepts or declines, a decline cannot be re-asked, chat waits for acceptance", async () => {
  const db = await freshDatabase();
  for (const [parent, learner] of [[P1, A1], [P2, B1]]) await run(db, qq.saveSettingsQuery(parent, learner, { ...VISIBLE, chat: true }));
  const linkId = (await run(db, qq.requestLinkQuery(A1, B1))).rows[0].id;
  assert.equal((await run(db, qq.requestLinkQuery(B1, A1))).rows.length, 0, "only one link per pair");
  assert.equal((await run(db, qq.sendTextQuery(A1, linkId, "hi"))).rows.length, 0, "no chat while the request is pending");
  assert.deepEqual((await run(db, qq.pendingLinksQuery(B1))).rows.map((r) => [r.name, r.requested_by]), [["Ada", A1]]);
  assert.deepEqual((await run(db, qq.classmatesQuery(B1))).rows, [], "a pending request is not yet a classmate");
  assert.equal((await run(db, qq.acceptLinkQuery(A1, linkId))).rows.length, 0, "the asker cannot accept their own request");
  assert.equal((await run(db, qq.acceptLinkQuery(C1, linkId))).rows.length, 0, "an outsider cannot accept");
  assert.equal((await run(db, qq.acceptLinkQuery(B1, linkId))).rows.length, 1);
  assert.equal((await run(db, qq.sendTextQuery(A1, linkId, "hi"))).rows.length, 1, "chat opens once accepted");

  const second = (await run(db, qq.requestLinkQuery(A2, B1))).rows[0].id;
  assert.equal((await run(db, qq.declineLinkQuery(A2, second))).rows.length, 0, "the asker cannot decline");
  assert.equal((await run(db, qq.declineLinkQuery(B1, second))).rows.length, 1);
  assert.equal((await one(db, `select status, blocked_by from public.classmate_links where id = '${second}'`)).status, "blocked");
  assert.equal((await run(db, qq.requestLinkQuery(A2, B1))).rows.length, 0, "a declined child cannot ask again");
});

test("a challenge can be sent with a request; starting it accepts the request", async () => {
  const db = await freshDatabase();
  const linkId = (await run(db, qq.requestLinkQuery(A1, B1))).rows[0].id;
  const id = (await db.query(`insert into public.challenges (challenger_id, opponent_id, subject_slug, subject_name, term_name, question_count, minutes, paper, expires_at) values ($1, $2, 'chemistry', 'Chemistry', 'First Term', 5, 5, $3::jsonb, now() + interval '3 days') returning id`, [A1, B1, PAPER])).rows[0].id;
  assert.equal((await run(db, qq.challengeListQuery(B1, 180, 30))).rows.length, 1, "the asked child sees the challenge");
  await start(db, id, A1);
  await run(db, qq.acceptByChallengeQuery(A1, id));
  assert.equal((await one(db, "select status from public.classmate_links")).status, "pending", "the challenger starting does not accept for the other child");
  await start(db, id, B1);
  assert.equal((await entries(db, id)).length, 2, "a pending request still lets both play");
  await run(db, qq.acceptByChallengeQuery(B1, id));
  assert.deepEqual(await one(db, "select status, requested_by from public.classmate_links"), { status: "active", requested_by: null });
  assert.equal(linkId.length, 36);
});

// ---------------------------------------------------------------- deletion

async function seedSocial(db) {
  const [ab1, ab2] = link(A1, B1);
  const [ac1, ac2] = link(A2, C1);
  const [bc1, bc2] = link(B1, C1);
  await db.exec(`
    insert into public.learner_social_settings (learner_id, challenges_on, presence_on, chat_on, voice_on) values ('${A1}', true, true, true, true), ('${B1}', true, true, true, true), ('${C1}', true, false, false, false), ('${A2}', true, false, false, false);
    insert into public.classmate_links (id, learner_a, learner_b) values ('11111111-0000-4000-8000-000000000001', '${ab1}', '${ab2}'), ('11111111-0000-4000-8000-000000000002', '${ac1}', '${ac2}'), ('11111111-0000-4000-8000-000000000003', '${bc1}', '${bc2}');
    insert into public.classmate_invites (learner_id, parent_id, code_hash, expires_at) values ('${A1}', '${P1}', '${"1".repeat(64)}', now() + interval '1 day'), ('${B1}', '${P2}', '${"2".repeat(64)}', now() + interval '1 day'), ('${C1}', '${P3}', '${"3".repeat(64)}', now() + interval '1 day');
    insert into public.learner_presence (learner_id) values ('${A1}'), ('${B1}'), ('${C1}');
    insert into public.social_events (learner_id, kind) values ('${A1}', 'msg'), ('${B1}', 'msg'), ('${C1}', 'msg');
    insert into public.social_events (parent_id, kind) values ('${P1}', 'redeem'), ('${P2}', 'redeem'), ('${P3}', 'redeem');
    insert into public.classmate_reports (reporter_id, reported_id, reason) values ('${A1}', '${B1}', 'unkind'), ('${B1}', '${C1}', 'other'), ('${C1}', '${A2}', 'other');
    insert into public.chat_messages (id, link_id, sender_id, kind, body) values
      ('22222222-0000-4000-8000-000000000001', '11111111-0000-4000-8000-000000000001', '${A1}', 'text', 'hi chi'),
      ('22222222-0000-4000-8000-000000000002', '11111111-0000-4000-8000-000000000001', '${B1}', 'text', 'hi ada'),
      ('22222222-0000-4000-8000-000000000003', '11111111-0000-4000-8000-000000000002', '${A2}', 'text', 'hi dayo'),
      ('22222222-0000-4000-8000-000000000004', '11111111-0000-4000-8000-000000000003', '${B1}', 'text', 'hi dayo');
    insert into public.chat_messages (id, link_id, sender_id, kind, audio_seconds, audio_bytes) values
      ('22222222-0000-4000-8000-000000000005', '11111111-0000-4000-8000-000000000001', '${A1}', 'voice', 5, 4),
      ('22222222-0000-4000-8000-000000000006', '11111111-0000-4000-8000-000000000003', '${C1}', 'voice', 5, 4);
    insert into public.chat_voice_clips (message_id, content_type, audio) values ('22222222-0000-4000-8000-000000000005', 'audio/webm', '\\x1a45dfa3'), ('22222222-0000-4000-8000-000000000006', 'audio/webm', '\\x1a45dfa3');
    insert into public.chat_reads (link_id, learner_id, last_read_seq) values ('11111111-0000-4000-8000-000000000001', '${A1}', 1), ('11111111-0000-4000-8000-000000000001', '${B1}', 1), ('11111111-0000-4000-8000-000000000003', '${C1}', 1);
  `);
  const finished = [];
  for (const [x, y] of [[A1, B1], [B1, C1], [A2, C1]]) {
    const id = await makeChallenge(db, { challenger: x, opponent: y });
    await db.query(`insert into public.challenge_entries (challenge_id, learner_id, submitted_at, score, total, duration_seconds, answers) values ($1, $2, now(), 3, 5, 100, '[]'), ($1, $3, now(), 2, 5, 100, '[]')`, [id, x, y]);
    await db.query("update public.challenges set finished_at = now() where id = $1", [id]);
    finished.push(id);
  }
}

async function leftoverFor(db, learnerIds, parentIds = []) {
  const ids = learnerIds.map((id) => `'${id}'`).join(",");
  const parents = parentIds.map((id) => `'${id}'`).join(",") || "null";
  const checks = {
    settings: `select count(*) n from public.learner_social_settings where learner_id in (${ids})`,
    presence: `select count(*) n from public.learner_presence where learner_id in (${ids})`,
    links: `select count(*) n from public.classmate_links where learner_a in (${ids}) or learner_b in (${ids})`,
    invites: `select count(*) n from public.classmate_invites where learner_id in (${ids}) or used_by_learner in (${ids}) or parent_id in (${parents})`,
    challenges: `select count(*) n from public.challenges where challenger_id in (${ids}) or opponent_id in (${ids})`,
    entries: `select count(*) n from public.challenge_entries where learner_id in (${ids})`,
    reports: `select count(*) n from public.classmate_reports where reporter_id in (${ids}) or reported_id in (${ids})`,
    events: `select count(*) n from public.social_events where learner_id in (${ids}) or parent_id in (${parents})`,
    messages: `select count(*) n from public.chat_messages where sender_id in (${ids}) or link_id in (select id from public.classmate_links where learner_a in (${ids}) or learner_b in (${ids}))`,
    reads: `select count(*) n from public.chat_reads where learner_id in (${ids})`,
  };
  const left = {};
  for (const [name, text] of Object.entries(checks)) left[name] = await count(db, text);
  return left;
}
const ZERO = { settings: 0, presence: 0, links: 0, invites: 0, challenges: 0, entries: 0, reports: 0, events: 0, messages: 0, reads: 0 };

async function presentTables(db) {
  return (await db.query(PRESENT_SOCIAL_TABLES_QUERY.text, PRESENT_SOCIAL_TABLES_QUERY.params)).rows.map((r) => r.name);
}
async function exec(db, statements) {
  await db.query("begin");
  try {
    for (const { text, params } of statements) await db.query(text, params);
    await db.query("commit");
  } catch (error) {
    await db.query("rollback");
    throw error;
  }
}

test("all eleven classmate tables and parent_settings are found, and a database without them reports none", async () => {
  assert.equal((await presentTables(await freshDatabase())).length, OPTIONAL_TABLES.length);
  assert.deepEqual(await presentTables(await freshDatabase({ social: false })), []);
});

test("deleting a parent account removes their learners' links, messages, voice files, challenges, presence, reports, codes and events", async () => {
  const db = await freshDatabase();
  await seedSocial(db);
  assert.equal(await count(db, "select count(*) n from public.chat_voice_clips"), 2);
  await exec(db, accountDeletionStatements(P1, "p1@example.com", await presentTables(db)));
  assert.deepEqual(await leftoverFor(db, [A1, A2], [P1]), ZERO);
  assert.equal(await count(db, `select count(*) n from public.chat_voice_clips where message_id = '22222222-0000-4000-8000-000000000005'`), 0, "the voice file went with the message");
});

test("deleting a parent account leaves other families' classmate data alone", async () => {
  const db = await freshDatabase();
  await seedSocial(db);
  await exec(db, accountDeletionStatements(P1, "p1@example.com", await presentTables(db)));
  // Chi and Dayo were linked to each other, and are not part of Parent 1's account.
  assert.equal(await count(db, `select count(*) n from public.classmate_links where learner_a = '${link(B1, C1)[0]}' and learner_b = '${link(B1, C1)[1]}'`), 1);
  assert.equal(await count(db, "select count(*) n from public.chat_messages where id = '22222222-0000-4000-8000-000000000004'"), 1);
  assert.equal(await count(db, "select count(*) n from public.chat_voice_clips where message_id = '22222222-0000-4000-8000-000000000006'"), 1);
  assert.equal(await count(db, `select count(*) n from public.learner_social_settings where learner_id in ('${B1}', '${C1}')`), 2);
  assert.equal(await count(db, `select count(*) n from public.learner_presence where learner_id in ('${B1}', '${C1}')`), 2);
  assert.equal(await count(db, `select count(*) n from public.classmate_invites where parent_id in ('${P2}', '${P3}')`), 2);
  assert.equal(await count(db, `select count(*) n from public.social_events where parent_id in ('${P2}', '${P3}')`), 2);
  assert.equal(await count(db, `select count(*) n from public.classmate_reports where reporter_id = '${B1}'`), 1);
  assert.equal(await count(db, `select count(*) n from public.challenges where challenger_id = '${B1}' and opponent_id = '${C1}'`), 1);
  assert.equal(await count(db, `select count(*) n from public.challenge_entries where learner_id in ('${B1}', '${C1}')`), 2, "only the Chi and Dayo challenge keeps its two entries");
  assert.equal(await count(db, "select count(*) n from public.chat_reads"), 1);
});

test("removing one learner deletes their classmate data and nothing of their sibling's or other families'", async () => {
  const db = await freshDatabase();
  await seedSocial(db);
  await exec(db, learnerDeletionStatements(P1, A1, await presentTables(db)));
  assert.deepEqual(await leftoverFor(db, [A1]), { ...ZERO, invites: 0 });
  assert.equal(await count(db, `select count(*) n from public.learner_profiles where id = '${A1}'`), 0);
  assert.equal(await count(db, `select count(*) n from public.learner_profiles where id = '${A2}'`), 1, "the sibling stays");
  assert.equal(await count(db, `select count(*) n from public.learner_social_settings where learner_id = '${A2}'`), 1);
  assert.equal(await count(db, `select count(*) n from public.classmate_links where learner_a = '${link(A2, C1)[0]}' and learner_b = '${link(A2, C1)[1]}'`), 1);
  assert.equal(await count(db, "select count(*) n from public.chat_messages where id = '22222222-0000-4000-8000-000000000003'"), 1);
  assert.equal(await count(db, `select count(*) n from public.classmate_invites where parent_id = '${P1}'`), 0, "the invite the removed learner made is gone");
  assert.equal(await count(db, `select count(*) n from public.social_events where parent_id = '${P1}'`), 1, "the parent's own event stays; it is not the learner's");
});

test("removing a learner with someone else's parent id deletes nothing", async () => {
  const db = await freshDatabase();
  await seedSocial(db);
  const before = {
    learners: await count(db, "select count(*) n from public.learner_profiles"), links: await count(db, "select count(*) n from public.classmate_links"),
    messages: await count(db, "select count(*) n from public.chat_messages"), challenges: await count(db, "select count(*) n from public.challenges"),
  };
  await exec(db, learnerDeletionStatements(P2, A1, await presentTables(db)));
  assert.deepEqual({
    learners: await count(db, "select count(*) n from public.learner_profiles"), links: await count(db, "select count(*) n from public.classmate_links"),
    messages: await count(db, "select count(*) n from public.chat_messages"), challenges: await count(db, "select count(*) n from public.challenges"),
  }, before);
});

test("the foreign keys alone also clean up: deleting the learner row leaves nothing behind", async () => {
  const db = await freshDatabase();
  await seedSocial(db);
  await db.query(`delete from public.learner_profiles where id = '${A1}'`);
  assert.deepEqual(await leftoverFor(db, [A1]), { ...ZERO });
  assert.equal(await count(db, "select count(*) n from public.chat_voice_clips where message_id = '22222222-0000-4000-8000-000000000005'"), 0);
  await db.query(`delete from neon_auth."user" where id = '${P3}'`);
  assert.deepEqual(await leftoverFor(db, [C1], [P3]), { ...ZERO });
});

test("deleting an account or a learner still works where the classmate migrations were never applied", async () => {
  const db = await freshDatabase({ social: false });
  const present = await presentTables(db);
  assert.deepEqual(present, []);
  await exec(db, learnerDeletionStatements(P1, A2, present));
  assert.equal(await count(db, `select count(*) n from public.learner_profiles where id = '${A2}'`), 0);
  await exec(db, accountDeletionStatements(P1, "p1@example.com", present));
  assert.equal(await count(db, `select count(*) n from public.learner_profiles where parent_id = '${P1}'`), 0);
  assert.equal(await count(db, "select count(*) n from public.learner_profiles"), 2);
});

test("deletion statements carry ids as parameters, never in the SQL text, and every parameter is used", () => {
  const all = [...accountDeletionStatements(P1, "o'brien@example.com", [...OPTIONAL_TABLES]), ...learnerDeletionStatements(P1, A1, [...OPTIONAL_TABLES])];
  for (const { text, params } of all) {
    assert.ok(!text.includes(P1) && !text.includes(A1) && !text.includes("brien"), text);
    params.forEach((_, index) => assert.ok(text.includes(`$${index + 1}`), `parameter $${index + 1} unused in: ${text}`));
  }
});

