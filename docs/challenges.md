# Classmate challenges, presence, chat and voice notes

Design note and runbook for the social layer: learners challenge linked classmates on a subject, see who is
online, chat, and send voice notes. Written before the code; kept up to date with it.

**Status: built behind switches that are all OFF by default.** Nothing here is reachable by a child until the owner
has reviewed the safety design, applied the SQL by hand and set the environment variables below.

Nothing on this page is legal advice, and nothing here claims compliance with any law. Every point that belongs to the
owner or a Nigerian lawyer is marked **OWNER DECISION** or **LAWYER** and is also a visible `Todo` on the privacy policy
or terms.

---

## 1. What is being built

| Phase | Feature | SQL file | Switch (all default off) |
| --- | --- | --- | --- |
| 1 | Classmate links, challenges, leaderboard, parent controls, block and report | `010_classmates_challenges.sql` | `CHALLENGES_ENABLED=true` |
| 2 | "Online now" across devices | `011_presence.sql` | also `CHALLENGES_PRESENCE=true` |
| 3 | Text chat between linked classmates | `012_chat.sql` | also `CHALLENGES_CHAT=true` |
| 4 | Voice notes | `013_voice_notes.sql` | also `CHALLENGES_VOICE=true` |

`CHALLENGES_ENABLED` is the master switch: with it off, none of the pages, API routes or server actions respond, the
sidebar link is hidden and no query touches the new tables. The phase switches exist so that the owner can apply
010, switch on phase 1, and add the later phases one at a time. A phase switch does nothing unless the master
switch is on, and it must only be turned on **after** that phase's SQL has been applied.

Account deletion and removing a learner keep working whether or not the SQL has been applied (see section 8).

## 2. Child-safety design (this shapes everything else)

These are rules the code enforces, not intentions.

1. **No discovery.** There is no search, directory, suggestion or "people you may know". A learner can only ever see
   a classmate they have been *linked* to.
2. **A link needs both parents.** Parent A creates a one-time **classmate code** for their learner; parent B types it
   in for their learner. The code is 8 characters, valid for 7 days, single use, stored only as a SHA-256 hash, and
   redeeming it is rate limited (10 tries per hour per parent). The server then checks that the two learners are in
   the **same school and the same class** (school compared ignoring case and spacing). A link is refused if either
   learner has not been switched on for challenges by their parent. Parents share the code themselves (for example
   on WhatsApp); Edify never lists other families.
3. **Parents hold the switches.** Per learner, a parent turns on, separately: *challenges*, *show when I am online*,
   *text chat*, *voice notes*. All four start **off**. Chat needs challenges; voice notes need chat. A channel only
   works if **both** learners have it switched on.
4. **Parents can see and delete.** For each learner, the parent page lists every conversation (text and voice notes,
   with a player), can delete any message in a conversation involving their child, can remove a classmate, block them
   or lift a block, and sees every report their child sent.
5. **Block and report.** A learner can block a classmate (the link stops working both ways, the other side just sees
   the classmate is no longer available) or report them with a reason. A report also blocks. Reports are stored
   for the owner (section 9); there is no admin screen yet.
6. **Minimum information.** Another family only ever sees a learner's **first name and class**. Never the school,
   surname, stream, plan, parent, email, progress or notes. The leaderboard shows first name, class and
   challenge results only.
7. **No contact details in chat.** Messages that contain a phone number, an email address or a link are refused
   with a short explanation. This is a basic guard, not moderation.
8. **Limits.** Messages: 500 characters, 20 a minute, 400 a day per learner. Voice notes: 30 seconds, 400 KB,
   10 an hour, 40 a day. Challenges: 5 a day per learner, 2 open challenges to the same classmate at a time. Classmate
   codes: 5 created a day per parent. A learner can have at most 12 linked classmates. Everything is validated on the
   server; the browser's checks are only for convenience.
