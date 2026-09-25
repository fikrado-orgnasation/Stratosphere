import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Shell, { Filings, PageHead } from '../components/Shell';
import { SUBJECTS } from '../data/site';

export default function ProgramDetails() {
  const { id } = useParams();
  const index = Number(id);
  const subject = SUBJECTS[index - 1];

  if (!subject) {
    return (
      <Shell>
        <PageHead
          kicker="Not found"
          code="ERR-404"
          title="That subject is not on the syllabus."
          lede="It may have been renumbered. The full list of ten is on the syllabus page."
        />
        <section className="band" style={{ paddingTop: 0 }}>
          <div className="shell">
            <Link to="/training" className="btn btn--primary">
              Back to the syllabus
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </Shell>
    );
  }

  const previous = SUBJECTS[index - 2];
  const next = SUBJECTS[index];

  return (
    <Shell>
      <PageHead
        kicker={`Subject ${subject.code}`}
        code={subject.code}
        title={subject.title}
        lede="One subject, one assessment. Open the detail to see exactly what it covers and how it is examined."
      />

      <Filings />

      <section className="band">
        <div className="shell rule rule--split">
          <div className="stack">
            <p className="datum">What you will cover</p>
            <ul className="values">
              {subject.topics.map((topic) => (
                <li key={topic} style={{ display: 'grid', gridTemplateColumns: '20px 1fr', gap: 12, alignItems: 'start' }}>
                  <Check size={15} style={{ color: 'var(--amber)', marginTop: 5 }} />
                  <b style={{ fontSize: '0.9375rem', fontWeight: 500 }}>{topic}</b>
                </li>
              ))}
            </ul>
          </div>

          <div className="stack">
            <div>
              <p className="datum" style={{ marginBottom: 16 }}>Terms</p>
              <dl className="details">
                <div>
                  <dt>Assessment</dt>
                  <dd><p className="body" style={{ maxWidth: '40ch' }}>Examined separately from the other nine subjects.</p></dd>
                </div>
                <div>
                  <dt>Format</dt>
                  <dd><p className="body" style={{ maxWidth: '40ch' }}>Private one to one, or in a small group.</p></dd>
                </div>
                <div>
                  <dt>Pace</dt>
                  <dd><p className="body" style={{ maxWidth: '40ch' }}>Self-paced. Your timeline is set at your consultation.</p></dd>
                </div>
                <div>
                  <dt>Certificate</dt>
                  <dd><p className="body" style={{ maxWidth: '40ch' }}>Counts towards the PPL and CPL written requirement.</p></dd>
                </div>
              </dl>
            </div>

            <Link to="/admissions" className="btn btn--primary" style={{ width: 'fit-content', marginTop: 10 }}>
              Enquire about {subject.code}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Subject-to-subject navigation: the syllabus is a sequence */}
      <section className="band band--edge band--tight">
        <div className="shell">
          <hr className="hair" style={{ marginBottom: 28 }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between' }}>
            {previous ? (
              <Link to={`/training/${index - 1}`} className="act act--muted">
                <ArrowLeft size={15} />
                {previous.code} {previous.title}
              </Link>
            ) : <span />}
            {next && (
              <Link to={`/training/${index + 1}`} className="act">
                {next.code} {next.title}
                <ArrowRight size={15} />
              </Link>
            )}
          </div>
        </div>
      </section>
    </Shell>
  );
}
