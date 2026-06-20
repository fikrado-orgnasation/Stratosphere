import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  Plane, Globe, Shield, BookOpen, Radio, Users, Award,
  ChevronDown, MapPin, Phone, Mail, Menu, X, Star, CheckCircle,
  Navigation, Cloud, Compass, Zap, GraduationCap, Briefcase,
  Building, ChevronRight, ArrowRight, MessageCircle
} from 'lucide-react';
import { translations, Lang } from './translations';

// ── Language context ──────────────────────────────────────────────────────────
const LangContext = createContext<{ lang: Lang; t: (k: keyof typeof translations['en']) => string; setLang: (l: Lang) => void }>({
  lang: 'en',
  t: (k) => translations.en[k],
  setLang: () => {},
});

function useLang() { return useContext(LangContext); }

// ── 3D Mouse-Tracking Tilt Hook ───────────────────────────────────────────────
function useTilt(intensity = 12) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.03,1.03,1.03)`;
    el.style.boxShadow = `${-x * 20}px ${y * 20}px 60px rgba(0,0,0,0.5), 0 0 30px rgba(212,175,55,0.12)`;
  }, [intensity]);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
    el.style.boxShadow = '';
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.15s ease-out, box-shadow 0.3s ease-out';
    el.style.transformStyle = 'preserve-3d';
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [handleMove, handleLeave]);

  return ref;
}

// ── 3D Tilt Card Wrapper ──────────────────────────────────────────────────────
function TiltCard({ children, className, style, intensity }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; intensity?: number }) {
  const tiltRef = useTilt(intensity);
  return (
    <div ref={tiltRef} className={className} style={style}>
      {children}
    </div>
  );
}

// ── Stars + Floating Particles Background ─────────────────────────────────────
function StarsBackground() {
  const stars = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 2.5 + 0.5,
    duration: `${Math.random() * 4 + 2}s`,
    delay: `${Math.random() * 4}s`,
  }));

  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 80 + 20,
    duration: `${Math.random() * 20 + 15}s`,
    delay: `${Math.random() * 10}s`,
    depth: Math.random() * 0.15 + 0.03,
  }));

  return (
    <>
      <div className="stars-bg">
        {stars.map(s => (
          <div
            key={s.id}
            className="star"
            style={{
              left: s.left,
              top: s.top,
              width: `${s.size}px`,
              height: `${s.size}px`,
              '--duration': s.duration,
              '--delay': s.delay,
            } as React.CSSProperties}
          />
        ))}
      </div>
      {/* 3D floating depth particles */}
      <div className="particles-bg">
        {particles.map(p => (
          <div
            key={p.id}
            className="depth-particle"
            style={{
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
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

function AirplanesBackground() {
  const planes = [
    { cls: 'airplane-1', size: 44 },
    { cls: 'airplane-2', size: 32 },
    { cls: 'airplane-3', size: 52 },
    { cls: 'airplane-4', size: 28 },
    { cls: 'airplane-5', size: 40 },
  ];
  return (
    <div className="airplane-bg-layer" aria-hidden="true">
      {planes.map((p, i) => (
        <Plane
          key={i}
          size={p.size}
          strokeWidth={1.5}
          className={`airplane-fly ${p.cls}`}
          fill="currentColor"
        />
      ))}
    </div>
  );
}

// ── Reveal on scroll hook ─────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ id, className, children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`relative z-10 py-24 px-4 ${className ?? ''}`}>
      {children}
    </section>
  );
}

function SectionTitle({ label, title, subtitle }: { label?: string; title: string; subtitle?: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal text-center mb-16">
      {label && (
        <span className="inline-block text-xs cinzel tracking-[0.35em] text-yellow-500 uppercase mb-3 px-4 py-1.5 border border-yellow-600/30 rounded-full bg-yellow-500/5">
          {label}
        </span>
      )}
      <h2 className="cinzel text-4xl md:text-5xl font-bold gold-gradient-text-static mb-4">{title}</h2>
      <div className="gold-divider w-48 mx-auto mb-5" />
      {subtitle && <p className="text-blue-200/70 max-w-2xl mx-auto text-base leading-relaxed">{subtitle}</p>}
    </div>
  );
}

// ── Language Switcher ─────────────────────────────────────────────────────────
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
        className="flex items-center gap-1.5 px-3 py-1.5 border border-yellow-600/40 rounded-md bg-yellow-500/5 hover:bg-yellow-500/10 hover:border-yellow-500/60 transition-all duration-200 cinzel text-xs text-yellow-400 tracking-wider"
        aria-label="Change language"
      >
        <Globe size={13} />
        {langLabels[lang].label}
        <ChevronDown size={11} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-36 rounded-lg border border-yellow-600/25 shadow-2xl overflow-hidden z-50"
          style={{ background: 'rgba(13,35,71,0.98)', backdropFilter: 'blur(16px)' }}>
          {(['en', 'so', 'ar'] as Lang[]).map(l => (
            <button
              key={l}
              onClick={() => { setLang(l); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left cinzel text-xs tracking-wider transition-colors duration-150 ${lang === l ? 'text-yellow-400 bg-yellow-500/10' : 'text-blue-100/70 hover:text-yellow-400 hover:bg-yellow-500/5'}`}
            >
              <span>{langLabels[l].flag}</span>
              <span>{l === 'en' ? 'English' : l === 'so' ? 'Soomaali' : 'العربية'}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Navigation ────────────────────────────────────────────────────────────────
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
    { href: '#mission', label: t('nav_mission') },
    { href: '#training', label: t('nav_training') },
    { href: '#careers', label: t('nav_careers') },
    { href: '#why-us', label: t('nav_why_us') },
    { href: '#certificate', label: t('nav_certificate') },
    { href: '#contact', label: t('nav_contact') },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-glass shadow-lg shadow-black/40' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-18 py-3">
        <a href="#hero" className="flex items-center gap-3 group">
          <img src="/logo-removebg-preview.png" alt="Stratosphere Aeronautics" className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110" />
          <div className="hidden sm:block">
            <p className="cinzel text-sm font-bold gold-gradient-text leading-tight">Stratosphere</p>
            <p className="cinzel text-[10px] text-yellow-600/80 tracking-widest uppercase">Aeronautics</p>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a key={l.href} href={l.href} className="nav-link cinzel text-xs tracking-wider text-blue-100/80 hover:text-yellow-400 uppercase transition-colors duration-300">
              {l.label}
            </a>
          ))}
          <LangSwitcher />
          <a href="#contact" className="btn-primary cinzel text-xs px-5 py-2.5 rounded-sm tracking-wider">
            {t('nav_enroll')}
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-3">
          <LangSwitcher />
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-yellow-400 p-2">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu md:hidden border-t border-yellow-600/20 px-6 py-6 flex flex-col gap-5">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="cinzel text-sm tracking-widest text-yellow-400/90 uppercase border-b border-yellow-600/10 pb-4">
              {l.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary cinzel text-sm px-6 py-3 rounded-sm text-center tracking-widest">
            {t('nav_enroll')}
          </a>
        </div>
      )}
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const { t } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      el.style.setProperty('--mx', `${x}`);
      el.style.setProperty('--my', `${y}`);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="hero" ref={heroRef} className="hero-bg hero-3d relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
      {/* Animated horizon lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[20, 40, 60, 80].map((p, i) => (
          <div key={i} className="absolute w-full horizon-glow" style={{ top: `${p}%`, animationDelay: `${i * 0.5}s` }} />
        ))}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="runway-dot w-1.5 h-1.5 rounded-full bg-yellow-500/60"
              style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
        {/* 3D floating orbs */}
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>

      {/* Logo with 3D depth */}
      <div className="perspective-container-extended mb-10 relative">
        <div className="absolute inset-0 rounded-full pulse-ring border-2 border-yellow-500/30 scale-110" />
        <div className="absolute inset-0 rounded-full pulse-ring border border-yellow-500/20 scale-125" style={{ animationDelay: '0.7s' }} />
        <div className="absolute inset-0 rounded-full pulse-ring border border-yellow-500/10 scale-140" style={{ animationDelay: '1.4s' }} />
        <div className="logo-3d-shadow" />
        <img
          src="/logo-removebg-preview.png"
          alt="Stratosphere Aeronautics"
          className="logo-float-3d w-44 h-44 md:w-56 md:h-56 object-contain relative z-10"
        />
      </div>

      {/* Text with depth layers */}
      <div className="max-w-4xl mx-auto hero-text-depth">
        <p className="cinzel text-xs md:text-sm tracking-[0.4em] text-yellow-500/80 uppercase mb-4 animate-fade-in">
          {t('hero_tagline')}
        </p>
        <h1 className="cinzel text-4xl sm:text-5xl md:text-7xl font-black gold-gradient-text-3d leading-[1.1] mb-4 animate-slide-up">
          Stratosphere<br />
          <span className="aeronautics-glow">Aeronautics</span>
        </h1>
        <p className="cinzel text-base md:text-xl text-yellow-500/90 tracking-widest mb-3 animate-slide-up delay-200">
          {t('hero_school')}
        </p>
        <div className="gold-divider-3d w-64 mx-auto mb-8" />
        <p className="text-blue-200/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-4 animate-fade-in delay-300">
          {t('hero_desc')}
        </p>
        <p className="cinzel text-yellow-600/60 text-xs tracking-[0.3em] uppercase mb-10 animate-fade-in delay-400">
          {t('hero_motto')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-500">
          <a href="#training" className="btn-3d-primary px-10 py-4 rounded-sm text-sm inline-flex items-center gap-2 justify-center">
            {t('hero_explore')} <ArrowRight size={16} />
          </a>
          <a href="#contact" className="btn-3d-outline px-10 py-4 rounded-sm text-sm inline-flex items-center gap-2 justify-center">
            {t('hero_enroll')} <ChevronRight size={16} />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="cinzel text-[10px] tracking-[0.3em] text-yellow-600/50 uppercase">Discover More</p>
        <ChevronDown className="scroll-indicator text-yellow-500/60" size={20} />
      </div>
    </section>
  );
}