9. **Short retention** (section 7).
10. **Identity comes from the server.** Every server action and API route re-reads the signed-in parent from the
    Neon Auth session and the learner from the `edify_profile` cookie *checked against that parent's own learners*
    (`getLearner()`); no learner id sent by the browser is ever trusted. Ids in a request (a link, a challenge, a
    message) are only references, always re-checked against the learner or parent from the session.

**Known limit (OWNER DECISION):** Edify's parent area is the parent's signed-in session. A child who is using the
parent's signed-in device can open `/profiles/classmates` and change these switches, just as they can already remove a
learner there. The PIN protects each learner's space, not the parent area. The fix is a separate parent PIN or
re-entering the password before changing safety settings; that needs product work and is not built.

## 3. How a challenge works

* A learner picks a linked classmate, a **subject**, a **term** (a single term, or *all terms* where the subject has
  content in more than one) and a length (10, 15 or 20 questions; one minute per question).
* The server builds the paper with the existing CBT engine (`src/lib/cbt.ts`, objective questions of the published
  lessons, seeded and shuffled) and **freezes a copy of the questions and answers in the challenge row**. Both players
  get exactly the same questions in the same order even if the lessons are edited while the challenge is open.
* **Asynchronous:** each player takes the paper in their own time. The challenge expires after **3 days** if a
  player has not started it (OWNER DECISION). Each player can only start once; the server stamps the start time, so a
  reload does not restart the clock, and an answer sheet arriving more than 60 seconds after the time limit is
  refused. A player who starts and never hands in scores zero.
* **Answers never reach the browser** until the challenge is finished. The paper sent to the browser has no answers.
  A player sees their own score as soon as they finish; the classmate's score, the winner and the review of every
  question appear once both are done.
* **Winner:** higher score wins; if equal, the faster finish wins; if both are equal it is a draw. A challenge that
  expires, is declined or is cancelled has no winner and does not count.
* **Leaderboard:** you and your linked classmates, from finished challenges in the last 90 days, optionally for one
  subject. Ranked by wins, then draws, then average score. Shows first name, class, played, won, drawn, lost, average
  percent. Classmates whose parents have not switched on challenges are not listed.
* Plan: challenges follow the CBT rule, so a learner needs **Gold** (`CHALLENGE_MIN_PLAN` in
  `src/data/challenges.ts`). OWNER DECISION: Gold only, or open to every paid plan.

## 4. Presence and live messaging: the options

Vercel serverless functions cannot hold a WebSocket open, so "realtime" has to come from somewhere else.

| Option | How it works | Cost | Children's data / privacy | Verdict |
| --- | --- | --- | --- | --- |
| **A. Short polling against Neon** | The page asks the server every few seconds (chat open) or every 25 s (online list). Presence is a `last_seen_at` timestamp written by a heartbeat. | Nothing new. Adds Neon queries, which keeps the compute awake while children are online. | Nothing leaves systems already named in the privacy policy (Neon and Vercel, London). No new processor. | **Recommended for the MVP.** |
| B. Server-sent events from a route | One long request per open page streams new messages. | Vercel bills function time while connected; connection length limits mean constant reconnects; each stream polls the database anyway. | Same as A. | More moving parts than A for no real gain at this size. |
| C. Managed realtime (Ably, Pusher, similar) | Browsers hold a socket to the vendor; our server publishes messages to it. | Free tiers exist (Ably: 200 connections, 6 M messages a month; Pusher Sandbox: 100 connections, 200 k messages a day at the time of writing; check current terms). | **A new processor that carries children's message text.** Needs a data processing agreement, a transfer basis, a privacy policy line, and deleting messages there as well as in Neon. Presence is tied to vendor-held identifiers. | Good *later* if polling becomes slow or costly. Not for a first release. |
| D. Postgres LISTEN/NOTIFY | Not usable: Neon's serverless HTTP driver has no persistent connection. | n/a | n/a | Rejected. |

**How option A is built**

* Heartbeat: `POST /api/social/heartbeat` from a small client component every 30 s while the tab is visible and the
  learner's parent has switched presence on. The server ignores a heartbeat that comes sooner than 20 s after the last.
  A learner is **online** when `last_seen_at` is under 75 s old. Stored: one timestamp per learner, overwritten.
