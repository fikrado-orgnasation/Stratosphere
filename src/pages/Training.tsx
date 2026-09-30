import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Shell, { Filings, PageHead } from '../components/Shell';
import TiltCard from '../components/TiltCard';
import { CONTACT, SUBJECTS, SUBJECT_PHOTOS } from '../data/site';

const LOGISTICS = [
  { title: 'Separate Assessment', body: 'Each of the ten subjects is examined individually. You pass on its own terms without having to repeat others.' },
  { title: '1-on-1 Instruction', body: 'Taught privately or in small cohorts of your choosing. Your questions are answered thoroughly.' },
  { title: 'Custom Pace', body: 'Morning, evening, or weekend sessions designed around your employment or flight commitments.' },
  { title: 'Licence Prerequisite', body: 'This theoretical knowledge satisfies the written prerequisite for both PPL and CPL licences.' },
];

export default function Training() {
  return (
    <Shell>
      <PageHead
        kicker="Curriculum"
        title="Theoretical Knowledge Syllabus"
        lede="Ten comprehensive aviation subjects built on ICAO Doc 7192 and the ERNAM instructional framework. Study individually or complete the full course."
      />

      <Filings />

      {/* ── 01 Course Cards Grid ───────────────────────────────────────────── */}
      <section className="section">
        <div className="shell">
          <div className="section-head">
            <span className="badge">All 10 Subjects</span>
            <h2 className="title-md">Explore the Ground School Courses</h2>
            <p className="desc-md">
              Click any module to read its full topics breakdown, learning objectives,
              and recommended textbook.
            </p>
          </div>

          <div className="courses-grid">
            {SUBJECTS.map((s, i) => (
              <TiltCard key={s.code} maxTilt={6} className="course-card">
                <div className="course-card__image-wrap">
                  <img
                    src={SUBJECT_PHOTOS[s.code]}
                    alt=""
                    className="course-card__image"
                    loading="lazy"
                  />
                  <span className="course-card__code">{s.code} · ICAO</span>
                </div>
                <div className="course-card__body">
                  <h3 className="course-card__title">{s.title}</h3>
                  <div className="course-card__topics">
                    {s.topics.map((t) => (
                      <span key={t} className="course-card__topic-tag">{t}</span>
                    ))}
                  </div>
                  <div className="course-card__footer">
                    <Link to={`/training/${i + 1}`} className="course-card__link">
                      Detailed Syllabus <ArrowRight size={14} />
                    </Link>
                    <Link to="/register" className="btn btn--sm btn--primary">
                      Enroll
                    </Link>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 Course Delivery Logistics ───────────────────────────────────── */}
      <section className="section section--subtle">
        <div className="shell">
          <div className="section-head">
            <span className="badge badge--gold">Course Delivery</span>
            <h2 className="title-md">How Our Ground School Operates</h2>
            <p className="desc-md">
              Structured for serious progress, high exam pass rates, and lasting aviation mastery.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))', gap: 24 }}>
            {LOGISTICS.map((item) => (
              <TiltCard
                key={item.title}
                maxTilt={5}
                className="panel"
              >
                <b style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)', fontSize: '1.2rem', display: 'block', marginBottom: 10 }}>
                  {item.title}
                </b>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                  {item.body}
                </p>
              </TiltCard>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40, display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn--primary">
              Enroll for Ground School
              <ArrowRight size={16} />
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn btn--whatsapp"
            >
              <MessageCircle size={18} />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </Shell>
  );
}