// ── Stats banner ──────────────────────────────────────────────────────────────
function StatsBanner() {
  const ref = useReveal();
  const stats = [
    { value: 'ICAO', label: 'Recognized Standard', icon: <Globe size={20} /> },
    { value: 'ERNAM', label: 'Affiliated Training', icon: <Award size={20} /> },
    { value: '10+', label: 'Core Training Areas', icon: <BookOpen size={20} /> },
    { value: '5+', label: 'Career Pathways', icon: <Briefcase size={20} /> },
  ];

  return (
    <div ref={ref} className="reveal relative z-10 bg-gradient-to-r from-yellow-900/10 via-yellow-800/5 to-yellow-900/10 border-y border-yellow-600/15">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col items-center text-center gap-2">
            <div className="text-yellow-500/70 mb-1">{s.icon}</div>
            <p className="stat-number text-3xl md:text-4xl font-bold">{s.value}</p>
            <p className="text-blue-200/50 text-xs tracking-wider uppercase">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────
function About() {
  const { t } = useLang();
  const ref = useReveal();
  return (
    <Section id="about" className="section-navy">
      <div className="max-w-6xl mx-auto">
        <SectionTitle label={t('about_label')} title={t('about_title')} subtitle={t('about_subtitle')} />

        <div ref={ref} className="reveal grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-6">
            <p className="text-blue-100/80 text-base leading-relaxed">{t('about_p1')}</p>
            <p className="text-blue-100/80 text-base leading-relaxed">{t('about_p2')}</p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: <Shield size={18} />, text: 'ICAO Compliant Syllabus' },
                { icon: <Star size={18} />, text: 'Expert ERNAM-Trained Instructors' },
                { icon: <Users size={18} />, text: 'Ab-Initio Specialists' },
                { icon: <Globe size={18} />, text: 'Internationally Valid Knowledge' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 gold-border-glow rounded-lg bg-blue-950/30">
                  <span className="text-yellow-500 shrink-0">{item.icon}</span>
                  <span className="text-blue-100/80 text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — 3D tilt card */}
          <TiltCard intensity={10} className="perspective-container">
            <div className="card-3d gold-border-glow rounded-2xl bg-gradient-to-br from-navy-800/60 to-navy-900/80 p-8 backdrop-blur-sm"
              style={{ background: 'linear-gradient(135deg, rgba(26,52,96,0.9), rgba(13,35,71,0.95))' }}>
              <div className="card-inner-depth flex items-center gap-4 mb-6">
                <img src="/logo-removebg-preview.png" alt="Stratosphere Aeronautics" className="w-20 h-20 object-contain floating-icon" />
                <div>
                  <p className="cinzel text-lg font-bold gold-gradient-text-static">Stratosphere</p>
                  <p className="cinzel text-sm text-yellow-500/80">Aeronautics</p>
                  <p className="text-blue-200/50 text-xs mt-1">Est. 2026</p>
                </div>
              </div>
              <div className="gold-divider mb-6" />
              <div className="space-y-3">
                {[
                  'Theoretical Knowledge Instruction (TKI)',
                  'Private & Small-Group Tuition',
                  'PPL & CPL Prerequisite Foundation',
                  'ASECNA | ICAO WACAF Office Partner',
                  'Based in Hargeisa, Somaliland',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle size={14} className="text-yellow-500 shrink-0" />
                    <span className="text-blue-100/75 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </Section>
  );
}

// ── Mission ───────────────────────────────────────────────────────────────────
function Mission() {
  const { t } = useLang();
  const ref = useReveal();

  const descParts = t('mission_desc').split(/<gold>|<\/gold>/);

  return (
    <Section id="mission" className="section-navy-alt">
      <div className="max-w-5xl mx-auto">
        <SectionTitle label={t('mission_label')} title={t('mission_title')} />

        <div ref={ref} className="reveal perspective-container">
          <TiltCard intensity={6} className="relative gold-border-glow rounded-2xl overflow-hidden animated-border"
            style={{ background: 'linear-gradient(135deg, rgba(19,41,80,0.95), rgba(30,62,114,0.5), rgba(13,35,71,0.95))' }}>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
            <div className="p-10 md:p-16 text-center relative">
              <div className="quote-marks relative inline-block pl-8 mb-8">
                <Plane className="text-yellow-500/30 mx-auto mb-4" size={48} />
              </div>
              <blockquote className="cinzel text-lg md:text-2xl font-semibold text-blue-100/90 leading-relaxed mb-8 italic">
                {t('mission_quote')}
              </blockquote>
              <p className="text-blue-200/65 text-base leading-relaxed max-w-3xl mx-auto">
                {descParts.map((part, i) =>
                  i % 2 === 1
                    ? <span key={i} className="text-yellow-400">{part}</span>
                    : part
                )}
              </p>
              <div className="gold-divider w-40 mx-auto mt-10 mb-6" />
              <div className="flex flex-wrap justify-center gap-6 text-center">
                {([
                  { key: 'val_precision' as const, icon: <Navigation size={16} /> },
                  { key: 'val_safety' as const, icon: <Shield size={16} /> },
                  { key: 'val_integrity' as const, icon: <Star size={16} /> },
                  { key: 'val_excellence' as const, icon: <Award size={16} /> },
                ] as const).map((v, i) => (
                  <div key={i} className="flex items-center gap-2 cinzel text-xs tracking-widest text-yellow-500/80 uppercase">
                    <span className="text-yellow-600">{v.icon}</span>
                    {t(v.key)}
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
          </TiltCard>
        </div>
      </div>
    </Section>
  );
}

// ── Training Areas ────────────────────────────────────────────────────────────
const trainingIcons = [
  <BookOpen size={22} />, <Plane size={22} />, <Cloud size={22} />,
  <Navigation size={22} />, <Zap size={22} />, <Users size={22} />,
  <Radio size={22} />, <Compass size={22} />, <Shield size={22} />, <Globe size={22} />,
];

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
    <Section id="training" className="section-navy">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label={t('training_label')}
          title={t('training_title')}
          subtitle={t('training_subtitle')}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {trainingKeys.map((keys, i) => {
            const ref = useReveal();
            return (
              <div key={i} ref={ref} className="reveal perspective-container" style={{ animationDelay: `${i * 0.05}s` }}>
                <TiltCard intensity={8} className="card-3d gold-border-glow rounded-xl p-6 flex flex-col gap-4"
                  style={{ background: 'linear-gradient(135deg, rgba(26,52,96,0.8), rgba(13,35,71,0.9))' }}>
                  <div className="training-icon-wrap w-12 h-12 rounded-xl flex items-center justify-center text-yellow-400 shrink-0">
                    {trainingIcons[i]}
                  </div>
                  <div>
                    <h3 className="cinzel text-sm font-bold text-yellow-400/90 mb-2 leading-snug">{t(keys.title)}</h3>
                    <p className="text-blue-200/60 text-xs leading-relaxed">{t(keys.desc)}</p>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>

        {/* ASECNA / ICAO badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 gold-border-glow rounded-full"
            style={{ background: 'rgba(26,52,96,0.6)' }}>
            <Globe className="text-yellow-500" size={20} />
            <span className="cinzel text-sm tracking-widest text-yellow-400/90 uppercase">ASECNA | ICAO WACAF Office Partner</span>
            <Globe className="text-yellow-500" size={20} />
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── Careers ───────────────────────────────────────────────────────────────────
const careerGroupIcons = [<Plane size={22} />, <Building size={22} />, <Shield size={22} />, <Briefcase size={22} />, <GraduationCap size={22} />];
const careerGroupCategories = [
  'Flight Dispatch & Operations',
  'Logistics & Ground Handling',
  'Safety & Regulatory Compliance',
  'Technical & Administrative Support',
  'Education & Further Training',
];
const careerGroupRoles = [
  ['Flight Dispatcher / Flight Operations Officer', 'Flight Follower'],
  ['Loadmaster / Weight and Balance Officer', 'Aviation Logistics Coordinator', 'Ramp Operations Supervisor'],
  ['Safety Assistant (SMS)', 'Compliance Coordinator'],
  ['Technical Records Specialist', 'Meteorological Assistant', 'Crew Scheduler'],
  ['Pathway to PPL & CPL Licensing', 'Aviation Training Foundation'],
];

function Careers() {
  const { t } = useLang();
  return (
    <Section id="careers" className="section-navy-alt">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label={t('careers_label')}
          title={t('careers_title')}
          subtitle={t('careers_subtitle')}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerGroupCategories.map((category, i) => {
            const ref = useReveal();
            return (
              <div key={i} ref={ref} className="reveal perspective-container">
                <TiltCard intensity={8} className="card-3d gold-border-glow rounded-xl overflow-hidden"
                  style={{ background: 'linear-gradient(160deg, rgba(30,62,114,0.6), rgba(13,35,71,0.9))' }}>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="training-icon-wrap w-10 h-10 rounded-lg flex items-center justify-center text-yellow-400">
                      {careerGroupIcons[i]}
                    </div>
                    <h3 className="cinzel text-sm font-bold text-yellow-400/90 leading-snug">{category}</h3>
                  </div>
                  <div className="space-y-2.5">
                    {careerGroupRoles[i].map((role, j) => (
                      <div key={j} className="flex items-start gap-2.5">
                        <ChevronRight size={12} className="text-yellow-600 mt-0.5 shrink-0" />
                        <span className="text-blue-100/70 text-sm leading-snug">{role}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-0.5 bg-gradient-to-r from-transparent via-yellow-600/40 to-transparent" />
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ── Why Choose Us ─────────────────────────────────────────────────────────────
const reasonIcons = [<Shield size={28} />, <GraduationCap size={28} />, <Star size={28} />, <Globe size={28} />];
const reasonKeys = [
  { title: 'w1_title' as const, desc: 'w1_desc' as const },
  { title: 'w2_title' as const, desc: 'w2_desc' as const },
  { title: 'w3_title' as const, desc: 'w3_desc' as const },
  { title: 'w4_title' as const, desc: 'w4_desc' as const },
];

function WhyUs() {
  const { t } = useLang();
  return (
    <Section id="why-us" className="section-navy">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label={t('why_label')}
          title={t('why_title')}
          subtitle={t('why_subtitle')}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {reasonKeys.map((keys, i) => {
            const ref = useReveal();
            return (
              <div key={i} ref={ref} className="reveal perspective-container" style={{ transitionDelay: `${i * 0.1}s` }}>
                <TiltCard intensity={10} className="card-3d text-center p-8 rounded-2xl gold-border-glow"
                  style={{ background: 'linear-gradient(180deg, rgba(30,62,114,0.5), rgba(13,35,71,0.8))' }}>
                  <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center text-yellow-400 icon-orb-3d"
                    style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.15), rgba(212,175,55,0.03))' }}>
                    {reasonIcons[i]}
                  </div>
                  <h3 className="cinzel text-sm font-bold text-yellow-400/90 mb-3 leading-snug">{t(keys.title)}</h3>
                  <p className="text-blue-200/65 text-sm leading-relaxed">{t(keys.desc)}</p>
                </TiltCard>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <TiltCard intensity={4} className="relative rounded-2xl overflow-hidden gold-border-glow animated-border"
          style={{ background: 'linear-gradient(135deg, rgba(30,62,114,0.8), rgba(19,41,80,0.95))' }}>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
          <div className="px-8 py-14 text-center">
            <p className="cinzel text-xs tracking-[0.4em] text-yellow-600/80 uppercase mb-4">Training The Sky Professionals of Tomorrow</p>
            <h3 className="cinzel text-3xl md:text-4xl font-bold gold-gradient-text-static mb-4">Build Your Strong Foundation</h3>
            <p className="text-blue-200/65 text-base max-w-xl mx-auto mb-8 leading-relaxed">
              The cockpit is waiting, but the journey starts in the classroom. Enrollment is open for aspiring pilots and aviation enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact" className="btn-primary px-10 py-4 rounded-sm text-sm inline-flex items-center gap-2 justify-center">
                Register Now <ArrowRight size={16} />
              </a>
              <a href="tel:+252634482830" className="btn-outline px-10 py-4 rounded-sm text-sm inline-flex items-center gap-2 justify-center">
                <Phone size={14} /> Call Us Today
              </a>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
        </TiltCard>
      </div>
    </Section>
  );
}

// ── Certificate ───────────────────────────────────────────────────────────────
function Certificate() {
  const { t } = useLang();
  const ref = useReveal();
  const certCards = [
    { icon: <Award size={22} />, title: 'cert_icao_title' as const, desc: 'cert_icao_desc' as const },
    { icon: <GraduationCap size={22} />, title: 'cert_ernam_title' as const, desc: 'cert_ernam_desc' as const },
    { icon: <Shield size={22} />, title: 'cert_ppl_title' as const, desc: 'cert_ppl_desc' as const },
  ];

  return (
    <Section id="certificate" className="section-navy">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          label={t('cert_label')}
          title={t('cert_title')}
          subtitle={t('cert_subtitle')}
        />

        <div ref={ref} className="reveal">
          <div className="perspective-container mb-12">
            <TiltCard intensity={6} className="relative rounded-2xl overflow-hidden gold-border-glow animated-border p-3"
              style={{ background: 'linear-gradient(135deg, rgba(26,52,96,0.6), rgba(13,35,71,0.9))' }}>
              <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-yellow-500/60 rounded-tl-lg" />
              <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-yellow-500/60 rounded-tr-lg" />
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-yellow-500/60 rounded-bl-lg" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-yellow-500/60 rounded-br-lg" />
              <img
                src="/ST.png"
                alt="Stratosphere Aeronautics Certificate of Completion"
                className="w-full rounded-xl shadow-2xl"
                style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(212,175,55,0.08)' }}
              />
            </TiltCard>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {certCards.map((item, i) => {
              const cardRef = useReveal();
              return (
                <div key={i} ref={cardRef} className="reveal perspective-container">
                  <TiltCard intensity={8} className="card-3d gold-border-glow rounded-xl p-6 text-center"
                    style={{ background: 'linear-gradient(160deg, rgba(30,62,114,0.6), rgba(13,35,71,0.9))' }}>
                    <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-yellow-400 training-icon-wrap">
                      {item.icon}
                    </div>
                    <h3 className="cinzel text-sm font-bold text-yellow-400/90 mb-2">{t(item.title)}</h3>
                    <p className="text-blue-200/65 text-sm leading-relaxed">{t(item.desc)}</p>
                  </TiltCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const { t } = useLang();
  const ref = useReveal();

  const accKeys = ['acc1', 'acc2', 'acc3', 'acc4'] as const;

  return (
    <Section id="contact" className="section-navy-alt">
      <div className="max-w-6xl mx-auto">
        <SectionTitle label={t('contact_label')} title={t('contact_title')} subtitle={t('contact_subtitle')} />

        <div ref={ref} className="reveal grid md:grid-cols-2 gap-10">
          {/* Info */}
          <div className="space-y-8">
            <TiltCard intensity={5} className="p-8 rounded-2xl gold-border-glow"
              style={{ background: 'linear-gradient(135deg, rgba(26,52,96,0.9), rgba(13,35,71,0.95))' }}>
              <h3 className="cinzel text-lg font-bold gold-gradient-text-static mb-6">{t('contact_info')}</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="training-icon-wrap w-10 h-10 rounded-lg flex items-center justify-center text-yellow-400 shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="cinzel text-xs text-yellow-500/80 uppercase tracking-wider mb-1">{t('contact_address')}</p>
                    <p className="text-blue-100/75 text-sm leading-relaxed">
                      Bahsane Building, 2nd Floor, Room 213<br />
                      Western Entrance (Facing West)<br />
                      Opposite Ex. National Cinema<br />
                      <span className="text-yellow-400">{t('contact_address_val')}</span>
                    </p>
                  </div>
                </div>

                <div className="gold-divider" />

                <div className="flex items-start gap-4">
                  <div className="training-icon-wrap w-10 h-10 rounded-lg flex items-center justify-center text-yellow-400 shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="cinzel text-xs text-yellow-500/80 uppercase tracking-wider mb-2">{t('contact_mobile')}</p>
                    <a href="tel:+252634482830" className="block text-yellow-400 hover:text-yellow-300 text-sm mb-1 transition-colors">
                      +252 63 4482830
                    </a>
                    <a href="tel:+252654482830" className="block text-yellow-400 hover:text-yellow-300 text-sm transition-colors">
                      +252 65 4482830
                    </a>
                    <a href="tel:+252633347512" className="block text-yellow-400 hover:text-yellow-300 text-sm transition-colors">
                      +252 63 3347512
                    </a>
                  </div>
                </div>

                <div className="gold-divider" />

                <div className="flex items-start gap-4">
                  <div className="training-icon-wrap w-10 h-10 rounded-lg flex items-center justify-center text-yellow-400 shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="cinzel text-xs text-yellow-500/80 uppercase tracking-wider mb-2">{t('contact_email')}</p>
                    <a href="mailto:info@stratosphereaeronautics.com" className="block text-yellow-400 hover:text-yellow-300 text-sm transition-colors break-all">
                      info@stratosphereaeronautics.com
                    </a>
                    <a href="mailto:abdirahman.dahir@stratosphereaeronautics.com" className="block text-yellow-400 hover:text-yellow-300 text-sm transition-colors break-all">
                      abdirahman.dahir@stratosphereaeronautics.com
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Accreditation */}
            <TiltCard intensity={4} className="p-6 rounded-xl gold-border-glow"
              style={{ background: 'rgba(30,62,114,0.3)' }}>
              <p className="cinzel text-xs tracking-[0.3em] text-yellow-600/80 uppercase mb-3">{t('contact_accreditation')}</p>
              <div className="space-y-2">
                {accKeys.map((key, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <CheckCircle size={12} className="text-yellow-500 shrink-0" />
                    <span className="text-blue-200/65 text-xs">{t(key)}</span>
                  </div>
                ))}
              </div>
            </TiltCard>
          </div>

          {/* WhatsApp CTA */}
          <div className="flex items-center justify-center">
            <TiltCard intensity={5} className="w-full p-10 rounded-2xl gold-border-glow flex flex-col items-center justify-center text-center"
              style={{ background: 'linear-gradient(135deg, rgba(26,52,96,0.9), rgba(13,35,71,0.95))' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}>
                <MessageCircle size={32} className="text-white" />
              </div>
              <h3 className="cinzel text-xl font-bold gold-gradient-text-static mb-3">{t('contact_whatsapp_title')}</h3>
              <p className="text-blue-200/65 text-sm leading-relaxed mb-8 max-w-sm">{t('contact_whatsapp_desc')}</p>
              <a
                href="https://wa.me/252634482830"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-10 py-4 rounded-lg text-sm tracking-widest cinzel inline-flex items-center gap-3"
                style={{ background: 'linear-gradient(135deg, #d4af37, #f0c040)' }}
              >
                <MessageCircle size={18} /> +252 63 4482830
              </a>
            </TiltCard>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const { t } = useLang();
  const footerLinks = [
    { href: '#about', key: 'nav_about' as const },
    { href: '#mission', key: 'nav_mission' as const },
    { href: '#training', key: 'nav_training' as const },
    { href: '#careers', key: 'nav_careers' as const },
    { href: '#why-us', key: 'nav_why_us' as const },
    { href: '#contact', key: 'nav_contact' as const },
  ];

  return (
    <footer className="relative z-10 border-t border-yellow-600/15 py-12 px-4"
      style={{ background: 'linear-gradient(180deg, rgba(13,35,71,0.95), #0d2347)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-4">
            <img src="/logo-removebg-preview.png" alt="Stratosphere Aeronautics" className="w-14 h-14 object-contain" />
            <div>
              <p className="cinzel font-bold text-base gold-gradient-text-static">Stratosphere Aeronautics</p>
              <p className="cinzel text-xs text-yellow-600/70 tracking-widest">{t('footer_school')}</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((item, i) => (
              <a key={i} href={item.href} className="cinzel text-xs tracking-widest text-blue-200/50 hover:text-yellow-400 uppercase transition-colors">
                {t(item.key)}
              </a>
            ))}
          </div>
        </div>

        <div className="gold-divider mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-blue-200/35 text-xs">{t('footer_rights')}</p>
          <p className="cinzel text-xs text-yellow-600/50 italic tracking-wider">{t('footer_tagline')}</p>
          <p className="text-blue-200/35 text-xs">{t('footer_ernam')} · {t('footer_icao')} · Est. 2026</p>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
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
      <div className="relative min-h-screen" style={{ background: '#0d2347' }}>
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
        <a
          href="https://wa.me/252634482830"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="whatsapp-fab"
        >
          <MessageCircle size={28} className="text-white" />
        </a>
      </div>
    </LangContext.Provider>
  );
}
