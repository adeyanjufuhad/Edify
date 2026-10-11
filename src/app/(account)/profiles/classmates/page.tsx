import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Shield } from "@/components/icons";
import { REPORT_REASONS, type SwitchId } from "@/data/challenges";
import { requireConsentedParent } from "@/lib/account";
import { listProfiles, type LearnerProfile } from "@/lib/profiles";
import { LIMITS, RETENTION_DAYS } from "@/lib/social-rules";
import { chatEnabled, challengesEnabled, presenceEnabled, voiceEnabled } from "@/lib/social/flags";
import { listParentLinks, listPendingInvites, listReportsByParent, type ParentLink, type PendingInvite, type SentReport } from "@/lib/social/links";
import { getSettingsFor, NOTHING_ON, type SocialSettings } from "@/lib/social/settings";
import { cancelInviteAction } from "./actions";
import { InviteMaker, LinkActions, RedeemForm, SettingsForm } from "./forms";
import "./classmates.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Classmates and safety — Edify" };

const WHEN = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", timeZone: "Africa/Lagos" });

export default async function ClassmatesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  if (!challengesEnabled()) notFound();
  const parent = await requireConsentedParent();
  const { learner: wanted } = await searchParams;

  let profiles: LearnerProfile[] = [];
  let settings = new Map<string, SocialSettings>();
  let links: ParentLink[] = [];
  let invites: PendingInvite[] = [];
  let reports: SentReport[] = [];
  let loadFailed = false;
  try {
    profiles = await listProfiles(parent.id);
    [settings, links, invites, reports] = await Promise.all([getSettingsFor(profiles.map((profile) => profile.id)), listParentLinks(parent.id), listPendingInvites(parent.id), listReportsByParent(parent.id)]);
  } catch { loadFailed = true; }

  const learner = profiles.find((profile) => profile.id === wanted) ?? profiles[0];
  const open: Record<SwitchId, boolean> = { challenges: true, presence: presenceEnabled(), chat: chatEnabled(), voice: voiceEnabled() };
  const mine = learner ? settings.get(learner.id) ?? NOTHING_ON : NOTHING_ON;
  const myLinks = learner ? links.filter((link) => link.learnerId === learner.id) : [];
  const myInvites = learner ? invites.filter((invite) => invite.learnerId === learner.id) : [];

  return (
    <div className="classmates-page">
      <Link href="/profiles" className="text-link small"><ArrowLeft size={14} /> Back to learners</Link>
      <header>
        <span className="kicker">Classmates and safety</span>
        <h1>Who can your child <span className="hl">play with?</span></h1>
        <p>Classmate challenges let your child answer the same questions as a classmate. Nothing is on until you switch it on, and nobody can find your child: a link needs a one-time code that you and the other parent both agree to.</p>
      </header>

      {loadFailed && <p role="alert" className="form-error">This page could not be loaded. Refresh to try again.</p>}
      {!profiles.length && !loadFailed && <p className="form-success">Add a learner first, then come back here.</p>}

      {learner && (
        <>
          {profiles.length > 1 && (
            <nav className="learner-tabs" aria-label="Choose a learner">
              {profiles.map((profile) => <Link key={profile.id} href={`/profiles/classmates?learner=${profile.id}`} className={profile.id === learner.id ? "is-on" : ""} aria-current={profile.id === learner.id ? "true" : undefined}>{profile.name}</Link>)}
            </nav>
          )}

          <section className="account-card" aria-labelledby="switches-title">
            <h2 id="switches-title">What {learner.name} can do</h2>
            <SettingsForm key={learner.id} learnerId={learner.id} name={learner.name} values={mine} open={open} />
          </section>

          <section className="account-card" aria-labelledby="link-title">
            <h2 id="link-title">Link {learner.name} with a classmate</h2>
            <p className="account-note" style={{ marginTop: 0 }}>Only learners in the same school and class can be linked: {learner.classLevel}{learner.school && <> at {learner.school}</>}. The other child’s parent has to agree too, and both of you can remove the link at any time.</p>
            {!mine.challenges && <p className="form-error">Switch on “Challenges and classmates” for {learner.name} and press Save before linking.</p>}
            <div className="code-grid">
              <InviteMaker learnerId={learner.id} name={learner.name} disabled={!mine.challenges} />
              <RedeemForm learnerId={learner.id} name={learner.name} disabled={!mine.challenges} />
            </div>
            {myInvites.length > 0 && (
              <div className="pending">
                <h3>Codes waiting to be used</h3>
                <ul>
                  {myInvites.map((invite) => (
                    <li key={invite.id}>
                      <span>A code for {learner.name}, valid until {WHEN.format(new Date(invite.expiresAt))}.</span>
                      <form action={cancelInviteAction}><input type="hidden" name="inviteId" value={invite.id} /><button type="submit" className="text-button small">Cancel code</button></form>
                    </li>
                  ))}
                </ul>
                <p className="account-note">For safety, a code is only shown once when you make it. Cancel it and make a new one if it was lost.</p>
              </div>
            )}
          </section>

          <section className="account-card" aria-labelledby="links-title">
            <h2 id="links-title">{learner.name}’s classmates</h2>
            {myLinks.length ? (
              <ul className="link-list">
                {myLinks.map((link) => (
                  <li key={link.linkId}>
                    <span className="avatar small" aria-hidden="true">{link.other.name[0]?.toUpperCase()}</span>
                    <span className="link-who"><strong>{link.other.name}</strong><small>{link.other.classLevel}{link.status === "blocked" && (link.blocked === "by-us" ? " · blocked by you" : " · not available")}</small></span>
                    <LinkActions linkId={link.linkId} learnerId={learner.id} other={link.other.name} mode={link.status === "active" ? "active" : link.blocked === "by-us" ? "blocked-by-us" : "blocked-by-them"} />
                  </li>
                ))}
              </ul>
            ) : <p className="empty">No classmates yet.</p>}
          </section>
        </>
      )}

      {reports.length > 0 && (
        <section className="account-card" aria-labelledby="reports-title">
          <h2 id="reports-title">Reports your children have sent</h2>
          <ul className="link-list">
            {reports.map((report) => (
              <li key={report.id}><span className="link-who"><strong>{report.reporterName} reported {report.reportedName} ({report.reportedClass})</strong><small>{REPORT_REASONS.find((reason) => reason.id === report.reason)?.label ?? "Reported"} · {WHEN.format(new Date(report.createdAt))}</small></span></li>
            ))}
          </ul>
          <p className="account-note">The Edify team can read reports. A reported classmate is blocked straight away.</p>
        </section>
      )}

      <section className="account-card safety-card" aria-labelledby="safety-title">
        <h2 id="safety-title"><Shield size={20} /> How this keeps children safe</h2>
        <ul>
          <li>Nobody can search for or find your child. The only way to be linked is a one-time code that two parents exchange.</li>
          <li>Linked classmates see your child’s <b>first name and class</b> and challenge results. Never the school, surname, plan, progress or notes.</li>
          <li>Challenge answers are marked on our server. Messages and voice notes (when you switch them on) are limited to {LIMITS.messageMaxChars} characters and {LIMITS.voiceMaxSeconds} seconds, rate limited, and refused if they contain phone numbers, emails or links.</li>
          <li>Chat messages are deleted after {RETENTION_DAYS.textMessages} days and voice notes after {RETENTION_DAYS.voiceNotes} days. <span className="legal-hint">Proposed period, to be confirmed.</span></li>
          <li>Your children can block or report a classmate. Reports reach the Edify team.</li>
          <li>Deleting a learner or your account deletes their classmate links, challenges, messages and voice notes too. Read the <Link href="/privacy#classmates" className="text-link small">privacy policy</Link> and <Link href="/terms#classmates" className="text-link small">terms</Link> for the details.</li>
          <li>These settings are part of your signed-in family account. A child using your signed-in device can reach this page, so sign out when you hand a device over.</li>
        </ul>
      </section>
    </div>
  );
}
