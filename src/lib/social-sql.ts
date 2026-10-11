// The SQL of the classmate features that does real work (limits, claiming a code, starting and handing in a
// challenge, the leaderboard). No imports on purpose: scripts/social.test.mjs runs these exact statements against
// a real Postgres engine. Every id is a parameter, never part of the text. Parameter types are cast so that Neon's
// HTTP driver (which sends parameters as text) and a local engine behave the same.

export type Query = { text: string; params: unknown[] };

// ---------- Rate limiting ----------
// Records one action and says whether it was within `max` per `windowSeconds`. One statement, so two quick requests
// cannot both slip under the limit by much. An action over the limit is not recorded.
export function rateLimitQuery(actor: { learnerId: string } | { parentId: string }, kind: string, max: number, windowSeconds: number): Query {
  const column = "learnerId" in actor ? "learner_id" : "parent_id";
  const id = "learnerId" in actor ? actor.learnerId : actor.parentId;
  return {
    text: `with recent as (
        select count(*)::int as n from public.social_events where ${column} = $1::uuid and kind = $2::text and created_at > now() - make_interval(secs => $3::double precision)
      ), added as (
        insert into public.social_events (${column}, kind) select $1::uuid, $2::text where (select n from recent) < $4::int returning id
      )
      select exists (select 1 from added) as allowed`,
    params: [id, kind, windowSeconds, max],
  };
}

// ---------- Classmate codes ----------
// Claims a code and creates the link in one statement. `claimed` is 0 when the code was already used or has expired.
export function claimInviteQuery(inviteId: string, redeemerLearnerId: string): Query {
  return {
    text: `with claimed as (
        update public.classmate_invites set used_at = now(), used_by_learner = $2::uuid
        where id = $1::uuid and used_at is null and expires_at > now() returning learner_id
      ), made as (
        insert into public.classmate_links (learner_a, learner_b)
        select least(learner_id, $2::uuid), greatest(learner_id, $2::uuid) from claimed
        on conflict (learner_a, learner_b) do nothing returning id
      )
      select (select count(*)::int from claimed) as claimed, (select id from made) as link_id`,
    params: [inviteId, redeemerLearnerId],
  };
}

// ---------- Challenges ----------
// A player starts (which also accepts). The clock starts now; starting twice changes nothing. Nothing is inserted when
// the challenge is declined, cancelled, finished, expired, the learner is not one of its two players, or the two are no
// longer linked.
export function startEntryQuery(challengeId: string, learnerId: string): Query {
  return {
    text: `insert into public.challenge_entries (challenge_id, learner_id)
      select c.id, $2::uuid from public.challenges c
      where c.id = $1::uuid and c.status = 'open' and c.finished_at is null and c.expires_at > now()
        and $2::uuid in (c.challenger_id, c.opponent_id)
        and exists (select 1 from public.classmate_links l where l.status in ('active', 'pending') and l.learner_a = least(c.challenger_id, c.opponent_id) and l.learner_b = greatest(c.challenger_id, c.opponent_id))
      on conflict (challenge_id, learner_id) do nothing`,
    params: [challengeId, learnerId],
  };
}

// Hands in a paper. Time and the "late" rule are decided here from the stamped start time, never from the browser:
// the duration is the real time taken (capped at the limit), and a paper arriving more than `graceSeconds` after the
// limit scores zero. Only the first hand-in counts.
export function submitEntryQuery(challengeId: string, learnerId: string, score: number, total: number, answersJson: string, graceSeconds: number): Query {
  return {
    text: `update public.challenge_entries e set
        submitted_at = now(),
        total = $4::int,
        score = case when now() > e.started_at + make_interval(mins => c.minutes) + make_interval(secs => $6::int) then 0 else $3::int end,
        answers = case when now() > e.started_at + make_interval(mins => c.minutes) + make_interval(secs => $6::int) then '[]'::jsonb else $5::jsonb end,
        duration_seconds = least(greatest(extract(epoch from (now() - e.started_at))::int, 0), c.minutes * 60)
      from public.challenges c
      where e.challenge_id = $1::uuid and e.learner_id = $2::uuid and e.submitted_at is null and c.id = e.challenge_id and c.status = 'open'
      returning e.score as score, e.total as total, e.duration_seconds as duration_seconds`,
    params: [challengeId, learnerId, score, total, answersJson, graceSeconds],
  };
}

// A challenge is finished when both players have handed in.
export function finishChallengeQuery(challengeId: string): Query {
  return {
    text: `update public.challenges c set finished_at = now()
      where c.id = $1::uuid and c.finished_at is null and c.status = 'open'
        and (select count(*) from public.challenge_entries e where e.challenge_id = c.id and e.submitted_at is not null) = 2`,
    params: [challengeId],
  };
}

// A player who started and never handed in (closed the tab) is given zero once their time and the grace period are over.
export function settleOverdueQuery(learnerId: string, graceSeconds: number): Query {
  return {
    text: `update public.challenge_entries e set submitted_at = now(), score = 0, total = c.question_count, duration_seconds = c.minutes * 60, answers = '[]'::jsonb
      from public.challenges c
      where c.id = e.challenge_id and e.submitted_at is null and c.status = 'open'
        and e.started_at + make_interval(mins => c.minutes) + make_interval(secs => $2::int) < now()
        and (c.challenger_id = $1::uuid or c.opponent_id = $1::uuid)`,
    params: [learnerId, graceSeconds],
  };
}

export function finishSettledQuery(learnerId: string): Query {
  return {
    text: `update public.challenges c set finished_at = now()
      where c.finished_at is null and c.status = 'open' and (c.challenger_id = $1::uuid or c.opponent_id = $1::uuid)
        and (select count(*) from public.challenge_entries e where e.challenge_id = c.id and e.submitted_at is not null) = 2`,
    params: [learnerId],
  };
}

// ---------- Leaderboard ----------
// One row per learner in `circle` (the learner and their linked classmates), counting finished challenges in the last
// `windowDays` days, optionally for one subject. Win = more correct answers, or equal and faster; draw = equal on both.
export function leaderboardQuery(circle: string[], windowDays: number, subjectSlug: string | null): Query {
  return {
    text: `select p.id as learner_id, p.name as name, p.class_level as class_level,
        count(r.learner_id)::int as played,
        (count(*) filter (where r.outcome = 'win'))::int as wins,
        (count(*) filter (where r.outcome = 'draw'))::int as draws,
        (count(*) filter (where r.outcome = 'loss'))::int as losses,
        coalesce(round(avg(r.percent)), 0)::int as avg_percent
      from public.learner_profiles p
      left join (
        select e.learner_id,
          case when e.score > o.score or (e.score = o.score and e.duration_seconds < o.duration_seconds) then 'win'
               when e.score = o.score and e.duration_seconds = o.duration_seconds then 'draw'
               else 'loss' end as outcome,
          e.score * 100.0 / nullif(e.total, 0) as percent
        from public.challenge_entries e
        join public.challenges c on c.id = e.challenge_id and c.status = 'open' and c.finished_at is not null
          and c.finished_at > now() - make_interval(days => $2::int)
        join public.challenge_entries o on o.challenge_id = e.challenge_id and o.learner_id <> e.learner_id
        where $3::text is null or c.subject_slug = $3::text
      ) r on r.learner_id = p.id
      where p.id = any($1::uuid[])
      group by p.id, p.name, p.class_level`,
    params: [circle, windowDays, subjectSlug],
  };
}
