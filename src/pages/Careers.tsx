import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import Shell, { Ask, Filings, PageHead } from '../components/Shell';
import TiltCard from '../components/TiltCard';
import { CAREERS, CONTACT } from '../data/site';

export default function Careers() {
  return (
    <Shell>
      <PageHead
        kicker="Industry Routes"
        title="Aviation Career Pathways"
        lede="Aviation theory opens doors across the entire industry. Discover the roles where ICAO theoretical knowledge is the deciding qualification."
      />

      <Filings />

      {/* ── 01 Two Core Pathways ────────────────────────────────────────────── */}
      <section className="section">
        <div className="shell">
          <div className="section-head">
            <span className="badge">Career Opportunities</span>
            <h2 className="title-md">Two Routes Into the Aviation Industry</h2>
            <p className="desc-md">
              Whether you want to command an airliner in the skies or run flight operations on the ground,
              your career begins with theoretical ground school.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 32 }}>
            {/* Pathway 1: Flying */}
            <TiltCard
              maxTilt={6}
              className="panel panel--lg panel--flush"
            >
              <img
                src="/images/aviation/careers_pilot.jpg"
                alt="Commercial aviator in cockpit"
                style={{ width: '100%', height: '220px', objectFit: 'cover' }}
              />
              <div style={{ padding: 28, display: 'grid', gap: 14 }}>
                <span className="badge badge--gold">Flying Path</span>
                <h3 className="title-sm">Commercial & Private Licence (PPL / CPL)</h3>
                <p className="desc-md">
                  Every civil aviation authority requires passing comprehensive theoretical exams before
                  granting licence wings. Completing our 10 ICAO subjects gives you the certified written
                  foundation before flight training hours.
                </p>
                <div style={{ display: 'grid', gap: 8, marginTop: 4 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', color: 'var(--navy)', fontWeight: 600 }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--wa)' }} />
                    Private Licence (PPL) theory
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', color: 'var(--navy)', fontWeight: 600 }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--wa)' }} />
                    Commercial Licence (CPL) theory
                  </span>
                </div>
                <Link to="/register" className="btn btn--primary" style={{ marginTop: 10 }}>
                  Enroll in Licence Theory Package <ArrowRight size={16} />
                </Link>
              </div>
            </TiltCard>

            {/* Pathway 2: Operations & Ground Careers */}
            <TiltCard
              maxTilt={6}
              className="panel panel--lg panel--flush"
            >
              <img
                src="/images/aviation/careers_dispatch.jpg"
                alt="Flight dispatch and air traffic management"
                style={{ width: '100%', height: '220px', objectFit: 'cover' }}
              />
              <div style={{ padding: 28, display: 'grid', gap: 14 }}>
                <span className="badge badge--green">Ground & Operations</span>
                <h3 className="title-sm">Flight Operations, Dispatch & Safety</h3>
                <p className="desc-md">
                  Airlines, airports, and charter operators require certified flight dispatchers, loadmasters,
                  and SMS safety coordinators who deeply understand meteorology, airspace law, and aircraft systems.
                  No flight hours required.
                </p>
                <div style={{ display: 'grid', gap: 8, marginTop: 4 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', color: 'var(--navy)', fontWeight: 600 }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--wa)' }} />
                    Flight Dispatch & Operations Officer
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', color: 'var(--navy)', fontWeight: 600 }}>
                    <CheckCircle2 size={16} style={{ color: 'var(--wa)' }} />
                    Safety Management Systems (SMS) Coordinator
                  </span>
                </div>
                <a
                  href={`${CONTACT.whatsapp}?text=${encodeURIComponent('Hello, I am interested in aviation career training for flight dispatch and operations.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn--whatsapp"
                  style={{ marginTop: 10 }}
                >
                  <MessageCircle size={18} />
                  Consult Career Path on WhatsApp
                </a>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* ── 02 Detailed Aviation Roles ─────────────────────────────────────── */}
      <section className="section section--subtle">
        <div className="shell">
          <div className="section-head">
            <span className="badge badge--gold">Employment Roles</span>
            <h2 className="title-md">Aviation Careers Unlocked by Ground School</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: 24 }}>
            {CAREERS.map((c) => (
              <TiltCard
                key={c.code}
                maxTilt={5}
                className="panel"
              >
                <span style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--gold-deep)', fontFamily: 'var(--font-mono)' }}>
                  {c.code}
                </span>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--navy)', marginBlock: '8px 12px' }}>
                  {c.title}
                </h4>
                <ul style={{ display: 'grid', gap: 8, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  {c.roles.map((r) => (
                    <li key={r} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: 'var(--gold-deep)', fontWeight: 'bold' }}>•</span> {r}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <Ask
        title="Unsure Which Aviation Path Fits Your Background?"
        body="Message our team on WhatsApp for a free career mapping discussion. We will advise you on the exact subjects suited for your ambition."
      />
    </Shell>
  );
}
