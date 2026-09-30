import { Link } from 'react-router-dom';
import {
  ArrowRight, Award, CheckCircle2, Globe, MessageCircle, Shield, Target
} from 'lucide-react';
import Shell, { Ask, Filings, PageHead } from '../components/Shell';
import TiltCard from '../components/TiltCard';
import { ACCREDITATION, CONTACT } from '../data/site';

const VALUES = [
  { icon: Target, term: 'Academic Precision', gloss: 'If a calculation or heading can be verified, it gets verified. In aviation, theory is the part you cannot guess.' },
  { icon: Shield, term: 'Flight Safety Culture', gloss: 'Safety is the first principle we teach and the first benchmark we hold our instructors and students to.' },
  { icon: Award, term: 'Certified Integrity', gloss: 'We would rather tell a student a module is not ready than sign off an incomplete exam.' },
  { icon: Globe, term: 'International Standard', gloss: 'The standard is set by ICAO Doc 7192, and it does not bend because our campus is in Hargeisa.' },
];

export default function About() {
  return (
    <Shell>
      <PageHead
        kicker="Our Mission"
        title="Somaliland's Aviation Ground School"
        lede="Stratosphere Aeronautics was founded in Hargeisa so that the theoretical knowledge behind an international aviation licence could be studied locally — thoroughly, affordably, and to a standard that travels globally."
      />

      <Filings />

      {/* ── 01 The School Story ────────────────────────────────────────────── */}
      <section className="section">
        <div className="shell">
          <div className="school-hero__grid" style={{ alignItems: 'center' }}>
            <div style={{ display: 'grid', gap: 18 }}>
              <span className="badge badge--gold">Founded in Hargeisa</span>
              <h2 className="title-md">Bringing World-Class Ground School to the Horn of Africa.</h2>
              <p className="desc-md">
                Until recently, anyone in Somaliland pursuing a career as a commercial aviator,
                flight dispatcher, or aviation manager had to travel to Europe, South Africa, or the
                Middle East just to complete their basic aviation theory exams.
              </p>
              <p className="desc-md">
                Stratosphere Aeronautics was established in Hargeisa to remove that barrier. Students can
                now complete the full ten-subject theoretical prerequisite right here at home, with
                one-on-one instruction from certified flight instructors, without prohibitive foreign
                tuition fees and travel visa hurdles.
              </p>
              <div style={{ display: 'flex', gap: 14, marginTop: 10, flexWrap: 'wrap' }}>
                <Link to="/register" className="btn btn--primary">
                  Enroll in Ground School <ArrowRight size={16} />
                </Link>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--whatsapp"
                >
                  <MessageCircle size={18} />
                  Speak with Admissions
                </a>
              </div>
            </div>

            <TiltCard
              maxTilt={6}
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-3d)',
                border: '1.5px solid var(--card-border)',
              }}
            >
              <img
                src="/images/aviation/about.jpg"
                alt="Stratosphere Aeronautics ground school instruction in Hargeisa"
                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
              />
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ── 02 Academic Values ─────────────────────────────────────────────── */}
      <section className="section section--subtle">
        <div className="shell">
          <div className="section-head">
            <span className="badge badge--gold">Core Principles</span>
            <h2 className="title-md">What We Stand For</h2>
            <p className="desc-md">
              Aviation demands uncompromising rigor. Here are the values that govern our academy.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 24 }}>
            {VALUES.map((v) => (
              <TiltCard
                key={v.term}
                maxTilt={5}
                className="panel"
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--gold-pale)', color: 'var(--gold-dark)', border: '1px solid var(--gold-border)', display: 'grid', placeItems: 'center' }}>
                  <v.icon size={24} />
                </div>
                <h3 className="title-sm">{v.term}</h3>
                <p className="desc-md">{v.gloss}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 Institutional Recognition & Accreditations ──────────────────── */}
      <section className="section">
        <div className="shell">
          <div className="section-head">
            <span className="badge">Accreditations & Partnerships</span>
            <h2 className="title-md">Aligned to International Standards</h2>
            <p className="desc-md">
              We teach according to the international benchmarks that global civil aviation authorities demand.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 20 }}>
            {ACCREDITATION.map((a) => (
              <TiltCard
                key={a}
                maxTilt={4}
                className="panel panel--tight panel--flex"
                style={{ justifyContent: 'flex-start' }}
              >
                <CheckCircle2 size={22} style={{ color: 'var(--gold-deep)', flexShrink: 0 }} />
                <b style={{ color: 'var(--navy)', fontSize: '0.95rem' }}>{a}</b>
              </TiltCard>
            ))}
          </div>

          <TiltCard
            maxTilt={4}
            className="panel panel--roomy panel--lg panel--gold panel--flex"
            style={{ marginTop: 48, gap: 24 }}
          >
            <div>
              <span className="badge badge--green">Hargeisa Campus Location</span>
              <h3 className="title-sm" style={{ marginTop: 6 }}>Visit Our School Offices</h3>
              <p className="desc-md">
                Bahsane Building, 2nd Floor, Room 213 · Hargeisa, Somaliland
              </p>
            </div>
            <Link to="/contact" className="btn btn--secondary">
              Campus Map & Visiting Hours <ArrowRight size={16} />
            </Link>
          </TiltCard>
        </div>
      </section>

      <Ask
        title="Want to Visit Our Campus?"
        body="Drop by our school in Bahsane Building or send a WhatsApp message to book a guided walk-through of our study facilities and textbooks."
      />
    </Shell>
  );
}