* Online list: `GET /api/social/online` every 25 s while the tab is visible. A classmate is only shown as online if
  **both** learners have presence switched on and the link is active. Nothing else is shown (no "last seen", no page).
* Chat: `GET /api/social/chat/<link>?after=<n>` every 4 s while the chat is open and visible, 20 s when it is not;
  messages carry an increasing sequence number so nothing is skipped or repeated. Sending is `POST` to the same
  route. Server Actions are deliberately *not* used for polling: Next.js runs actions one at a time per client.
* Cost to watch: a Neon compute that never idles. At a handful of families this is small; at a few hundred
  simultaneous learners reconsider option C. **OWNER DECISION:** watch Neon compute hours after launch.

## 5. Voice-note storage: the options

| Option | Notes | Privacy / deletion | Verdict |
| --- | --- | --- | --- |
| **A. Neon Postgres (`bytea`)** | A 30-second Opus or AAC note is roughly 60 to 300 KB. Stored in its own table (`chat_voice_clips`), never loaded by message lists, streamed through an authenticated route. No new package, no new account. | Same processor and region as the rest of the data. Deleting a message, a link, a learner or an account deletes the audio in the same SQL statement, so deletion is complete and testable. | **Recommended for the MVP.** |
| B. Vercel Blob (private store) | Private stores became generally available on 30 June 2026 and need an authenticated route in front (as in A). Needs the `@vercel/blob` package, a Blob store connected to the project, and a file-delete call on every deletion path. | Vercel is already a named processor, but files outlive database rows unless every deletion path remembers to call the delete API; account deletion cannot be a single SQL transaction any more. Choose the store region deliberately. | Reasonable when volume grows; adds failure modes on deletion. |
| C. S3-compatible storage (AWS, R2, ...) | Most flexible, cheapest at scale. | New processor, new credentials, same deletion problem as B. | Not for the MVP. |
| D. Public blob URLs | Anyone with the URL can play it. | Unacceptable for children's voices. | Rejected. |

**How option A is built:** `POST /api/social/chat/<link>/voice` takes the raw recording. The server checks the
signed-in learner and link, the rate limit, the declared type (webm, ogg or mp4/m4a audio), that the first bytes
match that type, the size (at most 400 KB) and the claimed length (at most 30 s). Playback is
`GET /api/social/voice/<message>`, which re-checks that the caller is a learner on that link (with voice on) or the
parent of one, and sends `Cache-Control: private, no-store` with range support (Safari needs it).
Database load: a 200 KB note is one 270 KB request to Neon's HTTP endpoint (base64); fine for a few notes a minute.
If volume grows, move to B and keep the same routes.

Browser notes: recording uses `MediaRecorder` after the browser's own microphone prompt. iPhone Safari records
`audio/mp4`; Chrome and Firefox record `audio/webm` or `audio/ogg`. The recording is previewed before sending and
nothing is uploaded until the learner presses Send.

## 6. Environment variables (documented in `.env.example`; no secret is in the repo)

| Variable | Needed for | Notes |
| --- | --- | --- |
| `CHALLENGES_ENABLED` | Phase 1 and the master switch | `true` to switch on. Anything else (or unset) is off. |
| `CHALLENGES_PRESENCE` | Phase 2 | `true` only after `011_presence.sql`. |
| `CHALLENGES_CHAT` | Phase 3 | `true` only after `012_chat.sql`. |
| `CHALLENGES_VOICE` | Phase 4 | `true` only after `013_voice_notes.sql`. Needs the chat switch too. |
| `CRON_SECRET` | Retention purge | Any random string of 16+ characters, set in Vercel. Without it the purge route always answers 401 and **nothing is ever deleted by schedule** (reads still hide expired data; see section 7). |

No realtime or storage vendor is used, so there are no vendor keys.

## 7. Retention (OWNER DECISION: every number below is a proposal)

