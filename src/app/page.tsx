import Link from "next/link";
import Brand from "@/components/brand";
import { ArrowRight, Bolt, Check, Clock, Flag, Layers, Note, Pencil, Shield, Target, Users } from "@/components/icons";
import { catalog, totals } from "@/data/catalog";
import "./home.css";

const NAV = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How it works" },
  { href: "#subjects", label: "Subjects" },
  { href: "#parents", label: "For parents" },
  { href: "#faq", label: "FAQ" },
];

const LESSON_PARTS = [
  { title: "Quick exam notes", text: "The must-know points for the week on one screen, with memory aids and “Watch out” boxes for common traps.", icon: Bolt },
  { title: "Full notes", text: "The whole topic explained in plain English, with worked examples and diagrams to draw.", icon: Layers },
  { title: "Hidden facts & book checks", text: "Exam tips, and the places where the textbook or past-question answers are wrong.", icon: Flag },
  { title: "WAEC-style practice", text: "Objective questions that mark themselves when you tap, and theory questions with model answers.", icon: Target },
  { title: "My notes", text: "A box at the end of every lesson for your own notes. They save to your account automatically.", icon: Note },
];

const STEPS = [
  { title: "A parent signs up", text: "Create a free family account with an email address and confirm it with a 6-digit code." },
  { title: "Add each child", text: "Give every learner a first name and their own 4-digit PIN. Up to six per family." },
  { title: "Study one week at a time", text: "Read the quick notes, practise the questions and tick the lesson off. Progress saves automatically." },
];

const PARENT_POINTS = [
  { title: "One account, every child", text: "Brothers and sisters each get their own profile, progress and notes on the same phone.", icon: Users },
  { title: "A PIN for each learner", text: "Each child opens their own space with a 4-digit PIN, so nobody ticks off someone else’s lessons.", icon: Shield },
  { title: "Progress you can see", text: "Every finished lesson is ticked off, so you can see how far through the term each child is.", icon: Check },
  { title: "Only what’s needed", text: "We store your email, each child’s first name and their study progress. PINs are stored scrambled.", icon: Note },
];

const PLAYBOOK = [
  { title: "Read the question twice", text: "Underline what is actually asked. Many marks are lost answering a different question." },
  { title: "Never leave an objective blank", text: "WAEC objective papers have no negative marking, so a reasoned guess can only help." },
  { title: "Show every step", text: "In theory answers, method marks count. Write the formula, the substitution and the unit." },
  { title: "Watch the traps", text: "Each Edify lesson flags the textbook mistakes and common slips so they don’t catch you out." },
];

const FAQS = [
  { q: "Is Edify free?", a: "Yes, Edify is free while we build it out. If paid plans arrive later, families will be told before anything changes." },
  { q: "Which subjects are covered?", a: "Edify is built for every SS1 subject. Chemistry is ready first; more subjects are added as their lessons are written and checked." },
  { q: "Does it follow the school syllabus?", a: "Yes. Topics follow the SS1 scheme of work, term by term and week by week, so what you read matches what was taught in class." },
  { q: "Who creates the account?", a: "A parent or guardian. They add each child as a learner, so one family account covers brothers and sisters." },
  { q: "Does it work on a phone?", a: "Yes. Edify is a website that works in any phone or computer browser. There’s nothing to install." },
  { q: "What if a PIN is forgotten?", a: "A parent can remove that learner and add them again with a new PIN. Ask for help first, because removing a learner also clears their progress." },
];

