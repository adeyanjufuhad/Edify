import Link from "next/link";
import LegalDoc, { ContactEmail, OperatorAddress, OperatorName, Todo, type LegalSection } from "../legal-doc";

export const metadata = {
  title: "Privacy policy — Edify",
  description: "What Edify stores about parents and learners, why, where it is kept, for how long, and how to delete it.",
};

const COLLECTED: { group: string; rows: { what: string; detail: string }[] }[] = [
  {
    group: "About you, the parent or guardian",
    rows: [
      { what: "Your name and email address", detail: "To create your account, sign you in and send account emails such as confirmation codes and password resets." },
      { what: "Your password", detail: "Stored scrambled (hashed) by our sign-in service. We never see it and can’t read it back." },
      { what: "Sign-in sessions", detail: "When you sign in, our sign-in service records the session, the IP address it came from and the type of browser or device, so it can keep you signed in and spot misuse." },
      { what: "Your agreement to these pages", detail: "The date you ticked the consent box when signing up, and which version of these pages you agreed to." },
    ],
  },
  {
    group: "About each learner you add",
    rows: [
      { what: "First name, class and school", detail: "To show the right lessons for their class (JSS1 to SS3) and to tell brothers and sisters apart. We don’t ask for surnames or dates of birth." },
      { what: "4-digit PIN", detail: "Stored scrambled (hashed), never as the 4 digits themselves. It keeps each child’s progress and notes separate." },
      { what: "Plan and referral code", detail: "Which plan the learner is on and, if their school gave you a referral code, that code." },
      { what: "Lesson progress and notes", detail: "Which lessons they’ve ticked off, when, and anything they type in the “My notes” box at the end of a lesson." },
      { what: "CBT test attempts", detail: "For each practice test: the lessons it covered, the answer picked for each question, questions flagged, the score and the time taken." },
    ],
  },
  {
    group: "Kept in your browser",
    rows: [
      { what: "Cookies", detail: "Sign-in cookies from our sign-in service, and one Edify cookie that remembers which learner is studying for up to 30 days. They are needed for the site to work; we don’t use advertising or tracking cookies." },
      { what: "An unfinished CBT test", detail: "Saved in the browser while a test is running, so a dropped connection doesn’t lose answers. It is removed when the test is submitted or quit." },
      { what: "The email you are confirming", detail: "Held in the browser tab during sign-up, only until the 6-digit code is entered." },
    ],
  },
];

