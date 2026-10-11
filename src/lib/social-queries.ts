// The other SQL of the classmate features: settings, links, classmate codes, block / remove / report, and the lists the
// challenge pages show. No imports on purpose, like social-sql.ts: scripts/social.test.mjs runs every one of these
// against a real Postgres engine, so a typo cannot hide until it meets production. Ids are parameters, never text.

export type Query = { text: string; params: unknown[] };

// ---------- Settings ----------
export function settingsQuery(learnerId: string): Query {
  return { text: "select challenges_on, presence_on, chat_on, voice_on, class_visible from public.learner_social_settings where learner_id = $1::uuid", params: [learnerId] };
}

export function settingsForQuery(learnerIds: string[]): Query {
  return { text: "select learner_id, challenges_on, presence_on, chat_on, voice_on, class_visible from public.learner_social_settings where learner_id = any($1::uuid[])", params: [learnerIds] };
}

// Saves the parent's choices for one of their own learners; no row comes back when the learner is not theirs.
export function saveSettingsQuery(parentId: string, learnerId: string, on: { challenges: boolean; presence: boolean; chat: boolean; voice: boolean; classVisible?: boolean }): Query {
  return {
    text: `insert into public.learner_social_settings (learner_id, challenges_on, presence_on, chat_on, voice_on, class_visible)
      select id, $3::boolean, $4::boolean, $5::boolean, $6::boolean, $7::boolean from public.learner_profiles where id = $1::uuid and parent_id = $2::uuid
      on conflict (learner_id) do update set challenges_on = excluded.challenges_on, presence_on = excluded.presence_on, chat_on = excluded.chat_on, voice_on = excluded.voice_on, class_visible = excluded.class_visible, updated_at = now()
      returning learner_id`,
    params: [learnerId, parentId, on.challenges, on.presence, on.chat, on.voice, on.classVisible === true],
  };
}

// ---------- Links ----------
// Only people linked with the learner, and only those whose parents have switched challenges on.
// `withRequests` also includes classmate requests still waiting (a challenge can be sent with a request; chat cannot).
export function classmatesQuery(learnerId: string, withRequests = false): Query {
  return {
    text: `select l.id as link_id, l.status as status, o.id as learner_id, o.name as name, o.class_level as class_level,
        s.presence_on as presence_on, s.chat_on as chat_on, s.voice_on as voice_on
      from public.classmate_links l
      join public.learner_profiles o on o.id = case when l.learner_a = $1::uuid then l.learner_b else l.learner_a end
      join public.learner_social_settings s on s.learner_id = o.id and s.challenges_on
      where (l.status = 'active' or ($2::boolean and l.status = 'pending')) and $1::uuid in (l.learner_a, l.learner_b)
      order by lower(o.name), o.id`,
    params: [learnerId, withRequests],
  };
}

// Every link that involves one of the parent's learners, with both sides' first name and class (nothing else).
export function parentLinksQuery(parentId: string): Query {
  return {
    text: `select l.id as link_id, l.status as status, l.blocked_by as blocked_by, l.created_at as created_at,
        a.id as a_id, a.name as a_name, a.class_level as a_class, a.parent_id as a_parent,
        b.id as b_id, b.name as b_name, b.class_level as b_class, b.parent_id as b_parent
      from public.classmate_links l
      join public.learner_profiles a on a.id = l.learner_a
      join public.learner_profiles b on b.id = l.learner_b
      where a.parent_id = $1::uuid or b.parent_id = $1::uuid
      order by l.created_at, l.id`,
    params: [parentId],
  };
}

export function linkBetweenQuery(learnerX: string, learnerY: string): Query {
  return { text: "select id, status from public.classmate_links where learner_a = least($1::uuid, $2::uuid) and learner_b = greatest($1::uuid, $2::uuid)", params: [learnerX, learnerY] };
}

export function linkCountQuery(learnerId: string): Query {
  return { text: "select count(*)::int as n from public.classmate_links where learner_a = $1::uuid or learner_b = $1::uuid", params: [learnerId] };
}

// A link, if the learner is on it. Includes the other learner and which features the other side has switched on.
export function linkForLearnerQuery(learnerId: string, linkId: string): Query {
  return {
    text: `select l.id as link_id, l.status as status, o.id as other_id, o.name as other_name, o.class_level as other_class,
        coalesce(s.challenges_on, false) as other_challenges, coalesce(s.presence_on, false) as other_presence,
        coalesce(s.chat_on, false) as other_chat, coalesce(s.voice_on, false) as other_voice
      from public.classmate_links l
      join public.learner_profiles o on o.id = case when l.learner_a = $1::uuid then l.learner_b else l.learner_a end
      left join public.learner_social_settings s on s.learner_id = o.id
      where l.id = $2::uuid and $1::uuid in (l.learner_a, l.learner_b)`,
    params: [learnerId, linkId],
  };
}

