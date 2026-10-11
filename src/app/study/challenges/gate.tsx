import Link from "next/link";
import Mascot from "@/components/mascot";
import type { Blocked } from "@/lib/social/guard";

// Shown instead of the page when the learner can't use challenges yet: their plan, or their parent's switch.
export default function Gate({ blocked, learnerId }: { blocked: Blocked; learnerId: string }) {
  return (
    <div className="page">
      <section className="panel challenge-gate">
        <Mascot pose="think" className="empty-mascot" />
        {blocked === "plan" ? <>
          <h1>Classmate challenges are included in Gold.</h1>
          <p>Ask your parent to choose Gold for CBT tests and challenges against your classmates.</p>
          <Link href={`/billing?learner=${learnerId}`} className="pill-button">View plans</Link>
        </> : <>
          <h1>A parent needs to switch challenges on.</h1>
          <p>Challenges let you answer the same questions as your classmates and see who scores more. To keep you safe, your parent chooses who you are linked with and decides whether you can use challenges, chat and voice notes.</p>
          <Link href={`/study/classmates?learner=${learnerId}`} className="pill-button">Open classmate settings (for parents)</Link>
        </>}
      </section>
    </div>
  );
}
