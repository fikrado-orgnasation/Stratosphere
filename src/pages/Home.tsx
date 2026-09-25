import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowRight, Plane } from 'lucide-react';
import Shell, { Filings } from '../components/Shell';
import { FLEET, RAIL, SUBJECTS } from '../data/site';

const ADVANTAGE = [
  { title: 'Private, one to one', body: 'Uninterrupted instruction at your own pace, not a lecture hall.' },
  { title: 'ICAO aligned', body: 'Built on ICAO Doc 7192 and the ERNAM instructional framework.' },
  { title: 'Trained instructors', body: 'Taught by ERNAM-trained specialists with real operational backgrounds.' },
  { title: 'A certificate that counts', body: 'Recognised on completion, and the theory PPL and CPL both require.' },
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
                The ground school for people who intend to fly.
              </h1>
              <p className="lede hero__lede">
                Ten subjects, aligned to ICAO and taught by ERNAM-trained instructors.
                One to one, at a pace you set, in the first school of its kind in Somaliland.
              </p>
              <div className="hero__actions">
                <Link to="/admissions" className="btn btn--primary">
                  Start an enquiry
                  <ArrowRight size={16} />
                </Link>
                <Link to="/training" className="btn btn--ghost">
                  Read the syllabus
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
                <div className="hero__row hero__row--live"><dt>Enrolment</dt><dd>Open</dd></div>
              </dl>
              <div className="hero__panelfoot">
                <p className="mono mono--xs muted">Est. {RAIL.established} · Lic. MoE Somaliland</p>
              </div>
            </div>
          </div>

          <a className="scroll-cue" href="#syllabus">
            Syllabus
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
            <p className="datum datum--paper">Syllabus</p>
            <h2 className="h2 paper-ink">Ten subjects. That is the whole course.</h2>
            <p className="lede paper-dim">
              Every one is a separate subject with its own assessment, taught privately.
              Take them in any order, or all ten together.
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
              See how each subject is assessed
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── the fleet ─────────────────────────────────────────────────────── */}
      <section className="band">
        <div className="shell">
          <div className="band__head">
            <p className="datum">The hangar</p>
            <h2 className="h2">Theory first. These are what it is for.</h2>
            <p className="lede">
              The Cessna 172 and the DA40 are how a syllabus becomes a skill. We fly
              the same three aircraft the training was designed around.
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

      {/* ── the method ────────────────────────────────────────────────────── */}
      <section className="band band--edge">
        <div className="shell rule rule--split">
          <div className="stack">
            <p className="datum">How it runs</p>
            <p className="claim">
              Ten subjects taught one to one, because the standard is the same whether
              there is <em>one of you or ten</em>.
            </p>
            <Link to="/student-life" className="btn btn--ghost" style={{ width: 'fit-content', marginTop: 8 }}>
              What a year looks like
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

      {/* ── enrolment ─────────────────────────────────────────────────────── */}
      <section className="band band--edge">
        <div className="shell">
          <div className="band__head" style={{ maxWidth: '46ch' }}>
            <p className="datum">Enrolment</p>
            <h2 className="h2">You do not need a licence to start.</h2>
            <p className="lede">
              No prior aviation experience is required. Tell us where you are and we will
              tell you honestly how long it will take.
            </p>
          </div>

          <div className="figures">
            <div><b>10</b><span>Subjects</span></div>
            <div><b>1:1</b><span>Instruction</span></div>
            <div><b>24h</b><span>Reply time</span></div>
            <div><b>{RAIL.established}</b><span>Established</span></div>
          </div>

          <div style={{ marginTop: 44, display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            <Link to="/admissions" className="btn btn--primary">
              Start an enquiry
              <ArrowRight size={16} />
            </Link>
            <a href="mailto:info@stratosphereaeronautics.com" className="btn btn--ghost">
              Email the school
            </a>
          </div>
        </div>
      </section>
    </Shell>
  );
}
