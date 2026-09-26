import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight, Award, Globe, Phone, Radio, ShieldCheck, MapPin, Mail, MessageCircle, X
} from 'lucide-react';
import { CONTACT } from '../data/site';
import CinematicAtmosphere from './CinematicAtmosphere';

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/training', label: 'Courses & Syllabus' },
  { to: '/register', label: 'Enroll' },
  { to: '/books', label: 'Books' },
  { to: '/student-life', label: 'Student Life' },
  { to: '/careers', label: 'Careers' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
] as const;

/* ── Simple Top Notification Bar ─────────────────────────────────────────── */
function TopBar() {
  return (
    <div className="top-notice-bar">
      <div className="shell top-notice-bar__in">
        <div className="top-notice-bar__left">
          <span className="top-notice-bar__item">
            <Award size={14} style={{ color: 'var(--amber)' }} />
            <span>Admissions Open for 2026–2027 Ground School</span>
          </span>
          <span className="top-notice-bar__item" style={{ opacity: 0.8 }}>
            <MapPin size={14} />
            <span>Hargeisa, Somaliland</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a
            href={CONTACT.phones[0].href}
            className="top-notice-bar__item"
            style={{ fontWeight: 600 }}
          >
            <Phone size={13} />
            <span>{CONTACT.phones[0].display}</span>
          </a>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="top-notice-bar__item"
            style={{ color: '#25d366', fontWeight: 700 }}
          >
            <MessageCircle size={13} />
            <span>WhatsApp Admissions</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Simple School Header ────────────────────────────────────────────────── */
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="site-header">
        <div className="shell site-header__in">
          {/* School Brand */}
          <Link to="/" className="school-brand" aria-label="Stratosphere Aeronautics, Home">
            <div className="school-brand__logo">
              <img src="/logo-removebg-preview.png" alt="Stratosphere Logo" />
            </div>
            <div className="school-brand__text">
              <span className="school-brand__name">Stratosphere Aeronautics</span>
              <span className="school-brand__sub">Aviation Ground School · Hargeisa</span>
            </div>
          </Link>

          {/* Simple Navigation */}
          <nav className="school-nav" aria-label="Main Navigation">
            {NAV_LINKS.slice(0, 7).map((item) => {
              const active = pathname === item.to || (item.to !== '/' && pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Button */}
          <div className="school-header__actions">
            <Link to="/register" className="btn btn--primary btn--sm">
              Enroll Now
              <ArrowRight size={15} />
            </Link>
            <button
              type="button"
              className="burger-btn"
              onClick={() => setIsOpen(true)}
              aria-label="Open mobile menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`mobile-nav-drawer ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      >
        <div className="mobile-nav-content" onClick={(e) => e.stopPropagation()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--navy)' }}>
              Menu
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              style={{ padding: 6 }}
            >
              <X size={24} />
            </button>
          </div>

          <div className="mobile-nav-links">
            {NAV_LINKS.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 'auto', display: 'grid', gap: 10 }}>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn btn--whatsapp"
            >
              <MessageCircle size={18} />
              WhatsApp Admissions
            </a>
            <Link to="/register" className="btn btn--primary">
              Enroll in Courses
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Floating Green WhatsApp Button ──────────────────────────────────────── */
export function WhatsApp() {
  return (
    <a
      className="whatsapp-float"
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Message Stratosphere Aeronautics Admissions on WhatsApp"
    >
      <div className="whatsapp-float__pulse">
        <MessageCircle size={24} />
        <span className="whatsapp-float__dot" />
      </div>
      <span>Chat on WhatsApp</span>
    </a>
  );
}

/* ── Accreditation Bar ───────────────────────────────────────────────────── */
export function Filings() {
  return (
    <section className="accreditation-bar">
      <div className="shell">
        <div className="accreditation-items">
          <span className="accreditation-badge">
            <Globe size={18} />
            <span>ICAO Doc 7192 Aligned</span>
          </span>
          <span className="accreditation-badge">
            <Award size={18} />
            <span>ERNAM-Trained Instructors</span>
          </span>
          <span className="accreditation-badge">
            <ShieldCheck size={18} />
            <span>ASECNA Partner Curriculum</span>
          </span>
          <span className="accreditation-badge">
            <Radio size={18} />
            <span>Ministry of Education Licensed</span>
          </span>
        </div>
      </div>
    </section>
  );
}

/* ── Interior Page Banner ────────────────────────────────────────────────── */
export function PageHead({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  code?: string;
  title: string;
  lede?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="school-page-banner">
      <CinematicAtmosphere />
      <div className="shell">
        <div className="school-page-banner__head">
          <span className="badge badge--white">{kicker}</span>
          <h1 className="title-lg">{title}</h1>
          {lede && <p className="desc-lg" style={{ color: '#e2e8f0' }}>{lede}</p>}
        </div>
      </div>
    </div>
  );
}

/* ── Mid-page Call to Action Ask Banner ───────────────────────────────────── */
export function Ask({ title, body }: { title: string; body: string }) {
  return (
    <section className="section">
      <div className="shell">
        <div className="school-cta-card">
          <div>
            <span className="badge badge--amber" style={{ marginBottom: 12 }}>
              Ground School Admissions
            </span>
            <h3 className="title-md">{title}</h3>
            <p className="desc-lg" style={{ color: '#cbd5e1' }}>{body}</p>
          </div>
          <div className="school-cta-card__actions">
            <Link to="/register" className="btn btn--primary">
              Enroll for a Subject
              <ArrowRight size={16} />
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn btn--whatsapp"
            >
              <MessageCircle size={18} />
              Ask Admissions on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Simple Inquiry Form ─────────────────────────────────────────────────── */
export function InquiryForm({ defaultMsg = '' }: { defaultMsg?: string }) {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState(defaultMsg);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (defaultMsg) setMessage(defaultMsg);
  }, [defaultMsg]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ padding: 28, background: '#f0fdf4', borderRadius: 'var(--radius)', border: '1px solid #bbf7d0' }}>
        <h4 style={{ color: '#15803d', fontSize: '1.15rem', fontWeight: 700, marginBottom: 8 }}>
          Enquiry Received
        </h4>
        <p style={{ color: '#166534', fontSize: '0.9375rem' }}>
          Thank you, {name}. Our admissions desk will reply to you within 24 hours.
          You can also reach us immediately on WhatsApp.
        </p>
        <a
          href={`${CONTACT.whatsapp}?text=${encodeURIComponent(`Hello, my name is ${name}. ${message}`)}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn--whatsapp btn--sm"
          style={{ marginTop: 14 }}
        >
          <MessageCircle size={16} />
          Continue on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
      <div className="form-group">
        <label className="form-label">Your Full Name</label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. Ahmed Dahir"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Phone Number or Email</label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. +252 63 XXXXXXX or name@example.com"
          required
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Message / Subjects of Interest</label>
        <textarea
          className="form-textarea"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Let us know what you want to study..."
        />
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <button type="submit" className="btn btn--primary">
          Submit School Enquiry
          <ArrowRight size={16} />
        </button>
        <a
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="btn btn--whatsapp"
        >
          <MessageCircle size={18} />
          Fast WhatsApp Reply
        </a>
      </div>
    </form>
  );
}

/* ── Simple School Footer ────────────────────────────────────────────────── */
export function Footer() {
  return (
    <footer className="school-footer">
      <div className="shell">
        <div className="school-footer__top">
          {/* Col 1: Brand & Contact */}
          <div className="school-footer__col" style={{ display: 'grid', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 8, background: '#ffffff', padding: 3 }}>
                <img src="/logo-removebg-preview.png" alt="Stratosphere Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div>
                <b style={{ color: '#ffffff', fontSize: '1.15rem', display: 'block' }}>Stratosphere Aeronautics</b>
                <span style={{ fontSize: '0.8125rem', color: 'var(--amber)' }}>School of Theoretical Knowledge Instruction</span>
              </div>
            </div>
            <p style={{ fontSize: '0.9375rem', color: '#94a3b8', lineHeight: 1.6, maxWidth: '38ch' }}>
              Somalia & Somaliland’s premier aviation ground school. Theoretical knowledge instruction
              to ICAO standards, taught one to one in Hargeisa.
            </p>
            <address style={{ fontStyle: 'normal', color: '#cbd5e1', fontSize: '0.875rem', lineHeight: 1.6 }}>
              {CONTACT.lines.map((l) => <span key={l} style={{ display: 'block' }}>{l}</span>)}
              <span style={{ display: 'block', fontWeight: 600, marginTop: 4 }}>{CONTACT.city}</span>
            </address>
          </div>

          {/* Col 2: Academic Programs */}
          <div className="school-footer__col">
            <h4>Courses</h4>
            <ul>
              <li><Link to="/training">All 10 ICAO Subjects</Link></li>
              <li><Link to="/training/1">Air Law (M01)</Link></li>
              <li><Link to="/training/2">Principles of Flight (M02)</Link></li>
              <li><Link to="/training/3">Meteorology (M03)</Link></li>
              <li><Link to="/training/4">Navigation & Planning (M04)</Link></li>
              <li><Link to="/books">Textbooks & Manuals</Link></li>
            </ul>
          </div>

          {/* Col 3: Student Life & Careers */}
          <div className="school-footer__col">
            <h4>School Life</h4>
            <ul>
              <li><Link to="/student-life">Inside Student Life</Link></li>
              <li><Link to="/careers">Aviation Career Routes</Link></li>
              <li><Link to="/about">About Instructors</Link></li>
              <li><Link to="/register">Enrollment Guide</Link></li>
              <li><Link to="/contact">Campus Map & Directions</Link></li>
            </ul>
          </div>

          {/* Col 4: Reach Admissions */}
          <div className="school-footer__col">
            <h4>Admissions Desk</h4>
            <ul>
              {CONTACT.phones.slice(0, 2).map((p) => (
                <li key={p.display}>
                  <a href={p.href} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <Phone size={14} />
                    {p.display}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${CONTACT.emails[0]}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Mail size={14} />
                  {CONTACT.emails[0]}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#25d366', fontWeight: 700 }}
                >
                  <MessageCircle size={16} />
                  WhatsApp Admissions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Fikrado Security */}
        <div className="school-footer__bottom">
          <span>&copy; {new Date().getFullYear()} Stratosphere Aeronautics. Precision in theory. Excellence in flight.</span>
          <a
            className="fikrado-security-badge"
            href="https://fikrado2.github.io/fikrado/"
            target="_blank"
            rel="noreferrer"
            aria-label="Powered by Fikrado Security"
          >
            <img src="/fikrado_sec_(1).png" alt="Fikrado Security" />
            <span>Powered by Fikrado Security</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ── Primary Shell ───────────────────────────────────────────────────────── */
export default function Shell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <TopBar />
      <Header />
      <main id="main">
        {children}
      </main>
      <Footer />
      <WhatsApp />
    </>
  );
}