// Links two of the parent's OWN learners (brothers and sisters in the same class) without a code: the one parent is
// both parents here. Nothing is inserted unless both learners belong to this parent.
export function linkOwnLearnersQuery(parentId: string, learnerX: string, learnerY: string): Query {
  return {
    text: `insert into public.classmate_links (learner_a, learner_b)
      select least($2::uuid, $3::uuid), greatest($2::uuid, $3::uuid)
      where $2::uuid <> $3::uuid
        and (select count(*) from public.learner_profiles p where p.id in ($2::uuid, $3::uuid) and p.parent_id = $1::uuid) = 2
      on conflict (learner_a, learner_b) do nothing
      returning id`,
    params: [parentId, learnerX, learnerY],
  };
}

// ---------- "Visible to my class" (db/migrations/014) ----------
// A school name compared the way social-rules.ts schoolKey() does: lower case, no dots, commas or quotes, single spaces.
const SCHOOL_KEY = (column: string) => `btrim(regexp_replace(regexp_replace(lower(coalesce(${column}, '')), '[.,''’"]', '', 'g'), '\\s+', ' ', 'g'))`;

// Everyone in the learner's school and class who can be seen there: both parents switched on challenges and "Visible to my
// class". Never anyone the learner has blocked or who blocked them. "online" is only filled when both share online status.
// link_status/requested_by say whether they are already linked, asked, or being asked.
export function classDirectoryQuery(learnerId: string, withinSeconds: number, limit: number): Query {
  return {
    text: `select o.id as learner_id, o.name as name, o.class_level as class_level, o.school as school,
        case when me.presence_on and s.presence_on then coalesce(p.last_seen_at > now() - make_interval(secs => $2::int), false) end as online,
        l.id as link_id, l.status as link_status, l.requested_by as requested_by
      from public.learner_profiles mp
      join public.learner_social_settings me on me.learner_id = mp.id and me.challenges_on and me.class_visible
      join public.learner_profiles o on o.id <> mp.id and o.class_level = mp.class_level
        and ${SCHOOL_KEY("o.school")} = ${SCHOOL_KEY("mp.school")} and char_length(${SCHOOL_KEY("mp.school")}) >= 2
      join public.learner_social_settings s on s.learner_id = o.id and s.challenges_on and s.class_visible
      left join public.learner_presence p on p.learner_id = o.id
      left join public.classmate_links l on l.learner_a = least(mp.id, o.id) and l.learner_b = greatest(mp.id, o.id)
      where mp.id = $1::uuid and (l.id is null or l.status <> 'blocked')
      order by (case when me.presence_on and s.presence_on then coalesce(p.last_seen_at > now() - make_interval(secs => $2::int), false) end) desc nulls last, lower(o.name), o.id
      limit $3::int`,
    params: [learnerId, withinSeconds, limit],
  };
}

// Asks to be classmates: a pending link, asked by this learner. Nothing happens if a link (of any kind) already exists.
export function requestLinkQuery(learnerId: string, otherId: string): Query {
  return {
    text: `insert into public.classmate_links (learner_a, learner_b, status, requested_by)
      values (least($1::uuid, $2::uuid), greatest($1::uuid, $2::uuid), 'pending', $1::uuid)
      on conflict (learner_a, learner_b) do nothing
      returning id`,
    params: [learnerId, otherId],
  };
}

// Requests to and from this learner that are still waiting.
export function pendingLinksQuery(learnerId: string): Query {
  return {
    text: `select l.id as link_id, l.requested_by as requested_by, o.id as other_id, o.name as name, o.class_level as class_level
      from public.classmate_links l
      join public.learner_profiles o on o.id = case when l.learner_a = $1::uuid then l.learner_b else l.learner_a end
      where l.status = 'pending' and $1::uuid in (l.learner_a, l.learner_b)
      order by l.created_at desc`,
    params: [learnerId],
  };
}

