import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, ChevronRight, GraduationCap, MessageCircle
} from 'lucide-react';
import Shell, { Ask, Filings } from '../components/Shell';
import CinematicAtmosphere from '../components/CinematicAtmosphere';
import TiltCard from '../components/TiltCard';
import { CONTACT, FLEET, FLEET_PHOTOS, STUDENT_JOURNEY, FACEBOOK_VIDEOS } from '../data/site';

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
              Aviation Training Academy · Hargeisa, Somaliland
            </span>

            <h1 className="title-lg">
              Stratosphere Aeronautics Master Aviation Training Course.
            </h1>

            <p className="desc-lg" style={{ color: '#e2e8f0' }}>
              Somaliland's premier aviation training academy. One comprehensive course covering
              34 aviation operations topics across flight operations, safety, air traffic, and
              management — taught one to one by ERNAM-trained instructors.
            </p>

            <div className="school-hero__actions">
              <Link to="/register" className="btn btn--primary">
                Enroll for a Course
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
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 12, fontSize: '0.875rem', color: '#cbd5e1', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={16} style={{ color: 'var(--wa)' }} />
                No prior aviation experience required
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
                <span>One complete master course taught privately at your own pace.</span>
              </div>
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
              <span className="stat-val">34</span>
              <span className="stat-label">Aviation Training Programs</span>
            </div>
            <div className="stat-item">
              <span className="stat-val">1:1</span>
              <span className="stat-label">Private Personal Instruction</span>
            </div>
            <div className="stat-item">
              <span className="stat-val">4</span>
              <span className="stat-label">Career Category Pathways</span>
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
              Aviation training is the foundation of every aviation professional,
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
                <Link to="/register" className="course-card__link" style={{ marginTop: 'auto' }}>
                  Enroll in the master course <ChevronRight size={15} />
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: 24 }}>
            {STUDENT_JOURNEY.map((step) => (
              <TiltCard
                key={step.code}
                maxTilt={5}
                className="panel"
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

      {/* ── 08 Facebook Videos Showcase ─────────────────────────────────────── */}
      <section className="section section--subtle">
        <div className="shell">
          <div className="section-head">
            <span className="badge badge--gold">Watch Us on Facebook</span>
            <h2 className="title-md">See Our Academy in Action.</h2>
            <p className="desc-md">
              Get a glimpse of life at Stratosphere Aeronautics — our campus, our training, and our students.
            </p>
          </div>

          <div className="fb-videos-grid">
            {FACEBOOK_VIDEOS.map((video) => (
              <div key={video.id} className="fb-video-card">
                <div className="fb-video-card__frame-wrap">
                  <iframe
                    src={video.embedUrl}
                    title={video.title}
                    className="fb-video-card__frame"
                    scrolling="no"
                    frameBorder={0}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="fb-video-card__link"
                >
                  Watch on Facebook <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link to="/community" className="btn btn--secondary">
              View Our Facebook Community
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 09 School Ask Banner with Green WhatsApp ───────────────────────── */}
      <Ask
        title="Ready to Start Your Aviation Training in Hargeisa?"
        body="Message our admissions team on WhatsApp or submit an enquiry. We will give you a real schedule, genuine advice, and answer all questions within 24 hours."
      />
    </Shell>
  );
}