function HeroArt() {
  return (
    <svg className="hero-svg" viewBox="0 0 520 460" role="img" aria-label="Illustration of an Edify lesson on a tablet, beside a stack of textbooks and a pencil">
      <circle cx="300" cy="230" r="190" fill="#669bbc" opacity=".22" />
      <rect x="360" y="40" width="96" height="96" rx="16" fill="#c1121f" />
      <path d="M392 88l14 14 26-30" stroke="#fff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="110" y="70" width="300" height="340" rx="26" fill="#003049" />
      <rect x="128" y="92" width="264" height="296" rx="12" fill="#fdf0d5" />
      <rect x="128" y="92" width="264" height="58" rx="12" fill="#fff" />
      <rect x="146" y="108" width="34" height="26" rx="6" fill="#c1121f" />
      <rect x="192" y="110" width="120" height="9" rx="4.5" fill="#003049" />
      <rect x="192" y="126" width="78" height="7" rx="3.5" fill="#669bbc" />
      <rect x="146" y="166" width="228" height="64" rx="10" fill="#fff" />
      <rect x="160" y="180" width="128" height="8" rx="4" fill="#003049" />
      <rect x="160" y="196" width="196" height="6" rx="3" fill="#669bbc" />
      <rect x="160" y="208" width="160" height="6" rx="3" fill="#669bbc" />
      <rect x="146" y="242" width="108" height="40" rx="8" fill="#003049" />
      <rect x="160" y="257" width="18" height="10" rx="3" fill="#fff" />
      <rect x="184" y="258" width="56" height="8" rx="4" fill="#fff" opacity=".7" />
      <rect x="266" y="242" width="108" height="40" rx="8" fill="#fff" stroke="#669bbc" strokeOpacity=".5" />
      <rect x="146" y="292" width="108" height="40" rx="8" fill="#fff" stroke="#669bbc" strokeOpacity=".5" />
      <rect x="266" y="292" width="108" height="40" rx="8" fill="#fff" stroke="#c1121f" strokeWidth="2" />
      <rect x="146" y="346" width="228" height="10" rx="5" fill="#669bbc" opacity=".35" />
      <rect x="146" y="346" width="150" height="10" rx="5" fill="#c1121f" />
      <rect x="30" y="330" width="150" height="26" rx="5" fill="#780000" />
      <rect x="44" y="304" width="132" height="26" rx="5" fill="#669bbc" />
      <rect x="22" y="356" width="168" height="28" rx="5" fill="#003049" />
      <rect x="40" y="364" width="80" height="6" rx="3" fill="#fdf0d5" opacity=".6" />
      <g transform="rotate(-38 440 360)">
        <rect x="380" y="350" width="130" height="18" rx="3" fill="#c1121f" />
        <rect x="380" y="350" width="22" height="18" rx="3" fill="#669bbc" />
        <path d="M510 350l22 9-22 9z" fill="#003049" />
      </g>
    </svg>
  );
}