// The asked learner accepts. The one who asked cannot accept their own request.
export function acceptLinkQuery(learnerId: string, linkId: string): Query {
  return {
    text: `update public.classmate_links l set status = 'active', requested_by = null
      where l.id = $2::uuid and l.status = 'pending' and $1::uuid in (l.learner_a, l.learner_b) and l.requested_by <> $1::uuid
      returning l.id`,
    params: [learnerId, linkId],
  };
}

// Starting a challenge that came with a request counts as accepting it.
export function acceptByChallengeQuery(learnerId: string, challengeId: string): Query {
  return {
    text: `update public.classmate_links l set status = 'active', requested_by = null
      from public.challenges c
      where c.id = $2::uuid and c.opponent_id = $1::uuid and l.status = 'pending' and l.requested_by <> $1::uuid
        and l.learner_a = least(c.challenger_id, c.opponent_id) and l.learner_b = greatest(c.challenger_id, c.opponent_id)`,
    params: [learnerId, challengeId],
  };
}

// The asked learner says no. This blocks quietly, so the same child cannot ask again.
export function declineLinkQuery(learnerId: string, linkId: string): Query {
  return {
    text: `update public.classmate_links l set status = 'blocked', blocked_by = $1::uuid, requested_by = null
      where l.id = $2::uuid and l.status = 'pending' and $1::uuid in (l.learner_a, l.learner_b) and l.requested_by <> $1::uuid
      returning l.id`,
    params: [learnerId, linkId],
  };
}

// ---------- Classmate codes ----------
export function createInviteQuery(parentId: string, learnerId: string, codeHash: string, validDays: number): Query {
  return {
    text: `insert into public.classmate_invites (learner_id, parent_id, code_hash, expires_at)
      select id, $1::uuid, $3::text, now() + make_interval(days => $4::int) from public.learner_profiles where id = $2::uuid and parent_id = $1::uuid
      returning id, expires_at`,
    params: [parentId, learnerId, codeHash, validDays],
  };
}

export function pendingInviteCountQuery(learnerId: string): Query {
  return { text: "select count(*)::int as n from public.classmate_invites where learner_id = $1::uuid and used_at is null and expires_at > now()", params: [learnerId] };
}

export function pendingInvitesQuery(parentId: string): Query {
  return {
    text: "select id, learner_id, expires_at from public.classmate_invites where parent_id = $1::uuid and used_at is null and expires_at > now() order by created_at desc",
    params: [parentId],
  };
}

export function cancelInviteQuery(parentId: string, inviteId: string): Query {
  return { text: "delete from public.classmate_invites where id = $2::uuid and parent_id = $1::uuid and used_at is null returning id", params: [parentId, inviteId] };
}

// The learner a usable code belongs to (first name, class and school are used to check the two are classmates).
export function inviteByHashQuery(codeHash: string): Query {
  return {
    text: `select i.id as id, i.parent_id as parent_id, p.id as learner_id, p.name as name, p.class_level as class_level, p.school as school
      from public.classmate_invites i join public.learner_profiles p on p.id = i.learner_id
      where i.code_hash = $1::text and i.used_at is null and i.expires_at > now()`,
    params: [codeHash],
  };
}

// ---------- Block, unblock, remove, report ----------
// Who is acting: a learner (from their session) or a parent acting for one of their own learners.
// $1 = parent id or null, $2 = the learner the action is for, $3 = the link.
const MEMBER = `$2::uuid in (l.learner_a, l.learner_b) and ($1::uuid is null or exists (select 1 from public.learner_profiles p where p.id = $2::uuid and p.parent_id = $1::uuid))`;

export function blockLinkQuery(parentId: string | null, learnerId: string, linkId: string): Query {
  return { text: `update public.classmate_links l set status = 'blocked', blocked_by = $2::uuid, requested_by = null where l.id = $3::uuid and l.status in ('active', 'pending') and ${MEMBER} returning l.id`, params: [parentId, learnerId, linkId] };
}

// Only the side that blocked can lift it, so a blocked learner's parent cannot undo someone else's block.
export function unblockLinkQuery(parentId: string, learnerId: string, linkId: string): Query {
  return { text: `update public.classmate_links l set status = 'active', blocked_by = null where l.id = $3::uuid and l.status = 'blocked' and l.blocked_by = $2::uuid and ${MEMBER} returning l.id`, params: [parentId, learnerId, linkId] };
}

// Removing a link also removes its chat (foreign key). A link blocked by the other side is kept, so their block holds.
export function removeLinkQuery(parentId: string | null, learnerId: string, linkId: string): Query {
  return { text: `delete from public.classmate_links l where l.id = $3::uuid and ${MEMBER} and (l.status in ('active', 'pending') or l.blocked_by = $2::uuid) returning l.id`, params: [parentId, learnerId, linkId] };
}

