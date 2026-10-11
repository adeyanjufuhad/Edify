import "server-only";
import { notFound } from "next/navigation";
import { CHALLENGE_MIN_PLAN } from "@/data/challenges";
import { hasPlan } from "@/lib/access";
import { getLearner, requireLearner, type Learner } from "@/lib/session";
import { challengesEnabled } from "./flags";
import { getEffectiveSettings, type SocialSettings } from "./settings";

// Who is allowed to use the classmate features, decided on the server for every page, action and route:
// the feature is switched on, a learner is open (the parent's session plus the learner cookie checked against
// that parent's own learners), their plan includes it, and their parent has switched challenges on.
export type Actor = { learner: Learner; settings: SocialSettings };
export type Blocked = "plan" | "parent";

// For pages. A switched-off feature is a 404, as if it did not exist. A missing learner goes to the picker.
export async function pageActor(): Promise<{ learner: Learner; settings: SocialSettings; blocked: Blocked | null }> {
  if (!challengesEnabled()) notFound();
  const learner = await requireLearner();
  if (!hasPlan(learner, CHALLENGE_MIN_PLAN)) return { learner, settings: await getEffectiveSettings(learner.id), blocked: "plan" };
  const settings = await getEffectiveSettings(learner.id);
  return { learner, settings, blocked: settings.challenges ? null : "parent" };
}

// For server actions and API routes: never redirects, says why instead.
export async function actionActor(): Promise<({ ok: true } & Actor) | { ok: false; error: string; status: number }> {
  if (!challengesEnabled()) return { ok: false, error: "Classmate challenges are not switched on.", status: 404 };
  const learner = await getLearner();
  if (!learner) return { ok: false, error: "Open your learner space again, then try once more.", status: 401 };
  if (!hasPlan(learner, CHALLENGE_MIN_PLAN)) return { ok: false, error: "Challenges are included in Gold.", status: 403 };
  const settings = await getEffectiveSettings(learner.id);
  if (!settings.challenges) return { ok: false, error: "A parent has not switched challenges on for you yet.", status: 403 };
  return { ok: true, learner, settings };
}

// Route handlers have no Origin check of their own (Server Actions do). Refuse a cross-site request that carries our cookies.
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === (request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? new URL(request.url).host);
  } catch {
    return false;
  }
}
