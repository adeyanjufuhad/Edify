import { database } from "@/lib/db";

export type ProgressRecord = { completed: boolean; notes: string };

export async function getCompletedLessons(userId: string): Promise<string[]> {
  const rows = await database()`select lesson_id from public.lesson_progress where user_id = ${userId} and completed = true`;
  return rows.map((row) => row.lesson_id as string);
}

export async function getProgress(userId: string, lessonId: string): Promise<ProgressRecord | null> {
  const rows = await database()`select completed, notes from public.lesson_progress where user_id = ${userId} and lesson_id = ${lessonId}`;
  return (rows[0] as ProgressRecord | undefined) ?? null;
}

export async function saveProgress(userId: string, lessonId: string, completed: boolean, notes: string) {
  await database()`insert into public.lesson_progress (user_id, lesson_id, completed, notes)
    values (${userId}, ${lessonId}, ${completed}, ${notes})
    on conflict (user_id, lesson_id) do update set completed = excluded.completed, notes = excluded.notes, updated_at = now()`;
}