// Open challenges between the two on a link end when the link is blocked or removed.
export function cancelOpenForLinkQuery(parentId: string | null, learnerId: string, linkId: string): Query {
  return {
    text: `update public.challenges c set status = 'cancelled'
      where c.status = 'open' and c.finished_at is null and exists (
        select 1 from public.classmate_links l where l.id = $3::uuid and ${MEMBER}
          and l.learner_a = least(c.challenger_id, c.opponent_id) and l.learner_b = greatest(c.challenger_id, c.opponent_id))`,
    params: [parentId, learnerId, linkId],
  };
}

// Stores a report about the other learner on a link the reporter belongs to. The reported text is copied in because
// the message it is about may be deleted.
export function reportQuery(reporterId: string, linkId: string, reason: string, note: string | null, messageId: string | null, excerpt: string | null): Query {
  return {
    text: `insert into public.classmate_reports (reporter_id, reported_id, reason, note, message_id, message_excerpt)
      select $1::uuid, case when l.learner_a = $1::uuid then l.learner_b else l.learner_a end, $3::text, $4::text, $5::uuid, $6::text
      from public.classmate_links l where l.id = $2::uuid and $1::uuid in (l.learner_a, l.learner_b)
      returning id`,
    params: [reporterId, linkId, reason, note, messageId, excerpt],
  };
}

export function reportsByParentQuery(parentId: string): Query {
  return {
    text: `select r.id as id, r.reason as reason, r.created_at as created_at, a.id as reporter_id, a.name as reporter_name, b.name as reported_name, b.class_level as reported_class
      from public.classmate_reports r
      join public.learner_profiles a on a.id = r.reporter_id
      join public.learner_profiles b on b.id = r.reported_id
      where a.parent_id = $1::uuid order by r.created_at desc limit 20`,
    params: [parentId],
  };
}

// ---------- Challenges ----------
export function openBetweenQuery(learnerX: string, learnerY: string): Query {
  return {
    text: `select count(*)::int as n from public.challenges
      where status = 'open' and finished_at is null and expires_at > now()
        and least(challenger_id, opponent_id) = least($1::uuid, $2::uuid) and greatest(challenger_id, opponent_id) = greatest($1::uuid, $2::uuid)`,
    params: [learnerX, learnerY],
  };
}

export function createChallengeQuery(c: { challengerId: string; opponentId: string; subjectSlug: string; subjectName: string; termSlug: string | null; termName: string; count: number; minutes: number; paperJson: string; validDays: number }): Query {
  return {
    text: `insert into public.challenges (challenger_id, opponent_id, subject_slug, subject_name, term_slug, term_name, question_count, minutes, paper, expires_at)
      values ($1::uuid, $2::uuid, $3::text, $4::text, $5::text, $6::text, $7::int, $8::int, $9::jsonb, now() + make_interval(days => $10::int))
      returning id`,
    params: [c.challengerId, c.opponentId, c.subjectSlug, c.subjectName, c.termSlug, c.termName, c.count, c.minutes, c.paperJson, c.validDays],
  };
}

// One row per challenge the learner is in (only with a classmate they are still linked to). The classmate's score and the
// answers are NULL until the challenge is finished, so they can never reach the page early.
const CHALLENGE_COLUMNS = `c.id as id, l.id as link_id, c.challenger_id as challenger_id, c.subject_slug as subject_slug, c.subject_name as subject_name, c.term_name as term_name,
    c.question_count as question_count, c.minutes as minutes, c.status as status, c.expires_at as expires_at, c.finished_at as finished_at, c.created_at as created_at,
    o.id as other_id, o.name as other_name, o.class_level as other_class,
    me.started_at as my_started_at, me.submitted_at as my_submitted_at, me.score as my_score, me.total as my_total, me.duration_seconds as my_duration,
    ot.started_at as their_started_at, ot.submitted_at as their_submitted_at,
    case when c.finished_at is not null then ot.score end as their_score,
    case when c.finished_at is not null then ot.duration_seconds end as their_duration`;
const CHALLENGE_JOINS = `from public.challenges c
    join public.learner_profiles o on o.id = case when c.challenger_id = $1::uuid then c.opponent_id else c.challenger_id end
    join public.classmate_links l on l.status in ('active', 'pending') and l.learner_a = least(c.challenger_id, c.opponent_id) and l.learner_b = greatest(c.challenger_id, c.opponent_id)
    left join public.challenge_entries me on me.challenge_id = c.id and me.learner_id = $1::uuid
    left join public.challenge_entries ot on ot.challenge_id = c.id and ot.learner_id = o.id`;

