import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Shell, { Filings, PageHead } from '../components/Shell';
import { SUBJECTS } from '../data/site';

const TERMS = [
  { k: 'Assessment', v: 'Each subject is examined separately. You pass on its own terms, not as part of a block.' },
  { k: 'Format', v: 'Private one to one, or in a small group if you would rather learn alongside others.' },
  { k: 'Pace', v: 'Self-paced against real deadlines. We will give you a timeline at your consultation.' },
  { k: 'Prerequisite', v: 'This theory is the written prerequisite for PPL and CPL licensing.' },
];

export default function Training() {
  return (
    <Shell>
      <PageHead
        kicker="Syllabus"
        code="SYL-01"
        title="Ten subjects, each one examined on its own."
        lede="The curriculum follows ICAO Doc 7192 and the ERNAM framework. Study them in any order, or take the full set — the certificate is the same either way."
      />

      {/* Same ledger as the home page: a syllabus is a table, so it is a table */}
      <section className="ledger-wrap">
        <div className="shell band" style={{ paddingTop: 'clamp(48px, 6vw, 82px)' }}>
          <table className="ledger">
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
        </div>
      </section>

      <Filings />

      {/* ── terms ─────────────────────────────────────────────────────────── */}
      <section className="band">
        <div className="shell rule rule--split">
          <div className="stack">
            <p className="datum">How it is delivered</p>
            <h2 className="h2">The terms you are actually signing up for.</h2>
            <p className="body">
              Most questions we get answered are about logistics rather than content,
              so here they are plainly.
            </p>
            <Link to="/register" className="btn btn--primary" style={{ width: 'fit-content', marginTop: 6 }}>
              Register for a subject
              <ArrowRight size={16} />
            </Link>
            <Link to="/books" className="act" style={{ width: 'fit-content' }}>
              The books for these subjects
              <ArrowRight size={15} />
            </Link>
          </div>

          <dl className="details">
            {TERMS.map((t) => (
              <div key={t.k}>
                <dt>{t.k}</dt>
                <dd><p className="body" style={{ maxWidth: '46ch' }}>{t.v}</p></dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </Shell>
  );
}
