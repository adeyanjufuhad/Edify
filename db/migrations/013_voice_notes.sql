-- Voice notes (phase 4 of docs/challenges.md). NOT applied to production. Needs 010 and 012 first.
-- The recording itself (at most 400 KB, checked by the server) lives here, apart from chat_messages so that a message
-- list never loads audio. It is deleted with its message, and so with the link, the learner or the account.
-- The browser never reads this table: playback goes through /api/social/voice/<message>, which checks who is asking.
create table if not exists public.chat_voice_clips (
  message_id uuid primary key references public.chat_messages(id) on delete cascade,
  content_type text not null check (content_type in ('audio/webm', 'audio/ogg', 'audio/mp4')),
  audio bytea not null check (octet_length(audio) between 1 and 2000000)
);

alter table public.chat_voice_clips enable row level security;
