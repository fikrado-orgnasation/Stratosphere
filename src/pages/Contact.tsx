import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Shell, { Filings, PageHead } from '../components/Shell';
import TiltCard from '../components/TiltCard';
import { CONTACT } from '../data/site';

export default function Contact() {
  return (
    <Shell>
      <PageHead
        kicker="Admissions Office"
        title="Contact Stratosphere Aeronautics"
        lede="Have questions about aviation ground school, course schedules, or tuition? Reach our admissions desk in Hargeisa through WhatsApp, phone, or email."
      />

      <Filings />

      <section className="section">
        <div className="shell">
          <h2 className="title-md" style={{ marginBottom: 24 }}>Get in Touch</h2>

          <div style={{ display: 'grid', gap: 20, maxWidth: 720 }}>
                {/* WhatsApp Admissions Card */}
                <TiltCard
                  maxTilt={4}
                  style={{
                    padding: 26,
                    borderRadius: 'var(--radius)',
                    background: 'linear-gradient(145deg, #ffffff 0%, #f0fdf4 100%)',
                    border: '1.5px solid #86efac',
                    boxShadow: 'var(--shadow-3d)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 16,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #2fe06f, #1ea952)',
                        color: '#ffffff',
                        display: 'grid',
                        placeItems: 'center',
                        boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
                      }}
                    >
                      <MessageCircle size={26} />
                    </div>
                    <div>
                      <b style={{ color: 'var(--navy)', fontSize: '1.15rem', display: 'block', fontFamily: 'var(--font-serif)' }}>
                        WhatsApp Admissions
                      </b>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        Instant chat with our flight school registrar
                      </span>
                    </div>
                  </div>
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--whatsapp btn--sm"
                  >
                    Open WhatsApp Chat
                  </a>
                </TiltCard>

                {/* Telephone Card */}
                <TiltCard
                  maxTilt={4}
                  className="panel"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Phone size={20} style={{ color: 'var(--gold-deep)' }} />
                    <b style={{ color: 'var(--navy)', fontSize: '1.05rem', fontFamily: 'var(--font-serif)' }}>Telephone Direct Lines</b>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                    {CONTACT.phones.map((p) => (
                      <a
                        key={p.display}
                        href={p.href}
                        className="btn btn--sm btn--secondary"
                      >
                        {p.display}
                      </a>
                    ))}
                  </div>
                </TiltCard>

                {/* Physical Location Card */}
                <TiltCard
                  maxTilt={4}
                  className="panel"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <MapPin size={20} style={{ color: 'var(--gold-deep)' }} />
                    <b style={{ color: 'var(--navy)', fontSize: '1.05rem', fontFamily: 'var(--font-serif)' }}>Campus Address</b>
                  </div>
                  <address style={{ fontStyle: 'normal', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {CONTACT.lines.map((l) => <span key={l} style={{ display: 'block' }}>{l}</span>)}
                    <span style={{ display: 'block', fontWeight: 700, color: 'var(--navy)', marginTop: 4 }}>
                      {CONTACT.city}
                    </span>
                  </address>
                </TiltCard>

                {/* Email Inquiries */}
                <TiltCard
                  maxTilt={4}
                  className="panel"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Mail size={20} style={{ color: 'var(--gold-deep)' }} />
                    <b style={{ color: 'var(--navy)', fontSize: '1.05rem', fontFamily: 'var(--font-serif)' }}>Email Inquiries</b>
                  </div>
                  <div style={{ display: 'grid', gap: 6, fontSize: '0.95rem' }}>
                    {CONTACT.emails.map((e) => (
                      <a key={e} href={`mailto:${e}`} style={{ color: 'var(--gold-deep)', fontWeight: 600 }}>
                        {e}
                      </a>
                    ))}
                  </div>
                </TiltCard>
              </div>
        </div>
      </section>
    </Shell>
  );
}
