import { requireParent } from "@/lib/account";
import { MAX_PROFILES, listProfiles, type LearnerProfile } from "@/lib/profiles";
import { AddProfileForm, ProfilePicker, SignOutButton } from "./profile-forms";

export const dynamic = "force-dynamic";
export const metadata = { title: "Who’s studying? — Edify" };

export default async function ProfilesPage() {
  const parent = await requireParent();
  let profiles: LearnerProfile[] = [];
  let loadFailed = false;
  try { profiles = await listProfiles(parent.id); } catch { loadFailed = true; }
  const onboarding = !profiles.length && !loadFailed;

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
      {profiles.length > 0 && <ProfilePicker profiles={profiles} />}
      {profiles.length < MAX_PROFILES && !loadFailed && (
        <section className="account-card add-card" aria-labelledby="add-learner">
          <h2 id="add-learner">{profiles.length ? "Add another learner" : "Learner details"}</h2>
          <AddProfileForm />
        </section>
      )}
    </div>
  );
}
