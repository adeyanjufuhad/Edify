import Brand from "@/components/brand";
import { ArrowRight, Bolt, Check, Pencil, Spark } from "@/components/icons";
import { catalog, plural, totals } from "@/data/catalog";

const FEATURES = [
  {
    kicker: "QUICK EXAM NOTES",
    title: <>Learn it in <span className="hl">10 minutes.</span></>,
    text: "Every week opens with the must-know points, memory aids and “Watch out” boxes for the traps examiners set. Switch to the full notes whenever you want the whole story.",
    mock: "notes",
  },
  {
    kicker: "PRACTICE QUESTIONS",
    title: <>Tap. Check. <span className="hl">Learn.</span></>,
    text: "WAEC-style objective questions that mark themselves the moment you tap, plus theory questions with model answers you can reveal after you try.",
    mock: "quiz",
  },
  {
    kicker: "HIDDEN FACTS",
    title: <>The book is wrong <span className="hl">sometimes.</span></>,
    text: "Each lesson flags the mistakes in the textbook and past-question answers, so you write the right answer in the exam hall.",
    mock: "facts",
  },
  {
    kicker: "YOUR PROGRESS",
    title: <>Pick up where you <span className="hl">left off.</span></>,
    text: "Your notes save automatically and every finished lesson is ticked off, on any phone or computer you open Edify on.",
    mock: "progress",
  },
  {
    kicker: "REVISION & MOCK EXAMS",
    title: <>Finish the term with a <span className="hl">real grade.</span></>,
    text: "Each term ends with a revision week and a long mixed mock. Finish the objective questions and Edify grades you on WAEC’s A1–F9 scale, then lets you retry only the ones you missed.",
    mock: "grade",
  },
  {
    kicker: "FAMILY ACCOUNTS",
    title: <>One account, <span className="hl">every child.</span></>,
    text: "A parent or guardian signs up once and adds each child with their own 4-digit PIN. Brothers and sisters keep separate progress and notes on the same phone.",
    mock: "family",
  },
] as const;

const GOALS = [
  { grade: "A1", subject: "Chemistry", habit: "Learn the valency table first. After that, formulas write themselves.", week: "Week 4" },
  { grade: "A1", subject: "Mathematics", habit: "Ten questions every evening. Check each one before moving on.", week: "Daily" },
  { grade: "B2", subject: "English", habit: "Read one comprehension passage a day and summarise it in five lines.", week: "Daily" },
  { grade: "A1", subject: "Biology", habit: "Draw every diagram twice: once copying, once from memory.", week: "Weekly" },
  { grade: "B3", subject: "Physics", habit: "Write the formula, then the units, then the numbers. In that order.", week: "Every sum" },
  { grade: "A1", subject: "Chemistry", habit: "Redo every wrong practice question until the list is empty.", week: "Weekends" },
  { grade: "B2", subject: "Economics", habit: "Explain one graph out loud to a sibling before bed.", week: "Daily" },
  { grade: "A1", subject: "Further Maths", habit: "Cover the worked example, solve it, then compare line by line.", week: "Weekly" },
];

const STEPS = [
  { title: "A parent signs up", text: "Create a free family account with an email address and confirm it with a 6-digit code." },
  { title: "Add each child", text: "Give every learner a first name and their own 4-digit PIN. Up to six per family." },
  { title: "Study one week at a time", text: "Read the quick notes, practise the questions and tick the lesson off. Progress saves automatically." },
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
  { q: "What do you store about my child?", a: "Only their first name, class, study progress and the notes they write. Each child’s PIN is stored scrambled, never as the number itself." },
  { q: "What if a PIN is forgotten?", a: "A parent can remove that learner and add them again with a new PIN. Ask for help first, because removing a learner also clears their progress." },
];

