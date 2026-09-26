import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, MessageCircle } from 'lucide-react';
import Shell, { Filings, PageHead } from '../components/Shell';
import { BOOKS, CONTACT, SUBJECTS } from '../data/site';

const SUBJECT_PHOTOS: Record<string, string> = {
  M01: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80',
  M02: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=900&q=80',
  M03: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=900&q=80',
  M04: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=900&q=80',
  M05: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80',
  M06: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80',
  M07: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=900&q=80',
  M08: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=80',
  M09: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=900&q=80',
  M10: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=900&q=80',
};

export default function ProgramDetails() {
  const { id } = useParams();
  const index = Number(id);
  const subject = SUBJECTS[index - 1];

  if (!subject) {
    return (
      <Shell>
        <PageHead
          kicker="Course Not Found"
          title="Course Not Found"
          lede="The requested subject is not on our current curriculum roster."
        />
        <section className="section">
          <div className="shell" style={{ textAlign: 'center' }}>
            <Link to="/training" className="btn btn--primary">
              <ArrowLeft size={16} /> Back to Full Syllabus
            </Link>
          </div>
        </section>
      </Shell>
    );
  }

  const book = BOOKS.find((b) => b.subject === subject.code);
  const previous = SUBJECTS[index - 2];
  const next = SUBJECTS[index];
  const photo = SUBJECT_PHOTOS[subject.code];

  return (
    <Shell>
      <PageHead
        kicker={`${subject.code} · Ground School Module`}
        title={subject.title}
        lede="One-on-one theoretical knowledge instruction aligned to ICAO Doc 7192. Examined separately."
      />

      <Filings />

      <section className="section">
        <div className="shell">
          <div className="register-layout">
            {/* Left Col: Course Visual & Curriculum Breakdown */}
            <div>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 28, boxShadow: 'var(--shadow)' }}>
                <img
                  src={photo}
                  alt={subject.title}
                  style={{ width: '100%', height: '340px', objectFit: 'cover' }}
                />
              </div>

              <h2 className="title-md" style={{ marginBottom: 16 }}>Topics Covered in {subject.title}</h2>
              <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
                {subject.topics.map((t) => (
                  <div
                    key={t}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: 16,
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-subtle)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    <CheckCircle2 size={18} style={{ color: 'var(--blue)', flexShrink: 0 }} />
                    <b style={{ color: 'var(--navy)', fontSize: '1rem' }}>{t}</b>
                  </div>
                ))}
              </div>

              {/* Textbook Cross Reference */}
              {book && (
                <div
                  style={{
                    padding: 24,
                    borderRadius: 'var(--radius)',
                    background: 'var(--bg-subtle)',
                    border: '1.5px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 18,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--blue-light)', color: 'var(--blue)', display: 'grid', placeItems: 'center' }}>
                      <BookOpen size={22} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--amber)', textTransform: 'uppercase' }}>
                        Course Manual
                      </span>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy)' }}>{book.title}</h4>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{book.edition} · {book.stock === 'held' ? 'Held at school' : 'On order'}</span>
                    </div>
                  </div>
                  <Link to="/books" className="btn btn--sm btn--outline">
                    View in Library
                  </Link>
                </div>
              )}
            </div>

            {/* Right Col: Course Logistics Card & WhatsApp Button */}
            <div>
              <div className="cart-summary-card">
                <div>
                  <span className="badge badge--green">Enrolment Open</span>
                  <h3 className="title-sm" style={{ marginTop: 4 }}>Enroll in {subject.code}</h3>
                  <p className="desc-md" style={{ marginTop: 6, fontSize: '0.875rem' }}>
                    Start private 1-on-1 ground school for {subject.title} at our Hargeisa campus.
                  </p>
                </div>

                <div style={{ display: 'grid', gap: 12, fontSize: '0.9375rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Standard</span>
                    <b style={{ color: 'var(--navy)' }}>ICAO Doc 7192</b>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Format</span>
                    <b style={{ color: 'var(--navy)' }}>1-on-1 Instruction</b>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Location</span>
                    <b style={{ color: 'var(--navy)' }}>Hargeisa, Somaliland</b>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Licence Prerequisite</span>
                    <b style={{ color: 'var(--navy)' }}>PPL & CPL Valid</b>
                  </div>
                </div>

                <Link
                  to="/register"
                  className="btn btn--primary"
                  style={{ width: '100%', padding: '14px 20px' }}
                >
                  Enroll in This Subject
                  <ArrowRight size={17} />
                </Link>

                <a
                  className="btn btn--whatsapp"
                  href={`${CONTACT.whatsapp}?text=${encodeURIComponent(`Hello, I am interested in enrolling for ${subject.code} (${subject.title}) at Stratosphere Aeronautics.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ width: '100%', padding: '14px 20px' }}
                >
                  <MessageCircle size={18} />
                  Ask via WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Prev / Next Pagination */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--border)', flexWrap: 'wrap', gap: 16 }}>
            {previous ? (
              <Link to={`/training/${index - 1}`} className="btn btn--outline btn--sm">
                <ArrowLeft size={15} /> Previous: {previous.code} {previous.title}
              </Link>
            ) : <span />}
            {next && (
              <Link to={`/training/${index + 1}`} className="btn btn--outline btn--sm">
                Next: {next.code} {next.title} <ArrowRight size={15} />
              </Link>
            )}
          </div>
        </div>
      </section>
    </Shell>
  );
}