export function challengeListQuery(learnerId: string, withinDays: number, limit: number): Query {
  return {
    text: `select ${CHALLENGE_COLUMNS} ${CHALLENGE_JOINS}
      where $1::uuid in (c.challenger_id, c.opponent_id) and c.created_at > now() - make_interval(days => $2::int)
      order by c.created_at desc limit $3::int`,
    params: [learnerId, withinDays, limit],
  };
}

// One challenge for the detail page. The paper and both players' answers are only included once it is finished.
export function challengeDetailQuery(learnerId: string, challengeId: string): Query {
  return {
    text: `select ${CHALLENGE_COLUMNS},
        case when c.finished_at is not null then c.paper end as paper,
        case when c.finished_at is not null then me.answers end as my_answers,
        case when c.finished_at is not null then ot.answers end as their_answers
      ${CHALLENGE_JOINS}
      where c.id = $2::uuid and $1::uuid in (c.challenger_id, c.opponent_id)`,
    params: [learnerId, challengeId],
  };
}

// The frozen paper for a player who has started and not handed in. It is read on the server (to show the questions
// without answers, and to mark them); seconds_left comes from the database clock and the start time it stamped.
export function playQuery(learnerId: string, challengeId: string): Query {
  return {
    text: `select c.id as id, c.subject_name as subject_name, c.term_name as term_name, c.minutes as minutes, c.question_count as question_count, c.paper as paper,
        greatest(0, extract(epoch from (e.started_at + make_interval(mins => c.minutes) - now()))::int) as seconds_left
      from public.challenges c
      join public.challenge_entries e on e.challenge_id = c.id and e.learner_id = $1::uuid
      join public.classmate_links l on l.status in ('active', 'pending') and l.learner_a = least(c.challenger_id, c.opponent_id) and l.learner_b = greatest(c.challenger_id, c.opponent_id)
      where c.id = $2::uuid and c.status = 'open' and e.submitted_at is null`,
    params: [learnerId, challengeId],
  };
}

// The opponent says no. Not possible once they have started.
export function declineChallengeQuery(learnerId: string, challengeId: string): Query {
  return {
    text: `update public.challenges c set status = 'declined'
      where c.id = $2::uuid and c.opponent_id = $1::uuid and c.status = 'open' and c.finished_at is null
        and not exists (select 1 from public.challenge_entries e where e.challenge_id = c.id and e.learner_id = $1::uuid)
      returning c.id`,
    params: [learnerId, challengeId],
  };
}

// The challenger withdraws. Not possible once the opponent has started.
export function cancelChallengeQuery(learnerId: string, challengeId: string): Query {
  return {
    text: `update public.challenges c set status = 'cancelled'
      where c.id = $2::uuid and c.challenger_id = $1::uuid and c.status = 'open' and c.finished_at is null
        and not exists (select 1 from public.challenge_entries e where e.challenge_id = c.id and e.learner_id = c.opponent_id)
      returning c.id`,
    params: [learnerId, challengeId],
  };
}

// ---------- Retention ----------
// The daily purge. Each statement says how many rows it removed. `chat` statements need the tables from 012 and 013, so
// they are only included when chat has been switched on. A message with an open report is kept until the report is
// purged too (reports keep a copy of the text, but the owner may want the original voice note).
export type RetentionDays = { textMessages: number; voiceNotes: number; finishedChallenges: number; endedChallenges: number; events: number; codes: number; reports: number };