function Mock({ kind }: { kind: (typeof FEATURES)[number]["mock"] }) {
  if (kind === "notes") return (
    <div className="mock-body">
      <span className="mock-pill"><Bolt size={13} /> Quick exam notes</span>
      <strong className="mock-title">2. The three rules for filling orbitals</strong>
      <ul className="mock-list"><li>Aufbau: lowest energy orbital first</li><li>Pauli: max 2 electrons, opposite spins</li><li>Hund: singles first, then pair</li></ul>
      <p className="mock-memory"><b>MEMORY AID</b>Aufbau = build up · Pauli = pair · Hund = singles first</p>
    </div>
  );
  if (kind === "quiz") return (
    <div className="mock-body">
      <span className="mock-meta">QUESTION 09 · OBJECTIVE</span>
      <strong className="mock-title">The electronic configuration of nitrogen is</strong>
      <div className="mock-options"><span className="ok"><b>A</b>1s² 2s² 2p³</span><span><b>B</b>1s² 2s² 2p⁵</span><span><b>C</b>1s² 2s³ 2p²</span><span><b>D</b>1s² 2s² 2p⁴</span></div>
      <p className="mock-correct"><Check size={15} /> Correct — A</p>
    </div>
  );
  if (kind === "facts") return (
    <div className="mock-body">
      <span className="mock-meta">EXAM TIPS</span>
      <p className="mock-warn"><b>BOOK CHECK</b>For C₂H₂ + yH₂ → C₂H₆ the book gives y = 3. Count the hydrogens: 2 + 2y = 6, so y = 2.</p>
      <p className="mock-warn"><b>BOOK CHECK</b>A Geiger–Müller counter does not identify isotopes. Use the mass spectrometer.</p>
    </div>
  );
  if (kind === "grade") return (
    <div className="mock-body mock-grade">
      <div className="grade-badge" data-grade="B"><strong>B2</strong><span>72%</span></div>
      <div><span className="mock-meta">WEEK 13 · REVISION MOCK</span><strong className="mock-title">You scored 29 out of 40.</strong><p className="mock-note">Very good. Review the few you missed.</p><span className="mock-button">Retry the 11 I missed</span></div>
    </div>
  );
  if (kind === "family") return (
    <div className="mock-body">
      <span className="mock-meta">WHO’S STUDYING TODAY?</span>
      <div className="mock-profiles"><span className="is-selected"><b>T</b>Tolu<small>SS1</small></span><span><b>A</b>Amaka<small>SS1</small></span><span className="add"><b>+</b>Add learner</span></div>
      <div className="mock-pin"><span>Tolu’s PIN</span><i /><i /><i /><i /></div>
    </div>
  );
  return (
    <div className="mock-body">
      <span className="mock-meta">CHEMISTRY · FIRST TERM</span>
      <div className="mock-bar"><span /></div>
      <div className="mock-weeks"><span className="done"><Check size={14} /> Week 10 · Constituents of the atom</span><span className="done"><Check size={14} /> Week 11 · Electronic structure</span><span className="next"><ArrowRight size={14} /> Week 12 · Electronic configuration</span></div>
    </div>
  );
}

