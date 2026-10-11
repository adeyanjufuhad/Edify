import "server-only";
import { presenceEnabled, chatEnabled, voiceEnabled } from "./flags";
import { isUuid, run, type Row } from "./data";
import { saveSettingsQuery, settingsForQuery, settingsQuery } from "@/lib/social-queries";
import { database } from "@/lib/db";

// What a parent has switched on for a learner. No row means everything is off.
export type SocialSettings = { challenges: boolean; presence: boolean; chat: boolean; voice: boolean };
export const NOTHING_ON: SocialSettings = { challenges: false, presence: false, chat: false, voice: false };

function fromRow(row: Row | undefined): SocialSettings {
  if (!row) return NOTHING_ON;
  return { challenges: row.challenges_on === true, presence: row.presence_on === true, chat: row.chat_on === true, voice: row.voice_on === true };
}

// Chat needs challenges, voice needs chat, presence needs challenges: switching a feature off switches off what depends on it.
export function consistent(wanted: SocialSettings): SocialSettings {
  const challenges = wanted.challenges;
  const chat = challenges && wanted.chat;
  return { challenges, presence: challenges && wanted.presence, chat, voice: chat && wanted.voice };
}

// What actually applies right now: a feature the owner has not switched on for the whole site counts as off.
export function effective(settings: SocialSettings): SocialSettings {
  return { challenges: settings.challenges, presence: settings.presence && presenceEnabled(), chat: settings.chat && chatEnabled(), voice: settings.voice && voiceEnabled() };
}

export async function getSettings(learnerId: string): Promise<SocialSettings> {
  if (!isUuid(learnerId)) return NOTHING_ON;
  return fromRow((await run(settingsQuery(learnerId)))[0]);
}

export async function getEffectiveSettings(learnerId: string): Promise<SocialSettings> {
  return effective(await getSettings(learnerId));
}

// The raw settings for several learners (the parent page shows what the parent chose, even for features not live yet).
export async function getSettingsFor(learnerIds: string[]): Promise<Map<string, SocialSettings>> {
  const result = new Map<string, SocialSettings>(learnerIds.map((id) => [id, NOTHING_ON]));
  if (!learnerIds.length) return result;
  for (const row of await run(settingsForQuery(learnerIds))) result.set(row.learner_id as string, fromRow(row));
  return result;
}

// Saves a parent's choices for one of their own learners. Returns false when the learner is not theirs.
export async function saveSettings(parentId: string, learnerId: string, wanted: SocialSettings): Promise<boolean> {
  if (!isUuid(learnerId)) return false;
  const next = consistent(wanted);
  if (!(await run(saveSettingsQuery(parentId, learnerId, next)))[0]) return false;
  // Switching presence off also forgets the last time they were seen (the table exists once phase 2 is applied).
  if (!next.presence && presenceEnabled()) await database()`delete from public.learner_presence where learner_id = ${learnerId}`;
  return true;
}
