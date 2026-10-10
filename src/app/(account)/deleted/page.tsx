import Link from "next/link";

export const metadata = { title: "Account deleted — Edify", robots: { index: false } };

export default function DeletedPage() {
  return (
    <div className="account-grid">
      <div className="account-intro">
        <span className="kicker">ALL DONE</span>
        <h1>Your account has been <span className="hl">deleted.</span></h1>
        <p>Your parent account, every learner, and all their progress, notes and CBT results have been removed, and you’ve been signed out. Payment records are kept for accounting and disputes, as explained in the privacy policy.</p>
      </div>
      <div className="account-card">
        <h2>Changed your mind?</h2>
        <p className="account-switch">You’re always welcome to start again with a new account.</p>
        <p><Link href="/signup" className="pill-button">Create a new account</Link></p>
        <p className="account-switch"><Link href="/" className="text-link">Back to home</Link> · <Link href="/privacy" className="text-link">Privacy policy</Link></p>
      </div>
    </div>
  );
}
