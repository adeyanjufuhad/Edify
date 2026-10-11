import AppSidebar from "@/components/app-sidebar";
import { requireLearner } from "@/lib/session";
import { challengesEnabled } from "@/lib/social/flags";
import "./app.css";
import "./motion.css";

export const dynamic = "force-dynamic";

export default async function StudyLayout({ children }: { children: React.ReactNode }) {
  const learner = await requireLearner();
  return (
    <div className="app">
      <AppSidebar learner={learner} challenges={challengesEnabled()} />
      <main id="main" className="app-main">{children}</main>
    </div>
  );
}
