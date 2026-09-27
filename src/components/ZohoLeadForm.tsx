import { useEffect, useRef } from 'react';
import { Send, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ZohoLeadFormProps {
  defaultDescription?: string;
}

export default function ZohoLeadForm({ defaultDescription = '' }: ZohoLeadFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Inject Zoho Web Form Analytics script safely
    const scriptId = 'wf_anal';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src =
        'https://crm.zohopublic.com/crm/WebFormAnalyticsServeServlet?rid=815da50714b4cda3f6543cf9aa6ab571074fde08a43325dbf6b834840b2e32128c632473dfc20b976c7ea462e37a13f9gidd55a74e8893541f9e561d1a34596e7a4be78ddcccc5bbdbd6b54d99967e08482gid888dbb7110ad5cc70338d4dd3d8f62eba756f881c412de034846eb0d686cfc63gid0aaaa2d332fee54a92f1efb6a74c0e85e3a66410055d9bd466d55242e119b255&tw=88f8060b19a97ab7fe2efb26a02b426db5e52d950684c590d6b5aed89a589754&version=v2';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = formRef.current;
    if (!form) return;

    // Validate mandatory fields: Last Name, Mobile, Email
    const lastName = (form.elements.namedItem('Last Name') as HTMLInputElement)?.value.trim();
    const mobile = (form.elements.namedItem('Mobile') as HTMLInputElement)?.value.trim();
    const email = (form.elements.namedItem('Email') as HTMLInputElement)?.value.trim();

    if (!lastName) {
      alert('Last Name cannot be empty.');
      e.preventDefault();
      return false;
    }
    if (!mobile) {
      alert('Mobile number cannot be empty.');
      e.preventDefault();
      return false;
    }
    if (!email) {
      alert('Email address cannot be empty.');
      e.preventDefault();
      return false;
    }

    const atpos = email.indexOf('@');
    const dotpos = email.lastIndexOf('.');
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
      alert('Please enter a valid email address.');
      e.preventDefault();
      return false;
    }

    // Append smarturl if present in query parameters
    const urlparams = new URLSearchParams(window.location.search);
    if (urlparams.has('service') && urlparams.get('service') === 'smarturl') {
      const smarturlfield = document.createElement('input');
      smarturlfield.type = 'hidden';
      smarturlfield.value = urlparams.get('service') || '';
      smarturlfield.name = 'service';
      form.appendChild(smarturlfield);
    }

    return true;
  };

  return (
    <div
      id="crmWebToEntityForm"
      className="crmWebToEntityForm zoho-crm-3d-card"
      style={{
        background: 'linear-gradient(150deg, #0d2249 0%, #06112a 60%, #030814 100%)',
        border: '1.5px solid var(--gold-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(20px, 3.5vw, 32px)',
        boxShadow: 'var(--shadow-3d-dark)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative ambient radial gold corner glow */}
      <div
        style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 180,
          height: 180,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(223, 183, 67, 0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      <div style={{ marginBottom: 22, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <span className="badge badge--white" style={{ marginBottom: 0 }}>
            <ShieldCheck size={14} style={{ color: 'var(--gold-light)' }} />
            Official Admissions Application
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--gold-bright)', fontWeight: 600 }}>
            Zoho CRM Integrated
          </span>
        </div>
        <h3
          className="title-sm"
          style={{
            color: '#ffffff',
            fontFamily: 'var(--font-serif)',
            fontSize: '1.3rem',
            marginTop: 12,
            lineHeight: 1.25,
          }}
        >
          Ground School Enrolment Desk
        </h3>
        <p style={{ color: '#cbd5e1', fontSize: '0.875rem', marginTop: 6, lineHeight: 1.5 }}>
          Submit your official inquiry directly into our registrar database. We will reply within 24 hours.
        </p>
      </div>

      <form
        ref={formRef}
        id="webform7635343000000625563"
        action="https://crm.zoho.com/crm/WebToLeadForm"
        name="WebToLeads7635343000000625563"
        method="POST"
        onSubmit={handleSubmit}
        acceptCharset="UTF-8"
        style={{ display: 'grid', gap: 16, position: 'relative', zIndex: 1 }}
      >
        {/* Zoho Required Hidden Fields — DO NOT REMOVE */}
        <input
          type="text"
          style={{ display: 'none' }}
          name="xnQsjsdp"
          value="5fa7f3cecafa8dd392d3a0c07d95fc4e977b9e054adc5f8c8c7aad2933db272d"
          readOnly
        />
        <input type="hidden" name="zc_gad" id="zc_gad" value="" />
        <input
          type="text"
          style={{ display: 'none' }}
          name="xmIwtLD"
          value="02bb54dd3af2e7bf01565fd2d4e6e67de0b0d00ff7aca9d4c9e0a4c8829018d2829dd03572271d030e35488fc4a80eb2"
          readOnly
        />
        <input type="text" style={{ display: 'none' }} name="actionType" value="TGVhZHM=" readOnly />
        <input
          type="text"
          style={{ display: 'none' }}
          name="returnURL"
          value="https://stratosphereaeronautics.com"
          readOnly
        />
        <input type="text" style={{ display: 'none' }} name="aG9uZXlwb3Q" value="" readOnly />

        {/* First & Last Name */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12 }}>
          <div className="form-group">
            <label className="form-label" htmlFor="First_Name" style={{ color: '#e2e8f0', fontSize: '0.84rem' }}>
              First Name
            </label>
            <input
              type="text"
              id="First_Name"
              name="First Name"
              maxLength={40}
              placeholder="e.g. Ahmed"
              className="form-input"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                border: '1px solid rgba(223, 183, 67, 0.3)',
                padding: '11px 14px',
              }}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="Last_Name" style={{ color: '#e2e8f0', fontSize: '0.84rem' }}>
              Last Name <span style={{ color: 'var(--gold-light)' }}>*</span>
            </label>
            <input
              type="text"
              id="Last_Name"
              name="Last Name"
              required
              maxLength={80}
              placeholder="e.g. Dahir"
              className="form-input"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                border: '1px solid rgba(223, 183, 67, 0.3)',
                padding: '11px 14px',
              }}
            />
          </div>
        </div>

        {/* Mobile & Email */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12 }}>
          <div className="form-group">
            <label className="form-label" htmlFor="Mobile" style={{ color: '#e2e8f0', fontSize: '0.84rem' }}>
              Mobile Number <span style={{ color: 'var(--gold-light)' }}>*</span>
            </label>
            <input
              type="text"
              id="Mobile"
              name="Mobile"
              required
              maxLength={30}
              placeholder="+252 63 XXXXXXX"
              className="form-input"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                border: '1px solid rgba(223, 183, 67, 0.3)',
                padding: '11px 14px',
              }}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="Email" style={{ color: '#e2e8f0', fontSize: '0.84rem' }}>
              Email Address <span style={{ color: 'var(--gold-light)' }}>*</span>
            </label>
            <input
              type="text"
              id="Email"
              name="Email"
              required
              maxLength={100}
              placeholder="student@example.com"
              className="form-input"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                border: '1px solid rgba(223, 183, 67, 0.3)',
                padding: '11px 14px',
              }}
            />
          </div>
        </div>

        {/* City / Location */}
        <div className="form-group">
          <label className="form-label" htmlFor="Address_-_City" style={{ color: '#e2e8f0', fontSize: '0.84rem' }}>
            City / Campus Location
          </label>
          <input
            type="text"
            id="Address_-_City"
            name="Address - City"
            maxLength={255}
            defaultValue="Hargeisa"
            placeholder="e.g. Hargeisa, Somaliland"
            className="form-input"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              border: '1px solid rgba(223, 183, 67, 0.3)',
              padding: '11px 14px',
            }}
          />
        </div>

        {/* Description / Flight Goals */}
        <div className="form-group">
          <label className="form-label" htmlFor="Description" style={{ color: '#e2e8f0', fontSize: '0.84rem' }}>
            Subjects of Interest / Flight Career Goals
          </label>
          <textarea
            id="Description"
            name="Description"
            rows={3}
            defaultValue={defaultDescription}
            placeholder="Let us know which theoretical subjects (M01–M10) or flight licence pathway (PPL/CPL) you are targeting..."
            className="form-textarea"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              border: '1px solid rgba(223, 183, 67, 0.3)',
              padding: '11px 14px',
              fontFamily: 'inherit',
            }}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 6, flexWrap: 'wrap' }}>
          <button
            type="submit"
            id="formsubmit"
            className="btn btn--primary formsubmit zcwf_button"
            style={{ flex: 1, padding: '13px 22px' }}
          >
            Submit Application
            <Send size={15} />
          </button>
          <button
            type="reset"
            className="btn btn--outline-white btn--sm"
            style={{ padding: '12px 16px' }}
          >
            Reset
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
          <CheckCircle2 size={13} style={{ color: 'var(--wa)' }} />
          <span>Secure direct transmission to Zoho CRM (Stratosphere Aeronautics)</span>
        </div>
      </form>
    </div>
  );
}
