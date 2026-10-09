import Link from "next/link";
import LearnerNav from "@/components/learner-nav";
import { requireLearner } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function StudyLayout({ children }: { children: React.ReactNode }) {
  const learner = await requireLearner();
  return (
    <main className="dashboard-page">
      <header className="site-header shell">
        <Link href="/" className="brand"><span className="brand-mark">e.</span><span>edify<span className="brand-period">.</span></span></Link>
        <LearnerNav name={learner.name} />
      </header>
      {children}
    </main>
  );
}