export function purgeQueries(days: RetentionDays, includeChat: boolean): { name: string; query: Query }[] {
  const count = (name: string, text: string, params: unknown[]) => ({ name, query: { text: `with gone as (${text} returning 1) select count(*)::int as n from gone`, params } });
  const list = [
    count("finished challenges", "delete from public.challenges where finished_at is not null and finished_at < now() - make_interval(days => $1::int)", [days.finishedChallenges]),
    count("ended challenges", "delete from public.challenges where finished_at is null and expires_at < now() - make_interval(days => $1::int)", [days.endedChallenges]),
    count("rate-limit events", "delete from public.social_events where created_at < now() - make_interval(days => $1::int)", [days.events]),
    count("classmate codes", "delete from public.classmate_invites where coalesce(used_at, expires_at) < now() - make_interval(days => $1::int)", [days.codes]),
    count("reports", "delete from public.classmate_reports where created_at < now() - make_interval(days => $1::int)", [days.reports]),
  ];
  if (includeChat) {
    // Deleting a voice message deletes its audio (foreign key from chat_voice_clips).
    list.push(
      count("voice notes", "delete from public.chat_messages m where m.kind = 'voice' and m.created_at < now() - make_interval(days => $1::int) and not exists (select 1 from public.classmate_reports r where r.message_id = m.id)", [days.voiceNotes]),
      count("text messages", "delete from public.chat_messages m where m.kind = 'text' and m.created_at < now() - make_interval(days => $1::int) and not exists (select 1 from public.classmate_reports r where r.message_id = m.id)", [days.textMessages]),
    );
  }
  return list;
}

// ---------- Presence (phase 2, db/migrations/011) ----------
// Overwrites the learner's "last seen" time, but not more often than every `minGapSeconds` (a faster heartbeat changes nothing).
export function heartbeatQuery(learnerId: string, minGapSeconds: number): Query {
  return {
    text: `insert into public.learner_presence (learner_id, last_seen_at) values ($1::uuid, now())
      on conflict (learner_id) do update set last_seen_at = now()
      where public.learner_presence.last_seen_at < now() - make_interval(secs => $2::int)
      returning learner_id`,
    params: [learnerId, minGapSeconds],
  };
}

// For each active link: is the classmate online right now? Only when BOTH learners' parents switched presence on (you
// can't see someone's status unless you share yours), and only "online or not": never a time, a place or an activity.
export function onlineQuery(learnerId: string, withinSeconds: number): Query {
  return {
    text: `select l.id as link_id, coalesce(p.last_seen_at > now() - make_interval(secs => $2::int), false) as online
      from public.classmate_links l
      join public.learner_social_settings me on me.learner_id = $1::uuid and me.challenges_on and me.presence_on
      join public.learner_social_settings s on s.learner_id = case when l.learner_a = $1::uuid then l.learner_b else l.learner_a end and s.challenges_on and s.presence_on
      left join public.learner_presence p on p.learner_id = s.learner_id
      where l.status = 'active' and $1::uuid in (l.learner_a, l.learner_b)`,
    params: [learnerId, withinSeconds],
  };
}

// ---------- Chat (phase 3, db/migrations/012) ----------
// Chat on a link needs the link active and BOTH learners' parents to have switched challenges and chat on.
const CHAT_OK = `l.status = 'active' and (select count(*) from public.learner_social_settings s where s.learner_id in (l.learner_a, l.learner_b) and s.challenges_on and s.chat_on) = 2`;
const WITHIN_RETENTION = `((m.kind = 'text' and m.created_at > now() - make_interval(days => $4::int)) or (m.kind = 'voice' and m.created_at > now() - make_interval(days => $5::int)))`;

// The newest messages of a conversation, oldest first. With `after` > 0 only newer ones (plus anything from the last 15
// seconds, because two messages saved at nearly the same moment can become visible out of order; the browser skips repeats).
export function chatListQuery(learnerId: string, linkId: string, after: number, textDays: number, voiceDays: number, limit: number): Query {
  return {
    text: `select * from (
        select m.id as id, m.seq::text as seq, m.sender_id as sender_id, m.kind as kind, m.body as body, m.audio_seconds as audio_seconds, m.created_at as created_at
        from public.chat_messages m join public.classmate_links l on l.id = m.link_id
        where m.link_id = $2::uuid and $1::uuid in (l.learner_a, l.learner_b) and ${CHAT_OK} and ${WITHIN_RETENTION}
          and ($3::bigint = 0 or m.seq > $3::bigint or m.created_at > now() - interval '15 seconds')
        order by m.seq desc limit $6::int
      ) recent order by seq::bigint asc`,
    params: [learnerId, linkId, after, textDays, voiceDays, limit],
  };
}

export function sendTextQuery(learnerId: string, linkId: string, body: string): Query {
  return {
    text: `insert into public.chat_messages (link_id, sender_id, kind, body)
      select l.id, $1::uuid, 'text', $3::text from public.classmate_links l
      where l.id = $2::uuid and $1::uuid in (l.learner_a, l.learner_b) and ${CHAT_OK}
      returning id, seq::text as seq, created_at`,
    params: [learnerId, linkId, body],
  };
}

