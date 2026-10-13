import Link from "next/link";
import LegalDoc, { ContactEmail, OperatorAddress, OperatorName, Todo, type LegalSection } from "../legal-doc";

export const metadata = {
  title: "Privacy policy — Edify",
  description: "What Edify stores about parents and learners, why, where it is kept, for how long, and how to delete it.",
};

const COLLECTED: { group: string; rows: { what: string; detail: React.ReactNode }[] }[] = [
  {
    group: "About you, the parent or guardian",
    rows: [
      { what: "Your name and email address", detail: "To create your account, sign you in and send account emails such as confirmation codes and password resets." },
      { what: "Your password", detail: "Stored scrambled (hashed) by our sign-in service. We never see it and can’t read it back." },
      { what: "Optional parent PIN", detail: "If you set a parent PIN, we store its hash and the records needed to lock and unlock parent controls." },
      { what: "Sign-in sessions", detail: "When you sign in, our sign-in service records the session, the IP address it came from and the type of browser or device, so it can keep you signed in and spot misuse." },
      { what: "Your agreement to these pages", detail: "The date and time you ticked the box saying you are the parent or guardian and agree to this policy and our terms, and which version of them you agreed to. Accounts made before these pages existed are asked to agree the next time they open their family page, and everyone is asked again if the pages change in a way that needs it." },
    ],
  },
  {
    group: "About each learner you add",
    rows: [
      { what: "First name, class, school and study stream", detail: "To show the right lessons for their class (SS1 to SS3) and to tell brothers and sisters apart. We don’t ask for surnames or dates of birth." },
      { what: "4-digit PIN", detail: "Stored scrambled (hashed), never as the 4 digits themselves. It keeps each child’s progress and notes separate." },
      { what: "Plan and referral code", detail: "Which plan the learner is on and, if their school gave you a referral code, that code." },
      { what: "Lesson progress and notes", detail: "Which lessons they’ve ticked off, when, and anything they type in the “My notes” box at the end of a lesson." },
      { what: "CBT test attempts", detail: "For each practice test: the lessons it covered, the answer picked for each question, questions flagged, the score and the time taken." },
    ],
  },
  {
    group: "Classmate challenges, chat and voice notes (only when a parent switches them on)",
    rows: [
      { what: "Classmate codes and links", detail: <>A one-time code a parent makes to link their child with a classmate. The code is stored scrambled (hashed), works once and expires after 7 days. When two parents use a code, we save a link between the two learners. A link only works for two learners in the same class and school. <a href="#classmates">The classmates section</a> says who sees what.</> },
      { what: "Your choices for each learner", detail: "Which things you switched on for that learner: challenges, being visible to their class, showing when they are online, text chat, and voice notes. All start off." },
      { what: "Classmate requests", detail: "When a child asks a classmate from the class list to be classmates: who asked whom, when, and whether it was accepted or declined." },
      { what: "Challenges", detail: "For each challenge: the two learners, the subject and term, a copy of the questions and answers, each learner’s picks, score and time taken, and when it started and finished." },
      { what: "Online status", detail: "The last time the learner’s Edify page was open, as one time that is overwritten. It is used to show linked classmates a mark that says “Online” or not. It is deleted when you switch online status off or delete the learner." },
      { what: "Text messages", detail: "The text, the time and which of the two learners sent it. Messages containing phone numbers, emails or links are refused, so we never save them." },
      { what: "Voice notes", detail: "The recording (up to 30 seconds), its length and time, and which learner sent it. The recording is saved in our Neon database and handled by our website hosting provider. We do not use a separate voice-recording provider." },
      { what: "Reports and blocks", detail: "If a learner reports or blocks a classmate we save who reported whom, the reason they chose, any note they wrote and, if it was about a message, a copy of that message." },
      { what: "Safety counters", detail: "A note of each action (for example, “sent a message”) with the time, so we can slow down anyone sending too much. They are deleted after 2 days." },
    ],
  },
  {
    group: "About payments",
    rows: [
      { what: "Payment records", detail: <>When you choose a plan for a learner we save an order: its reference, which learner and plan it was for, the amount in naira, the email address used at checkout (your parent email), whether it was paid, and when it was created and paid. A payment gives that learner 105 days of access. These records are treated differently when you delete your account: see <a href="#payments">Payments and payment records</a>.</> },
      { what: "Refund and support correspondence", detail: "If you contact us, we receive your email and the information you provide, including payment receipts, session IDs or transaction references for refunds. Do not send passwords, PINs or full card details. Correspondence may remain in our support email account after you delete your Edify account." },
      { what: "What never reaches us", detail: "Card numbers, bank details and mobile-money details are entered on Paystack’s own page and never reach Edify. Paystack tells us whether a payment succeeded." },
    ],
  },
  {
    group: "Kept in your browser",
    rows: [
      { what: "Cookies", detail: "Sign-in cookies from our sign-in service, and Edify cookies that remember which learner is studying for up to 30 days and whether parent controls are unlocked. They are needed for the site to work; we don’t use advertising or tracking cookies. When you go to Paystack to pay, Paystack’s page sets its own cookies under its own policy." },
      { what: "An unfinished CBT test or challenge", detail: "Saved in the browser while a test or challenge is running, so a dropped connection doesn’t lose answers. It is removed when the test is submitted or quit. If a learner walks away from a test, it stays on that device until they finish or quit it." },
      { what: "While you sign up", detail: "The email address you are confirming, and a note that you ticked the agreement box, are held in the browser tab until you enter the 6-digit code." },
    ],
  },
];

