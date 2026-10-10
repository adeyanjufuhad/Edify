"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Brand from "@/components/brand";
import { Grid, Layers, Monitor, Note, Swap, Users } from "@/components/icons";
import PlanBadge from "@/components/plan-badge";
import type { LearnerProfile } from "@/lib/profiles";

const STUDY_LINKS = [
  { href: "/study", label: "Dashboard", short: "Home", icon: Grid },
  { href: "/study/subjects", label: "Subjects & lessons", short: "Subjects", icon: Layers },
  { href: "/study/cbt", label: "CBT tests", short: "CBT", icon: Monitor },
  { href: "/study/notes", label: "My notes", short: "Notes", icon: Note },
];

function isActive(pathname: string, href: string) {
  if (href === "/study") return pathname === "/study";
  if (href === "/study/subjects") return pathname.startsWith("/study/subjects") || pathname.startsWith("/study/ss1");
  return pathname.startsWith(href);
}

export default function AppSidebar({ learner }: { learner: LearnerProfile }) {
  const pathname = usePathname();
  const { name: learnerName, classLevel, school } = learner;

  return (
    <>
      <aside className="sidebar" aria-label="Study navigation">
        <div className="sidebar-brand"><Brand /></div>
        <nav className="sidebar-nav">
          <span className="sidebar-label">Study</span>
          {STUDY_LINKS.map(({ href, label, icon: Icon }) => {
            const active = isActive(pathname, href);
            return <Link key={href} href={href} className={`sidebar-link ${active ? "active" : ""}`} aria-current={active ? "page" : undefined}><Icon size={18} />{label}</Link>;
          })}
          <span className="sidebar-label">Family</span>
          <Link href="/profiles" className="sidebar-link"><Users size={18} />Learners</Link>
          <a href="/leave" className="sidebar-link"><Swap size={18} />Switch learner</a>
        </nav>
        <div className="sidebar-user">
          <span className="avatar small" aria-hidden="true">{learnerName[0]?.toUpperCase()}</span>
          <div><strong>{learnerName}</strong><span>{classLevel} learner</span>{school && <span className="sidebar-school" title={school}>{school}</span>}<PlanBadge plan={learner.plan} sponsored={learner.sponsored} className="on-navy" /></div>
        </div>
      </aside>

      <header className="mobile-bar">
        <Brand />
        <a href="/leave" className="mobile-user" aria-label={`Switch learner (now ${learnerName})`}><span className="avatar small" aria-hidden="true">{learnerName[0]?.toUpperCase()}</span></a>
      </header>
      <nav className="tab-bar" aria-label="Study navigation">
        {STUDY_LINKS.map(({ href, short, icon: Icon }) => {
          const active = isActive(pathname, href);
          return <Link key={href} href={href} className={active ? "active" : ""} aria-current={active ? "page" : undefined}><Icon size={20} /><span>{short}</span></Link>;
        })}
        <Link href="/profiles"><Users size={20} /><span>Family</span></Link>
      </nav>
    </>
  );
}
