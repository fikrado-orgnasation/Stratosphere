import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Shell, { Filings, InquiryForm, PageHead } from '../components/Shell';
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
          <div className="register-layout">
            {/* Left Col: Direct School Contact Methods */}
            <div>
              <h2 className="title-md" style={{ marginBottom: 20 }}>Get in Touch</h2>

              <div style={{ display: 'grid', gap: 18 }}>
                {/* WhatsApp Admissions Card */}
                <div
                  style={{
                    padding: 24,
                    borderRadius: 'var(--radius)',
                    background: '#f0fdf4',
                    border: '1.5px solid #bbf7d0',
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
                        width: 46,
                        height: 46,
                        borderRadius: '50%',
                        background: 'var(--wa)',
                        color: '#ffffff',
                        display: 'grid',
                        placeItems: 'center',
                      }}
                    >
                      <MessageCircle size={24} />
                    </div>
                    <div>
                      <b style={{ color: 'var(--navy)', fontSize: '1.1rem', display: 'block' }}>
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
                </div>

                {/* Telephone Card */}
                <div
                  style={{
                    padding: 24,
                    borderRadius: 'var(--radius)',
                    background: '#ffffff',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'grid',
                    gap: 10,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Phone size={20} style={{ color: 'var(--blue)' }} />
                    <b style={{ color: 'var(--navy)', fontSize: '1rem' }}>Telephone Direct Lines</b>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                    {CONTACT.phones.map((p) => (
                      <a
                        key={p.display}
                        href={p.href}
                        className="btn btn--sm btn--outline"
                      >
                        {p.display}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Physical Location Card */}
                <div
                  style={{
                    padding: 24,
                    borderRadius: 'var(--radius)',
                    background: '#ffffff',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'grid',
                    gap: 10,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <MapPin size={20} style={{ color: 'var(--amber)' }} />
                    <b style={{ color: 'var(--navy)', fontSize: '1rem' }}>Campus Address</b>
                  </div>
                  <address style={{ fontStyle: 'normal', color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                    {CONTACT.lines.map((l) => <span key={l} style={{ display: 'block' }}>{l}</span>)}
                    <span style={{ display: 'block', fontWeight: 700, color: 'var(--navy)', marginTop: 4 }}>
                      {CONTACT.city}
                    </span>
                  </address>
                </div>

                {/* Email Inquiries */}
                <div
                  style={{
                    padding: 24,
                    borderRadius: 'var(--radius)',
                    background: '#ffffff',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-sm)',
                    display: 'grid',
                    gap: 10,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Mail size={20} style={{ color: 'var(--blue)' }} />
                    <b style={{ color: 'var(--navy)', fontSize: '1rem' }}>Email Inquiries</b>
                  </div>
                  <div style={{ display: 'grid', gap: 6, fontSize: '0.9375rem' }}>
                    {CONTACT.emails.map((e) => (
                      <a key={e} href={`mailto:${e}`} style={{ color: 'var(--blue)', fontWeight: 600 }}>
                        {e}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Simple Inquiry Form */}
            <div>
              <div className="cart-summary-card">
                <div>
                  <span className="badge">Direct Form</span>
                  <h3 className="title-sm" style={{ marginTop: 4 }}>Send Us a Message</h3>
                  <p className="desc-md" style={{ marginTop: 6, fontSize: '0.875rem' }}>
                    Fill out this form and our registrar will get back to you with timetable and tuition details.
                  </p>
                </div>

                <InquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
