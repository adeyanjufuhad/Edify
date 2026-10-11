"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Brand from "@/components/brand";
import { streamLabel } from "@/data/streams";
import { Close, Grid, Layers, Menu, Message, Monitor, Note, Shield, Swap, Target, Trophy, Users } from "@/components/icons";
import PlanBadge from "@/components/plan-badge";
import type { LearnerProfile } from "@/lib/profiles";

const STUDY_LINKS = [
  { href: "/study", label: "Dashboard", short: "Home", icon: Grid },
  { href: "/study/subjects", label: "Subjects & lessons", short: "Subjects", icon: Layers },
  { href: "/study/cbt", label: "CBT tests", short: "CBT", icon: Monitor },
  { href: "/study/notes", label: "My notes", short: "Notes", icon: Note },
];

const [HOME_LINK, SUBJECTS_LINK, CBT_LINK, NOTES_LINK] = STUDY_LINKS;
// The sidebar groups these under "Classmates"; on phones they live in the menu (Chats sits in the tab bar when it is on).
const CHALLENGE_LINK = { href: "/study/challenges", label: "Challenges", short: "Challenges", icon: Target };
const CHATS_LINK = { href: "/study/chats", label: "Chats", short: "Chats", icon: Message };
const LEADERBOARD_LINK = { href: "/study/challenges/leaderboard", label: "Leaderboard", short: "Leaderboard", icon: Trophy };

type MenuItem = { href: string; label: string; icon: (props: { size?: number }) => React.ReactNode; active: boolean; plain?: boolean };

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
  // Classmate challenges only appear once the owner has switched the feature on; Chats needs challenges too.
  const showChat = challenges && chat;
  const classmateLinks = showChat ? [CHALLENGE_LINK, CHATS_LINK, LEADERBOARD_LINK] : [CHALLENGE_LINK, LEADERBOARD_LINK];

  // Phone tab bar: four links with the menu button in the middle; everything else sits in the pop-up menu.
  const barLinks = [HOME_LINK, SUBJECTS_LINK, CBT_LINK, showChat ? CHATS_LINK : NOTES_LINK];
  const onClassmates = pathname.startsWith("/study/classmates");
  const menuItems: MenuItem[] = [
    ...(showChat ? [{ href: NOTES_LINK.href, label: NOTES_LINK.short, icon: NOTES_LINK.icon, active: isActive(pathname, NOTES_LINK.href) }] : []),
    ...(challenges ? [CHALLENGE_LINK, LEADERBOARD_LINK].map(({ href, short, icon }) => ({ href, label: short, icon, active: isActive(pathname, href) })) : []),
    { href: "/profiles", label: "Learners", icon: Users, active: false },
    ...(challenges ? [{ href: `/study/classmates?learner=${learner.id}`, label: "Classmate settings", icon: Shield, active: onClassmates }] : []),
    { href: "/leave", label: "Switch learner", icon: Swap, active: false, plain: true },
  ];
  const menuHasCurrent = menuItems.some((item) => item.active);

  const [open, setOpen] = useState(false);
  // Close the menu whenever the page changes (adjusting state during render, as React recommends, instead of an effect).
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeAndRefocus = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const barLink = ({ href, short, icon: Icon }: (typeof barLinks)[number]) => {
    const active = isActive(pathname, href);
    return <Link key={href} href={href} className={active ? "active" : ""} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}><Icon size={22} /><span>{short}</span></Link>;
  };

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
      <nav className="tab-bar" aria-label="Study navigation">
        {open && <div className="tab-scrim" aria-hidden="true" onClick={closeAndRefocus} />}
        {barLinks.slice(0, 2).map(barLink)}
        <button ref={buttonRef} type="button" className={`tab-menu-button${open ? " is-open" : ""}`} aria-expanded={open} aria-controls="tab-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
          <span className="tab-menu-circle">
            {open ? <Close size={26} /> : <Menu size={26} />}
            {menuHasCurrent && !open && <span className="tab-menu-dot" />}
          </span>
          <span>{open ? "Close" : "Menu"}</span>
        </button>
        <div id="tab-menu" ref={menuRef} className="tab-menu" hidden={!open}>
          <div className="tab-menu-head">
            <span className="avatar small" aria-hidden="true">{learnerName[0]?.toUpperCase()}</span>
            <div><strong>{learnerName.split(" ")[0]}</strong><span>{classLevel}{stream && <> · {stream}</>}</span></div>
          </div>
          <ul className={`tab-menu-grid${menuItems.length <= 4 ? " is-two" : ""}`}>
            {menuItems.map(({ href, label, icon: Icon, active, plain }) => {
              const content = <><Icon size={24} /><span>{label}</span></>;
              const props = { className: `tab-menu-tile${active ? " active" : ""}`, "aria-current": active ? ("page" as const) : undefined, onClick: () => setOpen(false) };
              return <li key={label}>{plain ? <a href={href} {...props}>{content}</a> : <Link href={href} {...props}>{content}</Link>}</li>;
            })}
          </ul>
        </div>
        {barLinks.slice(2).map(barLink)}
      </nav>
    </>
  );
}
