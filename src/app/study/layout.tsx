import AppSidebar from "@/components/app-sidebar";
import PresenceBeat from "@/components/presence-beat";
import { requireLearner } from "@/lib/session";
import { challengesEnabled } from "@/lib/social/flags";
import { getEffectiveSettings, NOTHING_ON } from "@/lib/social/settings";
import "./app.css";
import "./motion.css";

export const dynamic = "force-dynamic";

export default async function StudyLayout({ children }: { children: React.ReactNode }) {
  const learner = await requireLearner();
  const challenges = challengesEnabled();
  // The "I'm online" heartbeat runs only when the owner and this learner's parent have both switched presence on.
  const social = challenges ? await getEffectiveSettings(learner.id).catch(() => NOTHING_ON) : NOTHING_ON;
  return (
    <div className="app">
      <AppSidebar learner={learner} challenges={challenges} chat={social.chat} />
      <main id="main" className="app-main">{children}</main>
      {social.presence && <PresenceBeat />}
    </div>
  );
}
