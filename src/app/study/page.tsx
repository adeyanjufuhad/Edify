"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { curriculum, firstTermChemistry } from "@/data/curriculum";
import { authClient, displayName } from "@/lib/auth/client";

export default function StudyPage() {
  const router = useRouter();
  const [learner, setLearner] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    authClient.getSession().then(async ({ data }) => {
      if (!data?.user) { router.replace("/login"); return; }
      setLearner(displayName(data.user.name));
      try { const response = await fetch("/api/progress"); if (!response.ok) throw new Error(); const result = await response.json(); setDone(result.completed || []); }
      catch { setError("Progress could not be loaded. Try refreshing the page."); }
    });
  }, [router]);
  if (!learner) return <main className="account-page" />;
  return <main className="dashboard-page"><header className="site-header shell"><Link href="/" className="brand"><span className="brand-mark">e.</span><span>edify<span className="brand-period">.</span></span></Link><div className="dashboard-nav"><span className="nav-avatar">{learner[0]}</span><span>{learner}</span><button onClick={async () => { await authClient.signOut(); router.push("/login"); }}>Log out</button></div></header>
    <div className="shell dashboard-content"><div className="dashboard-hello"><div><span className="section-kicker">SS1 · BRAINFIELD SCHOOL</span><h1>Keep going, <em>{learner}.</em></h1><p>Your next small step is ready.</p></div><div className="progress-stamp"><strong>{done.length}</strong><span>lessons completed</span></div></div>
      {error && <p role="alert" className="form-error">{error}</p>}
      <div className="dashboard-grid"><aside className="study-sidebar"><span className="panel-overline">YOUR LEARNING PATH</span><h2>SS1</h2>{curriculum.map((term) => <div className={`term-chip ${term.slug === "first-term" ? "active" : ""}`} key={term.slug}><span>{term.name}</span><small>{term.subjects.length ? `${term.subjects.length} subject` : "Coming soon"}</small></div>)}<p>More terms and subjects will appear here as they are added.</p></aside>
        <section className="study-main"><div className="study-subject-head"><div className="subject-symbol">C</div><div><span>FIRST TERM · SUBJECT 01</span><h2>Chemistry</h2></div></div><p className="study-description">Explore each topic in order. Week 1 is ready; the following lessons will be added one at a time.</p><div className="study-week-list">{firstTermChemistry.weeks.map((week) => <div className={`study-week ${week.available ? "is-ready" : ""}`} key={week.number}><span className="study-week-label">{week.label}</span><strong>{week.topic}</strong>{week.available ? <Link href="/study/ss1/first-term/chemistry/week-1">{done.includes("ss1-first-chemistry-week-1") ? "Review lesson" : "Start lesson"} →</Link> : <span className="coming-label">Coming soon</span>}</div>)}</div></section>
      </div>
    </div>
  </main>;
}
