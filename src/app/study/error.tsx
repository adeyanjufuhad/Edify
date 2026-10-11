"use client";

import Link from "next/link";
import Mascot from "@/components/mascot";

// A study page that failed to load (for example the database was briefly out of reach). The sidebar and tab bar
// stay, so the learner can try again or go somewhere else.
export default function StudyError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <div className="page">
      <section className="panel empty-state" role="alert">
        <Mascot pose="think" className="empty-mascot" />
        <h1 className="error-title">This page didn’t load.</h1>
        <p>Your progress and notes are safe. Check your connection, then try again.</p>
        <div className="error-actions">
          <button type="button" className="pill-button" onClick={() => retry()}>Try again</button>
          <Link href="/study" className="pill-outline">Back to the dashboard</Link>
        </div>
      </section>
    </div>
  );
}
