import Brand from "@/components/brand";
import { requireLearner } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function StudyLayout({ children }: { children: React.ReactNode }) {
  const learner = await requireLearner();
  return (
    <div className="dashboard-page">
      <header className="site-header">
        <div className="shell header-inner">
          <Brand />
          <div className="dashboard-nav"><span className="avatar small" aria-hidden="true">{learner.name[0]}</span><span>{learner.name}</span><a href="/leave" className="switch-link">Switch learner</a></div>
        </div>
      </header>
      <main id="main">{children}</main>
    </div>
  );
}
