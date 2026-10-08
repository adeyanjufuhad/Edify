import { neon } from "@neondatabase/serverless";
import { getAuth } from "@/lib/auth/server";
import { week1 } from "@/data/lessons/week-1";

export const dynamic = "force-dynamic";

async function currentUserId() {
  const { data } = await getAuth().getSession();
  return data?.user?.id ?? null;
}

function database() {
  if (!process.env.DATABASE_URL) throw new Error("Neon database is not configured.");
  return neon(process.env.DATABASE_URL);
}

export async function GET(request: Request) {
  try {
    const userId = await currentUserId();
    if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });
    const lessonId = new URL(request.url).searchParams.get("lessonId");
    const sql = database();
    if (lessonId) {
      if (lessonId !== week1.id) return Response.json({ error: "Unknown lesson" }, { status: 400 });
      const rows = await sql`select lesson_id, completed, notes from public.lesson_progress where user_id = ${userId} and lesson_id = ${lessonId}`;
      return Response.json({ record: rows[0] ?? null });
    }
    const rows = await sql`select lesson_id from public.lesson_progress where user_id = ${userId} and completed = true`;
    return Response.json({ completed: rows.map((row) => row.lesson_id) });
  } catch {
    return Response.json({ error: "Progress is temporarily unavailable" }, { status: 503 });
  }
}

export async function PUT(request: Request) {
  try {
    const userId = await currentUserId();
    if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });
    const input = await request.json() as { lessonId?: unknown; completed?: unknown; notes?: unknown };
    if (input.lessonId !== week1.id || typeof input.completed !== "boolean" || typeof input.notes !== "string" || input.notes.length > 10000) {
      return Response.json({ error: "Invalid lesson progress" }, { status: 400 });
    }
    const sql = database();
    await sql`insert into public.lesson_progress (user_id, lesson_id, completed, notes)
      values (${userId}, ${input.lessonId}, ${input.completed}, ${input.notes})
      on conflict (user_id, lesson_id) do update set completed = excluded.completed, notes = excluded.notes, updated_at = now()`;
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Could not save progress" }, { status: 503 });
  }
}
