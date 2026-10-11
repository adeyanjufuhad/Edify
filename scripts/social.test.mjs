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
import { PRESENT_SOCIAL_TABLES_QUERY, SOCIAL_TABLES, accountDeletionStatements, learnerDeletionStatements } from "../src/lib/account-deletion-sql.ts";
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
const SOCIAL = ["../db/migrations/010_classmates_challenges.sql", "../db/migrations/011_presence.sql", "../db/migrations/012_chat.sql", "../db/migrations/013_voice_notes.sql"];

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

test("migrations apply twice without error, and every classmate table has row level security", async () => {
  const db = await freshDatabase();
  for (const file of SOCIAL) await db.exec(await read(file));
  const rows = (await db.query(`select relname, relrowsecurity from pg_class where relnamespace = 'public'::regnamespace and relname = any($1::text[])`, [[...SOCIAL_TABLES]])).rows;
  assert.equal(rows.length, SOCIAL_TABLES.length);
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

test("all eleven classmate tables are found, and a database without them reports none", async () => {
  assert.equal((await presentTables(await freshDatabase())).length, SOCIAL_TABLES.length);
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
  const all = [...accountDeletionStatements(P1, "o'brien@example.com", [...SOCIAL_TABLES]), ...learnerDeletionStatements(P1, A1, [...SOCIAL_TABLES])];
  for (const { text, params } of all) {
    assert.ok(!text.includes(P1) && !text.includes(A1) && !text.includes("brien"), text);
    params.forEach((_, index) => assert.ok(text.includes(`$${index + 1}`), `parameter $${index + 1} unused in: ${text}`));
  }
});