export default function Home() {
  return <>
    <div className="announce"><Spark size={14} /> SS1 · {plural(totals.readyTopics, "topic")} ready to study · more subjects on the way</div>
    <header className="site-header">
      <div className="shell header-inner">
        <Brand />
        <nav aria-label="Main navigation"><a href="#features">Features</a><a href="#how">How it works</a><a href="#curriculum">Curriculum</a><a href="#faq">FAQ</a><a href="/profiles">Log in</a><a href="/signup" className="pill-button small">Sign up free</a></nav>
      </div>
    </header>

    <main id="main" className="home">
      <section className="hero shell">
        <div className="hero-copy">
          <span className="badge"><b>SS1</b> The study space built for senior secondary learners</span>
          <h1>Study smart.<br />Ace your <span className="hl">exams.</span></h1>
          <p className="hero-intro">Clear weekly notes, quick exam summaries and <strong>WAEC-style practice</strong> with answers for every SS1 subject, one week at a time.</p>
          <div className="hero-actions"><a className="pill-button" href="/signup">Create a free account <ArrowRight /></a><a className="pill-outline" href="#curriculum">See the curriculum <ArrowRight /></a></div>
          <p className="hero-proof"><strong>{totals.questions}+</strong> practice questions across <strong>{plural(totals.readyTopics, "topic")}</strong>. Free to explore.</p>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-glow" />
          <div className="hero-card">
            <div className="window-dots"><i /><i /><i /></div>
            <span className="mock-meta">WEEK 12 · ELECTRONIC CONFIGURATION</span>
            <strong className="hero-card-title">Which rule says orbitals fill singly before pairing?</strong>
            <div className="mock-options"><span><b>A</b>Aufbau principle</span><span className="ok"><b>B</b>Hund’s rule</span><span><b>C</b>Pauli exclusion</span><span><b>D</b>Octet rule</span></div>
            <div className="hero-score"><strong>18 / 20</strong><span>objective score</span></div>
          </div>
          <div className="float-chip chip-one"><Check size={14} /> Lesson completed</div>
          <div className="float-chip chip-two"><Bolt size={14} /> Quick exam notes</div>
          <div className="float-chip chip-three"><b>A1</b> here I come</div>
          <div className="atom"><i /><i /><i /><span /></div>
        </div>
      </section>

      <section className="shell why">
        <div className="why-card">
          <div className="why-copy">
            <span className="kicker">WHY SS1 MATTERS</span>
            <h2>Your WAEC result starts <span className="hl">in SS1.</span></h2>
            <p>Universities and JAMB ask for credits (C6 or better) in five subjects, including English and Mathematics. Much of what WAEC tests is first taught in SS1, so a strong foundation now saves a scramble in SS3.</p>
            <p className="why-note">Edify follows the SS1 scheme of work week by week, so what you read here matches what was taught in class.</p>
            <a href="#curriculum" className="text-link">See the curriculum <ArrowRight size={14} /></a>
          </div>
          <div className="why-stats">
            <div className="stat stat-green"><strong>{totals.readyTopics} / {totals.topics}</strong><span>listed topics ready to study</span></div>
            <div className="stat"><span className="stat-icon"><Pencil /></span><strong>{totals.questions}</strong><span>WAEC-style questions with answers</span></div>
            <div className="stat"><span className="stat-icon"><Bolt /></span><strong>12</strong><span>likely exam questions every week</span></div>
          </div>
        </div>
      </section>

      <section className="goals" aria-labelledby="goals-title">
        <div className="shell section-title"><h2 id="goals-title">From SS1 <span className="muted-word">to</span> <span className="hl">A1.</span></h2><p>Sample study goals and habits, not real results.</p></div>
        <div className="goal-track">
          {[0, 1].map((copy) => (
            <ul className="goal-row" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {GOALS.map((goal, index) => (
                <li className={`goal-card ${index % 3 === 0 ? "is-brand" : ""}`} key={`${copy}-${index}`}>
                  <div className="goal-top"><strong>{goal.grade}</strong><span>TARGET<br />{goal.subject.toUpperCase()}</span></div>
                  <p>“{goal.habit}”</p>
                  <small>{goal.week}</small>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      <section className="who-section shell" id="who">
        <div><span className="kicker">GET STARTED</span><h2>One account for the <span className="hl">whole family.</span></h2><p>A parent or guardian signs up, adds each child with their own 4-digit PIN, and every child gets their own progress and notes.</p></div>
        <div className="who-grid">
          <a href="/signup" className="who-card"><span className="avatar" aria-hidden="true"><Spark /></span><strong>New to Edify</strong><small>Create a family account <ArrowRight size={14} /></small></a>
          <a href="/profiles" className="who-card"><span className="avatar" aria-hidden="true"><Check /></span><strong>Already joined</strong><small>Log in and pick a learner <ArrowRight size={14} /></small></a>
        </div>
      </section>

      <section className="features shell" id="features">
        <div className="section-title"><span className="kicker">FEATURES</span><h2>All the tools you need,<br /><span className="hl">in one spot.</span></h2></div>
        {FEATURES.map((feature, index) => (
          <div className={`feature-row ${index % 2 ? "flip" : ""}`} key={feature.kicker}>
            <div className="feature-copy"><span className="kicker">{feature.kicker}</span><h3>{feature.title}</h3><p>{feature.text}</p></div>
            <div className="mock-window" aria-hidden="true"><div className="window-dots"><i /><i /><i /></div><Mock kind={feature.mock} /></div>
          </div>
        ))}
      </section>

      <section className="how shell" id="how">
        <div className="section-title"><span className="kicker">HOW IT WORKS</span><h2>Set up in <span className="hl">two minutes.</span></h2></div>
        <ol className="how-steps">
          {STEPS.map((step, index) => <li key={step.title}><span className="how-num">{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}
        </ol>
        <div className="hero-actions center"><a href="/signup" className="pill-button">Create a free account <ArrowRight /></a></div>
      </section>

      <section className="playbook shell" aria-labelledby="playbook-title">
        <div className="playbook-card">
          <div className="playbook-intro">
            <span className="kicker">EXAM-HALL PLAYBOOK</span>
            <h2 id="playbook-title">Know the topic. <span className="hl">Then know the exam.</span></h2>
            <blockquote>“Most lost marks aren’t from not knowing. They’re from misreading, skipping steps and leaving blanks.”</blockquote>
          </div>
          <ul className="playbook-list">{PLAYBOOK.map((tip, index) => <li key={tip.title}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{tip.title}</strong><p>{tip.text}</p></div></li>)}</ul>
        </div>
      </section>

      <section className="curriculum-section shell" id="curriculum">
        <div className="section-title"><span className="kicker">YOUR STUDY PATH</span><h2>A little progress, <span className="hl">every week.</span></h2><p>Arranged the way you learn it at school: class, term, subject, then week.</p></div>
        <div className="curriculum-list">
          {catalog.map(({ term, subject, weeks, ready }) => (
            <div className="curriculum-card" key={`${term.slug}/${subject.slug}`}>
              <div className="curriculum-card-head"><div className="subject-symbol" aria-hidden="true">{subject.name[0]}</div><div><span>SS1 · {term.name.toUpperCase()}</span><h3>{subject.name}</h3></div><div className="curriculum-count">{ready} of {weeks.length} ready</div></div>
              <div className="topic-list">{weeks.map(({ week, lesson }) => <div className="topic-row" key={week.slug}><span className="topic-number">{week.label}</span><span>{week.topic}</span><span className={lesson ? "status-pill ready" : "status-pill"}>{lesson ? "Ready" : "Coming soon"}</span></div>)}</div>
            </div>
          ))}
          <div className="more-subjects"><span className="subject-symbol muted" aria-hidden="true"><Spark /></span><div><strong>More subjects are on the way</strong><p>Each new subject appears here as soon as its first lessons are ready.</p></div><a href="/signup" className="text-link">Create a free account <ArrowRight size={14} /></a></div>
        </div>
      </section>

      <section className="faq shell" id="faq">
        <div className="faq-intro"><span className="kicker">QUESTIONS</span><h2>Things parents <span className="hl">often ask.</span></h2><p>Something else on your mind? Create an account and look around. It’s free.</p></div>
        <dl className="faq-list">{FAQS.map((item) => <div key={item.q}><dt>{item.q}</dt><dd>{item.a}</dd></div>)}</dl>
      </section>

      <section className="closing-cta">
        <div className="shell closing-inner">
          <span className="kicker">ONE WEEK AT A TIME</span>
          <h2>Your A1 <span className="hl">starts here.</span></h2>
          <p>Create a free family account and start with the first lesson today.</p>
          <div className="hero-actions center"><a href="/signup" className="pill-button">Create a free account <ArrowRight /></a><a href="/profiles" className="pill-outline">Log in</a></div>
        </div>
      </section>
    </main>

    <footer className="site-footer">
      <div className="shell footer-inner">
        <div className="footer-brand"><Brand /><p>Clear notes and WAEC-style practice for every SS1 subject, one week at a time.</p></div>
        <nav className="footer-links" aria-label="Footer">
          <div><strong>Study</strong><a href="#features">Features</a><a href="#how">How it works</a><a href="#curriculum">Curriculum</a><a href="#faq">FAQ</a></div>
          <div><strong>Account</strong><a href="/signup">Create a family account</a><a href="/profiles">Log in</a><a href="/forgot-password">Reset password</a></div>
        </nav>
      </div>
      <div className="shell footer-base"><span>© 2026 Edify</span><span>Made with care for the next generation of thinkers.</span></div>
    </footer>
  </>;
}
