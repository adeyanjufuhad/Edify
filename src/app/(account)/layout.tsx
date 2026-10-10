import Link from "next/link";
import Brand from "@/components/brand";
import { ArrowLeft, Check } from "@/components/icons";
import "./account.css";

export const metadata = { title: "Your family account — Edify" };

const POINTS = ["Quick exam notes for every week", "WAEC-style practice that marks itself", "Separate progress for each child"];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="auth">
      <aside className="auth-side">
        <Brand />
        <div className="auth-side-copy">
          <h2>Study smarter for WAEC, one week at a time.</h2>
          <ul>{POINTS.map((point) => <li key={point}><span aria-hidden="true"><Check size={14} /></span>{point}</li>)}</ul>
        </div>
        <small>© 2026 Edify</small>
      </aside>
      <main id="main" className="auth-main">
        <div className="auth-top"><span className="auth-mobile-brand"><Brand /></span><Link href="/" className="text-link small"><ArrowLeft size={14} /> Back to home</Link></div>
        <div className="auth-body">{children}</div>
      </main>
    </div>
  );
}
