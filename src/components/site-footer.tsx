import Link from "next/link";
import Brand from "@/components/brand";
import { Squiggle } from "@/components/doodles";

// The navy footer on the landing page and the privacy and terms pages (styles in src/app/home.css).
export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div className="footer-brand"><Brand /><Squiggle className="footer-squiggle" color="#669bbc" /><p>Clear notes and exam-style practice for senior secondary school students in Nigeria, SS1 to SS3.</p></div>
        <nav className="footer-links" aria-label="Footer">
          <div><strong>Study</strong><Link href="/#features">Features</Link><Link href="/#how">How it works</Link><Link href="/#subjects">Subjects</Link></div>
          <div><strong>Parents</strong><Link href="/#parents">For parents</Link><Link href="/#plans">Plans</Link><Link href="/#faq">FAQ</Link></div>
          <div><strong>Account</strong><Link href="/signup">Create an account</Link><Link href="/profiles">Log in</Link><Link href="/forgot-password">Reset password</Link></div>
          <div><strong>Legal</strong><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms of use</Link><Link href="/privacy#delete">Delete your data</Link></div>
        </nav>
      </div>
      <div className="shell footer-base"><span>© 2026 Edify</span><span>Made with care for the next generation of thinkers.</span></div>
    </footer>
  );
}
