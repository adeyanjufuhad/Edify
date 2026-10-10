import Link from "next/link";
import { PLANS, naira } from "@/data/plans";
import { MAX_PROFILES } from "@/lib/profiles";
import LegalDoc, { ContactEmail, OperatorAddress, OperatorName, Todo, type LegalSection } from "../legal-doc";

export const metadata = {
  title: "Terms of use — Edify",
  description: "The rules for using Edify: who can use it, plans and payments, refunds, sponsored access, acceptable use and more.",
};

const SECTIONS: LegalSection[] = [
  {
    id: "short",
    title: "The short version",
    body: <ul className="legal-points">
      <li>A parent or guardian opens the account and is responsible for it. Learners study under that account.</li>
      <li>Each learner has their own plan. One payment gives that learner 105 days of access and does not renew by itself.</li>
      <li>Payments go through Paystack. Your card details never reach Edify.</li>
      <li>Edify is a study aid. We can’t promise exam results.</li>
      <li>You can delete your account at any time. <a href="#refunds">The refunds section</a> explains what happens to money already paid.</li>
    </ul>,
  },
  {
    id: "who",
    title: "Who can use Edify",
    body: <>
      <p>Edify is run by <OperatorName />, <OperatorAddress /> (“Edify”, “we”, “us”). By creating an account you agree to these terms and to our <Link href="/privacy" className="text-link">Privacy policy</Link>.</p>
      <ul>
        <li><b>Only a parent or guardian can create an account.</b> You must be at least 18 and the parent or legal guardian of every learner you add. <Todo>lawyer to confirm the minimum age and how to treat a guardian, a teacher or a school acting for a family</Todo></li>
        <li>You add each child as a learner. An account can hold up to {MAX_PROFILES} learners. Learners open their own space with a 4-digit PIN that you help them choose.</li>
        <li>You are responsible for everything that happens under your account, for keeping your password and your children’s PINs private, and for supervising how your children use Edify.</li>
        <li>Give us correct details (your name and email address, and each learner’s class and school) and tell us if they change.</li>
      </ul>
    </>,
  },
  {
    id: "service",
    title: "What Edify is",
    body: <>
      <p>Edify gives secondary school students (JSS1 to SS3) in Nigeria study notes, exam-style practice questions and computer-based (CBT) practice tests.</p>
      <ul>
        <li><b>Content is added over time.</b> Not every class and subject has lessons yet. The billing page says what is available now. Check it before you pay, and only buy a plan if the available content suits your learner.</li>
        <li><b>It is a study aid.</b> We work hard to keep lessons and answers correct, but we can’t promise that a learner will pass or improve in any exam. Edify is independent of exam bodies such as WAEC and NECO, and of schools. Practice questions are exam-style; they are not real past papers unless a page says so.</li>
        <li>Features described as coming later (for example, “AI study help, when it arrives”) are not part of a plan until they are released.</li>
      </ul>
    </>,
  },
  {
    id: "plans",
    title: "Plans and access",
    body: <>
      <p>Each learner needs their own plan to study. Prices are in naira, per learner:</p>
      <div className="legal-data">
        <dl>{PLANS.map((plan) => <div key={plan.id}><dt>{plan.name}: {naira(plan.price)}</dt><dd>{plan.features.join(", ")}.</dd></div>)}</dl>
      </div>
      <ul>
        <li><b>105 days.</b> One payment gives the learner access to that plan for 105 days (3½ months), counted from the time Paystack confirms the payment.</li>
        <li><b>No automatic renewal.</b> We never charge you again by ourselves. When the 105 days end, the learner’s access ends, and you can pay again from the billing page if you want to continue. Nothing needs to be cancelled.</li>
        <li><b>Upgrading.</b> You can move a learner to a higher plan. This starts a new 105-day period at the full price of the new plan, and unused days on the old plan are not credited. You can’t buy a plan the learner already has, or a lower one, while their current plan is active.</li>
        <li><b>Access belongs to the learner.</b> It can’t be moved to another learner or another account, including when a learner is removed or the account is deleted.</li>
        <li><b>Price changes.</b> We may change prices or plan features for future payments. We will not change what you have already paid for during its 105 days.</li>
      </ul>
      <p><Todo>owner and lawyer to confirm the plan and price wording, and whether prices include VAT or any other tax</Todo></p>
    </>,
  },
  {
    id: "payments",
    title: "Payments",
    body: <>
      <ul>
        <li>Payments are taken by <b>Paystack</b>. You complete the payment on Paystack’s own page, using a method Paystack offers. Paystack’s terms and privacy notice apply to its service. Card, bank and mobile-money details are entered with Paystack and never reach Edify.</li>
        <li>We give access only after Paystack confirms the payment to us. This normally takes moments but can take longer.</li>
        <li>If you were charged but the learner’s plan has not appeared, don’t pay again. Open <b>Recent payments</b> on the billing page and check the payment status, then contact us at <ContactEmail /> with the date and amount.</li>
        <li>We keep a record of each payment, as explained in the <Link href="/privacy#payments" className="text-link">Privacy policy</Link>.</li>
      </ul>
    </>,
  },
  {
    id: "refunds",
    title: "Refunds and cancellation",
    body: <>
      <p><b>Cancelling.</b> Plans don’t renew, so there is no subscription to cancel. Access simply ends after 105 days. You can stop using Edify or delete your account whenever you like. Deleting an account does not refund unused days.</p>
      <p><b>Refunds.</b> Study access starts as soon as your payment is confirmed. This is our draft policy:</p>
      <ul>
        <li><b>Charged but no access.</b> If you paid and the learner didn’t get the plan, or you were charged twice for the same order, we will give the access or refund the payment in full.</li>
        <li><b>Problem on our side.</b> If a fault in Edify stops a learner from using what they paid for and we can’t fix it within a reasonable time, we will refund the part of the payment for the time they could not use it.</li>
        <li><b>Change of mind.</b> You can ask for a refund within <Todo>number of days, for example 7</Todo> of payment, as long as <Todo>condition, for example: the learner has not finished more than a few lessons or taken a CBT test</Todo>.</li>
        <li><b>How to ask.</b> Email <ContactEmail /> from the address on your account with the payment reference or the date and amount. We will answer within <Todo>number of working days</Todo>.</li>
        <li><b>How you are paid back.</b> Approved refunds go back to the payment method you used, through Paystack, within <Todo>number of days, as Paystack and your bank allow</Todo> of our approval. When a refund is paid, the learner’s access for that payment ends.</li>
        <li>Please contact us before asking your bank to reverse a payment, so we can sort it out quickly.</li>
      </ul>
      <p><Todo>owner to decide the refund policy above (the window, the conditions, and who approves refunds) and lawyer to check it against the Federal Competition and Consumer Protection Act 2018 and any other consumer rights that can’t be limited. Paystack asks for a refund and cancellation policy when a business goes live, so this section must be settled first.</Todo></p>
    </>,
  },
  {
    id: "sponsored",
    title: "Sponsored access and referral codes",
    body: <>
      <ul>
        <li>Some schools that partner with Edify give families a referral code. A valid code entered for a learner at that school gives the learner <b>Gold</b> access, shown as “Gold · sponsored”, without a payment.</li>
        <li>A code works only for learners at the school it was given for. Don’t share it with people outside that school or sell it. We may refuse or withdraw access gained with a code that was misused.</li>
        <li>Sponsored access has no cash value, can’t be exchanged for money, and can’t be refunded. It follows the learner, not the family: it ends if the learner is removed.</li>
        <li>We don’t give schools learners’ names, progress, notes or results.</li>
      </ul>
      <p><Todo>owner to decide how long sponsored access lasts (today it has no end date), whether Edify can end a school’s sponsorship with notice, and what happens to learners already studying when it ends</Todo></p>
    </>,
  },
  {
    id: "use",
    title: "Acceptable use",
    body: <>
      <p>Please use Edify only for studying. You and your learners must not:</p>
      <ul>
        <li>share a parent login with people outside your family, or let someone else use a paid learner’s space;</li>
        <li>copy, scrape, record or share Edify’s lessons, questions or answers, or sell or republish them;</li>
        <li>try to get around payment or access checks, read another family’s data, or interfere with the site or its security;</li>
        <li>type unlawful, abusive or private content into notes, or put personal details such as phone numbers or home addresses in them;</li>
        <li>use Edify to cheat in a real examination.</li>
      </ul>
      <p>If these rules are broken we may warn you, suspend or close the account, and refuse future access. Where we close an account for a reason that isn’t your fault, we will refund the unused part of any payment. <Todo>lawyer to confirm the suspension and closing wording</Todo></p>
    </>,
  },
  {
    id: "content",
    title: "Content and ownership",
    body: <>
      <ul>
        <li><b>Edify’s content.</b> The lessons, questions, answers, diagrams, design, logo and the Edi mascot belong to Edify or are used with permission. You get a personal, non-transferable licence to use them to study while you have access. You don’t get ownership of them.</li>
        <li><b>Learners’ notes.</b> What a learner types in their notes belongs to them. You give us permission to store it and show it back to that learner, which is all Edify needs it for.</li>
        <li>If you think something on Edify is wrong, or infringes someone’s rights, tell us at <ContactEmail />.</li>
      </ul>
      <p><Todo>owner and lawyer to confirm that Edify has the right to publish every lesson, diagram and question on the site and to charge for them (some material is based on other sources), and then finalise the ownership and licence wording</Todo></p>
    </>,
  },
  {
    id: "availability",
    title: "Availability and changes",
    body: <>
      <ul>
        <li>We aim to keep Edify available, but we can’t promise it will always work without interruption. It depends on services we don’t control, including our hosting, database and sign-in providers, Paystack, and your own internet connection.</li>
        <li>We may fix, change, add or remove lessons and features. If we remove something that a paid plan clearly included, we will tell you and put things right. <Todo>owner and lawyer to decide the remedy, for example extending access or a partial refund</Todo></li>
        <li>We may stop running Edify. If we do, we will give notice and refund the unused part of paid plans. <Todo>owner and lawyer to confirm</Todo></li>
      </ul>
    </>,
  },
  {
    id: "liability",
    title: "Our responsibility",
    body: <>
      <p>Nothing in these terms limits any right you have by law that can’t be limited, including consumer rights.</p>
      <p>Subject to that, Edify is provided “as is”. We are not responsible for exam results, for losses we could not reasonably have foreseen, or for problems caused by things outside our control. Our total responsibility to you for any one problem is limited to the amount you paid us in the 12 months before it happened.</p>
      <p><Todo>lawyer to review and rewrite this section, including the limit on responsibility and what Nigerian law does not allow us to limit</Todo></p>
    </>,
  },
  {
    id: "law",
    title: "Governing law and disputes",
    body: <>
      <p>If something goes wrong, please contact us first at <ContactEmail />, and we will try to sort it out.</p>
      <p><Todo>lawyer to set the governing law (the laws of the Federal Republic of Nigeria), which courts or dispute process applies, and how consumer complaints are handled</Todo></p>
    </>,
  },
  {
    id: "changes",
    title: "Changes and contact",
    body: <>
      <p>We may update these terms. If a change affects you, we will tell you on the site or by email before it starts, and when the law or the change requires it we will ask you to agree again before you carry on. The version and date at the top of this page change each time. Using Edify after a change that doesn’t need your agreement means you accept it.</p>
      <p>Questions about these terms: <ContactEmail />.</p>
    </>,
  },
];

export default function TermsPage() {
  return <LegalDoc
    kicker="Terms of use"
    title={<>The rules for using Edify, in <span className="hl">plain words.</span></>}
    intro="Who can use Edify, how plans and payments work, what happens if you want your money back, and what we both agree to. Please read this page along with the privacy policy."
    sections={SECTIONS}
    other={{ href: "/privacy", label: "Read the privacy policy" }}
  />;
}
