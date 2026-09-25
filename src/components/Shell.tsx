import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Award, Globe, Radio, ShieldCheck } from 'lucide-react';
import { CONTACT, RAIL } from '../data/site';

/* ── navigation ──────────────────────────────────────────────────────────── */
/* Four main pages. The syllabus, careers, student life and contact stay live
   and reachable, but they have moved out of the masthead into the footer —
   the nav is no longer a contents list for the whole site. */
export const NAV = [
  { to: '/', label: 'Home', code: 'HOM' },
  { to: '/register', label: 'Register', code: 'REG' },
  { to: '/books', label: 'Books', code: 'BKS' },
  { to: '/about', label: 'About us', code: 'ABT' },
] as const;

/* Still built, still linked, just not in the masthead. */
export const SECONDARY = [
  { to: '/training', label: 'Full syllabus' },
  { to: '/careers', label: 'Career pathways' },
  { to: '/student-life', label: 'Student life' },
  { to: '/resources', label: 'Resources' },
  { to: '/contact', label: 'Contact' },
] as const;

function isCurrent(pathname: string, to: string) {
  return pathname === to || pathname.startsWith(`${to}/`);
}

/* ── the instrument rail ─────────────────────────────────────────────────── */
function Rail() {
  const bar = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const span = doc.scrollHeight - doc.clientHeight;
      const pct = span > 0 ? Math.min(1, doc.scrollTop / span) : 0;
      if (bar.current) bar.current.style.height = `${pct * 100}%`;
      if (readout.current) readout.current.textContent = `${String(Math.round(pct * 100)).padStart(3, '0')}`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /* Tick marks down the rail, denser at the top, like an instrument bezel */
  const ticks = Array.from({ length: 22 }, (_, i) => i);

  return (
    <aside className="rail" aria-hidden="true">
      <Link to="/" className="rail__mark" tabIndex={-1}>
        <img src="/logo-removebg-preview.png" alt="" />
      </Link>

      <div className="rail__readouts">
        <div className="rail__ro">
          <span className="rail__k">Field</span>
          <span className="rail__v">{RAIL.field}</span>
        </div>
        <div className="rail__ro">
          <span className="rail__k">Pos</span>
          <span className="rail__v">{RAIL.position}</span>
        </div>
        <div className="rail__ro">
          <span className="rail__k">Alt</span>
          <span className="rail__v">{RAIL.altitude}</span>
        </div>
        <div className="rail__ro">
          <span className="rail__k">Hdg</span>
          <span className="rail__v">{RAIL.heading}</span>
        </div>
        <div className="rail__ro">
          <span className="rail__k">Enrol</span>
          <span className="rail__v rail__v--live">Open</span>
        </div>
      </div>

      <div className="rail__ticks">
        <div ref={bar} className="rail__progress" />
        {ticks.map((i) => (
          <span
            key={i}
            className={`rail__tick ${i % 5 === 0 ? 'rail__tick--major' : ''}`}
            style={{ top: `${(i / (ticks.length - 1)) * 100}%` }}
          />
        ))}
      </div>

      <span ref={readout} className="rail__progress-label">000</span>
    </aside>
  );
}

