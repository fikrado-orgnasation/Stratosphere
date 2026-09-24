import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  Plane, Globe, Shield, BookOpen, Radio, Users, Award,
  ChevronDown, MapPin, Phone, Mail, Menu, X, CheckCircle,
  Navigation, Cloud, Compass, Zap, GraduationCap, Briefcase,
  Building, ChevronRight, ArrowRight, Star, Target, Lightbulb,
  Clock, TrendingUp, Heart
} from 'lucide-react';
import { translations, Lang } from './translations';

// ── WhatsApp SVG ──────────────────────────────────────────────────────────────
function WhatsAppIcon({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ── Language context ──────────────────────────────────────────────────────────
const LangContext = createContext<{
  lang: Lang;
  t: (k: keyof typeof translations['en']) => string;
  setLang: (l: Lang) => void;
}>({
  lang: 'en',
  t: (k) => translations.en[k],
  setLang: () => {},
});

function useLang() { return useContext(LangContext); }

// ── 3D tilt hook ──────────────────────────────────────────────────────────────
function useTilt(intensity = 10) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.02,1.02,1.02)`;
  }, [intensity]);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.15s ease-out';
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [handleMove, handleLeave]);

  return ref;
}

// ── TiltCard wrapper ───────────────────────────────────────────────────────────
function TiltCard({ children, className, style, intensity }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties; intensity?: number;
}) {
  const ref = useTilt(intensity);
  return (
    <div ref={ref} className={`card-3d perspective-container ${className ?? ''}`} style={style}>
      {children}
    </div>
  );
}

// ── Stars + Particles background ──────────────────────────────────────────────
function StarsBackground() {
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    left: `${(i * 13 + 7) % 100}%`,
    top: `${(i * 17 + 3) % 100}%`,
    size: (i % 3) * 0.8 + 0.6,
    duration: `${(i % 4) + 2.5}s`,
    delay: `${(i % 5) * 0.8}s`,
  }));

  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${(i * 19 + 5) % 100}%`,
    size: (i % 4) * 20 + 25,
    duration: `${(i % 6) + 18}s`,
    delay: `${(i % 5) * 2}s`,
    depth: 0.04 + (i % 3) * 0.03,
  }));

  return (
    <>
      <div className="stars-bg">
        {stars.map(s => (
          <div
            key={s.id}
            className="star"
            style={{
              left: s.left, top: s.top,
              width: `${s.size}px`, height: `${s.size}px`,
              '--duration': s.duration,
              '--delay': s.delay,
            } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="particles-bg">
        {particles.map(p => (
          <div
            key={p.id}
            className="depth-particle"
            style={{
              left: p.left,
              width: `${p.size}px`, height: `${p.size}px`,
              '--float-dur': p.duration,
              '--float-delay': p.delay,
              '--depth': p.depth,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </>
  );
}

// ── Airplanes background ───────────────────────────────────────────────────────
function AirplanesBackground() {
  const planes = [
    { cls: 'airplane-1', size: 40 },
    { cls: 'airplane-2', size: 28 },
    { cls: 'airplane-3', size: 48 },
    { cls: 'airplane-4', size: 24 },
    { cls: 'airplane-5', size: 36 },
  ];
  return (
    <div className="airplane-bg-layer" aria-hidden="true">
      {planes.map((p, i) => (
        <Plane key={i} size={p.size} strokeWidth={1.5} className={`airplane-fly ${p.cls}`} />
      ))}
    </div>
  );
}

// ── Reveal hook (called at component level, NOT inside map) ───────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ── Section wrapper ────────────────────────────────────────────────────────────
function Section({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`relative z-10 py-24 px-4 ${className ?? ''}`}>
      {children}
    </section>
  );
}

// ── Section Title ──────────────────────────────────────────────────────────────
function SectionTitle({ label, title, subtitle }: { label?: string; title: string; subtitle?: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal text-center mb-16">
      {label && (
        <span className="label-badge mb-4 inline-block">{label}</span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold gradient-text-light mb-5 mt-3">
        {title}
      </h2>
      <div className="section-divider-wide w-40 mx-auto mb-5" />
      {subtitle && (
        <p className="text-[#94aed4] max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── Language Switcher ──────────────────────────────────────────────────────────
const langLabels: Record<Lang, { flag: string; label: string }> = {
  en: { flag: '🇬🇧', label: 'EN' },
  so: { flag: '🇸🇴', label: 'SO' },
  ar: { flag: '🇸🇦', label: 'AR' },
};

function LangSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-3 py-1.5 border border-[rgba(75,142,245,0.35)] rounded-lg bg-[rgba(36,114,232,0.08)] hover:bg-[rgba(36,114,232,0.16)] hover:border-[rgba(75,142,245,0.6)] transition-all duration-200 text-xs font-semibold text-[#7ab8f7] tracking-wider uppercase"
        aria-label="Change language"
      >
        <Globe size={13} />
        {langLabels[lang].label}
        <ChevronDown size={11} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-[rgba(75,142,245,0.2)] shadow-2xl overflow-hidden z-50 glass-strong"
          style={{ background: 'rgba(4,11,26,0.98)' }}>
          {(['en', 'so', 'ar'] as Lang[]).map(l => (
            <button
              key={l}
              onClick={() => { setLang(l); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left text-xs font-semibold tracking-wider transition-colors duration-150 ${
                lang === l
                  ? 'text-[#7ab8f7] bg-[rgba(36,114,232,0.12)]'
                  : 'text-[rgba(180,210,255,0.65)] hover:text-[#7ab8f7] hover:bg-[rgba(36,114,232,0.07)]'
              }`}
            >
              <span className="text-base">{langLabels[l].flag}</span>
              <span>{l === 'en' ? 'English' : l === 'so' ? 'Soomaali' : 'العربية'}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────
function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#about', label: t('nav_about') },
    { href: '#training', label: t('nav_training') },
    { href: '#careers', label: t('nav_careers') },
    { href: '#why-us', label: t('nav_why_us') },
    { href: '#certificate', label: t('nav_certificate') },
    { href: '#contact', label: t('nav_contact') },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-glass' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group shrink-0">
          <img
            src="/logo-removebg-preview.png"
            alt="Stratosphere Aeronautics"
            className="w-11 h-11 object-contain transition-transform duration-300 group-hover:scale-110"
          />
          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-extrabold gradient-text-blue tracking-tight">Stratosphere</p>
            <p className="text-[10px] font-semibold text-[rgba(122,184,247,0.65)] tracking-[0.2em] uppercase">Aeronautics</p>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {links.map(l => (
            <a key={l.href} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <LangSwitcher />
          <a
            href="#contact"
            className="btn-primary text-xs font-bold px-5 py-2.5 inline-flex items-center gap-1.5"
          >
            {t('nav_enroll')} <ArrowRight size={13} />
          </a>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <LangSwitcher />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg text-[#7ab8f7] hover:bg-[rgba(36,114,232,0.1)] transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu md:hidden border-t border-[rgba(36,114,232,0.15)] px-6 py-6 flex flex-col gap-1">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 py-3.5 px-3 rounded-lg text-sm font-semibold text-[rgba(180,210,255,0.8)] hover:text-[#7ab8f7] hover:bg-[rgba(36,114,232,0.08)] transition-all uppercase tracking-wider border-b border-[rgba(36,114,232,0.07)] last:border-0"
            >
              <ChevronRight size={14} className="text-[#2472e8]" />
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="btn-primary mt-4 text-sm font-bold px-6 py-3 text-center inline-flex items-center justify-center gap-2"
          >
            {t('nav_enroll')} <ArrowRight size={15} />
          </a>
        </div>
      )}
    </nav>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────
function Hero() {
  const { t } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<HTMLDivElement>(null);
  const earthGlowRef = useRef<HTMLDivElement>(null);
  const earthAtmoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      if (earthRef.current) earthRef.current.style.transform = `translate(${x * 25}px, ${y * 25}px)`;
      if (earthGlowRef.current) earthGlowRef.current.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
      if (earthAtmoRef.current) earthAtmoRef.current.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="hero-bg relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 overflow-hidden"
    >
      {/* Earth parallax */}
      <div className="earth-container">
        <div ref={earthGlowRef} className="earth-glow" />
        <div ref={earthAtmoRef} className="earth-atmosphere" />
        <div ref={earthRef} className="earth-sphere" />
      </div>

      {/* Atmospheric lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[15, 35, 55, 75].map((p, i) => (
          <div key={i} className="absolute w-full horizon-glow" style={{ top: `${p}%` }} />
        ))}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="runway-dot w-1.5 h-1.5 rounded-full" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>

      {/* Logo */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full pulse-ring border-2 border-[rgba(36,114,232,0.3)] scale-110" />
        <div className="absolute inset-0 rounded-full pulse-ring border border-[rgba(36,114,232,0.18)] scale-125" style={{ animationDelay: '0.8s' }} />
        <div className="absolute inset-0 rounded-full pulse-ring border border-[rgba(36,114,232,0.1)] scale-[1.4]" style={{ animationDelay: '1.6s' }} />
        <img
          src="/logo-removebg-preview.png"
          alt="Stratosphere Aeronautics"
          className="logo-float w-40 h-40 md:w-52 md:h-52 object-contain relative z-10"
        />
      </div>

      {/* Text content */}
      <div className="max-w-4xl mx-auto relative z-10">
        <p className="animate-fade-in text-[11px] md:text-xs font-bold tracking-[0.35em] text-[#4b8ef5] uppercase mb-5">
          {t('hero_tagline')}
        </p>
        <h1 className="animate-slide-up font-extrabold leading-[1.08] mb-4">
          <span className="block text-4xl sm:text-5xl md:text-7xl gradient-text-blue">Stratosphere</span>
          <span className="block text-4xl sm:text-5xl md:text-7xl text-[#dceeff]">Aeronautics</span>
        </h1>
        <p className="animate-slide-up delay-200 text-sm md:text-base font-semibold text-[#7ab8f7] tracking-[0.2em] uppercase mb-4">
          {t('hero_school')}
        </p>
        <div className="section-divider-wide w-56 mx-auto mb-6" />
        <p className="animate-fade-in delay-300 text-[#94aed4] text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-3">
          {t('hero_desc')}
        </p>
        <p className="animate-fade-in delay-400 text-[rgba(122,184,247,0.5)] text-xs tracking-[0.25em] uppercase mb-10">
          {t('hero_motto')}
        </p>

        <div className="animate-slide-up delay-500 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#training" className="btn-primary px-9 py-4 text-sm font-bold inline-flex items-center gap-2 justify-center">
            {t('hero_explore')} <ArrowRight size={16} />
          </a>
          <a href="#contact" className="btn-outline px-9 py-4 text-sm font-semibold inline-flex items-center gap-2 justify-center">
            {t('hero_enroll')} <ChevronRight size={16} />
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <p className="text-[10px] font-semibold tracking-[0.3em] text-[rgba(122,184,247,0.45)] uppercase">Discover More</p>
        <ChevronDown className="scroll-indicator text-[rgba(75,142,245,0.55)]" size={20} />
      </div>
    </section>
  );
}

// ── Stats Banner ───────────────────────────────────────────────────────────────
function StatsBanner() {
  const ref = useReveal();
  const stats = [
    { value: 'ICAO', label: 'Recognized Standard', icon: <Globe size={20} /> },
    { value: 'ERNAM', label: 'Affiliated Training', icon: <Award size={20} /> },
    { value: '10+', label: 'Core Training Areas', icon: <BookOpen size={20} /> },
    { value: '5+', label: 'Career Pathways', icon: <Briefcase size={20} /> },
  ];

  return (
    <div ref={ref} className="reveal relative z-10 glass border-y border-[rgba(36,114,232,0.12)]">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-2">
            <div className="text-[#4b8ef5] mb-1">{s.icon}</div>
            <p className="stat-number text-3xl md:text-4xl font-extrabold">{s.value}</p>
            <p className="text-[#4a6080] text-xs font-semibold tracking-wider uppercase">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── About ──────────────────────────────────────────────────────────────────────
function About() {
  const { t } = useLang();
  const colRef = useReveal();
  const cardRef = useReveal();

  const highlights = [
    { icon: <Shield size={16} />, text: 'ICAO Compliant Syllabus', color: 'icon-box-blue' },
    { icon: <Star size={16} />, text: 'ERNAM-Trained Instructors', color: 'icon-box-amber' },
    { icon: <Users size={16} />, text: 'Ab-Initio Specialists', color: 'icon-box-green' },
    { icon: <Globe size={16} />, text: 'Internationally Valid', color: 'icon-box-cyan' },
  ];

  const facts = [
    { label: t('about_founded'), value: t('about_founded_val') },
    { label: t('about_location'), value: t('about_location_val') },
    { label: t('about_cert'), value: t('about_cert_val') },
  ];

  return (
    <Section id="about" className="section-alt">
      <div className="max-w-6xl mx-auto">
        <SectionTitle label={t('about_label')} title={t('about_title')} subtitle={t('about_subtitle')} />

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <div ref={colRef} className="reveal space-y-6">
            <p className="text-[#94aed4] text-base leading-relaxed">{t('about_p1')}</p>
            <p className="text-[#94aed4] text-base leading-relaxed">{t('about_p2')}</p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(10,32,68,0.6)] border border-[rgba(36,114,232,0.12)]">
                  <div className={`icon-box w-8 h-8 ${item.color} shrink-0`}>
                    {item.icon}
                  </div>
                  <span className="text-[#94aed4] text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info card */}
          <div ref={cardRef} className="reveal">
          <TiltCard
            intensity={8}
            className="card-modern"
            style={{ background: 'linear-gradient(135deg, rgba(10,32,68,0.75), rgba(6,17,36,0.9))' }}
          >
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="/logo-removebg-preview.png"
                  alt="Stratosphere Aeronautics"
                  className="floating-icon w-16 h-16 object-contain"
                />
                <div>
                  <p className="text-base font-extrabold gradient-text-blue">Stratosphere</p>
                  <p className="text-sm font-semibold text-[#7ab8f7]">Aeronautics</p>
                  <p className="text-[#4a6080] text-xs mt-0.5 font-medium">Est. 2026</p>
                </div>
              </div>

              <div className="section-divider mb-6" />

              <div className="space-y-3 mb-6">
                {[
                  'Theoretical Knowledge Instruction (TKI)',
                  'Private & Small-Group Tuition',
                  'PPL & CPL Prerequisite Foundation',
                  'ASECNA | ICAO WACAF Office Partner',
                  'Based in Hargeisa, Somaliland',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle size={14} className="text-[#4b8ef5] shrink-0" />
                    <span className="text-[#94aed4] text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="section-divider mb-5" />

              <div className="grid grid-cols-3 gap-3">
                {facts.map((f, i) => (
                  <div key={i} className="text-center p-3 rounded-xl bg-[rgba(36,114,232,0.07)] border border-[rgba(36,114,232,0.1)]">
                    <p className="text-[#4a6080] text-[10px] font-semibold uppercase tracking-wider mb-1">{f.label}</p>
                    <p className="text-[#7ab8f7] text-xs font-bold">{f.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── Mission ────────────────────────────────────────────────────────────────────
function Mission() {
  const { t } = useLang();
  const ref = useReveal();

  const descParts = t('mission_desc').split(/<gold>|<\/gold>/);

  const values = [
    { key: 'val_precision' as const, icon: <Navigation size={16} />, color: 'text-[#4b8ef5]' },
    { key: 'val_safety' as const, icon: <Shield size={16} />, color: 'text-[#4ade80]' },
    { key: 'val_integrity' as const, icon: <Star size={16} />, color: 'text-[#fbbf24]' },
    { key: 'val_excellence' as const, icon: <Award size={16} />, color: 'text-[#a78bfa]' },
  ];

  return (
    <Section id="mission" className="section-base">
      <div className="max-w-5xl mx-auto">
        <SectionTitle label={t('mission_label')} title={t('mission_title')} />

        <div ref={ref} className="reveal">
          <div className="mission-card animated-border p-10 md:p-14 text-center">
            <div className="mb-8">
              <Plane className="text-[rgba(36,114,232,0.4)] mx-auto mb-5" size={48} />
            </div>
            <blockquote className="text-lg md:text-2xl font-semibold text-[#dceeff] leading-relaxed mb-8 italic">
              {t('mission_quote')}
            </blockquote>
            <p className="text-[#94aed4] text-base leading-relaxed max-w-3xl mx-auto">
              {descParts.map((part, i) =>
                i % 2 === 1
                  ? <span key={i} className="text-[#7ab8f7] font-semibold">{part}</span>
                  : part
              )}
            </p>

            <div className="section-divider w-40 mx-auto mt-10 mb-8" />

            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {values.map((v, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-[#94aed4]">
                  <span className={v.color}>{v.icon}</span>
                  {t(v.key)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── Training Areas ─────────────────────────────────────────────────────────────
// Icon colors and icons per subject
const trainingData = [
  { icon: <BookOpen size={22} />, color: 'icon-box-blue' },
  { icon: <Plane size={22} />, color: 'icon-box-cyan' },
  { icon: <Cloud size={22} />, color: 'icon-box-sky' },
  { icon: <Navigation size={22} />, color: 'icon-box-blue' },
  { icon: <Zap size={22} />, color: 'icon-box-amber' },
  { icon: <Users size={22} />, color: 'icon-box-green' },
  { icon: <Radio size={22} />, color: 'icon-box-purple' },
  { icon: <Compass size={22} />, color: 'icon-box-cyan' },
  { icon: <Shield size={22} />, color: 'icon-box-green' },
  { icon: <Globe size={22} />, color: 'icon-box-blue' },
];

// Sub-component that uses useReveal at the top level
function TrainingCard({ keys, index }: {
  keys: { title: keyof typeof translations['en']; desc: keyof typeof translations['en'] };
  index: number;
}) {
  const { t } = useLang();
  const ref = useReveal();
  const { icon, color } = trainingData[index] ?? trainingData[0];

  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${index * 40}ms` }}>
      <div className="card-modern h-full p-6 flex flex-col gap-4">
        <div className={`icon-box w-12 h-12 ${color}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#dceeff] mb-2 leading-snug">{t(keys.title)}</h3>
          <p className="text-[#4a6080] text-xs leading-relaxed font-medium">{t(keys.desc)}</p>
        </div>
      </div>
    </div>
  );
}

function Training() {
  const { t } = useLang();
  const trainingKeys = [
    { title: 't1_title' as const, desc: 't1_desc' as const },
    { title: 't2_title' as const, desc: 't2_desc' as const },
    { title: 't3_title' as const, desc: 't3_desc' as const },
    { title: 't4_title' as const, desc: 't4_desc' as const },
    { title: 't5_title' as const, desc: 't5_desc' as const },
    { title: 't6_title' as const, desc: 't6_desc' as const },
    { title: 't7_title' as const, desc: 't7_desc' as const },
    { title: 't8_title' as const, desc: 't8_desc' as const },
    { title: 't9_title' as const, desc: 't9_desc' as const },
    { title: 't10_title' as const, desc: 't10_desc' as const },
  ];

  return (
    <Section id="training" className="section-alt">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label={t('training_label')}
          title={t('training_title')}
          subtitle={t('training_subtitle')}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {trainingKeys.map((keys, i) => (
            <TrainingCard key={i} keys={keys} index={i} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full glass border border-[rgba(36,114,232,0.2)]">
            <Globe className="text-[#4b8ef5]" size={18} />
            <span className="text-sm font-semibold tracking-[0.1em] text-[#7ab8f7] uppercase">
              ASECNA · ICAO WACAF Office Partner
            </span>
            <Globe className="text-[#4b8ef5]" size={18} />
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── Careers ────────────────────────────────────────────────────────────────────
const careerData = [
  { icon: <Plane size={20} />, color: 'icon-box-blue', category: 'Flight Dispatch & Operations',
    roles: ['Flight Dispatcher / Flight Operations Officer', 'Flight Follower'] },
  { icon: <Building size={20} />, color: 'icon-box-cyan', category: 'Logistics & Ground Handling',
    roles: ['Loadmaster / Weight and Balance Officer', 'Aviation Logistics Coordinator', 'Ramp Operations Supervisor'] },
  { icon: <Shield size={20} />, color: 'icon-box-green', category: 'Safety & Regulatory Compliance',
    roles: ['Safety Assistant (SMS)', 'Compliance Coordinator'] },
  { icon: <Briefcase size={20} />, color: 'icon-box-amber', category: 'Technical & Administrative Support',
    roles: ['Technical Records Specialist', 'Meteorological Assistant', 'Crew Scheduler'] },
  { icon: <GraduationCap size={20} />, color: 'icon-box-purple', category: 'Education & Further Training',
    roles: ['Pathway to PPL & CPL Licensing', 'Aviation Training Foundation'] },
];

function CareerCard({ item, index }: { item: typeof careerData[0]; index: number }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${index * 60}ms` }}>
      <div className="card-modern h-full p-6">
        <div className="flex items-start gap-4 mb-5">
          <div className={`icon-box w-10 h-10 ${item.color} shrink-0 mt-0.5`}>
            {item.icon}
          </div>
          <h3 className="text-sm font-bold text-[#dceeff] leading-snug">{item.category}</h3>
        </div>
        <div className="space-y-2.5">
          {item.roles.map((role, j) => (
            <div key={j} className="flex items-start gap-2.5">
              <ChevronRight size={12} className="text-[#2472e8] mt-1 shrink-0" />
              <span className="text-[#94aed4] text-sm leading-snug">{role}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 pt-4 border-t border-[rgba(36,114,232,0.1)]" />
      </div>
    </div>
  );
}

function Careers() {
  const { t } = useLang();
  return (
    <Section id="careers" className="section-base">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label={t('careers_label')}
          title={t('careers_title')}
          subtitle={t('careers_subtitle')}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {careerData.map((item, i) => (
            <CareerCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

// ── Why Us ─────────────────────────────────────────────────────────────────────
const reasonData = [
  { icon: <Shield size={26} />, color: 'icon-box-blue', title: 'w1_title' as const, desc: 'w1_desc' as const },
  { icon: <GraduationCap size={26} />, color: 'icon-box-purple', title: 'w2_title' as const, desc: 'w2_desc' as const },
  { icon: <Star size={26} />, color: 'icon-box-amber', title: 'w3_title' as const, desc: 'w3_desc' as const },
  { icon: <Clock size={26} />, color: 'icon-box-green', title: 'w4_title' as const, desc: 'w4_desc' as const },
];

function WhyCard({ item, index }: { item: typeof reasonData[0]; index: number }) {
  const { t } = useLang();
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${index * 80}ms` }}>
      <div className="card-modern h-full p-8 text-center flex flex-col items-center">
        <div className={`icon-box w-16 h-16 ${item.color} mb-5`}>
          {item.icon}
        </div>
        <h3 className="text-sm font-bold text-[#dceeff] mb-3 leading-snug">{t(item.title)}</h3>
        <p className="text-[#94aed4] text-sm leading-relaxed">{t(item.desc)}</p>
      </div>
    </div>
  );
}

function WhyUs() {
  const { t } = useLang();
  const ctaRef = useReveal();

  return (
    <Section id="why-us" className="section-alt">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label={t('why_label')}
          title={t('why_title')}
          subtitle={t('why_subtitle')}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {reasonData.map((item, i) => (
            <WhyCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* CTA Banner */}
        <div ref={ctaRef} className="reveal">
          <div className="mission-card animated-border px-8 py-14 text-center">
            <p className="text-xs font-bold tracking-[0.35em] text-[#4b8ef5] uppercase mb-4">
              Training The Sky Professionals of Tomorrow
            </p>
            <h3 className="text-2xl md:text-3xl font-extrabold gradient-text-light mb-4">
              Build Your Strong Foundation
            </h3>
            <p className="text-[#94aed4] text-base max-w-xl mx-auto mb-8 leading-relaxed">
              The cockpit is waiting, but the journey starts in the classroom. Enrollment is open for aspiring pilots and aviation enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="btn-primary px-9 py-4 text-sm font-bold inline-flex items-center gap-2 justify-center">
                Register Now <ArrowRight size={16} />
              </a>
              <a href="tel:+252634482830" className="btn-outline px-9 py-4 text-sm font-semibold inline-flex items-center gap-2 justify-center">
                <Phone size={14} /> Call Us Today
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── Certificate ────────────────────────────────────────────────────────────────
const certCards = [
  { icon: <Award size={20} />, color: 'icon-box-blue', title: 'cert_icao_title' as const, desc: 'cert_icao_desc' as const },
  { icon: <GraduationCap size={20} />, color: 'icon-box-purple', title: 'cert_ernam_title' as const, desc: 'cert_ernam_desc' as const },
  { icon: <Shield size={20} />, color: 'icon-box-green', title: 'cert_ppl_title' as const, desc: 'cert_ppl_desc' as const },
];

function CertCard({ item, index }: { item: typeof certCards[0]; index: number }) {
  const { t } = useLang();
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal" style={{ transitionDelay: `${index * 80}ms` }}>
      <div className="card-modern h-full p-6 text-center">
        <div className={`icon-box w-12 h-12 ${item.color} mx-auto mb-4`}>
          {item.icon}
        </div>
        <h3 className="text-sm font-bold text-[#dceeff] mb-2">{t(item.title)}</h3>
        <p className="text-[#94aed4] text-sm leading-relaxed">{t(item.desc)}</p>
      </div>
    </div>
  );
}

function Certificate() {
  const { t } = useLang();
  const imageRef = useReveal();

  return (
    <Section id="certificate" className="section-base">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          label={t('cert_label')}
          title={t('cert_title')}
          subtitle={t('cert_subtitle')}
        />

        <div ref={imageRef} className="reveal mb-12">
          <TiltCard intensity={5} className="relative rounded-2xl overflow-hidden p-3 bg-[rgba(10,26,56,0.6)] border border-[rgba(36,114,232,0.15)]">
            {/* Corner accents */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[rgba(75,142,245,0.6)] rounded-tl-lg" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[rgba(75,142,245,0.6)] rounded-tr-lg" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[rgba(75,142,245,0.6)] rounded-bl-lg" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[rgba(75,142,245,0.6)] rounded-br-lg" />
            <img
              src="/ST.png"
              alt="Stratosphere Aeronautics Certificate of Completion"
              className="w-full rounded-xl shadow-2xl"
              style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(36,114,232,0.1)' }}
            />
          </TiltCard>
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          {certCards.map((item, i) => (
            <CertCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

// ── Contact ────────────────────────────────────────────────────────────────────
function Contact() {
  const { t } = useLang();
  const leftRef = useReveal();
  const rightRef = useReveal();
  const accKeys = ['acc1', 'acc2', 'acc3', 'acc4'] as const;

  return (
    <Section id="contact" className="section-alt">
      <div className="max-w-6xl mx-auto">
        <SectionTitle label={t('contact_label')} title={t('contact_title')} subtitle={t('contact_subtitle')} />

        <div className="grid md:grid-cols-2 gap-8">
          {/* Info column */}
          <div ref={leftRef} className="reveal space-y-6">
            <div className="card-modern p-8">
              <h3 className="text-base font-bold gradient-text-blue mb-6">{t('contact_info')}</h3>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="icon-box w-10 h-10 icon-box-blue shrink-0 mt-0.5">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#4b8ef5] uppercase tracking-wider mb-1">{t('contact_address')}</p>
                    <p className="text-[#94aed4] text-sm leading-relaxed">
                      Bahsane Building, 2nd Floor, Room 213<br />
                      Western Entrance (Facing West)<br />
                      Opposite Ex. National Cinema<br />
                      <span className="text-[#7ab8f7] font-semibold">{t('contact_address_val')}</span>
                    </p>
                  </div>
                </div>

                <div className="section-divider" />

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="icon-box w-10 h-10 icon-box-green shrink-0 mt-0.5">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#4ade80] uppercase tracking-wider mb-2">{t('contact_mobile')}</p>
                    <a href="tel:+252634482830" className="block text-[#7ab8f7] hover:text-[#a8d4fb] text-sm mb-1 transition-colors font-medium">+252 63 4482830</a>
                    <a href="tel:+252654482830" className="block text-[#7ab8f7] hover:text-[#a8d4fb] text-sm mb-1 transition-colors font-medium">+252 65 4482830</a>
                    <a href="tel:+252633347512" className="block text-[#7ab8f7] hover:text-[#a8d4fb] text-sm transition-colors font-medium">+252 63 3347512</a>
                  </div>
                </div>

                <div className="section-divider" />

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="icon-box w-10 h-10 icon-box-purple shrink-0 mt-0.5">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#a78bfa] uppercase tracking-wider mb-2">{t('contact_email')}</p>
                    <a href="mailto:info@stratosphereaeronautics.com" className="block text-[#7ab8f7] hover:text-[#a8d4fb] text-sm transition-colors break-all font-medium">
                      info@stratosphereaeronautics.com
                    </a>
                    <a href="mailto:abdirahman.dahir@stratosphereaeronautics.com" className="block text-[#7ab8f7] hover:text-[#a8d4fb] text-sm transition-colors break-all font-medium mt-1">
                      abdirahman.dahir@stratosphereaeronautics.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Accreditation */}
            <div className="card-modern p-6">
              <p className="text-xs font-bold tracking-[0.25em] text-[#4b8ef5] uppercase mb-4">{t('contact_accreditation')}</p>
              <div className="space-y-2.5">
                {accKeys.map((key, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle size={14} className="text-[#4b8ef5] shrink-0" />
                    <span className="text-[#94aed4] text-sm font-medium">{t(key)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* WhatsApp card */}
          <div ref={rightRef} className="reveal flex items-stretch">
            <div className="card-modern w-full p-10 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)' }}>
                <WhatsAppIcon size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-extrabold gradient-text-blue mb-3">{t('contact_whatsapp_title')}</h3>
              <p className="text-[#94aed4] text-sm leading-relaxed mb-8 max-w-sm">{t('contact_whatsapp_desc')}</p>
              <a
                href="https://wa.me/252634482830"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl text-sm font-bold tracking-wider inline-flex items-center gap-3 transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #25d366, #128c7e)',
                  color: '#ffffff',
                  boxShadow: '0 4px 20px rgba(37,211,102,0.35)',
                }}
              >
                <WhatsAppIcon size={18} /> +252 63 4482830
              </a>

              <div className="mt-10 pt-8 border-t border-[rgba(36,114,232,0.1)] w-full">
                <p className="text-xs font-semibold text-[#4a6080] tracking-wider uppercase mb-4">Also reach us at</p>
                <div className="flex flex-col gap-2">
                  <a href="tel:+252634482830" className="inline-flex items-center justify-center gap-2 text-sm font-medium text-[#7ab8f7] hover:text-[#a8d4fb] transition-colors">
                    <Phone size={14} /> +252 63 4482830
                  </a>
                  <a href="mailto:info@stratosphereaeronautics.com" className="inline-flex items-center justify-center gap-2 text-sm font-medium text-[#7ab8f7] hover:text-[#a8d4fb] transition-colors">
                    <Mail size={14} /> info@stratosphereaeronautics.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer() {
  const { t } = useLang();
  const footerLinks = [
    { href: '#about', key: 'nav_about' as const },
    { href: '#training', key: 'nav_training' as const },
    { href: '#careers', key: 'nav_careers' as const },
    { href: '#why-us', key: 'nav_why_us' as const },
    { href: '#certificate', key: 'nav_certificate' as const },
    { href: '#contact', key: 'nav_contact' as const },
  ];

  return (
    <footer className="footer-bg relative z-10 py-14 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-10">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <img src="/logo-removebg-preview.png" alt="Stratosphere Aeronautics" className="w-12 h-12 object-contain" />
            <div>
              <p className="text-base font-extrabold gradient-text-blue">Stratosphere Aeronautics</p>
              <p className="text-xs font-semibold text-[rgba(122,184,247,0.55)] tracking-wider mt-0.5">{t('footer_school')}</p>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="text-xs font-semibold tracking-widest text-[#4a6080] hover:text-[#7ab8f7] uppercase transition-colors duration-200"
              >
                {t(item.key)}
              </a>
            ))}
          </div>
        </div>

        <div className="section-divider mb-8" />

        {/* Accreditation badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[
            { label: 'ICAO Compliant', icon: <Globe size={14} /> },
            { label: 'ERNAM Certified', icon: <Award size={14} /> },
            { label: 'Hargeisa, Somaliland', icon: <MapPin size={14} /> },
            { label: 'Est. 2026', icon: <Star size={14} /> },
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(36,114,232,0.15)] bg-[rgba(36,114,232,0.05)] text-xs font-semibold text-[#4a6080]">
              <span className="text-[#2472e8]">{badge.icon}</span>
              {badge.label}
            </div>
          ))}
        </div>

        <div className="section-divider mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs font-medium text-[rgba(122,184,247,0.4)] italic tracking-wide">{t('footer_tagline')}</p>
          <p className="text-[#2a3a50] text-xs font-medium">{t('footer_rights')}</p>
        </div>

        {/* FIKRADO credit */}
        <div className="mt-8 pt-6 border-t border-[rgba(36,114,232,0.06)] flex justify-center">
          <a
            href="https://fikrado2.github.io/fikrado/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1.5 group"
          >
            <img
              src="/fikrado_sec_(1).png"
              alt="Fikrado Security"
              className="w-9 h-9 object-contain opacity-50 group-hover:opacity-80 transition-opacity duration-300"
            />
            <p className="text-xs font-semibold tracking-widest text-[#2a3a50] uppercase group-hover:text-[rgba(75,142,245,0.6)] transition-colors duration-300">
              Powered by <span className="text-[rgba(75,142,245,0.5)] group-hover:text-[rgba(75,142,245,0.8)]">FIKRADO SECURITY</span>
            </p>
          </a>
        </div>
      </div>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLangState] = useState<Lang>('en');

  const setLang = (l: Lang) => {
    setLangState(l);
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = l;
  };

  useEffect(() => {
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('so')) setLang('so');
    else if (browserLang.startsWith('ar')) setLang('ar');
    else setLang('en');
  }, []);

  const t = (k: keyof typeof translations['en']) => translations[lang][k] ?? translations.en[k];

  return (
    <LangContext.Provider value={{ lang, t, setLang }}>
      <div className="relative min-h-screen" style={{ background: '#040b1a' }}>
        <div className="ambient-bg" />
        <div className="grid-overlay" />
        <StarsBackground />
        <AirplanesBackground />

        <Navbar />
        <Hero />
        <StatsBanner />
        <About />
        <Mission />
        <Training />
        <Careers />
        <WhyUs />
        <Certificate />
        <Contact />
        <Footer />

        {/* WhatsApp FAB */}
        <a
          href="https://wa.me/252634482830"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="whatsapp-fab"
        >
          <WhatsAppIcon size={28} className="text-white" />
        </a>
      </div>
    </LangContext.Provider>
  );
}
