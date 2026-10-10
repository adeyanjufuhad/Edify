import Link from "next/link";
import Mascot from "@/components/mascot";
import { LEGAL_UPDATED, LEGAL_VERSION, OPERATOR } from "@/data/legal";

export type LegalSection = { id: string; title: string; body: React.ReactNode };

// A highlighted gap the owner (or their lawyer) still has to fill in.
export function Todo({ children }: { children: React.ReactNode }) {
  return <mark className="legal-todo">[{children}]</mark>;
}

export function OperatorName() {
  return OPERATOR.name ? <>{OPERATOR.name}</> : <Todo>owner’s full legal or business name</Todo>;
}

export function OperatorAddress() {
  return OPERATOR.address ? <>{OPERATOR.address}</> : <Todo>postal address in Nigeria</Todo>;
}

export function ContactEmail() {
  return OPERATOR.email ? <a className="text-link" href={`mailto:${OPERATOR.email}`}>{OPERATOR.email}</a> : <Todo>contact email address</Todo>;
}

export default function LegalDoc({ kicker, title, intro, sections, other }: {
  kicker: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  sections: LegalSection[];
  other: { href: string; label: string };
}) {
  return <>
    <section className="legal-hero">
      <div className="shell legal-hero-inner">
        <div>
          <span className="kicker">{kicker}</span>
          <h1>{title}</h1>
          <p className="legal-intro">{intro}</p>
          <p className="legal-meta">Last updated {LEGAL_UPDATED} · Version {LEGAL_VERSION}</p>
        </div>
        <aside className="legal-draft" aria-label="Draft notice">
          <Mascot pose="think" className="legal-draft-mascot" />
          <div>
            <strong>Draft for review</strong>
            <p>The owner of Edify and a qualified Nigerian lawyer still need to check this page. It is not legal advice. Highlighted <mark className="legal-todo">[gaps]</mark> are details still to be filled in.</p>
          </div>
        </aside>
      </div>
    </section>
    <div className="shell legal-body">
      <nav className="legal-toc" aria-label="On this page">
        <strong>On this page</strong>
        <ol>{sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol>
        <Link href={other.href} className="text-link small">{other.label}</Link>
      </nav>
      <article className="legal-article">
        {sections.map((section, index) => (
          <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
            <h2 id={`${section.id}-title`}><span className="legal-num" aria-hidden="true">{index + 1}</span>{section.title}</h2>
            {section.body}
          </section>
        ))}
      </article>
    </div>
  </>;
}
