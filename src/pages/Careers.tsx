import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Shell, { Filings, PageHead } from '../components/Shell';
import { CAREERS } from '../data/site';

export default function Careers() {
  return (
    <Shell>
      <PageHead
        kicker="Careers"
        code="CAR-01"
        title="The theory opens doors that do not need a licence."
        lede="Most aviation careers are taken on the strength of a licence, but a lot of them are not. These are the roles where this training is the deciding qualification."
      />

      <Filings />

      <section className="band">
        <div className="shell">
          <div className="careers">
            {CAREERS.map((c) => (
              <div key={c.code}>
                <p className="mono mono--xs" style={{ color: 'var(--faint-ink)', marginBottom: 8 }}>{c.code}</p>
                <h3>{c.title}</h3>
                <ul>
                  {c.roles.map((r) => <li key={r}>{r}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <p className="mono mono--xs muted" style={{ marginTop: 32 }}>
            Eleven named roles across five categories. Several of them do not require a
            flying licence at all.
          </p>
        </div>
      </section>

      {/* ── the licensed path ─────────────────────────────────────────────── */}
      <section className="band band--edge">
        <div className="shell rule rule--split">
          <div className="stack">
            <p className="datum">The licensed path</p>
            <p className="claim">
              If you do want the wings, this is the theory that comes <em>before</em> them.
            </p>
            <p className="body">
              A Private Licence and a Commercial Licence both begin with a
              written theoretical knowledge requirement. Passing the ten subjects here
              is how you satisfy it. The flying hours come after, on top.
            </p>
            <Link to="/register" className="btn btn--primary" style={{ width: 'fit-content', marginTop: 6 }}>
              Start an enquiry
              <ArrowRight size={16} />
            </Link>
          </div>

          <div>
            <p className="datum" style={{ marginBottom: 16 }}>Route</p>
            <ol className="steps">
              <li>
                <b>Theoretical knowledge, here</b>
                <p>Ten subjects, examined and certificated by Stratosphere.</p>
              </li>
              <li>
                <b>Flight training, with a flying school</b>
                <p>Hob hours and instructor time, taken through the PPL or CPL syllabus.</p>
              </li>
              <li>
                <b>Licence and career</b>
                <p>Test, licence, and the operations, safety and dispatch roles above.</p>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </Shell>
  );
}
