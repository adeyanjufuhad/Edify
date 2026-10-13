import Link from "next/link";
import { PLAN_NAMES, naira, plansForDisplay } from "@/data/plans";
import { CHALLENGE_MIN_PLAN } from "@/data/challenges";
import { challengesEnabled } from "@/lib/social/flags";
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
      <li>Classmate challenges, chat and voice notes are off until you switch them on for each child. <a href="#classmates">The classmates section</a> explains the rules and your part in supervising.</li>
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
        <li><b>Only a parent or guardian can create an account.</b> You must be at least 18 and the parent or legal guardian of every learner you add. A teacher or school must not create an account on a family’s behalf without the parent’s or legal guardian’s authorisation. Contact us before arranging school-managed access.</li>
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
      <p>Edify gives senior secondary school students (SS1 to SS3) in Nigeria study notes, exam-style practice questions and computer-based (CBT) practice tests.</p>
      <ul>
        <li><b>Content is added over time.</b> Not every class and subject has lessons yet. The billing page says what is available now. Check it before you pay, and only buy a plan if the available content suits your learner.</li>
        <li><b>It is a study aid.</b> We work hard to keep lessons and answers correct, but we can’t promise that a learner will pass or improve in any exam. Edify is independent of exam bodies such as WAEC and NECO, and of schools. Practice questions are exam-style; they are not real past papers unless a page says so.</li>
        <li>Features described as coming later (for example, “AI study help, when it arrives”) are not part of a plan until they are released. Classmate challenges, chat and voice notes are part of the {PLAN_NAMES[CHALLENGE_MIN_PLAN]} plan, and are only available once we switch them on and you switch them on for your child.</li>
      </ul>
    </>,
  },
  {
    id: "plans",
    title: "Plans and access",
    body: <>
      <p>Each learner needs their own plan to study. Prices are in naira, per learner:</p>
      <div className="legal-data">
        <dl>{plansForDisplay(challengesEnabled()).map((plan) => <div key={plan.id}><dt>{plan.name}: {naira(plan.price)}</dt><dd>{plan.features.join(", ")}.</dd></div>)}</dl>
      </div>
      <ul>
        <li><b>105 days.</b> One payment gives the learner access to that plan for 105 days (3½ months), counted from the time Paystack confirms the payment.</li>
        <li><b>No automatic renewal.</b> We never charge you again by ourselves. When the 105 days end, the learner’s access ends, and you can pay again from the billing page if you want to continue. Nothing needs to be cancelled.</li>
        <li><b>Upgrading.</b> You can move a learner to a higher plan. This starts a new 105-day period at the full price of the new plan, and unused days on the old plan are not credited. You can’t buy a plan the learner already has, or a lower one, while their current plan is active.</li>
        <li><b>Access belongs to the learner.</b> It can’t be moved to another learner or another account, including when a learner is removed or the account is deleted.</li>
        <li><b>Price changes.</b> We may change prices or plan features for future payments. We will not change what you have already paid for during its 105 days.</li>
      </ul>
      <p>The displayed price is the total Edify charges, including any applicable taxes. Your bank or payment provider may charge a separate fee, which it should disclose. Tax treatment remains subject to professional accounting review.</p>
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
      <p><b>Refunds.</b> Study access starts as soon as your payment is confirmed. The following refund policy applies:</p>
      <ul>
        <li><b>Charged but no access.</b> If you paid and the learner didn’t get the plan, or you were charged twice for the same order, we will give the access or refund the payment in full.</li>
        <li><b>Problem on our side.</b> If a fault in Edify stops a learner from using what they paid for and we can’t fix it within a reasonable time, we will refund the part of the payment for the time they could not use it.</li>
        <li><b>Change of mind.</b> You can ask for a refund within <b>3 calendar days (72 hours)</b> of payment, as long as you provide the payment receipt and the receipt includes the payment session ID.</li>
        <li><b>How to ask.</b> Email <ContactEmail /> from the address on your account with the receipt showing the payment session ID, the payment date and amount, and the reason for your request. A clear screenshot or PDF is acceptable. Do not send passwords, PINs or full card details. We will acknowledge your request within <b>2 working days</b> (Monday to Friday, excluding Nigerian public holidays). <b>Adeyanju Fuhad</b> reviews and approves refunds. If we need more information, we will explain what is missing; your original request date counts towards the 3-day window.</li>
        <li><b>How you are paid back.</b> We submit approved refunds to Paystack within <b>24 hours of approval</b>, normally back to the original payment method. This is our processing time, not a guarantee of when your bank credits you. Paystack currently advises <b>3 to 10 working days</b> for receipt. We will provide the refund reference when available. Access covered by a full refund ends; for a partial refund we will explain any access adjustment.</li>
        <li>Please contact us before asking your bank to reverse a payment, so we can sort it out quickly.</li>
      </ul>
      <p>The 3-day window and receipt requirement apply to change-of-mind requests. They do not remove rights you have by law, or prevent us investigating duplicate charges, payments without access or service faults. If your payment method did not issue a session ID, contact us with the receipt and transaction reference so we can help identify the payment. <a href="https://support.paystack.com/en/articles/2127106" className="text-link">Paystack’s refund guidance</a>. <Todo>lawyer to review this policy against applicable Nigerian consumer rights</Todo></p>
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
      <p>Sponsored access currently has no fixed end date. If we end a school’s sponsorship, we will normally give affected parents at least 30 calendar days’ notice. Existing access continues during that notice period. Afterwards, families may choose a paid plan; we will not charge them automatically. Immediate suspension remains possible for fraud or a serious safety issue.</p>
    </>,
  },
  {
    id: "classmates",
    title: "Classmate challenges, chat and voice notes",
    body: <>
      <p>Edify can let learners challenge a classmate, see which linked classmates are online, send text messages and send short voice notes. These features connect children, so these rules apply to you as the parent or guardian, and to your children, as well as the rest of these terms.</p>
      <ul>
        <li><b>You decide.</b> Every feature is off for each learner until you switch it on. You can change or switch off anything at any time on your family page. By switching a feature on you agree that your child may use it under these rules, and that the other child’s parent and you can both read and delete their conversation.</li>
        <li><b>Who can meet whom.</b> A learner can only be linked with a child in the same school and class: through a one-time code between two parents (share a code only with a parent you know), by you linking your own two children, or, if you switch on “Visible to my class”, by a classmate request from the class list that your child accepts. School names are typed in by parents and Edify cannot check them, so talk to your child about who they accept. We may cancel links we think were made wrongly.</li>
        <li><b>You supervise.</b> Edify does not read every message and is not a substitute for you watching what your child does online. Read your child’s conversations from time to time, and talk to your child about being kind and safe. Set a parent PIN to protect account management and classmate settings. Opening a learner’s space locks parent controls when a parent PIN is set. Keep your password and parent PIN private.</li>
        <li><b>Rules for everyone.</b> Be kind. No bullying, threats, insults, or sharing private information about anyone. Don’t share phone numbers, addresses, emails, links or social media names, and don’t ask others for them. Don’t record, copy or share someone else’s messages or voice notes outside Edify. Don’t help one classmate cheat in a challenge, and don’t use another person’s learner space.</li>
        <li><b>Reports and action.</b> Children can block and report a classmate or a message. We may read reports and the content they refer to, and we may warn a learner, remove a link, switch classmate features off for a learner or close an account. Adeyanju Fuhad is the initial contact for reports. We aim to review ordinary reports within 2 working days and prioritise reports indicating a child may be at risk. This is not a 24-hour emergency service. Email the contact address below for urgent concerns, and contact emergency services if someone faces immediate danger. Depending on the facts, we may warn the users, restrict features, remove a link or suspend an account. We will explain our decision to the parent where it is safe and lawful to do so; parents may ask us to reconsider by email.</li>
        <li><b>Messages are kept briefly.</b> Text messages, voice notes and challenge results are deleted after the periods in the <Link href="/privacy#classmates" className="text-link">Privacy policy</Link>. We can’t guarantee that a message you want to keep will still be there.</li>
        <li><b>Availability.</b> Online status, chat and voice notes can be slow, delayed or unavailable, and we can change or stop them. A classmate who deletes their account or learner takes their conversations and challenge results with them.</li>
      </ul>
      <p>Classmate challenges, chat and voice notes remain part of Gold, including sponsored Gold. Parent permissions still apply. These rules do not exclude any safeguarding or other responsibility Edify has under applicable law.</p>
    </>,
  },
  {
    id: "use",
    title: "Acceptable use",
    body: <>
      <p>Please use Edify only for studying. You and your learners must not:</p>
      <ul>
        <li>use chat, voice notes or challenges to bully, threaten, harass or deceive anyone, or to share contact details or private information (see the classmates section above);</li>
        <li>share a parent login with people outside your family, or let someone else use a paid learner’s space;</li>
        <li>copy, scrape, record or share Edify’s lessons, questions or answers, or sell or republish them;</li>
        <li>try to get around payment or access checks, read another family’s data, or interfere with the site or its security;</li>
        <li>type unlawful, abusive or private content into notes, or put personal details such as phone numbers or home addresses in them;</li>
        <li>use Edify to cheat in a real examination.</li>
      </ul>
      <p>If these rules are broken we may warn you, suspend or close the account, and refuse future access. Where we close an account for a reason that isn’t your fault, we will refund the unused part of any payment. We will normally explain a restriction and give the parent a chance to respond. We may act immediately to protect a child, prevent fraud or comply with the law. Contact us by email to challenge a decision. Rights that cannot lawfully be excluded remain unaffected.</p>
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
        <li>We may fix, change, add or remove lessons and features. If we remove something that a paid plan clearly included, we will tell you and put things right. For a substantial loss of a paid feature, we will offer a suitable extension of access or a proportionate refund for the affected period. If an extension is not suitable, you may request the proportionate refund.</li>
        <li>We may stop running Edify. If we do, we will give notice and refund the unused part of paid plans. We will normally give at least 30 calendar days’ notice before a planned closure. If an urgent legal or security issue prevents this, we will give as much notice as we reasonably can. Unused paid access will be refunded proportionately.</li>
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
      <p>These terms are governed by the laws of the Federal Republic of Nigeria. Please first send complaints to our contact email; we aim to acknowledge them within 2 working days and provide an outcome or progress update within 14 calendar days. You may also approach a competent Nigerian regulator or court. Informal resolution is encouraged, but it is not a condition for exercising your legal rights. Any mediation must be agreed by both sides.</p>
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
