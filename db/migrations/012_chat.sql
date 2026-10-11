-- Text chat between linked classmates (phase 3 of docs/challenges.md). NOT applied to production. Needs 010 first.
-- A conversation is a classmate link; deleting the link, either learner or either parent's account deletes its
-- messages. `seq` is a growing number the browser uses to ask for "messages newer than the last one I have".
-- Voice notes (phase 4, 013) are messages of kind 'voice': body is empty and the audio sits in chat_voice_clips.
create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  seq bigint generated always as identity unique,
  link_id uuid not null references public.classmate_links(id) on delete cascade,
  sender_id uuid not null references public.learner_profiles(id) on delete cascade,
  kind text not null default 'text' check (kind in ('text', 'voice')),
  body text check (body is null or char_length(body) <= 500),
  audio_seconds integer check (audio_seconds is null or audio_seconds between 1 and 60),
  audio_bytes integer check (audio_bytes is null or audio_bytes between 1 and 2000000),
  created_at timestamptz not null default now(),
  check ((kind = 'text' and body is not null and char_length(btrim(body)) >= 1) or (kind = 'voice' and body is null and audio_seconds is not null and audio_bytes is not null))
);
create index if not exists chat_messages_link_idx on public.chat_messages (link_id, seq desc);
create index if not exists chat_messages_created_idx on public.chat_messages (created_at);
create index if not exists chat_messages_sender_idx on public.chat_messages (sender_id);

-- When each learner last opened each conversation, for the unread count.
create table if not exists public.chat_reads (
  link_id uuid not null references public.classmate_links(id) on delete cascade,
  learner_id uuid not null references public.learner_profiles(id) on delete cascade,
  last_read_seq bigint not null default 0,
  primary key (link_id, learner_id)
);

alter table public.chat_messages enable row level security;
alter table public.chat_reads enable row level security;
