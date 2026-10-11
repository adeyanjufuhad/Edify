import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Link2, Shield, Users } from "@/components/icons";
import { REPORT_REASONS, type SwitchId } from "@/data/challenges";
import { requireConsentedParent } from "@/lib/account";
import { requireLearner } from "@/lib/session";
import { listProfiles, type LearnerProfile } from "@/lib/profiles";
import { LIMITS, RETENTION_DAYS, areClassmates } from "@/lib/social-rules";
import { chatEnabled, challengesEnabled, presenceEnabled, voiceEnabled } from "@/lib/social/flags";
import { listParentLinks, listPendingInvites, listReportsByParent, type ParentLink, type PendingInvite, type SentReport } from "@/lib/social/links";
import { getSettingsFor, NOTHING_ON, type SocialSettings } from "@/lib/social/settings";
import { cancelInviteAction } from "./actions";
import Conversation from "./conversation";
import { InviteMaker, LinkActions, RedeemForm, SettingsForm, SiblingLink } from "./forms";
import "../../(account)/account.css";
import "./classmates.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Classmates and safety — Edify" };

const WHEN = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", timeZone: "Africa/Lagos" });

export default async function ClassmatesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  if (!challengesEnabled()) notFound();
  const parent = await requireConsentedParent();
  // Opened from inside the study app, so a learner is open; their tab is shown first.
  const current = await requireLearner();
  const { learner: wanted, chat: wantedChat } = await searchParams;

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

  const learner = profiles.find((profile) => profile.id === wanted) ?? profiles.find((profile) => profile.id === current.id) ?? profiles[0];
  const open: Record<SwitchId, boolean> = { challenges: true, classVisible: true, presence: presenceEnabled(), chat: chatEnabled(), voice: voiceEnabled() };
  const mine = learner ? settings.get(learner.id) ?? NOTHING_ON : NOTHING_ON;
  const myLinks = learner ? links.filter((link) => link.learnerId === learner.id) : [];
  const myInvites = learner ? invites.filter((invite) => invite.learnerId === learner.id) : [];
  // Brothers and sisters on this account who could be linked with one click (same class and school, not linked yet).
  const linkedIds = new Set(myLinks.map((link) => link.otherId));
  const siblings = learner ? profiles.filter((profile) => profile.id !== learner.id && !linkedIds.has(profile.id) && areClassmates({ school: learner.school, classLevel: learner.classLevel }, { school: profile.school, classLevel: profile.classLevel }))
    .map((profile) => ({ id: profile.id, name: profile.name, ready: (settings.get(profile.id) ?? NOTHING_ON).challenges })) : [];
  const reading = chatEnabled() && typeof wantedChat === "string" ? myLinks.find((link) => link.linkId === wantedChat) : undefined;

  return (
    <div className="classmates-page">
      <Link href="/study/challenges" className="text-link small"><ArrowLeft size={14} /> Back to challenges</Link>
      <header>
        <span className="kicker">Classmates and safety</span>
        <h1>Who can your child <span className="hl">play with?</span></h1>
        <p>Three steps for each child: switch on what they can use, add the classmates they may play with, then manage them. Nothing is on until you switch it on. Children only ever meet others in their own school and class.</p>
      </header>

      {loadFailed && <p role="alert" className="form-error">This page could not be loaded. Refresh to try again.</p>}
      {!profiles.length && !loadFailed && <p className="form-success">Add a learner first, then come back here.</p>}

      {learner && (
        <>
          {profiles.length > 1 && (
            <nav className="learner-tabs" aria-label="Choose a learner">
              {profiles.map((profile) => <Link key={profile.id} href={`/study/classmates?learner=${profile.id}`} className={profile.id === learner.id ? "is-on" : ""} aria-current={profile.id === learner.id ? "true" : undefined}>{profile.name}</Link>)}
            </nav>
          )}

          <ol className="steps-bar" aria-label={`Setting up classmates for ${learner.name}`}>
            <li className={mine.challenges ? "is-done" : "is-now"}><b>1</b> Switch on</li>
            <li className={!mine.challenges ? "" : myLinks.length ? "is-done" : "is-now"}><b>2</b> Add classmates</li>
            <li className={myLinks.length ? "is-now" : ""}><b>3</b> Manage</li>
          </ol>

          <section className="account-card step-card" id="step-switches" aria-labelledby="switches-title">
            <h2 id="switches-title"><span className="step-num" aria-hidden="true">1</span> Choose what {learner.name} can use</h2>
            <SettingsForm key={learner.id} learnerId={learner.id} name={learner.name} values={mine} open={open} />
          </section>

          <section className="account-card step-card" id="step-add" aria-labelledby="link-title">
            <h2 id="link-title"><span className="step-num" aria-hidden="true">2</span> Add classmates for {learner.name}</h2>
            <p className="account-note" style={{ marginTop: 0 }}>Only learners in {learner.classLevel}{learner.school && <> at {learner.school}</>} can be linked. Either parent can remove a link at any time.</p>
            {!mine.challenges ? <p className="form-error">Finish step 1 first: tick “Challenges and classmates” for {learner.name} and press Save.</p> : (
              <>
                {siblings.length > 0 && (
                  <div className="add-way">
                    <h3><Users size={18} /> Your other children in the same class</h3>
                    <p>They are on your account, so no code is needed.</p>
                    {siblings.map((sibling) => <SiblingLink key={sibling.id} learnerId={learner.id} name={learner.name} sibling={sibling} />)}
                  </div>
                )}
                <div className="add-way">
                  <h3><Link2 size={18} /> A classmate from another family</h3>
                  <p>One parent makes a code and sends it to the other parent (for example on WhatsApp). The other parent types it in on their own Edify family page. Do either A or B:</p>
                  <div className="code-grid">
                    <div><strong className="way-label">A. You send a code</strong><InviteMaker learnerId={learner.id} name={learner.name} disabled={false} /></div>
                    <div><strong className="way-label">B. You received a code</strong><RedeemForm learnerId={learner.id} name={learner.name} disabled={false} /></div>
                  </div>
                </div>
              </>
            )}
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

          <section className="account-card step-card" id="step-manage" aria-labelledby="links-title">
            <h2 id="links-title"><span className="step-num" aria-hidden="true">3</span> {learner.name}’s classmates</h2>
            {myLinks.length ? (
              <ul className="link-list">
                {myLinks.map((link) => (
                  <li key={link.linkId}>
                    <span className="avatar small" aria-hidden="true">{link.other.name[0]?.toUpperCase()}</span>
                    <span className="link-who"><strong>{link.other.name}</strong><small>{link.other.classLevel}{link.status === "pending" && " · classmate request waiting"}{link.status === "blocked" && (link.blocked === "by-us" ? " · blocked by you" : " · not available")}{chatEnabled() && <> · <Link href={`/study/classmates?learner=${learner.id}&chat=${link.linkId}#conversation`} className="text-link small">Read chat</Link></>}</small></span>
                    <LinkActions linkId={link.linkId} learnerId={learner.id} other={link.other.name} mode={link.status !== "blocked" ? "active" : link.blocked === "by-us" ? "blocked-by-us" : "blocked-by-them"} />
                  </li>
                ))}
              </ul>
            ) : <p className="empty">No classmates yet. Add one in step 2.</p>}
          </section>

          {reading && <Conversation parentId={parent.id} learnerId={learner.id} learnerName={learner.name} linkId={reading.linkId} otherName={reading.other.name} voice={voiceEnabled()} />}
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
          <li>Nobody can search for your child. They can only meet children in their own school and class: through a code two parents exchange, or, if you switch on <b>Visible to my class</b>, a request from a classmate whose parent made the same choice. Your child chooses whether to accept, and a “no” can’t be asked again.</li>
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
