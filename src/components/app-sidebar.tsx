"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Brand from "@/components/brand";
import { streamLabel } from "@/data/streams";
import { Grid, Layers, Message, Monitor, Note, Shield, Swap, Target, Trophy, Users } from "@/components/icons";
import PlanBadge from "@/components/plan-badge";
import type { LearnerProfile } from "@/lib/profiles";

const STUDY_LINKS = [
  { href: "/study", label: "Dashboard", short: "Home", icon: Grid },
  { href: "/study/subjects", label: "Subjects & lessons", short: "Subjects", icon: Layers },
  { href: "/study/cbt", label: "CBT tests", short: "CBT", icon: Monitor },
  { href: "/study/notes", label: "My notes", short: "Notes", icon: Note },
];

const CHALLENGE_LINK = { href: "/study/challenges", label: "Challenges", short: "Challenge", icon: Target };
// The sidebar groups them under "Classmates"; the phone tab bar only has room for Challenges.
const CHATS_LINK = { href: "/study/chats", label: "Chats", short: "Chats", icon: Message };
const LEADERBOARD_LINK = { href: "/study/challenges/leaderboard", label: "Leaderboard", short: "Leaders", icon: Trophy };

function isActive(pathname: string, href: string) {
  if (href === "/study") return pathname === "/study";
  if (href === "/study/challenges") return pathname.startsWith(href) && !pathname.startsWith("/study/challenges/leaderboard");
  if (href === "/study/subjects") return pathname.startsWith("/study/subjects") || pathname.startsWith("/study/ss1");
  return pathname.startsWith(href);
}

export default function AppSidebar({ learner, challenges = false, chat = false }: { learner: LearnerProfile; challenges?: boolean; chat?: boolean }) {
  const pathname = usePathname();
  const { name: learnerName, classLevel, school } = learner;
  const stream = streamLabel(learner.stream);
  // Classmate challenges only appear once the owner has switched the feature on.
  const links = challenges ? [...STUDY_LINKS, CHALLENGE_LINK, ...(chat ? [CHATS_LINK] : [])] : STUDY_LINKS;
  const classmateLinks = chat ? [CHALLENGE_LINK, CHATS_LINK, LEADERBOARD_LINK] : [CHALLENGE_LINK, LEADERBOARD_LINK];

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
          {challenges && <>
            <span className="sidebar-label">Classmates</span>
            {classmateLinks.map(({ href, label, icon: Icon }) => {
              const active = isActive(pathname, href);
              return <Link key={href} href={href} className={`sidebar-link ${active ? "active" : ""}`} aria-current={active ? "page" : undefined}><Icon size={18} />{label}</Link>;
            })}
          </>}
          <span className="sidebar-label">Family</span>
          <Link href="/profiles" className="sidebar-link"><Users size={18} />Learners</Link>
          {challenges && <Link href={`/study/classmates?learner=${learner.id}`} className={`sidebar-link ${pathname.startsWith("/study/classmates") ? "active" : ""}`} aria-current={pathname.startsWith("/study/classmates") ? "page" : undefined}><Shield size={18} />Classmate settings</Link>}
          <a href="/leave" className="sidebar-link"><Swap size={18} />Switch learner</a>
        </nav>
        <div className="sidebar-user">
          <span className="avatar small" aria-hidden="true">{learnerName[0]?.toUpperCase()}</span>
          <div><strong>{learnerName}</strong><span>{classLevel}{stream && <> · {stream}</>} learner</span>{school && <span className="sidebar-school" title={school}>{school}</span>}<PlanBadge plan={learner.plan} sponsored={learner.sponsored} className="on-navy" /></div>
        </div>
      </aside>

      <header className="mobile-bar">
        <Brand />
        <a href="/leave" className="mobile-user" aria-label={`Switch learner (now ${learnerName})`}><span className="avatar small" aria-hidden="true">{learnerName[0]?.toUpperCase()}</span></a>
      </header>
      <nav className="tab-bar" aria-label="Study navigation" data-count={links.length + 1} style={{ gridTemplateColumns: `repeat(${links.length + 1}, 1fr)` }}>
        {links.map(({ href, short, icon: Icon }) => {
          const active = isActive(pathname, href);
          return <Link key={href} href={href} className={active ? "active" : ""} aria-current={active ? "page" : undefined}><Icon size={20} /><span>{short}</span></Link>;
        })}
        <Link href="/profiles"><Users size={20} /><span>Family</span></Link>
      </nav>
    </>
  );
}