const SECTIONS: LegalSection[] = [
  {
    id: "who",
    title: "Who we are",
    body: <>
      <p>Edify is a study website for secondary school students in Nigeria. It is run by <OperatorName />, <OperatorAddress /> (“Edify”, “we”, “us”).</p>
      <p>For the personal data described here, Edify is the <b>data controller</b> under the <b>Nigeria Data Protection Act 2023</b> (NDPA). That means we decide what is collected and why, and we are responsible for looking after it. You can reach us about anything on this page at <ContactEmail />.</p>
    </>,
  },
  {
    id: "short",
    title: "The short version",
    body: <ul className="legal-points">
      <li>Only a parent or guardian can create an account. Children never give us an email address.</li>
      <li>We store the least we need: your name and email, and each child’s first name, class, school and study progress.</li>
      <li>We don’t sell data, show adverts, or use tracking or analytics tools.</li>
      <li>Everything is stored in London, UK, with two service providers: Neon (database and sign-in) and Vercel (website hosting).</li>
      <li>You can delete your whole account and every learner’s data yourself, at any time.</li>
    </ul>,
  },
  {
    id: "collect",
    title: "What we collect",
    body: <>
      <p>This is everything Edify stores. We don’t collect anything else, such as photos, phone numbers, locations or contacts.</p>
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
        <li>to apply a school’s referral code.</li>
      </ul>
      <p>Our legal basis is your <b>consent</b>, given as the parent or guardian when you sign up (the NDPA requires a parent’s or guardian’s consent before we handle a child’s data), and the need to provide the service you asked for. You can withdraw consent at any time by deleting your account. <Todo>lawyer to confirm the lawful bases under NDPA section 25 and the child-consent rules in section 31</Todo></p>
    </>,
  },
  {
    id: "children",
    title: "Children’s data",
    body: <>
      <p>Most Edify learners are under 18, so we treat their data with extra care:</p>
      <ul>
        <li>A parent or guardian creates every learner and confirms, by ticking the consent box, that they are allowed to.</li>
        <li>Learners don’t have their own sign-in. They open their space from the parent’s account with a PIN.</li>
        <li>We only ask for a first name, class and school, never a surname, birthday or photo.</li>
        <li>You can see, change or delete any learner at any time from the “Who’s studying?” page.</li>
        <li>We don’t share learners’ data with schools, including schools that gave you a referral code.</li>
      </ul>
      <p>If you think a child has been added without a parent’s or guardian’s permission, contact us at <ContactEmail /> and we will delete it.</p>
    </>,
  },
  {
    id: "where",
    title: "Where it’s stored and who helps us",
    body: <>
      <p>We don’t run our own servers. Two companies store and process data for us, only on our instructions:</p>
      <div className="legal-data">
        <dl>
          <div><dt>Neon (Neon, Inc.)</dt><dd>Our database and sign-in service. All the account and learner data above is stored in Neon’s database on Amazon Web Services in London, UK (region eu-west-2). Neon also sends our account emails, such as confirmation codes.</dd></div>
          <div><dt>Vercel (Vercel Inc.)</dt><dd>Hosts the website. Our pages run on Vercel’s servers in London, UK (region lhr1). Like any web host, Vercel’s network handles each request on its way to us and keeps short-lived technical logs, such as IP addresses.</dd></div>
        </dl>
      </div>
      <p>Because the data is stored in the United Kingdom and both providers are American companies, your data leaves Nigeria. The NDPA allows this when the other country or the arrangement gives adequate protection. <Todo>lawyer to confirm the transfer basis under NDPA sections 41 to 43 and whether data processing agreements with Neon and Vercel are needed</Todo></p>
    </>,
  },
  {
    id: "keep",
    title: "How long we keep it",
    body: <ul>
      <li><b>While your account is open</b>, we keep your account and your learners’ data so their progress is there when they come back.</li>
      <li><b>When you remove a learner</b>, their profile, progress, notes and test attempts are deleted straight away.</li>
      <li><b>When you delete your account</b>, everything listed above is deleted straight away. Our database keeps a rolling 6-hour restore history for emergencies, so all copies are gone within about 6 hours.</li>
      <li><b>Sign-in sessions</b> expire on their own, and Vercel’s technical logs are kept only for a short time under Vercel’s own policy.</li>
      <li><b>Unused accounts</b>: <Todo>owner to decide, for example: accounts with no sign-in for 24 months are deleted after an email warning</Todo></li>
    </ul>,
  },
  {
    id: "delete",
    title: "How to delete your data",
    body: <>
      <p>You can delete everything yourself, without asking us:</p>
      <ol className="legal-steps">
        <li><Link href="/login" className="text-link">Log in</Link> with your email and password.</li>
        <li>On the “Who’s studying?” page, scroll to <b>Delete your account</b>.</li>
        <li>Type <b>DELETE</b> to confirm and press the button.</li>
      </ol>
      <p>This deletes your parent account, every learner, and all their progress, notes and CBT results, and signs you out. It can’t be undone. To remove just one child, use <b>Remove</b> on their card instead.</p>
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
      <p>To use any of these rights, email <ContactEmail />. We will reply within <Todo>timeframe, for example 30 days</Todo>. We may ask you to confirm the request from the email address on the account.</p>
    </>,
  },
  {
    id: "security",
    title: "Keeping it safe",
    body: <>
      <ul>
        <li>All traffic to Edify is encrypted (HTTPS).</li>
        <li>Passwords and PINs are stored scrambled (hashed), never as typed.</li>
        <li>Only Edify’s own server can reach the database; browsers never connect to it directly.</li>
        <li>Each learner’s PIN keeps brothers and sisters out of each other’s work. It’s a light lock, not a substitute for keeping your own password private.</li>
      </ul>
      <p>If a data breach puts your information at risk, we will tell the NDPC and the affected parents as the law requires. <Todo>lawyer to confirm breach-notice duties and timings under NDPA section 40</Todo></p>
    </>,
  },
  {
    id: "changes",
    title: "Changes and contact",
    body: <>
      <p>If we change this policy in a way that affects you, we will tell you on the site or by email before the change takes effect and, where the law requires, ask for your consent again. The version and date at the top of this page change each time.</p>
      <p>Questions or requests: <ContactEmail />. <Todo>owner to say whether a Data Protection Officer is needed and, if so, add their contact details</Todo></p>
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
