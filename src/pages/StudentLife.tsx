import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Shell, { Filings, PageHead } from '../components/Shell';
import { ADVANTAGES, STUDENT_JOURNEY } from '../data/site';

export default function StudentLife() {
  return (
    <Shell>
      <PageHead
        kicker="Student life"
        code="STU-01"
        title="From first enquiry to certificate."
        lede="Where a student actually is at each stage, and what we are doing about it while they are there."
      />

      <Filings />

      {/* A real four-stage sequence, so the numbers are information */}
      <section className="band">
        <div className="shell">
          <div className="band__head">
            <p className="datum">The journey</p>
            <h2 className="h2">Four stages, and you can stop at any of them.</h2>
            <p className="body">
              Most people do not know at the start which stage they are aiming at, and
              that is fine. Taking one subject is a legitimate outcome, not a half measure.
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

      {/* ── the advantage ──────────────────────────────────────────────────── */}
      <section className="band band--edge">
        <div className="shell rule rule--split">
          <div className="stack">
            <p className="datum">Why here</p>
            <h2 className="h2">Six things that are actually different.</h2>
            <p className="body">
              Every ground school promises personal attention. These are the specific
              commitments behind that sentence.
            </p>
            <Link to="/register" className="btn btn--primary" style={{ width: 'fit-content', marginTop: 6 }}>
              Start an enquiry
              <ArrowRight size={16} />
            </Link>
          </div>

          <ul className="values">
            {ADVANTAGES.map((a) => (
              <li key={a.title}>
                <b>{a.title}</b>
                <span>{a.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Shell>
  );
}
