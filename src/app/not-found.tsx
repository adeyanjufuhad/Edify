import Link from "next/link";
import Brand from "@/components/brand";
import { ArrowLeft } from "@/components/icons";

export const metadata = { title: "Page not found — Edify" };

export default function NotFound() {
  return <>
    <header className="site-header"><div className="shell header-inner"><Brand /></div></header>
    <main id="main" className="shell not-found">
      <span className="kicker">ERROR 404</span>
      <h1>This page is <span className="hl">not here.</span></h1>
      <p>The link may be old, or the lesson has not been published yet. Go back home and pick up from your study space.</p>
      <Link href="/" className="pill-button"><ArrowLeft /> Back to Edify</Link>
    </main>
  </>;
}