/* ── masthead ────────────────────────────────────────────────────────────── */
function Masthead() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className={`masthead ${stuck ? 'is-stuck' : ''}`}>
        <div className="masthead__in">
          <Link to="/" className="brand" aria-label="Stratosphere Aeronautics, home">
            <span className="brand__seal">
              <img src="/logo-removebg-preview.png" alt="" />
            </span>
            <span className="brand__name">
              <strong>Stratosphere</strong>
              <span>Aeronautics</span>
            </span>
          </Link>

          <nav className="masthead__nav" aria-label="Main">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                aria-current={isCurrent(pathname, item.to) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="masthead__end">
            <a className="masthead__tel" href={CONTACT.phones[0].href}>
              {CONTACT.phones[0].display}
            </a>
            <Link to="/register" className="btn btn--primary" style={{ minHeight: 42, padding: '0 18px' }}>
              Register
            </Link>
            <button
              className="burger"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <i /><i /><i />
            </button>
          </div>
        </div>
      </header>

      <div className={`drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        {NAV.map((item) => (
          <Link key={item.to} to={item.to} tabIndex={open ? 0 : -1}>
            {item.label}
            <span>{item.code}</span>
          </Link>
        ))}
        <Link to="/contact" tabIndex={open ? 0 : -1}>
          Contact
          <span>CON</span>
        </Link>
        <Link to="/training" tabIndex={open ? 0 : -1}>
          Full syllabus
          <span>SYL</span>
        </Link>
        <a className="btn btn--primary" href={CONTACT.whatsapp} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
          Message us on WhatsApp
          <ArrowRight size={16} />
        </a>
      </div>
    </>
  );
}

/* ── a single mid-page ask ───────────────────────────────────────────────── */
/* One place per page, not a repeating band. Repetition reads as a template;
   restraint is what makes the ask land when it does appear. */
export function Ask({ title, body }: { title: string; body: string }) {
  return (
    <section className="band band--tight">
      <div className="shell">
        <div className="ask">
          <div>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
          <div className="ask__actions">
            <Link to="/register" className="btn btn--primary">
              Register
              <ArrowRight size={16} />
            </Link>
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="btn btn--ghost">
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── recognitions strip ──────────────────────────────────────────────────── */
export function Filings() {
  return (
    <div className="filings">
      <div className="flow">
        <div className="shell filings__in">
          <span><Globe size={15} /><b>ICAO aligned</b></span>
          <span><Award size={15} /><b>ERNAM trained</b></span>
          <span><ShieldCheck size={15} /><b>ASECNA partner</b></span>
          <span><Radio size={15} /><b>ICAO WACAF</b></span>
        </div>
      </div>
    </div>
  );
}

/* ── page header for interior pages ──────────────────────────────────────── */
export function PageHead({
  kicker,
  code,
  title,
  lede,
  children,
}: {
  kicker: string;
  code: string;
  title: string;
  lede?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="band" style={{ paddingTop: 'clamp(120px, 15vw, 190px)' }}>
      <div className="shell">
        <div className="rule rule--split">
          <div className="stack">
            <p className="datum">{kicker}</p>
            <h1 className="display display--tight">{title}</h1>
          </div>
          <div className="stack" style={{ alignContent: 'end', gap: 26 }}>
            {lede && <p className="lede">{lede}</p>}
            {children}
          </div>
        </div>
        <hr className="hair" style={{ marginTop: 'clamp(40px, 5vw, 68px)' }} />
        <p className="mono mono--xs muted" style={{ marginTop: 12 }}>
          Ref {code} / STRATOSPHERE AERONAUTICS
        </p>
      </div>
    </section>
  );
}

/* ── the inquiry form ────────────────────────────────────────────────────── */
/* The Supabase edge function has been deployed and waiting since the last
   build; this is the missing client half. POSTs name, email, phone, message. */

const ENDPOINT =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.replace(/\/$/, '') +
  '/functions/v1/send-contact-inquiry';

type Status = 'idle' | 'busy' | 'ok' | 'error';

const EMPTY = { name: '', email: '', phone: '', message: '' };

export function InquiryForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof EMPTY, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [note, setNote] = useState('');

  const set = (key: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next: typeof errors = {};
    if (!values.name.trim()) next.name = 'Tell us your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) next.email = 'Enter an email we can reply to.';
    if (!values.message.trim()) next.message = 'Tell us what you are interested in.';
    if (values.phone.trim() && !/^[+\d][\d\s()-]{6,}$/.test(values.phone.trim())) next.phone = 'That does not look like a phone number.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      setStatus('idle');
      setNote('');
      return;
    }

    setStatus('busy');
    setNote('');

    if (!import.meta.env.VITE_SUPABASE_URL) {
      /* Nothing configured yet — send the message through WhatsApp rather
         than failing silently or pretending it worked. */
      const body = encodeURIComponent(
        `Enquiry from ${values.name}\n${values.email}${values.phone ? ` / ${values.phone}` : ''}\n\n${values.message}`,
      );
      window.open(`${CONTACT.whatsapp}?text=${body}`, '_blank', 'noopener');
      setStatus('ok');
      setNote('We opened WhatsApp with your message so you can send it straight away.');
      setValues(EMPTY);
      return;
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim() || undefined,
          message: values.message.trim(),
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || `Request failed (${res.status})`);
      setStatus('ok');
      setNote('Your enquiry is with us. Expect a reply within 24 hours.');
      setValues(EMPTY);
    } catch (err) {
      setStatus('error');
      setNote(
        err instanceof Error
          ? `${err.message} You can also reach us on ${CONTACT.phones[0].display}.`
          : 'Something went wrong sending that. Please try again, or message us on WhatsApp.',
      );
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="inq-name">Name</label>
        <input
          id="inq-name" name="name" value={values.name} onChange={set('name')}
          autoComplete="name" placeholder="Your name"
          aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'err-name' : undefined}
        />
        {errors.name && <p className="field__err" id="err-name">{errors.name}</p>}
      </div>

      <div className="rule rule--even" style={{ gap: 20 }}>
        <div className="field">
          <label htmlFor="inq-email">Email</label>
          <input
            id="inq-email" name="email" type="email" value={values.email} onChange={set('email')}
            autoComplete="email" placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'err-email' : undefined}
          />
          {errors.email && <p className="field__err" id="err-email">{errors.email}</p>}
        </div>
        <div className="field">
          <label htmlFor="inq-phone">Phone <span className="muted">(optional)</span></label>
          <input
            id="inq-phone" name="phone" type="tel" value={values.phone} onChange={set('phone')}
            autoComplete="tel" placeholder="+252 63 …"
            aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'err-phone' : undefined}
          />
          {errors.phone && <p className="field__err" id="err-phone">{errors.phone}</p>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="inq-message">What are you looking for?</label>
        <textarea
          id="inq-message" name="message" value={values.message} onChange={set('message')}
          placeholder="Tell us which subjects interest you, or what you are aiming for."
          aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'err-message' : undefined}
        />
        {errors.message && <p className="field__err" id="err-message">{errors.message}</p>}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
        <button className="btn btn--primary" type="submit" disabled={status === 'busy'}>
          {status === 'busy' ? 'Sending' : 'Send enquiry'}
          {status !== 'busy' && <ArrowRight size={16} />}
        </button>
        <p className="form-note" style={{ maxWidth: '30ch' }}>
          We reply within 24 hours. No mailing list, no follow-up calls.
        </p>
      </div>

      {status === 'busy' && (
        <div className="annunciator annunciator--busy" role="status">
          <b>Sending</b>
          <p>Holding for the server.</p>
        </div>
      )}
      {status === 'ok' && (
        <div className="annunciator annunciator--ok" role="status">
          <b>Received</b>
          <p>{note}</p>
        </div>
      )}
      {status === 'error' && (
        <div className="annunciator annunciator--err" role="alert">
          <b>Not sent</b>
          <p>{note}</p>
        </div>
      )}
    </form>
  );
}

/* ── footer ──────────────────────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer className="foot">
      <div className="flow">
        <div className="shell">
          <div className="foot__top">
            <div className="foot__col">
              <div className="brand" style={{ marginBottom: 18 }}>
                <span className="brand__seal"><img src="/logo-removebg-preview.png" alt="" /></span>
                <span className="brand__name">
                  <strong>Stratosphere</strong>
                  <span>Aeronautics</span>
                </span>
              </div>
              <address style={{ fontStyle: 'normal', color: 'var(--chalk-dim)', lineHeight: 1.65, fontSize: '0.9375rem' }}>
                {CONTACT.lines.map((l) => <span key={l} style={{ display: 'block' }}>{l}</span>)}
                <span style={{ display: 'block', marginTop: 6 }}>{CONTACT.city}</span>
              </address>
            </div>

            <nav className="foot__col" aria-label="Main pages">
              <h3>Main pages</h3>
              <ul>
                {NAV.map((item) => (
                  <li key={item.to}><Link to={item.to}>{item.label}</Link></li>
                ))}
              </ul>
            </nav>

            <nav className="foot__col" aria-label="More from the school">
              <h3>More</h3>
              <ul>
                {SECONDARY.map((item) => (
                  <li key={item.to}><Link to={item.to}>{item.label}</Link></li>
                ))}
              </ul>
            </nav>

            <div className="foot__col">
              <h3>Reach us</h3>
              <ul>
                {CONTACT.phones.slice(0, 2).map((p) => (
                  <li key={p.display}><a href={p.href}>{p.display}</a></li>
                ))}
                <li><a href={`mailto:${CONTACT.emails[0]}`}>{CONTACT.emails[0]}</a></li>
                <li>
                  <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="foot__bottom">
            <span>© {new Date().getFullYear()} Stratosphere Aeronautics</span>
            <span className="foot__motto">Precision in theory. Excellence in flight.</span>
            <a
              className="foot__credit"
              href="https://fikrado2.github.io/fikrado/"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/fikrado_sec_(1).png" alt="" />
              <span>Powered by Fikrado Security</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── WhatsApp, kept available but not shouting ───────────────────────────── */
export function WhatsApp() {
  return (
    <a
      className="wa"
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Message Stratosphere Aeronautics on WhatsApp"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

/* ── the shell every page renders inside ─────────────────────────────────── */
export default function Shell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a href="#main" className="skip">Skip to content</a>
      <Rail />
      <Masthead />
      <main id="main" className="flow">
        {children}
      </main>
      <div className="flow">
        <Footer />
      </div>
      <WhatsApp />
    </>
  );
}
