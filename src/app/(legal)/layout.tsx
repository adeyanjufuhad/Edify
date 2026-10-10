import Link from "next/link";
import Brand from "@/components/brand";
import SiteFooter from "@/components/site-footer";
import "../home.css";
import "./legal.css";

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <>
    <header className="home-header">
      <div className="shell home-header-inner">
        <Brand />
        <nav className="home-nav" aria-label="Legal pages"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></nav>
        <div className="home-header-actions"><Link href="/profiles" className="home-login">Log in</Link><Link href="/signup" className="pill-button small">Sign up free</Link></div>
      </div>
    </header>
    <main id="main" className="legal">{children}</main>
    <SiteFooter />
  </>;
}
