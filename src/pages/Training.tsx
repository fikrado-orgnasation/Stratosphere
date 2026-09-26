import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import Shell, { Filings, PageHead } from '../components/Shell';
import { CONTACT, SUBJECTS } from '../data/site';

const SUBJECT_PHOTOS: Record<string, string> = {
  M01: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80',
  M02: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=600&q=80',
  M03: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=600&q=80',
  M04: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=600&q=80',
  M05: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80',
  M06: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
  M07: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=600&q=80',
  M08: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80',
  M09: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=600&q=80',
  M10: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=600&q=80',
};

const LOGISTICS = [
  { title: 'Separate Assessment', body: 'Each of the ten subjects is examined individually. You pass on its own terms without having to repeat others.' },
  { title: '1-on-1 Instruction', body: 'Taught privately or in small cohorts of your choosing. Your questions are answered thoroughly.' },
  { title: 'Custom Pace', body: 'Morning, evening, or weekend sessions designed around your employment or flight commitments.' },
  { title: 'Licence Prerequisite', body: 'This theoretical knowledge satisfies the written prerequisite for both PPL and CPL pilot licences.' },
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
              <div key={s.code} className="course-card">
                <div className="course-card__image-wrap">
                  <img
                    src={SUBJECT_PHOTOS[s.code]}
                    alt={s.title}
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 Course Delivery Logistics ───────────────────────────────────── */}
      <section className="section section--subtle">
        <div className="shell">
          <div className="section-head">
            <span className="badge">Course Delivery</span>
            <h2 className="title-md">How Our Ground School Operates</h2>
            <p className="desc-md">
              Structured for serious progress, high exam pass rates, and lasting aviation mastery.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
            {LOGISTICS.map((item) => (
              <div
                key={item.title}
                style={{
                  padding: 24,
                  borderRadius: 'var(--radius)',
                  background: '#ffffff',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <b style={{ color: 'var(--navy)', fontSize: '1.1rem', display: 'block', marginBottom: 8 }}>
                  {item.title}
                </b>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 36, display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
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
