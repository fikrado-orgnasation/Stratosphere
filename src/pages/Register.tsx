import Shell, { PageHead } from '../components/Shell';
import ZohoLeadForm from '../components/ZohoLeadForm';

export default function Register() {
  return (
    <Shell>
      <PageHead
        kicker="Course Enrolment"
        title="Register for Aviation Ground School"
        lede="Submit your official enquiry directly into our registrar database. We will reply within 24 hours."
      />

      <section className="section">
        <div className="shell" style={{ maxWidth: 720 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <span className="badge badge--gold" style={{ marginBottom: 16, display: 'inline-block' }}>
              Official Admissions Application
            </span>
            <h2 className="title-md" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)' }}>
              Ground School Enrolment Desk
            </h2>
            <p className="desc-md" style={{ marginTop: 12, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
              Fill in your details below and our admissions team will send your timetable and fee quote within 24 hours.
            </p>
          </div>

          <ZohoLeadForm />
        </div>
      </section>

      <section className="section section--subtle">
        <div className="shell" style={{ maxWidth: 720, textAlign: 'center' }}>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Prefer a faster response? Contact our Hargeisa admissions team directly on WhatsApp.
          </p>
          <a
            href="https://wa.me/252634429782"
            target="_blank"
            rel="noreferrer"
            className="btn btn--whatsapp"
            style={{ display: 'inline-flex', marginTop: 16, padding: '14px 28px' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8 }}>
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            Message Us on WhatsApp
          </a>
        </div>
      </section>
    </Shell>
  );
}