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
        'https://crm.zohopublic.com/crm/WebFormAnalyticsServeServlet?rid=ae2f2f5b3f33fb77d6d62255a0c6d89ac330ef9c49f7df5b77a38775f2bd0faf003eeedcda9af20462f8338b91225b83gid9b1a6dab5a9190c94a8f58dc6d9589fe08922fd9be913e760420abe7954619d9gid96dc8d967d1338f49bac634354ca071ee5305316fa3d325290c22aedd30c7a33gid47645073dcbaab4dcd8361b4546b98942cb2c26a2c5cbd4fc2e219b9a2efbbba&tw=297d892ce7d19401e1adc861b2f159608909b198ea485cfa5eb3a40060705073&version=v2';
      script.async = true;
      document.body.appendChild(script);
    }

    // Inject Zoho SalesIQ Visitor Tracking script
    const visitorScriptId = 'zsiqscript';
    if (!document.getElementById(visitorScriptId)) {
      const visitorScript = document.createElement('script');
      visitorScript.id = visitorScriptId;
      visitorScript.type = 'text/javascript';
      visitorScript.defer = true;
      visitorScript.src = 'https://salesiq.zoho.com/widget';
      document.body.appendChild(visitorScript);

      // Initialize $zoho.salesiq
      const initScript = document.createElement('script');
      initScript.type = 'text/javascript';
      initScript.text = `
        var $zoho = $zoho || {};
        $zoho.salesiq = $zoho.salesiq || {
          widgetcode: 'siq6386989ba7298709523a8c2bb4de40aa75439234e0900b15e5c11c68b7621bbd',
          values: {},
          ready: function() {}
        };
      `;
      document.body.appendChild(initScript);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const form = formRef.current;
    if (!form) return;

    // Validate mandatory fields: Last Name, Mobile, Email, Address - City
    const lastName = (form.elements.namedItem('Last Name') as HTMLInputElement)?.value.trim();
    const mobile = (form.elements.namedItem('Mobile') as HTMLInputElement)?.value.trim();
    const email = (form.elements.namedItem('Email') as HTMLInputElement)?.value.trim();
    const city = (form.elements.namedItem('Address - City') as HTMLInputElement)?.value.trim();

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
    if (!city) {
      alert('Address - City cannot be empty.');
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

    // Track visitor for SalesIQ
    try {
      if ((window as any).$zoho && (window as any).$zoho.salesiq) {
        const LDTuvidObj = form.elements.namedItem('LDTuvid') as HTMLInputElement;
        if (LDTuvidObj) {
          LDTuvidObj.value = (window as any).$zoho.salesiq.visitor?.uniqueid?.() || '';
        }
        const firstnameObj = form.elements.namedItem('First Name') as HTMLInputElement;
        let name = '';
        if (firstnameObj) {
          name = firstnameObj.value + ' ' + lastName;
        }
        if (name.trim()) {
          (window as any).$zoho.salesiq.visitor?.name?.(name);
        }
        const emailObj = form.elements.namedItem('Email') as HTMLInputElement;
        if (emailObj) {
          (window as any).$zoho.salesiq.visitor?.email?.(emailObj.value);
        }
      }
    } catch (err) {
      // Silently ignore tracking errors
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

    const submitBtn = form.querySelector('.formsubmit') as HTMLButtonElement;
    if (submitBtn) {
      submitBtn.disabled = true;
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
        <span className="badge badge--white" style={{ marginBottom: 0 }}>
          <ShieldCheck size={14} style={{ color: 'var(--gold-light)' }} />
          Official Admissions Application
        </span>
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
          value="e54411e174dc8563e21ca61a77ffaa4c71dc690d77acd4ce3e293f274072c57e"
          readOnly
        />
        <input type="hidden" name="zc_gad" id="zc_gad" value="" />
        <input
          type="text"
          style={{ display: 'none' }}
          name="xmIwtLD"
          value="1187a131b3b17aca128bd51fa6854964b78f9f42802cf747d15c63304bc1d3d53479224ff11fa5bf9b0325501c96bb07"
          readOnly
        />
        <input type="text" style={{ display: 'none' }} name="actionType" value="TGVhZHM=" readOnly />
        <input
          type="text"
          style={{ display: 'none' }}
          name="returnURL"
          value="https://stratosphereaeronautics.com/careers"
          readOnly
        />
        <input type="text" style={{ display: 'none' }} id="ldeskuid" name="ldeskuid" readOnly />
        <input type="text" style={{ display: 'none' }} id="LDTuvid" name="LDTuvid" readOnly />
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

        {/* City / Location - NOW REQUIRED */}
        <div className="form-group">
          <label className="form-label" htmlFor="Address_-_City" style={{ color: '#e2e8f0', fontSize: '0.84rem' }}>
            Address - City <span style={{ color: 'var(--gold-light)' }}>*</span>
          </label>
          <input
            type="text"
            id="Address_-_City"
            name="Address - City"
            required
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
            Description
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