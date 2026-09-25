import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowRight, Plane } from 'lucide-react';
import Shell, { Ask, Filings } from '../components/Shell';
import { BOOKS, FLEET, RAIL, STUDENT_JOURNEY, SUBJECTS } from '../data/site';

const ADVANTAGE = [
  { title: 'One to one, always', body: 'Every subject is taught privately. There is no lecture hall version of this course.' },
  { title: 'Aligned to ICAO', body: 'Built on Doc 7192 and the ERNAM framework, so the theory travels with you.' },
  { title: 'Taught by ERNAM-trained instructors', body: 'The people teaching you are the people who signed the certificate.' },
  { title: 'Books kept in stock', body: 'One text per subject, held at the school. You are not hunting for a PDF.' },
];

export default function Home() {
  const [selected, setSelected] = useState(0);
  const plane = FLEET[selected];

  return (
    <Shell>
      {/* ── hero ──────────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__streak" aria-hidden="true" />
        <div className="hero__grid" aria-hidden="true" />
        <div className="shell hero__in">
          <div className="hero__grid2">
            <div>
              <p className="datum">Theoretical knowledge instruction · Hargeisa</p>
              <h1 className="display hero__title">
                Ten subjects. One instructor. The written half of your licence.
              </h1>
              <p className="lede hero__lede">
                The theory every pilot is examined on, taught one to one in Hargeisa to
                ICAO and ERNAM standards. Start with one subject or take all ten.
              </p>
              <div className="hero__actions">
                <Link to="/register" className="btn btn--primary">
                  Register for a subject
                  <ArrowRight size={16} />
                </Link>
                <Link to="/books" className="btn btn--ghost">
                  See the books
                  <ArrowDownRight size={16} />
                </Link>
              </div>
            </div>

            {/* Live school readouts, not decorative statistics */}
            <div className="hero__panel">
              <p className="datum datum--lit" style={{ marginBottom: 8 }}>Station</p>
              <dl style={{ display: 'grid' }}>
                <div className="hero__row"><dt>Field</dt><dd>{RAIL.field}</dd></div>
                <div className="hero__row"><dt>Position</dt><dd>{RAIL.position}</dd></div>
                <div className="hero__row"><dt>Elevation</dt><dd>{RAIL.altitude}</dd></div>
                <div className="hero__row"><dt>Subjects</dt><dd>10</dd></div>
                <div className="hero__row"><dt>Books held</dt><dd>{BOOKS.length}</dd></div>
                <div className="hero__row hero__row--live"><dt>Enrolment</dt><dd>Open</dd></div>
              </dl>
              <div className="hero__panelfoot">
                <p className="mono mono--xs muted">Est. {RAIL.established} · Lic. MoE Somaliland</p>
              </div>
            </div>
          </div>

          <a className="scroll-cue" href="#syllabus">
            The syllabus
            <ArrowDownRight size={14} />
          </a>
        </div>
      </section>

      <Filings />

      {/* ── the ledger ────────────────────────────────────────────────────── */}
      {/* The one light section on the site. A syllabus is a reference table,
          so it is set as one, on chart paper. */}
      <section className="ledger-wrap" id="syllabus">
        <div className="shell band">
          <div className="band__head">
            <p className="datum datum--paper">The syllabus</p>
            <h2 className="h2 paper-ink">Everything the licence asks you to know.</h2>
            <p className="lede paper-dim">
              Ten subjects, each with its own assessment. Take one or take all ten —
              the books are the same either way.
            </p>
          </div>

          <table className="ledger">
            <caption style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
              The ten theoretical knowledge subjects taught at Stratosphere Aeronautics
            </caption>
            <thead>
              <tr>
                <th scope="col">Ref</th>
                <th scope="col">Subject</th>
                <th scope="col">Covers</th>
                <th scope="col" style={{ textAlign: 'right' }}>Detail</th>
              </tr>
            </thead>
            <tbody>
              {SUBJECTS.map((s, i) => (
                <tr key={s.code}>
                  <td className="ledger__code">{s.code}</td>
                  <td className="ledger__title">{s.title}</td>
                  <td className="ledger__desc">{s.topics.slice(0, 3).join(' · ')}</td>
                  <td className="ledger__link">
                    <Link to={`/training/${i + 1}`}>
                      Open
                      <ArrowRight size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: 34 }}>
            <Link to="/training" className="act" style={{ color: 'var(--chart-ink)' }}>
              The full syllabus, and how each subject is assessed
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── books ─────────────────────────────────────────────────────────── */}
      <section className="band">
        <div className="shell rule rule--split" style={{ alignItems: 'center' }}>
          <div className="stack">
            <p className="datum">Books</p>
            <h2 className="h2">One book per subject, kept at the school.</h2>
            <p className="body">
              Every subject has a text. We hold copies rather than sending you away to
              find a PDF, and we will set one aside for you if you ask.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 6 }}>
              <Link to="/books" className="btn btn--primary">
                See the books
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <ul className="values">
            {BOOKS.slice(0, 4).map((b) => (
              <li key={b.ref}>
                <b>{b.title}</b>
                <span>
                  {b.edition} · for {b.subject} ·{' '}
                  {b.stock === 'held' ? 'held at the school' : 'on order'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── how it runs ───────────────────────────────────────────────────── */}
      <section className="band band--edge">
        <div className="shell rule rule--split">
          <div className="stack">
            <p className="datum">How it runs</p>
            <p className="claim">
              One to one, because the standard is the same whether there is
              <em> one of you or ten</em>.
            </p>
            <Link to="/student-life" className="btn btn--ghost" style={{ width: 'fit-content', marginTop: 8 }}>
              What the year looks like
              <ArrowRight size={16} />
            </Link>
          </div>

          <ul className="values">
            {ADVANTAGE.map((a) => (
              <li key={a.title}>
                <b>{a.title}</b>
                <span>{a.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── the hangar ────────────────────────────────────────────────────── */}
      <section className="band band--edge">
        <div className="shell">
          <div className="band__head">
            <p className="datum">The hangar</p>
            <h2 className="h2">Theory first. These are what it is for.</h2>
            <p className="lede">
              The Cessna 172 and the DA40 are how a syllabus becomes a skill. We fly
              the three aircraft the training was designed around.
            </p>
          </div>

          <div className="rule rule--split" style={{ alignItems: 'center' }}>
            <div className="hangar">
              <div className="hangar__art">
                <span className="hangar__tag mono">{plane.tail}</span>
                <Plane size={120} strokeWidth={0.75} />
              </div>
              <dl className="hangar__specs">
                <div className="hangar__spec"><dt>Type</dt><dd>{plane.type}</dd></div>
                <div className="hangar__spec"><dt>Role</dt><dd>{plane.role}</dd></div>
                <div className="hangar__spec"><dt>Base</dt><dd>{RAIL.field}</dd></div>
              </dl>
            </div>

            <div>
              <div className="hangar-list">
                {FLEET.map((p, i) => (
                  <button
                    key={p.tail}
                    className={`hangar-item ${i === selected ? 'is-on' : ''}`}
                    onClick={() => setSelected(i)}
                    aria-pressed={i === selected}
                  >
                    <span className="hangar-item__code">{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      <b>{p.type}</b>
                      <span>{p.role}</span>
                    </span>
                    <span className="hangar-item__tail">{p.tail}</span>
                  </button>
                ))}
              </div>
              <p className="mono mono--xs muted" style={{ marginTop: 22 }}>
                Maintained to the standard the syllabus assumes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── the year ──────────────────────────────────────────────────────── */}
      <section className="band band--edge">
        <div className="shell">
          <div className="band__head">
            <p className="datum">The year</p>
            <h2 className="h2">Four stages, and you can stop at any of them.</h2>
            <p className="body" style={{ maxWidth: '56ch' }}>
              Most people do not know at the start which stage they are aiming at, and
              that is fine. Passing one subject is a real outcome, not a half measure.
            </p>
          </div>
          <ol className="steps">
            {STUDENT_JOURNEY.map((s) => (
              <li key={s.code}>
                <b>{s.title}</b>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Ask
        title="Ready when you are."
        body="Pick a subject and we will come back within 24 hours with a real timeline and a real number."
      />
    </Shell>
  );
}
