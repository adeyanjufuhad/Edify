import { getLearner } from "@/lib/session";
import { hasPlan } from "@/lib/access";
import { lessonIds } from "@/data/lessons";
import { getCompletedLessons, getProgress, saveProgress } from "@/lib/progress";

export const dynamic = "force-dynamic";

const MAX_NOTES_LENGTH = 10000;

export async function GET(request: Request) {
  const learner = await getLearner();
  if (!learner) return Response.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const lessonId = new URL(request.url).searchParams.get("lessonId");
    if (lessonId) {
      if (!lessonIds.has(lessonId)) return Response.json({ error: "Unknown lesson" }, { status: 400 });
      return Response.json({ record: await getProgress(learner.id, lessonId) });
    }
    return Response.json({ completed: await getCompletedLessons(learner.id) });
  } catch {
    return Response.json({ error: "Progress is temporarily unavailable" }, { status: 503 });
  }
}

export async function PUT(request: Request) {
  const learner = await getLearner();
  if (!learner) return Response.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasPlan(learner, "bronze")) return Response.json({ error: "An active plan is required to save study progress." }, { status: 403 });
  let input: { lessonId?: unknown; completed?: unknown; notes?: unknown };
  try {
    input = await request.json();
  } catch {
    return Response.json({ error: "Invalid lesson progress" }, { status: 400 });
  }
  if (typeof input.lessonId !== "string" || !lessonIds.has(input.lessonId) || typeof input.completed !== "boolean" || typeof input.notes !== "string" || input.notes.length > MAX_NOTES_LENGTH) {
    return Response.json({ error: "Invalid lesson progress" }, { status: 400 });
  }
  try {
    await saveProgress(learner.id, input.lessonId, input.completed, input.notes);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Could not save progress" }, { status: 503 });
  }
}
