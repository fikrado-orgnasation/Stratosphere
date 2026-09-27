import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, MessageCircle } from 'lucide-react';
import Shell, { Filings, PageHead } from '../components/Shell';
import TiltCard from '../components/TiltCard';
import { BOOKS, CONTACT, SUBJECTS, SUBJECT_PHOTOS } from '../data/site';

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
              <TiltCard maxTilt={5} style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 28, boxShadow: 'var(--shadow-3d)', border: '1.5px solid var(--card-border)' }}>
                <img
                  src={photo}
                  alt={subject.title}
                  style={{ width: '100%', height: '340px', objectFit: 'cover' }}
                />
              </TiltCard>

              <h2 className="title-md" style={{ marginBottom: 20 }}>Topics Covered in {subject.title}</h2>
              <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
                {subject.topics.map((t) => (
                  <div
                    key={t}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: 18,
                      borderRadius: 'var(--radius-sm)',
                      background: '#ffffff',
                      border: '1px solid var(--card-border)',
                      boxShadow: 'var(--shadow-3d-sm)',
                    }}
                  >
                    <CheckCircle2 size={18} style={{ color: 'var(--gold-deep)', flexShrink: 0 }} />
                    <b style={{ color: 'var(--navy)', fontSize: '1rem', fontFamily: 'var(--font-serif)' }}>{t}</b>
                  </div>
                ))}
              </div>

              {/* Textbook Cross Reference */}
              {book && (
                <TiltCard
                  maxTilt={4}
                  style={{
                    padding: 26,
                    borderRadius: 'var(--radius)',
                    background: '#ffffff',
                    border: '1.5px solid var(--gold-border)',
                    boxShadow: 'var(--shadow-3d)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 18,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--gold-pale)', color: 'var(--gold-dark)', border: '1px solid var(--gold-border)', display: 'grid', placeItems: 'center' }}>
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold-deep)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Course Manual
                      </span>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy)' }}>{book.title}</h4>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{book.edition} · {book.stock === 'held' ? 'Held at school' : 'On order'}</span>
                    </div>
                  </div>
                  <Link to="/books" className="btn btn--sm btn--secondary">
                    View in Library
                  </Link>
                </TiltCard>
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

                <div style={{ display: 'grid', gap: 14, fontSize: '0.9375rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--card-border)', paddingBottom: 10 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Standard</span>
                    <b style={{ color: 'var(--navy)' }}>ICAO Doc 7192</b>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--card-border)', paddingBottom: 10 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Format</span>
                    <b style={{ color: 'var(--navy)' }}>1-on-1 Instruction</b>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--card-border)', paddingBottom: 10 }}>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--card-border)', flexWrap: 'wrap', gap: 16 }}>
            {previous ? (
              <Link to={`/training/${index - 1}`} className="btn btn--secondary btn--sm">
                <ArrowLeft size={15} /> Previous: {previous.code} {previous.title}
              </Link>
            ) : <span />}
            {next && (
              <Link to={`/training/${index + 1}`} className="btn btn--secondary btn--sm">
                Next: {next.code} {next.title} <ArrowRight size={15} />
              </Link>
            )}
          </div>
        </div>
      </section>
    </Shell>
  );
}
