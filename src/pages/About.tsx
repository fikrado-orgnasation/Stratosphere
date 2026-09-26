import { Link } from 'react-router-dom';
import {
  ArrowRight, Award, CheckCircle2, Globe, MessageCircle, Shield, Target
} from 'lucide-react';
import Shell, { Ask, Filings, PageHead } from '../components/Shell';
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
        title="Somalia & Somaliland’s Aviation Ground School"
        lede="Stratosphere Aeronautics was founded in Hargeisa so that the theoretical knowledge behind an international aviation licence could be studied locally — thoroughly, affordably, and to a standard that travels globally."
      />

      <Filings />

      {/* ── 01 The School Story ────────────────────────────────────────────── */}
      <section className="section">
        <div className="shell">
          <div className="school-hero__grid" style={{ alignItems: 'center' }}>
            <div style={{ display: 'grid', gap: 18 }}>
              <span className="badge">Founded in Hargeisa</span>
              <h2 className="title-md">Bringing World-Class Ground School to the Horn of Africa.</h2>
              <p className="desc-md">
                Until recently, anyone in Somaliland or Somalia pursuing a career as a commercial pilot,
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

            <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              <img
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
                alt="Stratosphere Aeronautics ground school instruction in Hargeisa"
                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 Academic Values ─────────────────────────────────────────────── */}
      <section className="section section--subtle">
        <div className="shell">
          <div className="section-head">
            <span className="badge badge--amber">Core Principles</span>
            <h2 className="title-md">What We Stand For</h2>
            <p className="desc-md">
              Aviation demands uncompromising rigor. Here are the values that govern our academy.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {VALUES.map((v) => (
              <div
                key={v.term}
                style={{
                  padding: 28,
                  borderRadius: 'var(--radius)',
                  background: '#ffffff',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'grid',
                  gap: 12,
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--blue-light)', color: 'var(--blue)', display: 'grid', placeItems: 'center' }}>
                  <v.icon size={22} />
                </div>
                <h3 className="title-sm">{v.term}</h3>
                <p className="desc-md">{v.gloss}</p>
              </div>
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {ACCREDITATION.map((a) => (
              <div
                key={a}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: 20,
                  borderRadius: 'var(--radius)',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                }}
              >
                <CheckCircle2 size={22} style={{ color: 'var(--blue)', flexShrink: 0 }} />
                <b style={{ color: 'var(--navy)', fontSize: '0.9375rem' }}>{a}</b>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 48,
              padding: 32,
              borderRadius: 'var(--radius-lg)',
              background: '#f8fafc',
              border: '1.5px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 24,
            }}
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
          </div>
        </div>
      </section>

      <Ask
        title="Want to Visit Our Campus?"
        body="Drop by our school in Bahsane Building or send a WhatsApp message to book a guided walk-through of our study facilities and textbooks."
      />
    </Shell>
  );
}
