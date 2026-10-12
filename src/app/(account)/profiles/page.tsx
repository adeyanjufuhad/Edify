import Link from "next/link";
import { requireParent } from "@/lib/account";
import { hasAcceptedLegal } from "@/lib/consent";
import { MAX_PROFILES, listProfiles, type LearnerProfile } from "@/lib/profiles";
import { getParentLock, type ParentLock } from "@/lib/parent-lock";
import { learnerOverviews, type LearnerOverview } from "@/lib/parent-overview";
import { challengesEnabled } from "@/lib/social/flags";
import SignOutButton from "@/components/sign-out-button";
import { ParentPinSetup, ParentUnlock, ParentUnlocked } from "@/components/parent-lock";
import { AddProfileForm, ProfilePicker } from "./profile-forms";
import ConsentForm from "./consent-form";
import DeleteAccount from "./delete-account";

export const dynamic = "force-dynamic";
export const metadata = { title: "Who’s studying? — Edify" };

const TIME = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Lagos" });

// The parent PIN panel: a prompt to set one, the unlock form, or "unlocked until" with Lock now.
function ParentControls({ lock }: { lock: ParentLock }) {
  if (!lock.available) return null;
  if (!lock.hasPin) return <ParentPinSetup />;
  if (!lock.canManage) return <ParentUnlock intro="Enter your parent PIN to add, edit or remove learners, change their PINs or delete the account. Children can still pick their name below and study." recentSignIn={lock.recentSignIn} failed={lock.failed} />;
  return <ParentUnlocked untilLabel={lock.unlockedUntil ? TIME.format(lock.unlockedUntil) : ""} recentSignIn={lock.recentSignIn} />;
}

function LockedDeleteNote() {
  return (
    <section className="account-card danger-zone" aria-labelledby="delete-account-title">
      <h2 id="delete-account-title">Delete your account</h2>
      <p>Unlock parent controls with your parent PIN to delete your account.</p>
    </section>
  );
}

export default async function ProfilesPage() {
  const parent = await requireParent();
  let profiles: LearnerProfile[] = [];
  let loadFailed = false;
  let agreed = false;
  try {
    agreed = await hasAcceptedLegal(parent.id);
    if (agreed) profiles = await listProfiles(parent.id);
  } catch { loadFailed = true; }
  const [lock, overviews] = await Promise.all([
    getParentLock(parent.id, parent.signedInAt),
    // Progress is a nice-to-have on this page: if it fails, the cards simply show none.
    learnerOverviews(profiles.map((profile) => profile.id)).catch((): Record<string, LearnerOverview> => ({})),
  ]);
  const manage = lock.canManage;
  const onboarding = !profiles.length && !loadFailed;

  // New sign-ups agree on /signup. This screen catches accounts made before the policies existed and any
  // account whose agreement was not saved, and again whenever the policies change.
  if (!agreed && !loadFailed) {
    return (
      <div className="profiles-page">
        <div className="profiles-head">
          <div>
            <span className="kicker">BEFORE YOU CONTINUE</span>
            <h1>Please agree to our <span className="hl">policies.</span></h1>
            <p>Edify looks after your children’s study data for you, so a parent or guardian needs to agree to our privacy policy and terms of use before adding learners, studying or paying. Read them first if you like.</p>
          </div>
          <SignOutButton />
        </div>
        <section className="account-card" aria-labelledby="agree-title">
          <h2 id="agree-title">Your agreement</h2>
          <ConsentForm />
        </section>
        {manage ? <DeleteAccount /> : <><ParentControls lock={lock} /><LockedDeleteNote /></>}
      </div>
    );
  }

  return (
    <div className="profiles-page">
      <div className="profiles-head">
        <div>
          <span className="kicker">{onboarding ? "STEP 3 OF 3" : `SIGNED IN AS ${parent.name.toUpperCase()}`}</span>
          <h1>{onboarding ? <>Add your first <span className="hl">learner.</span></> : <>Who’s studying <span className="hl">today?</span></>}</h1>
          <p>{onboarding ? "Tell us their class and school, then choose a 4-digit PIN they’ll use to open their own progress and notes. You can add brothers and sisters next." : "Pick your name and enter your 4-digit PIN to open your study space."}</p>
        </div>
        <SignOutButton />
      </div>
      {loadFailed && <p role="alert" className="form-error">Your learners could not be loaded. Refresh the page to try again.</p>}
      {profiles.length > 0 && <><p className="profiles-links"><Link href="/billing" className="pill-outline small">Plans and payments</Link></p><ProfilePicker profiles={profiles} manage={manage} overviews={overviews} classmates={challengesEnabled()} /></>}
      {/* During first-time onboarding the PIN prompt waits until there is a learner to protect. */}
      {!loadFailed && (!onboarding || lock.hasPin) && <ParentControls lock={lock} />}
      {profiles.length < MAX_PROFILES && !loadFailed && manage && (
        <section className="account-card add-card" aria-labelledby="add-learner">
          <h2 id="add-learner">{profiles.length ? "Add another learner" : "Learner details"}</h2>
          <AddProfileForm />
        </section>
      )}
      {!loadFailed && (manage ? <DeleteAccount /> : <LockedDeleteNote />)}
    </div>
  );
}
