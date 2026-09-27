import { useState, useRef } from 'react';
import { MessageCircle, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface ZohoFormData {
  'First Name': string;
  'Last Name': string;
  'Address - City': string;
  Mobile: string;
  Email: string;
  Company: string;
  Description: string;
}

interface ZohoFormErrors {
  'First Name'?: string;
  'Last Name'?: string;
  'Address - City'?: string;
  Mobile?: string;
  Email?: string;
  Company?: string;
  Description?: string;
}

const REQUIRED_FIELDS: (keyof ZohoFormData)[] = ['Last Name', 'Mobile', 'Email', 'Company'];

const INITIAL_FORM_DATA: ZohoFormData = {
  'First Name': '',
  'Last Name': '',
  'Address - City': '',
  Mobile: '',
  Email: '',
  Company: '',
  Description: '',
};

export function ZohoCrmForm() {
  const [formData, setFormData] = useState<ZohoFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<ZohoFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ZohoFormData, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateField = (name: keyof ZohoFormData, value: string): string | undefined => {
    const trimmed = value.trim();
    
    if (REQUIRED_FIELDS.includes(name) && !trimmed) {
      return `${name} is required`;
    }
    
    if (name === 'Email' && trimmed && !validateEmail(trimmed)) {
      return 'Please enter a valid email address';
    }
    
    if (name === 'Mobile' && trimmed && trimmed.length < 7) {
      return 'Please enter a valid phone number';
    }
    
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name as keyof ZohoFormData]) {
      const error = validateField(name as keyof ZohoFormData, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof ZohoFormData, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateAll = (): boolean => {
    const newErrors: ZohoFormErrors = {};
    let hasErrors = false;
    
    REQUIRED_FIELDS.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    });
    
    if (formData.Email && !validateEmail(formData.Email.trim())) {
      newErrors.Email = 'Please enter a valid email address';
      hasErrors = true;
    }
    
    setErrors(newErrors);
    setTouched({
      'First Name': true,
      'Last Name': true,
      'Address - City': true,
      Mobile: true,
      Email: true,
      Company: true,
      Description: true,
    });
    
    return !hasErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAll()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('xnQsjsdp', '9797ca253a5358c39d8655e852fea3ad86d129695f548a3fa0f5f8c442816d80');
      formDataToSend.append('xmIwtLD', '6d89aab188da1b0692ed8bc064e58abe0b8d28f8106b20e17951127ce0a8eb18e07ba0724709cbf935a85c8e2be00d8b');
      formDataToSend.append('actionType', 'TGVhZHM=');
      formDataToSend.append('returnURL', window.location.origin);
      formDataToSend.append('First Name', formData['First Name'].trim());
      formDataToSend.append('Last Name', formData['Last Name'].trim());
      formDataToSend.append('Address - City', formData['Address - City'].trim());
      formDataToSend.append('Mobile', formData['Mobile'].trim());
      formDataToSend.append('Email', formData['Email'].trim());
      formDataToSend.append('Company', formData['Company'].trim());
      formDataToSend.append('Description', formData['Description'].trim());
      formDataToSend.append('aG9uZXlwb3Q', '');
      
      await fetch('https://crm.zoho.com/crm/WebToLeadForm', {
        method: 'POST',
        body: formDataToSend,
        mode: 'no-cors',
      });
      
      // no-cors mode doesn't allow reading response, but form submission succeeds
      // We assume success if no network error is thrown
      setSubmitStatus('success');
      setSubmitMessage('Thank you! Your enquiry has been submitted. Our admissions team will contact you within 24 hours.');
      setFormData(INITIAL_FORM_DATA);
      setTouched({});
      setErrors({});
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('There was an error submitting the form. Please try again or contact us directly on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (name: keyof ZohoFormData) => {
    const hasError = errors[name] && touched[name];
    return `zoho-input ${hasError ? 'has-error' : ''}`;
  };

  const labelClass = (name: keyof ZohoFormData) => {
    const isRequired = REQUIRED_FIELDS.includes(name);
    return `zoho-label ${isRequired ? 'required' : ''}`;
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="zoho-crm-form" noValidate>
      <div className="zoho-form-header">
        <h3 className="zoho-form-title">Register for Ground School</h3>
        <p className="zoho-form-subtitle">
          Fill in your details and our admissions team will send your timetable and fee quote within 24 hours.
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="zoho-toast success" role="alert">
          <CheckCircle2 size={20} />
          <span>{submitMessage}</span>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="zoho-toast error" role="alert">
          <AlertCircle size={20} />
          <span>{submitMessage}</span>
        </div>
      )}

      <div className="zoho-form-grid">
        <div className="zoho-field-group">
          <label htmlFor="firstName" className={labelClass('First Name')}>
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="First Name"
            value={formData['First Name']}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass('First Name')}
            placeholder="e.g. Ahmed"
            maxLength={40}
            aria-describedby={errors['First Name'] ? 'firstName-error' : undefined}
          />
          {errors['First Name'] && touched['First Name'] && (
            <span id="firstName-error" className="zoho-error" role="alert">
              {errors['First Name']}
            </span>
          )}
        </div>

        <div className="zoho-field-group">
          <label htmlFor="lastName" className={labelClass('Last Name')}>
            Last Name <span className="zoho-required" aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="Last Name"
            value={formData['Last Name']}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass('Last Name')}
            placeholder="e.g. Dahir"
            maxLength={80}
            required
            aria-describedby={errors['Last Name'] ? 'lastName-error' : undefined}
          />
          {errors['Last Name'] && touched['Last Name'] && (
            <span id="lastName-error" className="zoho-error" role="alert">
              {errors['Last Name']}
            </span>
          )}
        </div>

        <div className="zoho-field-group">
          <label htmlFor="city" className={labelClass('Address - City')}>
            City
          </label>
          <input
            type="text"
            id="city"
            name="Address - City"
            value={formData['Address - City']}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass('Address - City')}
            placeholder="e.g. Hargeisa"
            maxLength={255}
            aria-describedby={errors['Address - City'] ? 'city-error' : undefined}
          />
          {errors['Address - City'] && touched['Address - City'] && (
            <span id="city-error" className="zoho-error" role="alert">
              {errors['Address - City']}
            </span>
          )}
        </div>

        <div className="zoho-field-group">
          <label htmlFor="mobile" className={labelClass('Mobile')}>
            Mobile <span className="zoho-required" aria-hidden="true">*</span>
          </label>
          <input
            type="tel"
            id="mobile"
            name="Mobile"
            value={formData['Mobile']}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass('Mobile')}
            placeholder="+252 63 XXX XXXX"
            maxLength={30}
            required
            aria-describedby={errors['Mobile'] ? 'mobile-error' : undefined}
          />
          {errors['Mobile'] && touched['Mobile'] && (
            <span id="mobile-error" className="zoho-error" role="alert">
              {errors['Mobile']}
            </span>
          )}
        </div>

        <div className="zoho-field-group">
          <label htmlFor="email" className={labelClass('Email')}>
            Email <span className="zoho-required" aria-hidden="true">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="Email"
            value={formData['Email']}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass('Email')}
            placeholder="name@example.com"
            maxLength={100}
            required
            autoComplete="email"
            aria-describedby={errors['Email'] ? 'email-error' : undefined}
          />
          {errors['Email'] && touched['Email'] && (
            <span id="email-error" className="zoho-error" role="alert">
              {errors['Email']}
            </span>
          )}
        </div>

        <div className="zoho-field-group">
          <label htmlFor="company" className={labelClass('Company')}>
            Company / Organization <span className="zoho-required" aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="Company"
            value={formData['Company']}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass('Company')}
            placeholder="e.g. Stratosphere Aeronautics or 'Self'"
            maxLength={200}
            required
            aria-describedby={errors['Company'] ? 'company-error' : undefined}
          />
          {errors['Company'] && touched['Company'] && (
            <span id="company-error" className="zoho-error" role="alert">
              {errors['Company']}
            </span>
          )}
        </div>

        <div className="zoho-field-group zoho-field-group--full">
          <label htmlFor="description" className={labelClass('Description')}>
            Message / Subjects of Interest
          </label>
          <textarea
            id="description"
            name="Description"
            value={formData['Description']}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass('Description')}
            placeholder="Let us know which subjects you're interested in, your background, or any questions..."
            rows={4}
            aria-describedby={errors['Description'] ? 'description-error' : undefined}
          />
          {errors['Description'] && touched['Description'] && (
            <span id="description-error" className="zoho-error" role="alert">
              {errors['Description']}
            </span>
          )}
        </div>
      </div>

      <div className="zoho-form-actions">
        <button
          type="submit"
          className="btn btn--primary zoho-submit-btn"
          disabled={isSubmitting}
          style={{ width: '100%', padding: '16px 28px' }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="zoho-spinner" />
              Submitting...
            </>
          ) : (
            <>
              Submit Enquiry
              <MessageCircle size={18} />
            </>
          )}
        </button>
        
        <p className="zoho-form-note">
          By submitting, you agree to be contacted by our admissions team regarding aviation ground school programmes.
        </p>
      </div>

      <div className="zoho-form-alternative">
        <p className="zoho-alt-text">Prefer a faster response?</p>
        <a
          href="https://wa.me/252634429782"
          target="_blank"
          rel="noreferrer"
          className="btn btn--whatsapp"
          style={{ width: '100%', justifyContent: 'center', padding: '14px 20px' }}
        >
          <MessageCircle size={20} />
          Message Us on WhatsApp
        </a>
      </div>
    </form>
  );
}

export default ZohoCrmForm;