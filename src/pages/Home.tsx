import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, ChevronRight, GraduationCap, MessageCircle
} from 'lucide-react';
import Shell, { Ask, Filings } from '../components/Shell';
import CinematicAtmosphere from '../components/CinematicAtmosphere';
import TiltCard from '../components/TiltCard';
import { CONTACT, FLEET, FLEET_PHOTOS, STUDENT_JOURNEY, SUBJECTS, SUBJECT_PHOTOS } from '../data/site';

export default function Home() {
  return (
    <Shell>
      {/* ── 01 School Hero Banner with 3D Aviation Background ─────────────── */}
      <section className="school-hero">
        <CinematicAtmosphere />
        <div className="shell school-hero__grid">
          <div className="school-hero__content">
            <span className="badge badge--white">
              <GraduationCap size={15} style={{ color: 'var(--gold-light)' }} />
              Aviation Ground School · Hargeisa, Somaliland
            </span>

            <h1 className="title-lg">
              Stratosphere Aeronautics Theoretical Knowledge Instruction.
            </h1>

            <p className="desc-lg" style={{ color: '#e2e8f0' }}>
              Somaliland's premier aviation ground school. Ten ICAO-aligned subjects
              taught one to one by ERNAM-trained instructors. Start with one subject
              or complete the full course.
            </p>

            <div className="school-hero__actions">
              <Link to="/register" className="btn btn--primary">
                Enroll for a Subject
                <ArrowRight size={17} />
              </Link>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="btn btn--whatsapp"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
              <Link to="/training" className="btn btn--outline-white">
                View Full Syllabus
              </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 12, fontSize: '0.875rem', color: '#cbd5e1', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={16} style={{ color: 'var(--wa)' }} />
                No prior flight experience required
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={16} style={{ color: 'var(--wa)' }} />
                Flexible morning & evening schedules
              </span>
            </div>
          </div>

          <TiltCard maxTilt={8} className="school-hero__image-card">
            <img
              src="/somali_teacher_hero.jpg"
              alt="Somali aviation instructor teaching one-to-one in Hargeisa"
              className="school-hero__image"
            />
            <div className="school-hero__overlay-badge">
              <div>
                <b>1-on-1 Instruction, Always</b>
                <span>Every subject taught privately at your own pace.</span>
              </div>
              <span className="badge badge--green" style={{ margin: 0 }}>Active Enrolment</span>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* ── 02 Trust & Accreditation Strip ─────────────────────────────────── */}
      <Filings />

      {/* ── 03 School Key Statistics ───────────────────────────────────────── */}
      <section className="stats-strip">
        <div className="shell">
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-val">10</span>
              <span className="stat-label">ICAO Theoretical Subjects</span>
            </div>
            <div className="stat-item">
              <span className="stat-val">1:1</span>
              <span className="stat-label">Private Personal Instruction</span>
            </div>
            <div className="stat-item">
              <span className="stat-val">100%</span>
              <span className="stat-label">Textbooks Kept in Stock</span>
            </div>
            <div className="stat-item">
              <span className="stat-val">ERNAM</span>
              <span className="stat-label">Certified Instructors</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 Why Choose Stratosphere (Photo Features) ────────────────────── */}
      <section className="section section--subtle">
        <div className="shell">
          <div className="section-head">
            <span className="badge">Why Study With Us</span>
            <h2 className="title-md">Designed for Serious Aviation Careers.</h2>
            <p className="desc-md">
              Aviation ground school is the foundation of every aviation professional,
              flight dispatcher, and safety officer. Here is how we make sure you master it.
            </p>
          </div>

          <div className="features-grid">
            {/* Card 1 */}
            <TiltCard maxTilt={6} className="photo-feature-card">
              <div className="photo-feature-card__img-wrap">
                <img
                  src="/images/aviation/feat_1on1.jpg"
                  alt="One on one aviation teaching in ground school"
                  className="photo-feature-card__img"
                />
                <span className="badge badge--gold photo-feature-card__badge">1-on-1 Learning</span>
              </div>
              <div className="photo-feature-card__content">
                <h3 className="photo-feature-card__title">One to One, Always</h3>
                <p className="photo-feature-card__desc">
                  There are no crowded lecture halls here. You sit directly with your instructor,
                  asking every question without feeling rushed.
                </p>
                <Link to="/about" className="course-card__link" style={{ marginTop: 'auto' }}>
                  Learn about our instructors <ChevronRight size={15} />
                </Link>
              </div>
            </TiltCard>

            {/* Card 2 */}
            <TiltCard maxTilt={6} className="photo-feature-card">
              <div className="photo-feature-card__img-wrap">
                <img
                  src="/images/aviation/feat_icao.jpg"
                  alt="Aircraft wing in flight over clouds"
                  className="photo-feature-card__img"
                />
                <span className="badge badge--green photo-feature-card__badge">Global Standard</span>
              </div>
              <div className="photo-feature-card__content">
                <h3 className="photo-feature-card__title">ICAO Doc 7192 Aligned</h3>
                <p className="photo-feature-card__desc">
                  Our curriculum follows the international civil aviation syllabus.
                  The certificate you earn travels with you to any academy abroad.
                </p>
                <Link to="/training" className="course-card__link" style={{ marginTop: 'auto' }}>
                  Explore the 10 subjects <ChevronRight size={15} />
                </Link>
              </div>
            </TiltCard>

            {/* Card 3 */}
            <TiltCard maxTilt={6} className="photo-feature-card">
              <div className="photo-feature-card__img-wrap">
                <img
                  src="/images/aviation/feat_books.jpg"
                  alt="Aviation textbooks on student study desk"
                  className="photo-feature-card__img"
                />
                <span className="badge badge--gold photo-feature-card__badge">In Stock</span>
              </div>
              <div className="photo-feature-card__content">
                <h3 className="photo-feature-card__title">Physical Textbooks in Stock</h3>
                <p className="photo-feature-card__desc">
                  Every enrolled student gets access to real print textbooks held right at our Hargeisa
                  campus. You do not have to hunt for pirated digital files.
                </p>
                <Link to="/books" className="course-card__link" style={{ marginTop: 'auto' }}>
                  Browse our library <ChevronRight size={15} />
                </Link>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ── 05 Ground School Courses Preview ───────────────────────────────── */}
      <section className="section">
        <div className="shell">
          <div className="section-head">
            <span className="badge">Curriculum</span>
            <h2 className="title-md">The Ten Theoretical Knowledge Subjects.</h2>
            <p className="desc-md">
              Everything the written requirement for an aviation licence asks you to master.
              Enroll in individual subjects or complete the full programme.
            </p>
          </div>

          <div className="courses-grid">
            {SUBJECTS.slice(0, 6).map((s, i) => (
              <TiltCard key={s.code} maxTilt={6} className="course-card">
                <div className="course-card__image-wrap">
                  <img
                    src={SUBJECT_PHOTOS[s.code]}
                    alt={s.title}
                    className="course-card__image"
                    loading="lazy"
                  />
                  <span className="course-card__code">{s.code}</span>
                </div>
                <div className="course-card__body">
                  <h3 className="course-card__title">{s.title}</h3>
                  <div className="course-card__topics">
                    {s.topics.slice(0, 3).map((t) => (
                      <span key={t} className="course-card__topic-tag">{t}</span>
                    ))}
                  </div>
                  <div className="course-card__footer">
                    <Link to={`/training/${i + 1}`} className="course-card__link">
                      Syllabus & Exam <ArrowRight size={14} />
                    </Link>
                    <Link to="/register" className="btn btn--sm btn--primary">
                      Enroll
                    </Link>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/training" className="btn btn--secondary">
              View All 10 Subjects with Exam Details
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 06 Training Fleet Showcase ─────────────────────────────────────── */}
      <section className="section section--subtle">
        <div className="shell">
          <div className="section-head">
            <span className="badge badge--gold">Our Fleet</span>
            <h2 className="title-md">The Aircraft You Are Learning About.</h2>
            <p className="desc-md">
              Our theoretical knowledge connects directly with standard training aircraft
              used worldwide for Private and Commercial licence training.
            </p>
          </div>

          <div className="fleet-grid">
            {FLEET.map((f, idx) => (
              <TiltCard key={f.tail} maxTilt={6} className="fleet-card">
                <img
                  src={FLEET_PHOTOS[idx]}
                  alt={f.type}
                  className="fleet-card__img"
                  loading="lazy"
                />
                <div className="fleet-card__body">
                  <span className="fleet-card__role">{f.role}</span>
                  <h3 className="fleet-card__type">{f.type}</h3>
                  <span className="fleet-card__tail">Tail Identifier: {f.tail}</span>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07 The Student Journey (Four Clear Steps) ───────────────────────── */}
      <section className="section">
        <div className="shell">
          <div className="section-head">
            <span className="badge">Admissions Journey</span>
            <h2 className="title-md">Four Steps from Enrolment to Certificate.</h2>
            <p className="desc-md">
              Clear, transparent milestones. No surprise fees and no wasted time.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {STUDENT_JOURNEY.map((step) => (
              <TiltCard
                key={step.code}
                maxTilt={5}
                style={{
                  padding: 28,
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--card-border)',
                  background: '#ffffff',
                  boxShadow: 'var(--shadow-3d)',
                  display: 'grid',
                  gap: 12,
                }}
              >
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--gold-deep)' }}>
                  {step.code}
                </span>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--navy)' }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {step.body}
                </p>
              </TiltCard>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link to="/register" className="btn btn--primary">
              Start Step 1: Free Consultation
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 08 School Ask Banner with Green WhatsApp ───────────────────────── */}
      <Ask
        title="Ready to Start Your Ground School in Hargeisa?"
        body="Message our admissions team on WhatsApp or submit an enquiry. We will give you a real schedule, genuine advice, and answer all questions within 24 hours."
      />
    </Shell>
  );
}