| Data | Proposed keep | Where it is enforced |
| --- | --- | --- |
| Text messages | **14 days** | Hidden from reads after 14 days; deleted by the daily purge. |
| Voice notes (audio and row) | **7 days** | Same. |
| Finished challenges (questions, answers, scores) | **180 days** after finishing (leaderboard looks back 90) | Daily purge. |
| Unfinished, declined, cancelled or expired challenges | **30 days** after they ended | Daily purge. |
| Presence | One timestamp per learner, overwritten; deleted when presence is switched off | n/a |
| Rate-limit events | **2 days** | Daily purge. |
| Classmate codes | 7 days to use; used and expired codes deleted after 30 days | Daily purge. |
| Reports (including a copy of the reported text) | **12 months** (LAWYER and owner: how long and who may read them) | Daily purge. |
| A reported message | Kept with its report even after the 14 days | See above. |

The purge is `GET /api/cron/social-purge`, called once a day by Vercel Cron (`vercel.json`), authorised with
`CRON_SECRET`. Vercel's Hobby plan allows daily cron jobs and runs them within the scheduled hour; Hobby is
not allowed for commercial use, which is a separate owner step already noted elsewhere.
A purge that does not run must not mean old chats stay visible, which is why reads also stop returning data older than
the window. It does mean the rows stay in the database until the purge runs, so **check that the cron job works**
before telling parents about retention.

## 8. Deletion

Deleting a learner (Remove on their card) or the whole account removes, in the same transaction:

* their classmate links and, with them, every text message and voice-note file in those conversations;
* their classmate codes, settings, presence, read markers and rate-limit events;
* every challenge they took part in, with both players' entries (the other learner loses that result from their
  history and leaderboard);
* their reports and reports about them.

This is done twice on purpose: by explicit `delete` statements (`src/lib/account-deletion-sql.ts`, used by
`deleteParentAccount` and `deleteProfile`) and by `on delete cascade` foreign keys in the migrations. The
explicit statements are only built for tables that exist, so deleting an account still works on a database where the
new SQL has not been applied yet. `scripts/social.test.mjs` (in-memory Postgres) checks that both routes leave nothing
behind and that other families are untouched.

## 9. Reports and moderation (OWNER DECISION)

Reports go into `public.classmate_reports` (reporter, reported learner, reason, optional note, a copy of the
reported text, time). **There is no admin screen and nobody is notified.** Before switching this on the owner must
decide who reads reports, how often, what happens next (warn, suspend, tell the school, tell the police), and how a
parent can contact Edify. Until then, look with SQL:

```sql
select r.created_at, r.reason, r.note, r.message_excerpt,
       a.name as reporter, a.class_level as reporter_class, b.name as reported, b.class_level as reported_class
from public.classmate_reports r
join public.learner_profiles a on a.id = r.reporter_id
join public.learner_profiles b on b.id = r.reported_id
order by r.created_at desc;
```

## 10. What the owner has to do (nothing was applied or signed up for)

1. Read this page, the privacy policy and the terms (new sections on classmate features, highlighted gaps are
   decisions for you or a lawyer).
2. Apply the SQL by hand in the Neon SQL editor, in this order, **only the phases you want**:
   `010_classmates_challenges.sql`, `011_presence.sql`, `012_chat.sql`, `013_voice_notes.sql`.
3. Set `CHALLENGES_ENABLED=true` (and the phase switches for the SQL you applied) in Vercel, and redeploy.
4. Set `CRON_SECRET` in Vercel, and check the cron run in Vercel's dashboard after the first day.
5. Fill in the contact email in `src/data/legal.ts` and settle the highlighted gaps; decide the numbers in section 7.
6. Test with two throwaway parent accounts (two learners with the same school and class): link, challenge, chat,
   voice, block, report, then delete one learner and one account and look at the tables.

## 11. Not decided here / future

* Live head-to-head (both players answering at once) would reuse the same frozen paper; it needs realtime
  (option C) to be pleasant.
* Parent PIN for safety settings (section 2).
* An admin screen for reports.
* Push or email notifications for challenges (would add a processor and contact data; not built).
