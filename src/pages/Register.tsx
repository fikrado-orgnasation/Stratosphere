import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Shell, { PageHead } from '../components/Shell';
import ZohoLeadForm from '../components/ZohoLeadForm';
import { CONTACT } from '../data/site';

export default function Register() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedIds, setSelectedIds] = useState<number[]>(() => {
    const raw = searchParams.get('courses');
    if (!raw) return [];
    return raw.split(',').map(Number).filter((n) => n > 0);
  });

  const handleRemoveCourse = (id: number) => {
    setSelectedIds((prev) => {
      const next = prev.filter((c) => c !== id);
      if (next.length > 0) {
        setSearchParams({ courses: next.join(',') }, { replace: true });
      } else {
        setSearchParams({}, { replace: true });
      }
      return next;
    });
  };

  return (
    <Shell>
      <PageHead
        kicker="Course Enrolment"
        title="Register for Aviation Training"
        lede="Submit your official enquiry directly into our registrar database. We will reply within 24 hours."
      />

      <section className="section">
        <div className="shell" style={{ maxWidth: 720 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <span className="badge badge--gold" style={{ marginBottom: 16, display: 'inline-block' }}>
              Official Admissions Application
            </span>
            <h2 className="title-md" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)' }}>
              Aviation Training Enrolment Desk
            </h2>
            <p className="desc-md" style={{ marginTop: 12, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
              {selectedIds.length > 0
                ? `You have selected ${selectedIds.length} ${selectedIds.length === 1 ? 'course' : 'courses'} to enroll in. Complete the form below and our admissions team will send your timetable and fee quote within 24 hours.`
                : 'Fill in your details below and our admissions team will send your timetable and fee quote within 24 hours. You can also browse our training programs and select multiple courses to enroll in at once.'}
            </p>
          </div>

          <ZohoLeadForm
            selectedCourseIds={selectedIds}
            onRemoveCourse={handleRemoveCourse}
          />
        </div>
      </section>

      <section className="section section--subtle">
        <div className="shell" style={{ maxWidth: 720, textAlign: 'center' }}>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            Prefer a faster response? Contact our Hargeisa admissions team directly on WhatsApp.
          </p>
          <a
            href={CONTACT.whatsapp}
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