const SECTIONS: LegalSection[] = [
  {
    id: "who",
    title: "Who we are",
    body: <>
      <p>Edify is a study website for senior secondary school students in Nigeria. It is run by <OperatorName />, <OperatorAddress /> (“Edify”, “we”, “us”).</p>
      <p>For the personal data described here, Edify is the <b>data controller</b> under the <b>Nigeria Data Protection Act 2023</b> (NDPA). That means we decide what is collected and why, and we are responsible for looking after it. You can reach us about anything on this page at <ContactEmail />.</p>
      <p><Todo>lawyer to confirm whether Edify must register with the Nigeria Data Protection Commission (for example as a data controller of major importance, given that it handles children’s data) and what annual filings follow</Todo></p>
    </>,
  },
  {
    id: "short",
    title: "The short version",
    body: <ul className="legal-points">
      <li>Only a parent or guardian can create an account. Children never give us an email address.</li>
      <li>We store the least we need: your name and email, and each child’s first name, class, school and study progress.</li>
      <li>We don’t sell data, show adverts, or use tracking or analytics tools.</li>
      <li>Classmate challenges, online status, chat and voice notes are off for every child until a parent switches them on. Nobody can search for a child: children only see others in their own school and class, either through a code two parents exchange or, if both parents allow it, a class list. Other families only ever see a child’s first name and class. <a href="#classmates">Read the classmates section.</a></li>
      <li>Our website service providers include Neon (database and sign-in) and Vercel (website hosting), both in London, UK, and Paystack (card and bank payments).</li>
      <li>You can delete your account and every learner’s data yourself, at any time. Payment records and necessary support correspondence may remain, and <a href="#payments">the payments section</a> explains why.</li>
    </ul>,
  },
  {
    id: "collect",
    title: "What we collect",
    body: <>
      <p>The categories below describe the information used to run Edify. We do not ask for photos, device location or address-book contacts. Information you choose to include in notes, messages or support emails may contain additional personal details.</p>
      {COLLECTED.map((block) => (
        <div key={block.group} className="legal-data">
          <h3>{block.group}</h3>
          <dl>{block.rows.map((row) => <div key={row.what}><dt>{row.what}</dt><dd>{row.detail}</dd></div>)}</dl>
        </div>
      ))}
      <p>Please ask learners not to type personal details, such as phone numbers or home addresses, into their notes. Notes are for study.</p>
    </>,
  },
  {
    id: "why",
    title: "Why we use it",
    body: <>
      <p>We use this data only to run Edify for your family:</p>
      <ul>
        <li>to create and secure your account and sign you in;</li>
        <li>to show each learner the lessons and tests for their class, and keep their progress, notes and test results separate from their brothers’ and sisters’;</li>
        <li>to send emails about your account (confirmation codes and password resets). We won’t send marketing emails unless you ask for them;</li>
        <li>to keep the service safe, for example by spotting repeated failed sign-ins;</li>
        <li>to apply a school’s referral code;</li>
        <li>to take payment for a learner’s plan through Paystack, give the learner the access that was paid for, and keep the financial records we need for accounting, refunds and disputes.</li>
      </ul>
      <p>Our legal basis is your <b>consent</b>, given as the parent or guardian when you sign up (the NDPA requires a parent’s or guardian’s consent before we handle a child’s data), and the need to provide the service you asked for. You can withdraw consent at any time by deleting your account. <Todo>lawyer to confirm the lawful bases under NDPA section 25 and the child-consent rules in section 31, and the basis for keeping payment records after deletion</Todo></p>
    </>,
  },
  {
    id: "children",
    title: "Children’s data",
    body: <>
      <p>Most Edify learners are under 18, so we treat their data with extra care:</p>
      <ul>
        <li>A parent or guardian creates every learner and confirms, by ticking the agreement box, that they are the parent or guardian.</li>
        <li>Learners don’t have their own sign-in. They open their space from the parent’s account with a PIN.</li>
        <li>We only ask for a first name, class and school, never a surname, birthday or photo.</li>
        <li>You can see every learner on the “Who’s studying?” page and remove any of them at any time. Use Edit on the learner’s card to correct their details. For help, email <ContactEmail />.</li>
        <li>We don’t share learners’ data with schools, including schools that gave you a referral code.</li>
        <li>Learners can only meet classmates through a link that both parents agreed to. <a href="#classmates">The classmates section</a> explains the extra protections.</li>
      </ul>
      <p>If you think a child has been added without a parent’s or guardian’s permission, contact us at <ContactEmail /> and we will delete it.</p>
    </>,
  },
  {
    id: "classmates",
    title: "Classmate challenges, chat and voice notes",
    body: <>
      <p>Edify can let learners challenge a classmate on a subject, see which linked classmates are online, send text messages and send short voice notes. This connects children, so it is built to be off until a parent says yes, and to limit contact to parent-approved links and class visibility settings.</p>
      <h3>Who can use it, and who can see a child</h3>
      <ul>
        <li><b>Off by default.</b> For each learner, a parent separately switches on: challenges and classmates, being visible to their class, showing when they are online, text chat, and voice notes. A feature only works between two children if <b>both</b> parents have switched it on.</li>
        <li><b>Restricted discovery.</b> There is no search and no list of all learners. A child only ever sees children in their <b>own school and class</b>, and only in one of two ways: (1) two parents link them with a one-time code (or link their own two children); or (2) both parents switch on <b>“Visible to my class”</b>, which shows the child in a class list to the other children in that class whose parents made the same choice. From the class list a child can send a classmate request with a challenge; they can only chat once the other child accepts. Saying no blocks the request for good, and either parent can remove any link at any time.</li>
        <li><b>First name and class only.</b> A linked classmate (and their parents) sees a child’s first name, class, challenge results and, if both parents allow it, an “Online” mark. They never see the school, surname, plan, progress, notes or anything else.</li>
        <li><b>The class list</b> shows first name, class and (if both share it) “Online now”, nothing else. School names are entered by parents and are not independently verified. A matching school and class does not prove someone’s identity. Only accept people your family knows; leave class visibility off if you prefer to use parent-exchanged codes.</li>
        <li><b>The leaderboard</b> lists a learner and their linked classmates with first names, classes and challenge results, shown to those learners. It looks back 90 days.</li>
      </ul>
      <h3>What parents can see and do</h3>
      <ul>
        <li>Switch each feature on or off for each child, and see every classmate their child is linked with.</li>
        <li>Read every text message and listen to every voice note their child sent or received, and delete any of them. Deleting a message also deletes a voice recording.</li>
        <li>Block or remove a classmate, and see the reports their child sent.</li>
        <li>The other child’s parents can read the same conversation, because it is also their child’s. Explain this to your child before enabling chat. The chat screen also tells learners that parents can read the conversation.</li>
      </ul>
      <h3>Safety measures</h3>
      <ul>
        <li>Children can <b>block</b> or <b>report</b> a classmate or a message. A report blocks the classmate straight away and is saved for the Edify team.</li>
        <li>Messages are limited to 500 characters and voice notes to 30 seconds, and there are limits on how many a child can send. Messages with phone numbers, emails, links or social media names are refused. This is a basic safeguard and will not catch everything.</li>
        <li>Challenge answers are marked on our server, and a challenge’s questions stay hidden until a child has started it.</li>
        <li>These tools are not live moderation. <b>Nobody at Edify reads every message.</b> Parents are best placed to supervise, and we act on reports. Adeyanju Fuhad is the initial safety contact. We aim to review ordinary concerns within 2 working days (Monday to Friday, excluding Nigerian public holidays), prioritising concerns about a child’s safety. Email <ContactEmail /> with urgent concerns: in-app reporting is not an emergency notification service. We may review the report and relevant conversation, warn a user, restrict contact or suspend access. Where necessary and lawful, we may contact a parent or the relevant authorities. For immediate danger, contact emergency services.</li>
        <li>Messages and voice notes are stored in our database and are not end-to-end encrypted, so people with access to the database can technically read them. Our access policy limits review to people authorised by Adeyanju Fuhad who need it for support, safety, security or maintenance. <Todo>verify the current database access list and audit logging before describing access as fully audited</Todo></li>
      </ul>
      <h3>How long it is kept</h3>
      <ul>
        <li>Text messages: <b>14 days</b>, then deleted. Voice notes: <b>7 days</b>, then deleted. A message that has been reported is kept until its report is deleted.</li>
        <li>Finished challenges (questions, answers, scores): <b>180 days</b>. Unfinished or cancelled challenges: about 30 days.</li>
        <li>Reports, with the copy of the message: <b>12 months</b>. Classmate codes: used or expired codes are deleted after 30 days. Safety counters: 2 days.</li>
        <li>Everything above is deleted at once when a parent removes the learner or deletes their account (see “How to delete your data”). If one family deletes a child, the conversations and challenge results with that child disappear for the classmate too.</li>
      </ul>
      <p>These are our selected retention periods. The site is configured to run clean-up daily; deletion is performed during a successful clean-up run rather than at the exact moment a record reaches its age limit. <Todo>the production cron secret and daily schedule are configured; successful execution still needs verification. Obtain legal review of report retention and any required preservation</Todo></p>
      <h3>Legal points still to settle</h3>
      <p><Todo>lawyer to confirm the lawful basis and the consent needed for children’s messages, voice recordings and online status under the NDPA (section 25 and the children’s rules in section 31), and whether a data protection impact assessment is required before this feature is switched on</Todo></p>
      <p><Todo>lawyer to confirm Edify’s duties if a report suggests a child is at risk or is being targeted, under Nigerian child-protection and cybercrime law (for example the Child’s Rights Act 2003), and what Edify must tell parents, the NDPC or the authorities</Todo></p>
    </>,
  },
  {
    id: "where",
    title: "Where it’s stored and who helps us",
    body: <>
      <p>We don’t run our own servers. The following companies help run the website. Support emails and attachments are also handled by Google through our Gmail contact address; see <a href="https://policies.google.com/privacy" className="text-link">Google’s privacy policy</a>. Providers may also process information for their own legal and security obligations under their policies:</p>
      <div className="legal-data">
        <dl>
          <div><dt>Neon (Neon, Inc.)</dt><dd>Our database and sign-in service. All the account, learner and payment-record data above is stored in Neon’s database on Amazon Web Services in London, UK (region eu-west-2). Neon also sends our account emails, such as confirmation codes.</dd></div>
          <div><dt>Vercel (Vercel Inc.)</dt><dd>Hosts the website. Our pages run on Vercel’s servers in London, UK (region lhr1). Like any web host, Vercel’s network handles each request on its way to us and keeps short-lived technical logs, such as IP addresses.</dd></div>
          <div><dt>Paystack (Paystack Payments Limited)</dt><dd>Takes payments. When you pay, we send Paystack your parent email address, the amount and our order reference, and you enter your card or bank details on Paystack’s page, where Paystack is responsible for them under its own privacy notice. Paystack tells us back whether the payment succeeded. We never send Paystack a learner’s name, school or PIN. Paystack may process data outside Nigeria, including through service providers abroad. Read <a href="https://website-v4.paystack.co/privacy-policy" className="text-link">Paystack’s privacy policy</a> for its processing, sharing and retention practices.</dd></div>
        </dl>
      </div>
      <p>Chat messages and voice notes are stored in the same Neon database as everything else. We do not use a separate chat, messaging or file-storage company. We will update this policy if we add a provider that changes how these records are handled.</p>
      <p>Our own data is stored in the United Kingdom, and Neon and Vercel are American companies, so your data leaves Nigeria. Paystack may also process payment data outside Nigeria. The NDPA allows transfers when the other country or the arrangement gives adequate protection. <Todo>lawyer to confirm the transfer basis under NDPA sections 41 to 43 and whether data processing agreements with Neon, Vercel and Paystack are needed</Todo></p>
    </>,
  },
  {
    id: "payments",
    title: "Payments and payment records",
    body: <>
      <p>Plans are paid for each learner through Paystack. A payment buys 105 days of access and does not renew by itself. What we save for each order is listed under “About payments” above: reference, learner, plan, amount, the email used at checkout, status and dates. Card details never touch Edify.</p>
      <p><b>Payment records are not deleted with your account.</b> We keep them because we may need them for accounting and tax, to answer a refund request or a dispute with your bank or Paystack, and to match a payment that was still being completed when you deleted your account. When you delete your account or a learner, the record is unlinked from them, but it still shows the email address used at checkout, so it is not anonymous. Orders that were started but never paid are kept too, for the same matching reason.</p>
      <p>We aim to delete routine support and refund correspondence 12 months after a request is closed, unless an unresolved dispute or legal obligation requires longer retention. Payment evidence needed for accounting follows the financial-record retention rules below; deleting an Edify account does not automatically delete emails.</p>
      <p><Todo>owner and lawyer to decide: how long payment records must be kept under Nigerian tax and accounting law (and any Paystack rules), whether the email should be removed or masked once that period ends or sooner, and when unpaid orders can be purged. Then state the period here.</Todo></p>
    </>,
  },
  {
    id: "keep",
    title: "How long we keep it",
    body: <ul>
      <li><b>While your account is open</b>, we keep your account and your learners’ data so their progress is there when they come back.</li>
      <li><b>When you remove a learner</b>, their profile, progress, notes, test attempts and everything held for them by the classmate features (links, challenges, chat messages, voice notes, online status, reports) are deleted straight away. Their payment records stay, unlinked from them.</li>
      <li><b>Classmate chat, voice notes and challenges</b> are deleted on a schedule even if nobody deletes anything: <a href="#classmates">see the classmates section</a> for the periods.</li>
      <li><b>When you delete your account</b>, your parent account, every learner, and all their progress, notes, test attempts and classmate data are deleted straight away. Payment records and necessary support correspondence may remain. Our database keeps a rolling 6-hour restore history for emergencies (Neon’s current setting for us, which can change), so deleted data can remain in that history for up to about 6 hours.</li>
      <li><b>Payment records</b> stay after deletion for accounting and disputes. <Todo>retention period to be decided: see the payments section</Todo></li>
      <li><b>Sign-in sessions</b> expire on their own, and Vercel’s technical logs are kept only for a short time under Vercel’s own policy.</li>
      <li><b>Unused accounts</b>: are not currently deleted automatically for inactivity. You can delete your account at any time, or contact us for help.</li>
    </ul>,
  },
  {
    id: "delete",
    title: "How to delete your data",
    body: <>
      <p>You can delete your account yourself, without asking us:</p>
      <ol className="legal-steps">
        <li><Link href="/login" className="text-link">Log in</Link> with your email and password.</li>
        <li>On the “Who’s studying?” page, scroll to <b>Delete your account</b>.</li>
        <li>Type <b>DELETE</b> to confirm and press the button.</li>
      </ol>
      <p>This deletes your parent account, every learner, and all their progress, notes and CBT results, together with their classmate links, challenges, chat messages, voice notes and online status, and signs you out. It can’t be undone, and paid access can’t be moved to a new account. To remove just one child, use <b>Remove</b> on their card instead. Payment records and necessary support correspondence may remain as described in <a href="#payments">the payments section</a>.</p>
      <p>If you can’t log in, email <ContactEmail /> from the address on the account and we will delete it for you.</p>
    </>,
  },
  {
    id: "rights",
    title: "Your rights",
    body: <>
      <p>Under the NDPA you, and your child through you, have the right to:</p>
      <ul>
        <li>know what data we hold and get a copy of it;</li>
        <li>have wrong data corrected;</li>
        <li>have data deleted;</li>
        <li>object to, or ask us to limit, how we use it;</li>
        <li>receive the data in a common format to take elsewhere;</li>
        <li>withdraw consent at any time;</li>
        <li>complain to the <b>Nigeria Data Protection Commission</b> (NDPC) if you’re unhappy with how we handle your data.</li>
      </ul>
      <p>You can delete your data yourself, as described above. For any other right, email <ContactEmail />. We aim to acknowledge requests within 2 working days and provide a substantive response within 30 calendar days, or sooner if required by law. If we need more information or a lawful extension, we will explain why and when to expect an answer. We may ask you to confirm the request from the email address on the account.</p>
    </>,
  },
  {
    id: "security",
    title: "Keeping it safe",
    body: <>
      <ul>
        <li>All traffic to Edify is encrypted (HTTPS).</li>
        <li>Passwords and PINs are stored scrambled (hashed), never as typed.</li>
        <li>The database password is held only by Edify’s own server; browsers never connect to the database directly.</li>
        <li>Each learner’s PIN keeps brothers and sisters out of each other’s work. It’s a light lock, not a substitute for keeping your own password private.</li>
        <li>You can set a separate parent PIN to protect account management and classmate settings. Opening a learner’s space locks these parent controls when a parent PIN is set. Without a parent PIN, someone using your signed-in account can access those controls. Keep your password and parent PIN private.</li>
        <li>Edify uses the essential cookies described above for sign-in, learner selection and parent controls. We do not use advertising or analytics cookies. You can clear cookies in your browser, but doing so may sign you out or reset these controls. Paystack’s checkout has its own cookie practices.</li>
      </ul>
      <p>If a data breach puts your information at risk, we will tell the NDPC and the affected parents as the law requires. <Todo>lawyer to confirm breach-notice duties and timings under NDPA section 40</Todo></p>
    </>,
  },
  {
    id: "changes",
    title: "Changes and contact",
    body: <>
      <p>If we change this policy in a way that affects you, we will say so on the site or by email before the change takes effect. When the change needs your agreement, you will be asked to agree again before you can add learners, study or pay. The version and date at the top of this page change each time.</p>
      <p>Questions or requests: <ContactEmail />. Adeyanju Fuhad is our privacy contact. <Todo>confirm whether a formally appointed Data Protection Officer is required; the privacy contact is not a claim of that appointment</Todo></p>
    </>,
  },
];

export default function PrivacyPage() {
  return <LegalDoc
    kicker="Privacy policy"
    title={<>What we keep, and how to <span className="hl">delete it.</span></>}
    intro="Edify stores a small amount of information about parents and the learners they add. This page explains what it is, why we need it, where it lives, how long we keep it and how you can delete it."
    sections={SECTIONS}
    other={{ href: "/terms", label: "Read the terms of use" }}
  />;
}