export default function Home() {
  return <>
    <header className="home-header">
      <div className="shell home-header-inner">
        <Brand />
        <nav className="home-nav" aria-label="Main navigation">{NAV.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
        <div className="home-header-actions"><Link href="/profiles" className="home-login">Log in</Link><Link href="/signup" className="pill-button small">Sign up free</Link></div>
      </div>
    </header>

    <main id="main" className="home">
      <section className="hero">
        <div className="shell hero-inner">
          <div className="hero-copy">
            <span className="kicker">For SS1 students in Nigeria</span>
            <h1>Study smarter for <span className="hl">WAEC</span>, one week at a time.</h1>
            <p className="hero-intro">Clear weekly notes, quick exam summaries and self-marking practice for every SS1 subject, following the same scheme of work as your school.</p>
            <div className="hero-actions">
              <Link href="/signup" className="pill-button">Create a free account <ArrowRight /></Link>
              <a href="#how" className="pill-outline">See how it works</a>
            </div>
            <ul className="hero-facts">
              <li><Check size={16} /> Free for families</li>
              <li><Check size={16} /> Follows the SS1 scheme</li>
              <li><Check size={16} /> Works on any phone</li>
            </ul>
          </div>
          <div className="hero-art"><HeroArt /></div>
        </div>
      </section>

      <section className="stat-band" aria-label="Edify in numbers">
        <div className="shell stat-band-inner">
          <div><strong>{totals.questions}+</strong><span>practice questions with answers</span></div>
          <div><strong>{totals.readyTopics}</strong><span>lessons ready to study</span></div>
          <div><strong>12</strong><span>likely exam questions per lesson</span></div>
          <div><strong>A1–F9</strong><span>WAEC-style grade on every quiz</span></div>
        </div>
      </section>

      <section className="shell compare" aria-labelledby="compare-title">
        <div className="compare-copy">
          <span className="kicker">Why Edify</span>
          <h2 id="compare-title">Textbooks are long. <span className="hl">The exam is short.</span></h2>
          <p>Universities and JAMB ask for credits in five subjects, including English and Mathematics, and much of what WAEC tests is first taught in SS1. Edify turns each week of the scheme into something you can revise in one sitting.</p>
        </div>
        <div className="compare-table">
          <div className="compare-col is-before">
            <h3>Studying from the textbook alone</h3>
            <ul><li>Dozens of pages for one topic</li><li>No way to check your answers</li><li>Errors in the book go unnoticed</li><li>Notes lost in exercise books</li></ul>
          </div>
          <div className="compare-col is-after">
            <h3>Studying with Edify</h3>
            <ul><li>One-screen quick notes per week</li><li>Questions that mark themselves</li><li>Book mistakes flagged and fixed</li><li>Notes saved to your account</li></ul>
          </div>
        </div>
      </section>

      <section className="shell features" id="features" aria-labelledby="features-title">
        <div className="section-head"><span className="kicker">Features</span><h2 id="features-title">Everything you need for the term, <span className="hl">in one place.</span></h2></div>
        <div className="bento">
          <article className="tile tile-wide">
            <div className="tile-icon"><Bolt size={20} /></div>
            <h3>Quick exam notes</h3>
            <p>Every lesson opens with the must-know points for the week, so you can revise a whole topic in about ten minutes.</p>
            <div className="tile-demo notes-demo">
              <strong>The three rules for filling orbitals</strong>
              <ul><li><b>Aufbau</b> lowest energy orbital first</li><li><b>Pauli</b> two electrons per orbital, opposite spins</li><li><b>Hund</b> fill singly, then pair</li></ul>
            </div>
          </article>
          <article className="tile tile-red">
            <div className="tile-icon"><Target size={20} /></div>
            <h3>Practice that marks itself</h3>
            <p>Tap an option and see straight away if you’re right, with the answer explained.</p>
            <div className="tile-demo quiz-demo"><span className="ok">B · Hund’s rule</span><span>Correct</span></div>
          </article>
          <article className="tile tile-navy">
            <div className="tile-icon"><Flag size={20} /></div>
            <h3>Hidden facts</h3>
            <p>Exam tips, plus the places where the textbook gets it wrong, corrected.</p>
          </article>
          <article className="tile">
            <div className="tile-icon"><Pencil size={20} /></div>
            <h3>A real WAEC grade</h3>
            <p>Finish a quiz and get graded A1–F9, then retry only the ones you missed.</p>
            <div className="tile-demo grade-demo"><strong>B2</strong><span>29 of 40 · 72%</span></div>
          </article>
          <article className="tile tile-slate">
            <div className="tile-icon"><Note size={20} /></div>
            <h3>Your own notes</h3>
            <p>Write notes in any lesson and find them all on one revision page.</p>
          </article>
          <article className="tile tile-half">
            <div className="tile-icon"><Users size={20} /></div>
            <h3>Family accounts</h3>
            <p>One parent account for every child, each with their own PIN, progress and notes.</p>
          </article>
          <article className="tile tile-half tile-navy">
            <div className="tile-icon"><Clock size={20} /></div>
            <h3>Pick up where you stopped</h3>
            <p>Your dashboard shows the next lesson, what’s coming up and how far through the term you are.</p>
            <div className="tile-demo progress-demo"><span /></div>
          </article>
        </div>
      </section>

      <section className="lesson-anatomy" aria-labelledby="anatomy-title">
        <div className="shell anatomy-inner">
          <div>
            <div className="section-head left"><span className="kicker">Inside every lesson</span><h2 id="anatomy-title">Five parts, <span className="hl">one week’s topic.</span></h2></div>
            <ol className="anatomy-list">
              {LESSON_PARTS.map(({ title, text, icon: Icon }, index) => (
                <li key={title}><span className="anatomy-num">{index + 1}</span><div><h3><Icon size={17} /> {title}</h3><p>{text}</p></div></li>
              ))}
            </ol>
          </div>
          <div className="anatomy-demo" aria-hidden="true">
            <div className="demo-head"><span>Chemistry · Week 12</span><strong>Electronic configuration</strong><div className="demo-toggle"><b>Quick notes</b><i>Full notes</i></div></div>
            <div className="demo-block"><strong>1. Sub-shells and orbitals</strong><span /><span /><span className="short" /></div>
            <div className="demo-block watch"><strong>Watch out</strong><span /><span className="short" /></div>
            <div className="demo-question"><strong>Q09 · Objective</strong><div><i className="ok">A · 1s² 2s² 2p³</i><i>B · 1s² 2s² 2p⁵</i></div></div>
          </div>
        </div>
      </section>

      <section className="shell how" id="how" aria-labelledby="how-title">
        <div className="section-head"><span className="kicker">How it works</span><h2 id="how-title">Set up in <span className="hl">two minutes.</span></h2></div>
        <ol className="how-steps">
          {STEPS.map((step, index) => <li key={step.title}><span className="how-num">{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}
        </ol>
        <div className="center-cta"><Link href="/signup" className="pill-button">Create a free account <ArrowRight /></Link></div>
      </section>

      <section className="shell subjects" id="subjects" aria-labelledby="subjects-title">
        <div className="section-head"><span className="kicker">Subjects</span><h2 id="subjects-title">Follow the term, <span className="hl">week by week.</span></h2><p>Arranged the way you learn it at school: class, term, subject, then week.</p></div>
        <div className="subject-cards">
          {catalog.map(({ term, subject, weeks, ready }) => (
            <article className="subject-card" key={`${term.slug}/${subject.slug}`}>
              <header><span className="subject-symbol" aria-hidden="true">{subject.name[0]}</span><div><small>SS1 · {term.name}</small><h3>{subject.name}</h3></div><span className="status-pill ready">{ready} of {weeks.length} ready</span></header>
              <ol>{weeks.map(({ week, lesson }) => <li key={week.slug} className={lesson ? "" : "soon"}><span>{week.label}</span><span>{week.topic}</span>{lesson ? <Check size={16} /> : <small>Soon</small>}</li>)}</ol>
            </article>
          ))}
          <article className="subject-card more">
            <span className="more-mark" aria-hidden="true">+</span>
            <h3>More SS1 subjects are on the way</h3>
            <p>Each new subject appears here as soon as its first lessons are written and checked. One account covers them all.</p>
            <Link href="/signup" className="pill-outline small">Create a free account</Link>
          </article>
        </div>
      </section>

      <section className="parents" id="parents" aria-labelledby="parents-title">
        <div className="shell parents-inner">
          <div className="parents-copy">
            <span className="kicker">For parents &amp; guardians</span>
            <h2 id="parents-title">Built for the whole family.</h2>
            <p>You create the account and add your children. They study; you can see how far each one has got.</p>
            <Link href="/signup" className="pill-button">Create a family account <ArrowRight /></Link>
          </div>
          <ul className="parents-grid">
            {PARENT_POINTS.map(({ title, text, icon: Icon }) => <li key={title}><span className="parent-icon"><Icon size={20} /></span><h3>{title}</h3><p>{text}</p></li>)}
          </ul>
        </div>
      </section>

      <section className="shell playbook" aria-labelledby="playbook-title">
        <div className="section-head left"><span className="kicker">Exam-hall playbook</span><h2 id="playbook-title">Know the topic. <span className="hl">Then know the exam.</span></h2></div>
        <ol className="playbook-list">{PLAYBOOK.map((tip, index) => <li key={tip.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{tip.title}</h3><p>{tip.text}</p></li>)}</ol>
      </section>

      <section className="shell faq" id="faq" aria-labelledby="faq-title">
        <div className="faq-intro"><span className="kicker">Questions</span><h2 id="faq-title">Things parents often ask.</h2><p>Something else on your mind? Create an account and look around. It’s free.</p></div>
        <dl className="faq-list">{FAQS.map((item) => <div key={item.q}><dt>{item.q}</dt><dd>{item.a}</dd></div>)}</dl>
      </section>

      <section className="final-cta">
        <div className="shell final-inner">
          <h2>Your A1 starts this week.</h2>
          <p>Create a free family account and open the first lesson in minutes.</p>
          <div className="final-actions"><Link href="/signup" className="btn-light">Create a free account <ArrowRight /></Link><Link href="/profiles" className="btn-line">Log in</Link></div>
        </div>
      </section>
    </main>

    <footer className="site-footer">
      <div className="shell footer-inner">
        <div className="footer-brand"><Brand /><p>Clear notes and WAEC-style practice for every SS1 subject, one week at a time.</p></div>
        <nav className="footer-links" aria-label="Footer">
          <div><strong>Study</strong><a href="#features">Features</a><a href="#how">How it works</a><a href="#subjects">Subjects</a></div>
          <div><strong>Parents</strong><a href="#parents">For parents</a><a href="#faq">FAQ</a></div>
          <div><strong>Account</strong><Link href="/signup">Create an account</Link><Link href="/profiles">Log in</Link><Link href="/forgot-password">Reset password</Link></div>
        </nav>
      </div>
      <div className="shell footer-base"><span>© 2026 Edify</span><span>Made with care for the next generation of thinkers.</span></div>
    </footer>
  </>;
}