export function markReadQuery(learnerId: string, linkId: string): Query {
  return {
    text: `insert into public.chat_reads (link_id, learner_id, last_read_seq)
      select l.id, $1::uuid, coalesce((select max(seq) from public.chat_messages where link_id = l.id), 0) from public.classmate_links l
      where l.id = $2::uuid and $1::uuid in (l.learner_a, l.learner_b)
      on conflict (link_id, learner_id) do update set last_read_seq = excluded.last_read_seq`,
    params: [learnerId, linkId],
  };
}

// Unread messages from classmates, per link, for the learner's own open conversations.
export function unreadQuery(learnerId: string, textDays: number, voiceDays: number): Query {
  return {
    text: `select m.link_id as link_id, count(*)::int as n
      from public.chat_messages m
      join public.classmate_links l on l.id = m.link_id
      left join public.chat_reads r on r.link_id = m.link_id and r.learner_id = $1::uuid
      where $1::uuid in (l.learner_a, l.learner_b) and ${CHAT_OK} and m.sender_id <> $1::uuid and m.seq > coalesce(r.last_read_seq, 0)
        and ((m.kind = 'text' and m.created_at > now() - make_interval(days => $2::int)) or (m.kind = 'voice' and m.created_at > now() - make_interval(days => $3::int)))
      group by m.link_id`,
    params: [learnerId, textDays, voiceDays],
  };
}

// A message the learner received (never one they sent) on a link they belong to, for reporting it.
export function receivedMessageQuery(learnerId: string, messageId: string): Query {
  return {
    text: `select m.id as id, m.link_id as link_id, m.kind as kind, m.body as body
      from public.chat_messages m join public.classmate_links l on l.id = m.link_id
      where m.id = $2::uuid and $1::uuid in (l.learner_a, l.learner_b) and m.sender_id <> $1::uuid`,
    params: [learnerId, messageId],
  };
}

// The learner's chat list: every classmate they can chat with now (link active, chat on for both), with the newest kept
// message, unread count and (when both share it) whether the classmate is online. Newest conversation first.
export function conversationsQuery(learnerId: string, textDays: number, voiceDays: number, onlineWithinSeconds: number): Query {
  const kept = (alias: string) => `((${alias}.kind = 'text' and ${alias}.created_at > now() - make_interval(days => $2::int)) or (${alias}.kind = 'voice' and ${alias}.created_at > now() - make_interval(days => $3::int)))`;
  return {
    text: `select l.id as link_id, o.name as name, o.class_level as class_level,
        last.kind as last_kind, last.body as last_body, last.audio_seconds as last_seconds, (last.sender_id = $1::uuid) as last_mine, last.created_at as last_at,
        (select count(*)::int from public.chat_messages u where u.link_id = l.id and u.sender_id <> $1::uuid and u.seq > coalesce(r.last_read_seq, 0) and ${kept("u")}) as unread,
        case when me.presence_on and s.presence_on then coalesce(p.last_seen_at > now() - make_interval(secs => $4::int), false) end as online
      from public.classmate_links l
      join public.learner_profiles o on o.id = case when l.learner_a = $1::uuid then l.learner_b else l.learner_a end
      join public.learner_social_settings me on me.learner_id = $1::uuid and me.challenges_on and me.chat_on
      join public.learner_social_settings s on s.learner_id = o.id and s.challenges_on and s.chat_on
      left join public.chat_reads r on r.link_id = l.id and r.learner_id = $1::uuid
      left join public.learner_presence p on p.learner_id = o.id
      left join lateral (
        select m.kind, m.body, m.audio_seconds, m.sender_id, m.created_at from public.chat_messages m
        where m.link_id = l.id and ${kept("m")} order by m.seq desc limit 1
      ) last on true
      where l.status = 'active' and $1::uuid in (l.learner_a, l.learner_b)
      order by last.created_at desc nulls last, lower(o.name), l.id`,
    params: [learnerId, textDays, voiceDays, onlineWithinSeconds],
  };
}

// How far the classmate has read this conversation (for the "read" ticks on the learner's own messages).
export function theirReadQuery(learnerId: string, linkId: string): Query {
  return {
    text: `select coalesce(max(r.last_read_seq), 0)::text as seq
      from public.classmate_links l left join public.chat_reads r on r.link_id = l.id and r.learner_id <> $1::uuid
      where l.id = $2::uuid and $1::uuid in (l.learner_a, l.learner_b)
      group by l.id`,
    params: [learnerId, linkId],
  };
}

