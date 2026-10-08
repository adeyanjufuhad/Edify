import Link from "next/link";
import { firstTermChemistry } from "@/data/curriculum";

export default function Home() {
  return <main>
    <header className="site-header shell">
      <Link href="/" className="brand"><span className="brand-mark">e.</span><span>edify<span className="brand-period">.</span></span></Link>
      <nav aria-label="Main navigation"><a href="#how-it-works">How it works</a><a href="#curriculum">Curriculum</a><Link href="/login" className="header-login">Log in <span aria-hidden="true">↗</span></Link></nav>
    </header>

    <section className="hero shell">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-dot" /> MADE FOR CURIOUS MINDS AT BRAINFIELD SCHOOL</div>
        <h1>Big ideas start <em>somewhere.</em></h1>
        <p className="hero-intro">A calm place to understand what you learn in class, practise with confidence, and make every study session count.</p>
        <div className="hero-actions"><Link className="button button-red" href="/login">Start learning <span aria-hidden="true">↗</span></Link><a className="text-link" href="#curriculum">Explore the curriculum <span aria-hidden="true">→</span></a></div>
        <div className="hero-proof"><span className="tiny-stars" aria-hidden="true">✦ ✦ ✦</span><span>Built for SS1. Made for Taiwo & Kehinde.</span></div>
      </div>
      <div className="hero-art" aria-label="Illustration of a study notebook, a chemistry flask, and learning cards" role="img">
        <div className="orbit orbit-one" /><div className="orbit orbit-two" />
        <div className="hero-spark spark-one">✳</div><div className="hero-spark spark-two">✦</div>
        <div className="formula-card"><span>THIS WEEK&apos;S BIG QUESTION</span><strong>What is<br />chemistry?</strong><div className="formula-line" /><small>WEEK 01 · CHEMISTRY</small></div>
        <div className="flask"><div className="flask-neck" /><div className="flask-body"><div className="liquid" /><div className="bubble b1" /><div className="bubble b2" /><div className="bubble b3" /></div></div>
        <div className="art-note">learn · explore · grow<span>↗</span></div>
        <div className="art-bottom">EDIFY / SS1</div>
      </div>
    </section>

    <section className="feature-band" id="how-it-works"><div className="shell feature-grid">
      <div><span className="feature-icon">01</span><h3>Understand it</h3><p>Clear lesson notes that make room for every question.</p></div>
      <div><span className="feature-icon">02</span><h3>Try it yourself</h3><p>WAEC-style practice with answers you can learn from.</p></div>
      <div><span className="feature-icon">03</span><h3>Pick up where you left off</h3><p>Private study progress and notes for each learner, across devices.</p></div>
    </div></section>

    <section className="curriculum-section shell" id="curriculum"><div className="section-heading"><div><span className="section-kicker">YOUR STUDY PATH</span><h2>A little progress,<br /><em>every week.</em></h2></div><p>Everything is arranged the same way you learn it at school: class, term, subject, then week.</p></div>
      <div className="path-strip"><span>SS1</span><b>→</b><span>First Term</span><b>→</b><span>Chemistry</span><b>→</b><span>Weekly topics</span></div>
      <div className="curriculum-card"><div className="curriculum-card-head"><div className="subject-symbol">C</div><div><span>SS1 · FIRST TERM</span><h3>Chemistry</h3></div><div className="curriculum-count">{firstTermChemistry.weeks.length} topic blocks</div></div>
        <div className="topic-list">{firstTermChemistry.weeks.slice(0, 5).map((week) => <div className="topic-row" key={week.number}><span className="topic-number">{week.label}</span><span>{week.topic}</span><span className={week.available ? "status-ready" : "status-soon"}>{week.available ? "Ready to read ↗" : "Coming soon"}</span></div>)}</div>
        <div className="curriculum-card-foot"><span>More weeks and subjects will be added as lessons are ready.</span><Link href="/login">Open my study space <span aria-hidden="true">→</span></Link></div>
      </div>
    </section>
    <section className="closing-cta"><div className="shell closing-inner"><div><span>ONE WEEK AT A TIME</span><h2>Ready when<br /><em>you are.</em></h2></div><Link href="/login" className="button button-cream">Go to my account <span aria-hidden="true">↗</span></Link></div></section>
    <footer className="site-footer shell"><div className="brand"><span className="brand-mark">e.</span><span>edify<span className="brand-period">.</span></span></div><p>Made with care for the next generation of thinkers.</p><span>© 2026 Edify</span></footer>
  </main>;
}
