import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Shell, { Ask, Filings, PageHead } from '../components/Shell';
import { ADVANTAGES } from '../data/site';

const GALLERY_PHOTOS = [
  { url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=700&q=80', caption: 'One-on-One Ground School Instruction' },
  { url: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=700&q=80', caption: 'High Altitude Theory in Principles of Flight' },
  { url: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=700&q=80', caption: 'Glass Cockpit Navigation & Garmin Avionics' },
  { url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=700&q=80', caption: 'Physical Textbooks Held at Hargeisa Campus' },
  { url: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=700&q=80', caption: 'Airframe & Systems Pre-Flight Walkaround' },
  { url: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=700&q=80', caption: 'Collaborative Problem-Solving & Flight Logs' },
];

export default function StudentLife() {
  return (
    <Shell>
      <PageHead
        kicker="Student Experience"
        title="Inside Student Life at Stratosphere"
        lede="Ground school is intense, intellectually rewarding, and deeply personal. Here is what day-to-day study looks like at our Hargeisa ground school."
      />

      <Filings />

      {/* ── 01 Visual Photo Gallery Advertising Student Life ────────────────── */}
      <section className="section">
        <div className="shell">
          <div className="section-head">
            <span className="badge">Life at the School</span>
            <h2 className="title-md">Theory in Action at Hargeisa Campus</h2>
            <p className="desc-md">
              A look inside our classrooms, study materials, flight deck simulations, and student sessions.
            </p>
          </div>

          <div className="gallery-grid">
            {GALLERY_PHOTOS.map((item, idx) => (
              <div key={idx} className="gallery-item" style={{ position: 'relative' }}>
                <img src={item.url} alt={item.caption} loading="lazy" />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '12px 14px',
                    background: 'linear-gradient(transparent, rgba(10, 25, 49, 0.85))',
                    color: '#ffffff',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                  }}
                >
                  {item.caption}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 The 6 School Commitments ────────────────────────────────────── */}
      <section className="section section--subtle">
        <div className="shell">
          <div className="section-head">
            <span className="badge badge--amber">Our Promise</span>
            <h2 className="title-md">Six Commitments to Every Enrolled Student</h2>
            <p className="desc-md">
              Every flight school promises quality. These are the specific guarantees we deliver.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {ADVANTAGES.map((a) => (
              <div
                key={a.title}
                style={{
                  padding: 24,
                  borderRadius: 'var(--radius)',
                  background: '#ffffff',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <CheckCircle2 size={20} style={{ color: 'var(--blue)' }} />
                  <b style={{ color: 'var(--navy)', fontSize: '1.1rem' }}>{a.title}</b>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                  {a.body}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <Link to="/register" className="btn btn--primary">
              Enroll and Begin Your Journey
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Ask
        title="Ready to Join Our Next Intake?"
        body="Message admissions directly on WhatsApp. We can arrange a tour of our study materials and discuss your aviation training goals."
      />
    </Shell>
  );
}