// ---------- Voice notes (phase 4, db/migrations/013) ----------
// Voice needs everything chat needs, and voice switched on for both learners too.
const VOICE_OK = `${CHAT_OK} and (select count(*) from public.learner_social_settings s where s.learner_id in (l.learner_a, l.learner_b) and s.voice_on) = 2`;

// Saves a voice note: the message and its recording in one statement (audio as base64 text, decoded here). Nothing is
// saved unless the sender is on the link and both parents have voice notes switched on.
export function sendVoiceQuery(learnerId: string, linkId: string, contentType: string, seconds: number, audioBase64: string, bytes: number): Query {
  return {
    text: `with msg as (
        insert into public.chat_messages (link_id, sender_id, kind, audio_seconds, audio_bytes)
        select l.id, $1::uuid, 'voice', $4::int, $6::int from public.classmate_links l
        where l.id = $2::uuid and $1::uuid in (l.learner_a, l.learner_b) and ${VOICE_OK}
        returning id, seq::text as seq, created_at
      ), clip as (
        insert into public.chat_voice_clips (message_id, content_type, audio) select id, $3::text, decode($5::text, 'base64') from msg returning message_id
      )
      select id, seq, created_at from msg`,
    params: [learnerId, linkId, contentType, seconds, audioBase64, bytes],
  };
}

// The recording for a learner on the link (with voice on for both), while it is kept.
export function voiceForLearnerQuery(learnerId: string, messageId: string, voiceDays: number): Query {
  return {
    text: `select c.content_type as content_type, encode(c.audio, 'base64') as audio
      from public.chat_messages m
      join public.classmate_links l on l.id = m.link_id
      join public.chat_voice_clips c on c.message_id = m.id
      where m.id = $2::uuid and m.kind = 'voice' and $1::uuid in (l.learner_a, l.learner_b) and ${VOICE_OK}
        and m.created_at > now() - make_interval(days => $3::int)`,
    params: [learnerId, messageId, voiceDays],
  };
}

// The recording for a parent of either learner on the link. Works even if voice has since been switched off.
export function voiceForParentQuery(parentId: string, messageId: string, voiceDays: number): Query {
  return {
    text: `select c.content_type as content_type, encode(c.audio, 'base64') as audio
      from public.chat_messages m
      join public.classmate_links l on l.id = m.link_id
      join public.chat_voice_clips c on c.message_id = m.id
      where m.id = $2::uuid and m.kind = 'voice'
        and exists (select 1 from public.learner_profiles p where p.parent_id = $1::uuid and p.id in (l.learner_a, l.learner_b))
        and m.created_at > now() - make_interval(days => $3::int)`,
    params: [parentId, messageId, voiceDays],
  };
}

// ---------- Parents reading and deleting their child's chat ----------
// A parent sees every message of a conversation their learner is in, newest last, for as long as it is kept. This works
// even if chat has since been switched off, so a parent can always read and delete what is there.
export function parentConversationQuery(parentId: string, learnerId: string, linkId: string, textDays: number, voiceDays: number, limit: number): Query {
  return {
    text: `select * from (
        select m.id as id, m.seq::text as seq, m.sender_id as sender_id, p.name as sender_name, m.kind as kind, m.body as body, m.audio_seconds as audio_seconds, m.created_at as created_at
        from public.chat_messages m
        join public.classmate_links l on l.id = m.link_id
        join public.learner_profiles p on p.id = m.sender_id
        where m.link_id = $3::uuid and $2::uuid in (l.learner_a, l.learner_b) and exists (select 1 from public.learner_profiles o where o.id = $2::uuid and o.parent_id = $1::uuid)
          and ((m.kind = 'text' and m.created_at > now() - make_interval(days => $4::int)) or (m.kind = 'voice' and m.created_at > now() - make_interval(days => $5::int)))
        order by m.seq desc limit $6::int
      ) recent order by seq::bigint asc`,
    params: [parentId, learnerId, linkId, textDays, voiceDays, limit],
  };
}

// Deleting a message deletes its voice recording with it (foreign key). Only for a conversation one of the parent's learners is in.
export function deleteMessageQuery(parentId: string, messageId: string): Query {
  return {
    text: `delete from public.chat_messages m using public.classmate_links l
      where m.id = $2::uuid and l.id = m.link_id
        and exists (select 1 from public.learner_profiles p where p.parent_id = $1::uuid and p.id in (l.learner_a, l.learner_b))
      returning m.id`,
    params: [parentId, messageId],
  };
}
