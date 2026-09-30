import { useEffect, useRef } from 'react';
import { Send, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ZohoLeadFormProps {
  defaultDescription?: string;
}

/* Zoho SalesIQ attaches itself to `window` at runtime; nothing in the bundle
   types it, so declare only the surface this form actually touches. */
interface SalesIq {
  salesiq: {
    visitor?: {
      uniqueid?: () => string;
      name?: (n: string) => void;
      email?: (e: string) => void;
    };
  };
}
declare global {
  interface Window {
    $zoho?: SalesIq;
  }
}

/* If the POST fails the page never navigates, so re-arm the button after this
   long enough for a normal submission but before the user gives up. */
const SUBMIT_REARM_MS = 8000;

const REQUIRED_FIELDS = [
  { name: 'Last Name', label: 'Last Name' },
  { name: 'Address - City', label: 'Address - City' },
  { name: 'Mobile', label: 'Mobile' },
  { name: 'Email', label: 'Email' },
] as const;

/** Same rule Zoho's own validator uses: one char before @, a dot at least two
    chars after it, and at least one char after the dot. */
function isValidEmail(value: string) {
  const at = value.indexOf('@');
  const dot = value.lastIndexOf('.');
  if (at < 1 || dot < at + 2 || dot + 2 >= value.length) return false;
  return true;
}

const fieldStyle = {
  background: 'rgba(255, 255, 255, 0.08)',
  color: '#ffffff',
  border: '1px solid rgba(223, 183, 67, 0.3)',
  padding: '11px 14px',
} as const;

const labelStyle = { color: '#e2e8f0', fontSize: '0.84rem' } as const;

function RequiredMark() {
  return <span style={{ color: 'var(--gold-light)' }} aria-hidden="true">*</span>;
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
        'https://crm.zohopublic.com/crm/WebFormAnalyticsServeServlet?rid=d118864687aa38dd3472ff8a4596dafaf6f3c2ada429158850d8e3eda4777bce747d29237ae8c5dfbe11cc3cdb203011gid48cc751cd14b103c945b2be22d4336b633c30f5b5efcd5184fddf939f9e2354cgidb2583355937033e279bde3a45c5a64f30df1509c11fe0918da709648b52dba45gid20ab82ea89db8c7ec110d977e2364c4195d3111c3e0b714ea1b40242702ed70a&tw=0b1c2b40296d97298dd8624420b3e4e3e76257f7f053d1b133b7d1fb2c2a5acf&version=v2';
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

    // The form already declares acceptCharset="UTF-8", so the encoding is set;
    // no need to touch document.characterSet (typed read-only anyway).

    const field = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | null)?.value.trim() ?? '';

    // Read each required field once, then reuse the values below.
    const values = Object.fromEntries(REQUIRED_FIELDS.map((f) => [f.name, field(f.name)]));
    const { 'Last Name': lastName, Email: email } = values;

    // Note: React's synthetic onSubmit ignores return values, so every bail-out
    // below must call preventDefault() itself.
    const missing = REQUIRED_FIELDS.find((f) => !values[f.name]);
    if (missing) {
      e.preventDefault();
      alert(`${missing.label} cannot be empty.`);
      (form.elements.namedItem(missing.name) as HTMLInputElement | null)?.focus();
      return;
    }

    if (!isValidEmail(email)) {
      e.preventDefault();
      alert('Please enter a valid email address.');
      (form.elements.namedItem('Email') as HTMLInputElement | null)?.focus();
      return;
    }

    // Track visitor for SalesIQ. Never let tracking block a real submission.
    try {
      const salesiq = window.$zoho?.salesiq;
      if (salesiq) {
        const ldTuvid = form.elements.namedItem('LDTuvid') as HTMLInputElement | null;
        if (ldTuvid) {
          ldTuvid.value = salesiq.visitor?.uniqueid?.() || '';
        }
        const name = `${field('First Name')} ${lastName}`.trim();
        if (name) salesiq.visitor?.name?.(name);
        salesiq.visitor?.email?.(email);
      }
    } catch {
      // Tracking is best-effort; swallow failures and submit regardless.
    }

    // Append smarturl if present in query parameters
    const urlparams = new URLSearchParams(window.location.search);
    if (urlparams.get('service') === 'smarturl') {
      const smarturlfield = document.createElement('input');
      smarturlfield.type = 'hidden';
      smarturlfield.value = 'smarturl';
      smarturlfield.name = 'service';
      form.appendChild(smarturlfield);
    }

    const submitBtn = form.querySelector('.formsubmit') as HTMLButtonElement | null;
    if (submitBtn) {
      submitBtn.disabled = true;
      // If the POST fails the page never navigates and the button would stay
      // dead with the user's answers still in place. Re-enable it on return.
      window.setTimeout(() => {
        submitBtn.disabled = false;
      }, SUBMIT_REARM_MS);
    }
  };

  return (
    <div
      id="crmWebToEntityForm"
      className="crmWebToEntityForm zcwf_lblLeft zoho-crm-3d-card"
      style={{
        background: 'linear-gradient(150deg, #0d2249 0%, #06112a 60%, #030814 100%)',
        border: '1.5px solid var(--gold-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(20px, 3.5vw, 32px)',
        boxShadow: 'var(--shadow-3d-dark)',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'left',
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
          value="809e3874bd0829d95f5726bc3a6af3673546d9b79061d29146272cc2a3347a0b"
          readOnly
        />
        <input type="hidden" name="zc_gad" id="zc_gad" value="" />
        <input
          type="text"
          style={{ display: 'none' }}
          name="xmIwtLD"
          value="133ef095b894c77b7028aff782dba59f29031fbfa47ef13c5b736c2565817a01d6bc5b5dfd246f10f82c42cd6fd85399"
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
        <input type="text" style={{ display: 'none' }} id="ldeskuid" name="ldeskuid" readOnly />
        <input type="text" style={{ display: 'none' }} id="LDTuvid" name="LDTuvid" readOnly />
        <input type="text" style={{ display: 'none' }} name="aG9uZXlwb3Q" value="" readOnly />

        {/* First & Last Name */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12 }}>
          <div className="form-group">
            <label className="form-label" htmlFor="First_Name" style={labelStyle}>
              First Name
            </label>
            <input
              type="text"
              id="First_Name"
              name="First Name"
              aria-label="First Name"
              aria-required="false"
              aria-valuemax={40}
              maxLength={40}
              placeholder="e.g. Ahmed"
              className="form-input"
              style={fieldStyle}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="Last_Name" style={labelStyle}>
              Last Name <RequiredMark />
            </label>
            <input
              type="text"
              id="Last_Name"
              name="Last Name"
              aria-label="Last Name"
              aria-required="true"
              aria-valuemax={80}
              required
              maxLength={80}
              placeholder="e.g. Dahir"
              className="form-input"
              style={fieldStyle}
            />
          </div>
        </div>

        {/* City & Mobile */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12 }}>
          <div className="form-group">
            <label className="form-label" htmlFor="Address_-_City" style={labelStyle}>
              Address - City <RequiredMark />
            </label>
            <input
              type="text"
              id="Address_-_City"
              name="Address - City"
              aria-label="Address - City"
              aria-required="true"
              aria-valuemax={255}
              required
              maxLength={255}
              defaultValue="Hargeisa"
              placeholder="e.g. Hargeisa, Somaliland"
              className="form-input"
              style={fieldStyle}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="Mobile" style={labelStyle}>
              Mobile <RequiredMark />
            </label>
            <input
              type="text"
              id="Mobile"
              name="Mobile"
              aria-label="Mobile"
              aria-required="true"
              aria-valuemax={30}
              required
              maxLength={30}
              placeholder="+252 63 XXXXXXX"
              className="form-input"
              style={fieldStyle}
            />
          </div>
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label" htmlFor="Email" style={labelStyle}>
            Email <RequiredMark />
          </label>
          <input
            type="text"
            id="Email"
            name="Email"
            aria-label="Email"
            aria-required="true"
            aria-valuemax={100}
            required
            maxLength={100}
            placeholder="student@example.com"
            className="form-input"
            style={fieldStyle}
            /* Zoho selects the email input by [ftype=email]; React needs the
               spread because `ftype` is not a known DOM attribute. */
            {...{ ftype: 'email' }}
          />
        </div>

        {/* Description / Flight Goals */}
        <div className="form-group">
          <label className="form-label" htmlFor="Description" style={labelStyle}>
            Description
          </label>
          <textarea
            id="Description"
            name="Description"
            aria-label="Description"
            aria-required="false"
            aria-multiline="true"
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
            role="button"
            aria-label="Submit"
            title="Submit"
            className="btn btn--primary formsubmit zcwf_button"
            style={{ flex: 1, padding: '13px 22px' }}
          >
            Submit Application
            <Send size={15} />
          </button>
          <button
            type="reset"
            role="button"
            aria-label="Reset"
            title="Reset"
            className="btn btn--outline-white btn--sm zcwf_button"
            style={{ padding: '12px 16px' }}
          >
            Reset
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>
          <CheckCircle2 size={13} style={{ color: 'var(--wa)' }} />
          <span>Secured by Fikrado Security</span>
        </div>
      </form>
    </div>
  );
}
