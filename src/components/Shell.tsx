import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight, Award, Check, Globe, Phone, Radio, ShieldCheck, MapPin, Mail, MessageCircle, X, Languages, ChevronDown
} from 'lucide-react';
import { CONTACT } from '../data/site';
import { useLang, type Lang } from '../i18n';
import CinematicAtmosphere from './CinematicAtmosphere';

const WELCOME_KEY = 'stratosphere_welcomed';

/* sessionStorage throws in some privacy modes, so a missing/blocked store must
   degrade to "show the picker" rather than crash the first render. */
function readWelcomeFlag() {
  try {
    return sessionStorage.getItem(WELCOME_KEY) === 'true';
  } catch {
    return false;
  }
}

function writeWelcomeFlag() {
  try {
    sessionStorage.setItem(WELCOME_KEY, 'true');
  } catch {
    // Private browsing can block writes; the modal still closes for this visit.
  }
}

/* Keeps Tab inside an open dialog: moves focus in on open, cycles within, and
   restores it to whatever was focused before. Without this the drawer and the
   language modal are keyboard-reachable but not keyboard-operable. */
function useFocusTrap(isOpen: boolean, onEscape?: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const panel = ref.current;
    if (!panel) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusables = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null);

    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onEscape?.();
        return;
      }
      if (e.key !== 'Tab') return;

      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      previouslyFocused?.focus?.();
    };
  }, [isOpen, onEscape]);

  return ref;
}

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
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('click', close);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('click', close);
      window.removeEventListener('keydown', onKey);
    };
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

  // Traps Tab, focuses the panel on open, closes on Escape, restores focus.
  const closeDrawer = useCallback(() => setIsOpen(false), []);
  const drawerRef = useFocusTrap(isOpen, closeDrawer);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Keep the page from scrolling behind the drawer while it is open
  useEffect(() => {
    document.body.classList.toggle('nav-open', isOpen);
    return () => document.body.classList.remove('nav-open');
  }, [isOpen]);

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
            <Link to="/register" className="btn btn--primary btn--sm btn--enroll-glow">
              {t.enrollNow}
              <ArrowRight size={15} />
            </Link>
            <button
              type="button"
              className={`burger-btn ${isOpen ? 'is-open' : ''}`}
              onClick={() => setIsOpen(true)}
              aria-label="Open mobile menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer. When closed, .mobile-nav-drawer sets visibility: hidden,
          which already removes it from the tab order and the a11y tree — an
          aria-hidden here would wrap focusable links, which is a violation. */}
      <div
        className={`mobile-nav-drawer ${isOpen ? 'is-open' : ''}`}
        onClick={() => setIsOpen(false)}
      >
        <div className="mobile-nav-content" onClick={(e) => e.stopPropagation()} ref={drawerRef}>
          <div className="mobile-nav-header">
            <div className="mobile-nav-header__brand">
              <div className="circular-glowing-logo" style={{ width: 34, height: 34 }}>
                <img src="/logo-removebg-preview.png" alt="" />
              </div>
              <div>
                <b>Stratosphere</b>
                <span>Aeronautics</span>
              </div>
            </div>
            <button
              type="button"
              className="mobile-nav-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mobile-nav-links">
            {NAV_LINKS.map((item) => {
              const active = pathname === item.to || (item.to !== '/' && pathname.startsWith(item.to));
              return (
                <Link key={item.to} to={item.to} aria-current={active ? 'page' : undefined}>
                  {t.nav[item.key]}
                </Link>
              );
            })}
          </div>

          <div className="mobile-nav-contact">
            <a href={CONTACT.phones[0].href}>
              <Phone size={15} />
              {CONTACT.phones[0].display}
            </a>
            <a href={`mailto:${CONTACT.emails[0]}`}>
              <Mail size={15} />
              {CONTACT.emails[0]}
            </a>
            <span>
              <MapPin size={15} />
              {CONTACT.city}
            </span>
          </div>

          <div className="mobile-nav-cta">
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

/* ── Sticky Mobile Action Bar: Call · WhatsApp · Enrol ──────────────────── */
function MobileActionBar() {
  const { t } = useLang();
  return (
    <nav className="mobile-action-bar" aria-label="Quick contact">
      <a href={CONTACT.phones[0].href} className="mobile-action-bar__call" aria-label={t.call}>
        <Phone size={20} />
      </a>
      <a
        href={CONTACT.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="btn btn--whatsapp"
      >
        <MessageCircle size={17} />
        WhatsApp
      </a>
      <Link to="/register" className="btn btn--primary">
        {t.nav.enroll}
      </Link>
    </nav>
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
            <h3 className="title-md" style={{ color: '#ffffff' }}>{title}</h3>
            <p className="desc-lg" style={{ color: '#94a3b8' }}>{body}</p>
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
            className="fikrado-powered"
            href="https://fikrado2.github.io/"
            target="_blank"
            rel="noreferrer"
            aria-label="Powered by Fikrado Security"
          >
            <span className="fikrado-powered__label">Powered by</span>
            <img src="/fikrado_sec_(1).png" alt="Fikrado Security" className="fikrado-powered__logo" />
            <div className="fikrado-powered__name">
              <span className="fikrado-powered__fikrado">FIKRADO</span>
              <span className="fikrado-powered__security">Security</span>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ── Primary Shell ───────────────────────────────────────────────────────── */
export default function Shell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  // Show the blur + glowing language button on first visit only.
  // Auto-dismiss after a few seconds; the language button stays clickable.
  const [showWelcome, setShowWelcome] = useState(
    () => !readWelcomeFlag()
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!showWelcome) return;
    writeWelcomeFlag();
    const timer = window.setTimeout(() => setShowWelcome(false), 4000);
    return () => window.clearTimeout(timer);
  }, [showWelcome]);

  const dismissWelcome = useCallback(() => {
    setShowWelcome(false);
  }, []);

  return (
    <>
      <TopBar />
      <Header isGlowingTranslate={showWelcome} />
      <main
        id="main"
        className={showWelcome ? 'is-blurred-welcome' : 'is-unblurred'}
        onClick={showWelcome ? dismissWelcome : undefined}
      >
        {children}
      </main>
      <div className={showWelcome ? 'is-blurred-welcome' : 'is-unblurred'}>
        <Footer />
      </div>
      {!showWelcome && <MobileActionBar />}
    </>
  );
}
