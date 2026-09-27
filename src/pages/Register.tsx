import { useState, useMemo, useCallback } from 'react';
import {
  Check, MessageCircle
} from 'lucide-react';
import Shell, { Filings, PageHead } from '../components/Shell';
import TiltCard from '../components/TiltCard';
import { ZohoCrmForm } from '../components/ZohoCrmForm';
import { CONTACT, FAQS, SUBJECTS, SUBJECT_PHOTOS } from '../data/site';

const STAGES = [
  { code: '01', title: 'Tell Us Where You Are', body: 'Starting from zero or already flying — both work. It changes the order we suggest, not whether you can begin.' },
  { code: '02', title: 'Pick Your Subjects', body: 'Take a single subject to see how it goes, or enroll for the full PPL/CPL theory package.' },
  { code: '03', title: 'Free Consultation', body: 'We give you a transparent timeline and tuition quote, and tell you honestly how many hours a week to plan.' },
  { code: '04', title: 'Collect Materials & Begin', body: 'Pick up your physical textbooks at the school in Hargeisa and start your private instruction schedule.' },
];

export default function Register() {
  const [picked, setPicked] = useState<string[]>(['M01', 'M02']);

  const toggle = useCallback((code: string) => {
    setPicked((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  }, []);

  const selectAll = () => setPicked(SUBJECTS.map((s) => s.code));
  const clearAll = () => setPicked([]);

  const { title, message } = useMemo(() => {
    if (picked.length === 0) {
      return {
        title: 'Ten-Subject Full Programme Enquiry',
        message: 'Hello, I would like to enquire about the complete 10-subject aviation theory programme at Stratosphere Aeronautics. Please send me the timetable and tuition info.',
      };
    }
    if (picked.length === 1) {
      const s = SUBJECTS.find((x) => x.code === picked[0]);
      return {
        title: `${picked[0]} · ${s?.title ?? ''}`,
        message: `Hello, I would like to enroll in ${picked[0]} (${s?.title}) at Stratosphere Aeronautics. When is the next available session?`,
      };
    }
    return {
      title: `${picked.length} Subjects Selected`,
      message: `Hello, I would like to enroll in the following subjects at Stratosphere Aeronautics: ${picked.join(', ')}. Please send me the schedule and tuition breakdown.`,
    };
  }, [picked]);

  return (
    <Shell>
      <PageHead
        kicker="Course Enrolment"
        title="Register for Aviation Ground School"
        lede="No previous aviation experience needed. Select your modules below, and our admissions office will send your timetable and fee quote within 24 hours."
      />

      <Filings />

      <section className="section">
        <div className="shell">
          <div className="register-layout">
            {/* Left Col: Subject Cards */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 14 }}>
                <div>
                  <h2 className="title-md">Choose Your Subjects</h2>
                  <p className="desc-md">Click any module to add or remove it from your enquiry.</p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button type="button" onClick={selectAll} className="btn btn--sm btn--secondary">
                    Select All 10
                  </button>
                  <button type="button" onClick={clearAll} className="btn btn--sm btn--outline-white" style={{ color: 'var(--navy)', borderColor: 'var(--card-border)' }}>
                    Clear
                  </button>
                </div>
              </div>

              <div className="class-picker-grid">
                {SUBJECTS.map((s) => {
                  const isSelected = picked.includes(s.code);
                  return (
                    <div
                      key={s.code}
                      className={`class-card-item ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => toggle(s.code)}
                    >
                      <img
                        src={SUBJECT_PHOTOS[s.code]}
                        alt={s.title}
                        className="class-card-item__img"
                        loading="lazy"
                      />
                      <div className="class-card-item__info">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span className="class-card-item__code">{s.code} · ICAO</span>
                          <span
                            style={{
                              width: 22,
                              height: 22,
                              borderRadius: 6,
                              border: isSelected ? 'none' : '1.5px solid var(--border-subtle)',
                              backgroundColor: isSelected ? 'var(--gold-deep)' : 'transparent',
                              display: 'grid',
                              placeItems: 'center',
                              color: '#ffffff',
                              transition: 'all 0.2s var(--ease)',
                            }}
                          >
                            {isSelected && <Check size={14} strokeWidth={3} />}
                          </span>
                        </div>
                        <h4 className="class-card-item__title">{s.title}</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
                          {s.topics.slice(0, 2).map((t) => (
                            <span
                              key={t}
                              style={{
                                fontSize: '0.72rem',
                                padding: '2px 8px',
                                background: 'var(--bg-subtle)',
                                borderRadius: 4,
                                color: 'var(--text-muted)',
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Col: Sticky Cart Summary & Direct WhatsApp Send */}
            <div>
              <div className="cart-summary-card">
                <div>
                  <span className="badge badge--green">Admissions Desk</span>
                  <h3 className="title-sm" style={{ marginTop: 4 }}>{title}</h3>
                  <p className="desc-md" style={{ marginTop: 6, fontSize: '0.875rem' }}>
                    {picked.length === 0
                      ? 'Full 10-subject comprehensive ground school course.'
                      : `${picked.length} of 10 subjects chosen.`}
                  </p>
                </div>

                {picked.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {picked.map((code) => (
                      <span
                        key={code}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          padding: '4px 10px',
                          borderRadius: 6,
                          background: 'var(--gold-pale)',
                          color: 'var(--gold-dark)',
                          border: '1px solid var(--gold-border)',
                        }}
                      >
                        {code}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggle(code);
                          }}
                          style={{ color: 'var(--gold-deep)', fontWeight: 'bold', cursor: 'pointer' }}
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Direct WhatsApp CTA */}
                <a
                  className="btn btn--whatsapp"
                  href={`${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ width: '100%', padding: '14px 20px' }}
                >
                  <MessageCircle size={20} />
                  Send Enquiry on WhatsApp
                </a>

                <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)', textAlign: 'center' }}>
                  Fast reply directly from our Hargeisa admissions team.
                </p>

                <hr style={{ border: 0, height: 1, backgroundColor: 'var(--card-border)' }} />

                {/* Zoho CRM Form */}
                <div>
                  <b style={{ fontSize: '0.9375rem', color: 'var(--navy)', display: 'block', marginBottom: 16 }}>
                    Submit Enquiry via Form
                  </b>
                  <ZohoCrmForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 How Registration Works ───────────────────────────────────────── */}
      <section className="section section--subtle">
        <div className="shell">
          <div className="section-head">
            <span className="badge badge--gold">Simple Process</span>
            <h2 className="title-md">How Enrolment Works</h2>
            <p className="desc-md">
              From your first WhatsApp message to collecting your textbook and sitting
              with your instructor.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {STAGES.map((s) => (
              <TiltCard
                key={s.code}
                maxTilt={5}
                style={{
                  padding: 28,
                  borderRadius: 'var(--radius)',
                  background: '#ffffff',
                  border: '1px solid var(--card-border)',
                  boxShadow: 'var(--shadow-3d)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--gold-deep)', display: 'block', marginBottom: 8 }}>
                  {s.code}
                </span>
                <b style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--navy)', display: 'block', marginBottom: 8 }}>
                  {s.title}
                </b>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {s.body}
                </p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 FAQs ─────────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="shell" style={{ maxWidth: 860 }}>
          <div className="section-head">
            <span className="badge">Frequently Asked Questions</span>
            <h2 className="title-md">Questions Before Enrolling</h2>
          </div>

          <div style={{ display: 'grid', gap: 16 }}>
            {FAQS.map((faq) => (
              <TiltCard
                key={faq.q}
                maxTilt={3}
                style={{
                  padding: 24,
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--card-border)',
                  background: '#ffffff',
                  boxShadow: 'var(--shadow-3d-sm)',
                }}
              >
                <b style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)', fontSize: '1.1rem', display: 'block', marginBottom: 8 }}>
                  {faq.q}
                </b>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65 }}>
                  {faq.a}
                </p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  );
}
