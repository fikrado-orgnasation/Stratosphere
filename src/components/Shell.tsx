import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight, Award, Check, Globe, Phone, Radio, ShieldCheck, MapPin, Mail, MessageCircle, X, Languages, ChevronDown
} from 'lucide-react';
import { CONTACT } from '../data/site';
import { useLang, type Lang } from '../i18n';
import CinematicAtmosphere from './CinematicAtmosphere';
import ZohoLeadForm from './ZohoLeadForm';

export const NAV_LINKS = [
  { to: '/', key: 'home' as const },
  { to: '/training', key: 'training' as const },
  { to: '/register', key: 'enroll' as const },
  { to: '/books', key: 'books' as const },
  { to: '/careers', key: 'careers' as const },
  { to: '/about', key: 'about' as const },
  { to: '/contact', key: 'contact' as const },
] as const;

/* ── Simple Top Notification Bar ─────────────────────────────────────────── */
function TopBar() {
  const { t } = useLang();
  return (
    <div className="top-notice-bar">
      <div className="shell top-notice-bar__in">
        <div className="top-notice-bar__left">
          <span className="top-notice-bar__item">
            <Award size={14} style={{ color: 'var(--amber)' }} />
            <span>{t.admissionsOpen}</span>
          </span>
          <span className="top-notice-bar__item" style={{ opacity: 0.8 }}>
            <MapPin size={14} />
            <span>{t.hargeisa}</span>
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
            <span>{t.whatsappAdmissions}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Simple School Header ────────────────────────────────────────────────── */
function LanguageSwitcher({ isGlowing }: { isGlowing?: boolean }) {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    if (open) {
      window.addEventListener('click', close);
      return () => window.removeEventListener('click', close);
    }
  }, [open]);

  return (
    <div className="lang-switcher" onClick={(e) => e.stopPropagation()}>
      <button
        className={`lang-switcher__btn ${isGlowing ? 'lang-switcher__btn--glowing' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Switch language"
        aria-expanded={open}
      >
        <Languages size={16} />
        <span>{lang === 'en' ? 'EN' : 'SO'}</span>
        <ChevronDown size={13} style={{ opacity: 0.6 }} />
      </button>
      {open && (
        <div className="lang-switcher__menu">
          <button
            className={`lang-switcher__item ${lang === 'en' ? 'is-active' : ''}`}
            onClick={() => { setLang('en' as Lang); setOpen(false); }}
          >
            English
            {lang === 'en' && <Check size={14} />}
          </button>
          <button
            className={`lang-switcher__item ${lang === 'so' ? 'is-active' : ''}`}
            onClick={() => { setLang('so' as Lang); setOpen(false); }}
          >
            Soomaali
            {lang === 'so' && <Check size={14} />}
          </button>
        </div>
      )}
    </div>
  );
}

function Header({ isGlowingTranslate }: { isGlowingTranslate?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { t } = useLang();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="site-header">
        <div className="shell site-header__in">
          {/* School Brand — Circular Glowing Emblem */}
          <Link to="/" className="school-brand" aria-label="Stratosphere Aeronautics Home">
            <div className="school-brand__logo circular-glowing-logo">
              <img src="/logo-removebg-preview.png" alt="Stratosphere Aeronautics Crest" />
            </div>
          </Link>

          {/* Simple Navigation */}
          <nav className="school-nav" aria-label="Main Navigation">
            {NAV_LINKS.map((item) => {
              const active = pathname === item.to || (item.to !== '/' && pathname.startsWith(item.to));
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? 'page' : undefined}
                >
                  {t.nav[item.key]}
                </Link>
              );
            })}
          </nav>

          <LanguageSwitcher isGlowing={isGlowingTranslate} />

          {/* Header Action Button */}
          <div className="school-header__actions">
            <Link to="/register" className="btn btn--primary btn--sm">
              {t.enrollNow}
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
              {t.menu}
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
                {t.nav[item.key]}
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
              {t.whatsappAdmissions}
            </a>
            <Link to="/register" className="btn btn--primary">
              {t.enrollCourses}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Floating Green WhatsApp Button ──────────────────────────────────────── */
export function WhatsApp() {
  const { t } = useLang();
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
      <span>{t.whatsappAdmissions}</span>
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

/* ── Zoho CRM Web-to-Lead Inquiry Form ──────────────────────────────────── */
export function InquiryForm({ defaultMsg = '' }: { defaultMsg?: string }) {
  return <ZohoLeadForm defaultDescription={defaultMsg} />;
}

/* ── Simple School Footer ────────────────────────────────────────────────── */
export function Footer() {
  const { t } = useLang();
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
              Somaliland’s premier aviation ground school. Theoretical knowledge instruction
              to ICAO standards, taught one to one in Hargeisa.
            </p>
            <address style={{ fontStyle: 'normal', color: '#cbd5e1', fontSize: '0.875rem', lineHeight: 1.6 }}>
              {CONTACT.lines.map((l) => <span key={l} style={{ display: 'block' }}>{l}</span>)}
              <span style={{ display: 'block', fontWeight: 600, marginTop: 4 }}>{CONTACT.city}</span>
            </address>
          </div>

          {/* Col 2: Academic Programs */}
          <div className="school-footer__col">
            <h4>{t.courses}</h4>
            <ul>
              <li><Link to="/training">{t.allSubjects}</Link></li>
              <li><Link to="/training/1">Air Law (M01)</Link></li>
              <li><Link to="/training/2">Principles of Flight (M02)</Link></li>
              <li><Link to="/training/3">Meteorology (M03)</Link></li>
              <li><Link to="/training/4">Navigation & Planning (M04)</Link></li>
              <li><Link to="/books">{t.textbooks}</Link></li>
            </ul>
          </div>

          {/* Col 3: Student Life & Careers */}
          <div className="school-footer__col">
            <h4>{t.schoolLife}</h4>
            <ul>
              <li><Link to="/careers">{t.aviationCareerRoutes}</Link></li>
              <li><Link to="/about">{t.aboutInstructors}</Link></li>
              <li><Link to="/register">{t.enrollmentGuide}</Link></li>
              <li><Link to="/contact">{t.campusMap}</Link></li>
            </ul>
          </div>

          {/* Col 4: Reach Admissions */}
          <div className="school-footer__col">
            <h4>{t.admissionsDesk}</h4>
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
          <span>&copy; {new Date().getFullYear()} Stratosphere Aeronautics. {t.rights}</span>
          <a
            className="fikrado-security-badge"
            href="https://fikrado2.github.io/fikrado/"
            target="_blank"
            rel="noreferrer"
            aria-label="Powered by Fikrado Security"
          >
            <img src="/fikrado_sec_(1).png" alt="Fikrado Security" />
            <span>{t.poweredBy}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ── Language Welcome Spotlight Modal ────────────────────────────────────── */
function LanguageWelcomeModal({
  isOpen,
  onSelect,
  onClose,
}: {
  isOpen: boolean;
  onSelect: (lang: Lang) => void;
  onClose: () => void;
}) {
  const { lang } = useLang();
  if (!isOpen) return null;

  return (
    <div
      className="lang-welcome-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Select Language"
    >
      <div className="lang-welcome-card" onClick={(e) => e.stopPropagation()}>
        {/* Heraldic Circular Crest with Glowing Aura */}
        <div className="circular-glowing-logo" style={{ width: 72, height: 72, margin: '0 auto 16px' }}>
          <img src="/logo-removebg-preview.png" alt="Stratosphere Crest" />
        </div>

        <span className="badge badge--gold" style={{ margin: '0 auto 10px' }}>
          Aviation Ground School · Hargeisa
        </span>

        <h2 className="lang-welcome-card__title">
          Stratosphere Aeronautics
        </h2>

        <p className="lang-welcome-card__sub">
          School of Theoretical Knowledge Instruction
        </p>

        <p className="lang-welcome-card__prompt">
          Select your preferred language / Fadlan dooro luqaddaada:
        </p>

        <div className="lang-welcome-card__grid">
          <button
            type="button"
            className={`lang-welcome-choice ${lang === 'en' ? 'is-active' : ''}`}
            onClick={() => onSelect('en')}
          >
            <span className="lang-welcome-choice__flag">🇬🇧</span>
            <div className="lang-welcome-choice__meta">
              <strong>English</strong>
              <small>ICAO Aviation Standard</small>
            </div>
            {lang === 'en' && <Check size={18} className="lang-welcome-choice__check" />}
          </button>

          <button
            type="button"
            className={`lang-welcome-choice ${lang === 'so' ? 'is-active' : ''}`}
            onClick={() => onSelect('so')}
          >
            <span className="lang-welcome-choice__flag">🇸🇴</span>
            <div className="lang-welcome-choice__meta">
              <strong>Soomaali</strong>
              <small>Af-Soomaali</small>
            </div>
            {lang === 'so' && <Check size={18} className="lang-welcome-choice__check" />}
          </button>
        </div>

        <button
          type="button"
          className="btn btn--primary lang-welcome-enter"
          onClick={onClose}
        >
          Enter Website / Gal Websaytka
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

/* ── Primary Shell ───────────────────────────────────────────────────────── */
export default function Shell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { setLang } = useLang();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('stratosphere_welcomed');
    if (!hasVisited) {
      setShowWelcome(true);
    }
  }, []);

  const handleSelectLang = (selectedLang: Lang) => {
    setLang(selectedLang);
    sessionStorage.setItem('stratosphere_welcomed', 'true');
    setShowWelcome(false);
  };

  const handleCloseWelcome = () => {
    sessionStorage.setItem('stratosphere_welcomed', 'true');
    setShowWelcome(false);
  };

  return (
    <>
      <TopBar />
      <Header isGlowingTranslate={showWelcome} />
      <main id="main" className={showWelcome ? 'is-blurred-welcome' : 'is-unblurred'}>
        {children}
      </main>
      <div className={showWelcome ? 'is-blurred-welcome' : 'is-unblurred'}>
        <Footer />
      </div>
      <WhatsApp />

      <LanguageWelcomeModal
        isOpen={showWelcome}
        onSelect={handleSelectLang}
        onClose={handleCloseWelcome}
      />
    </>
  );
}
