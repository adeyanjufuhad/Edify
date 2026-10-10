import Link from "next/link";
import Brand from "@/components/brand";
import { ArrowLeft } from "@/components/icons";
import Mascot from "@/components/mascot";

export const metadata = { title: "Page not found — Edify" };

export default function NotFound() {
  return (
    <div className="not-found-page">
      <header className="shell plain-header"><Brand /></header>
      <main id="main" className="shell not-found">
        <Mascot pose="think" className="nf-mascot" />
        <span className="kicker">Error 404</span>
        <h1>This page isn’t here.</h1>
        <p>The link may be old, or the lesson hasn’t been published yet. Go back home and pick up from your study space.</p>
        <Link href="/" className="pill-button"><ArrowLeft /> Back to Edify</Link>
      </main>
    </div>
  );
}
