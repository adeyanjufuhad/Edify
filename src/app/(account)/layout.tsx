import Link from "next/link";
import Brand from "@/components/brand";
import { ArrowLeft, Check } from "@/components/icons";
import Mascot from "@/components/mascot";
import { SpeechBubble } from "@/components/doodles";
import { getLearner, getParent } from "@/lib/account";
import { hasPlan } from "@/lib/access";
import "./account.css";

export const metadata = { title: "Your family account — Edify" };

const POINTS = ["Quick exam notes for every week", "Practice questions that mark themselves", "SS1 to SS3, one account per family"];

// Where "home" leads from these pages. Signed out: the public landing page. Signed in with a learner open who has a
// plan: that learner's dashboard. Otherwise: the learner picker, which is the signed-in parent's home.
async function homeLink() {
  const parent = await getParent();
  if (!parent) return { href: "/", label: "Back to home" };
  const learner = await getLearner();
  if (learner && hasPlan(learner, "bronze")) return { href: "/study", label: `Back to ${learner.name.split(" ")[0]}’s dashboard` };
  return { href: "/profiles", label: "Your learners" };
}

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const home = await homeLink();
  return (
    <div className="auth">
      <aside className="auth-side">
        <Brand href={home.href} />
        <div className="auth-side-copy">
          <h2>Study smarter, one week at a time.</h2>
          <ul>{POINTS.map((point) => <li key={point}><span aria-hidden="true"><Check size={14} /></span>{point}</li>)}</ul>
        </div>
        <div className="auth-mascot"><SpeechBubble className="auth-speech">You’ve got this. One week at a time!</SpeechBubble><Mascot pose="wave" className="mascot-badge float slow" /></div>
        <small>© 2026 Edify</small>
      </aside>
      <main id="main" className="auth-main">
        <div className="auth-top"><span className="auth-mobile-brand"><Brand href={home.href} /></span><Link href={home.href} className="text-link small"><ArrowLeft size={14} /> {home.label}</Link></div>
        <div className="auth-body">{children}</div>
      </main>
    </div>
  );
}
