import Link from "next/link";
import { requireLearner } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function StudyLayout({ children }: { children: React.ReactNode }) {
  const learner = await requireLearner();
  return (
    <main className="dashboard-page">
      <header className="site-header shell">
        <Link href="/" className="brand"><span className="brand-mark">e.</span><span>edify<span className="brand-period">.</span></span></Link>
        <div className="dashboard-nav"><span className="nav-avatar" aria-hidden="true">{learner.name[0]}</span><span>{learner.name}</span><a href="/leave" className="switch-link">Not you? Switch</a></div>
      </header>
      {children}
    </main>
  );
}
