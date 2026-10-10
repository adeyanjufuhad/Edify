import AppSidebar from "@/components/app-sidebar";
import { requireLearner } from "@/lib/session";
import "./app.css";

export const dynamic = "force-dynamic";

export default async function StudyLayout({ children }: { children: React.ReactNode }) {
  const learner = await requireLearner();
  return (
    <div className="app">
      <AppSidebar learnerName={learner.name} classLevel={learner.classLevel} />
      <main id="main" className="app-main">{children}</main>
    </div>
  );
}
