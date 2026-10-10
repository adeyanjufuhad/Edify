import Link from "next/link";
import { ArrowRight, Note } from "@/components/icons";
import { lessonIndex, plural } from "@/data/catalog";
import { requireLearner } from "@/lib/session";
import { loadStudy } from "@/lib/study";

export const metadata = { title: "My notes — Edify" };

const dateFormat = new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Lagos" });

export default async function NotesPage() {
  const learner = await requireLearner();
  const { records, loadFailed } = await loadStudy(learner.id);
  const notes = records.filter((record) => record.notes.trim() && lessonIndex.has(record.lessonId));

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <span className="kicker">Revision</span>
          <h1>My notes</h1>
          <p>{notes.length ? `${plural(notes.length, "lesson")} with notes, newest first. Open a lesson to edit its note.` : "Everything you write in the “My notes” box of a lesson is collected here."}</p>
        </div>
      </header>

      {loadFailed && <p role="alert" className="form-error">Your notes could not be loaded. Refresh the page to try again.</p>}

      {notes.length ? (
        <ul className="notes-grid">
          {notes.map((record) => {
            const entry = lessonIndex.get(record.lessonId)!;
            return (
              <li key={record.lessonId} className="panel note-card">
                <div className="note-card-meta"><span>{entry.subject.name} · {entry.week.label}</span><time dateTime={record.updatedAt}>{dateFormat.format(new Date(record.updatedAt))}</time></div>
                <h2>{entry.week.topic}</h2>
                <p>{record.notes}</p>
                <Link href={entry.href} className="text-link small">Open lesson <ArrowRight size={14} /></Link>
              </li>
            );
          })}
        </ul>
      ) : !loadFailed && (
        <div className="panel empty-state">
          <span className="empty-icon" aria-hidden="true"><Note size={26} /></span>
          <h2>No notes yet</h2>
          <p>At the bottom of every lesson there’s a “My notes” box. Write a question for your teacher or a trick to remember, and it saves here automatically.</p>
          <Link href="/study/subjects" className="pill-button">Go to lessons <ArrowRight /></Link>
        </div>
      )}
    </div>
  );
}
