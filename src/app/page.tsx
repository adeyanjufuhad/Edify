import Brand from "@/components/brand";
import { firstTermChemistry } from "@/data/curriculum";
import { getLesson, lessons } from "@/data/lessons";
import { LEARNERS } from "@/lib/learners";

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
] as const;

function Mock({ kind }: { kind: (typeof FEATURES)[number]["mock"] }) {
  if (kind === "notes") return (
    <div className="mock-body">
      <span className="mock-pill">⚡ Quick exam notes</span>
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
      <p className="mock-correct">✓ Correct — A</p>
    </div>
  );
  if (kind === "facts") return (
    <div className="mock-body">
      <span className="mock-meta">EXAM TIPS</span>
      <p className="mock-warn"><b>BOOK CHECK</b>For C₂H₂ + yH₂ → C₂H₆ the book gives y = 3. Count the hydrogens: 2 + 2y = 6, so y = 2.</p>
      <p className="mock-warn"><b>BOOK CHECK</b>A Geiger–Müller counter does not identify isotopes. Use the mass spectrometer.</p>
    </div>
  );
  return (
    <div className="mock-body">
      <span className="mock-meta">CHEMISTRY · FIRST TERM</span>
      <div className="mock-bar"><span style={{ width: "75%" }} /></div>
      <div className="mock-weeks"><span className="done">✓ Week 10 · Constituents of the atom</span><span className="done">✓ Week 11 · Electronic structure</span><span className="next">→ Week 12 · Electronic configuration</span></div>
    </div>
  );
}

export default function Home() {
  const ready = firstTermChemistry.weeks.filter((week) => getLesson("first-term", "chemistry", week.slug));
  const questionCount = Object.values(lessons).reduce((sum, lesson) => sum + lesson.questions.length, 0);

  return <main className="home">
    <div className="announce">✦ SS1 First Term Chemistry · {ready.length} topics ready to study</div>
    <header className="site-header">
      <div className="shell header-inner">
        <Brand />
        <nav aria-label="Main navigation"><a href="#features">Features</a><a href="#curriculum">Curriculum</a><a href="#who" className="pill-button small">Start learning</a></nav>
      </div>
    </header>

    <section className="hero shell">
      <div className="hero-copy">
        <span className="badge"><b>SS1</b> The study space built for Brainfield learners</span>
        <h1>Study smart.<br />Ace your <span className="hl">exams.</span></h1>
        <p className="hero-intro">Clear weekly notes, quick exam summaries and <strong>WAEC-style practice</strong> with answers. Everything you need for SS1, one week at a time.</p>
        <div className="hero-actions"><a className="pill-button" href="#who">Start learning →</a><a className="pill-outline" href="#curriculum">See the curriculum →</a></div>
        <p className="hero-proof"><strong>{questionCount}+</strong> practice questions across <strong>{ready.length}</strong> Chemistry topics. Free to explore.</p>
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
        <div className="float-chip chip-one">✓ Lesson completed</div>
        <div className="float-chip chip-two">⚡ Quick exam notes</div>
        <div className="float-chip chip-three"><b>A1</b> here I come</div>
        <div className="atom"><i /><i /><i /><span /></div>
      </div>
    </section>

    <section className="shell why">
      <div className="why-card">
        <div className="why-copy">
          <span className="kicker">WHY EDIFY</span>
          <h2>Everything your teacher said, <span className="hl">in one place.</span></h2>
          <p>Each week follows the SS1 scheme of work, so what you read here matches what you were taught in class.</p>
          <a href="#curriculum" className="text-link">See this term’s topics →</a>
        </div>
        <div className="why-stats">
          <div className="stat stat-green"><strong>{ready.length} / {firstTermChemistry.weeks.length}</strong><span>First Term Chemistry topics ready</span></div>
          <div className="stat"><span className="stat-icon">✎</span><strong>{questionCount}</strong><span>WAEC-style questions with answers</span></div>
          <div className="stat"><span className="stat-icon">⚡</span><strong>12</strong><span>likely exam questions every week</span></div>
        </div>
      </div>
    </section>

    <section className="who-section shell" id="who">
      <div><span className="kicker">WHO’S STUDYING TODAY?</span><h2>Is this Taiwo or <span className="hl">Kehinde?</span></h2><p>Tap your name to open your own study space. Your progress and notes are saved just for you.</p></div>
      <div className="who-grid">{LEARNERS.map((learner) => <a key={learner.slug} href={`/start/${learner.slug}`} className="who-card"><span className="avatar" aria-hidden="true">{learner.name[0]}</span><strong>I’m {learner.name}</strong><small>Open my study space →</small></a>)}</div>
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

    <section className="curriculum-section shell" id="curriculum">
      <div className="section-title"><span className="kicker">YOUR STUDY PATH</span><h2>A little progress, <span className="hl">every week.</span></h2><p>Arranged the way you learn it at school: class, term, subject, then week.</p></div>
      <div className="curriculum-card">
        <div className="curriculum-card-head"><div className="subject-symbol">C</div><div><span>SS1 · FIRST TERM</span><h3>Chemistry</h3></div><div className="curriculum-count">{ready.length} of {firstTermChemistry.weeks.length} ready</div></div>
        <div className="topic-list">{firstTermChemistry.weeks.map((week) => { const isReady = !!getLesson("first-term", "chemistry", week.slug); return <div className="topic-row" key={week.slug}><span className="topic-number">{week.label}</span><span>{week.topic}</span><span className={isReady ? "status-pill ready" : "status-pill"}>{isReady ? "Ready" : "Coming soon"}</span></div>; })}</div>
        <div className="curriculum-card-foot"><span>More subjects are on the way.</span><a href="#who" className="text-link">Open my study space →</a></div>
      </div>
    </section>

    <section className="closing-cta">
      <div className="shell closing-inner">
        <span className="kicker">ONE WEEK AT A TIME</span>
        <h2>Your A1 in Chemistry <span className="hl">starts here.</span></h2>
        <p>Pick your profile and continue from your next lesson.</p>
        <div className="hero-actions center"><a href="#who" className="pill-button">Pick my profile →</a><a href="#features" className="pill-outline">See features</a></div>
      </div>
    </section>

    <footer className="site-footer shell"><Brand /><p>Made with care for the next generation of thinkers.</p><span>© 2026 Edify</span></footer>
  </main>;
}
