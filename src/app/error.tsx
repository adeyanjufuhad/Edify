"use client";

import Link from "next/link";
import Brand from "@/components/brand";
import Mascot from "@/components/mascot";

// Shown when a page fails to load, usually because the database or the sign-in service was briefly out of reach.
// Styled like the 404 page. The study app has its own (src/app/study/error.tsx) that keeps the sidebar.
export default function ErrorPage({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <div className="not-found-page">
      <header className="shell plain-header"><Brand /></header>
      <main id="main" className="shell not-found">
        <Mascot pose="think" className="nf-mascot" />
        <span className="kicker">Something went wrong</span>
        <h1>This page didn’t load.</h1>
        <p>It’s usually a weak connection or a short hiccup on our side. Nothing you saved has been lost. Try again, or go back home.</p>
        <div className="error-actions">
          <button type="button" className="pill-button" onClick={() => retry()}>Try again</button>
          <Link href="/" className="pill-outline">Back to Edify</Link>
        </div>
      </main>
    </div>
  );
}
