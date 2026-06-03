import { useEffect, useRef, useState } from 'react';
import {
  Plane, Globe, Shield, BookOpen, Wind, Radio, Users, Award,
  ChevronDown, MapPin, Phone, Menu, X, Star, CheckCircle,
  Navigation, Cloud, Compass, Zap, GraduationCap, Briefcase,
  Building, ChevronRight, ArrowRight
} from 'lucide-react';

// ── Stars background ──────────────────────────────────────────────────────────
function StarsBackground() {
  const stars = Array.from({ length: 120 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 2.5 + 0.5,
    duration: `${Math.random() * 4 + 2}s`,
    delay: `${Math.random() * 4}s`,
  }));

  return (
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

// ── Navigation ────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#about', label: 'About' },
    { href: '#mission', label: 'Mission' },
    { href: '#training', label: 'Training' },
    { href: '#careers', label: 'Careers' },
    { href: '#why-us', label: 'Why Us' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-glass shadow-lg shadow-black/40' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-18 py-3">
        <a href="#hero" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="Stratosphere Aeronautics" className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110" />
          <div className="hidden sm:block">
            <p className="cinzel text-sm font-bold gold-gradient-text leading-tight">Stratosphere</p>
            <p className="cinzel text-[10px] text-yellow-600/80 tracking-widest uppercase">Aeronautics</p>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className="nav-link cinzel text-xs tracking-wider text-blue-100/80 hover:text-yellow-400 uppercase transition-colors duration-300">
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn-primary cinzel text-xs px-5 py-2.5 rounded-sm tracking-wider">
            Enroll Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-yellow-400 p-2">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
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
            Enroll Now
          </a>
        </div>
      )}
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" className="hero-bg relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
      {/* Animated horizon lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[20, 40, 60, 80].map((p, i) => (
          <div key={i} className="absolute w-full horizon-glow" style={{ top: `${p}%`, animationDelay: `${i * 0.5}s` }} />
        ))}
        {/* Runway lights */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="runway-dot w-1.5 h-1.5 rounded-full bg-yellow-500/60"
              style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>

      {/* Logo */}
      <div className="perspective-container mb-10 relative">
        <div className="absolute inset-0 rounded-full pulse-ring border-2 border-yellow-500/30 scale-110" />
        <div className="absolute inset-0 rounded-full pulse-ring border border-yellow-500/20 scale-125" style={{ animationDelay: '0.7s' }} />
        <img
          src="/logo.png"
          alt="Stratosphere Aeronautics"
          className="logo-float w-44 h-44 md:w-56 md:h-56 object-contain relative z-10"
        />
      </div>

      {/* Text */}
      <div className="max-w-4xl mx-auto">
        <p className="cinzel text-xs md:text-sm tracking-[0.4em] text-yellow-500/80 uppercase mb-4 animate-fade-in">
          ERNAM · ICAO Recognized · Regional Aviation Training Center
        </p>
        <h1 className="cinzel text-4xl sm:text-5xl md:text-7xl font-black gold-gradient-text leading-[1.1] mb-4 animate-slide-up">
          Stratosphere<br />
          <span className="text-blue-100/90">Aeronautics</span>
        </h1>
        <p className="cinzel text-base md:text-xl text-yellow-500/90 tracking-widest mb-3 animate-slide-up delay-200">
          School for Air Navigation & Management
        </p>
        <div className="gold-divider w-64 mx-auto mb-8" />
        <p className="text-blue-200/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-4 animate-fade-in delay-300">
          Mastering the Skies. Managing the Future. Precision in Navigation.
        </p>
        <p className="cinzel text-yellow-600/60 text-xs tracking-[0.3em] uppercase mb-10 animate-fade-in delay-400">
          "Precision in Theory. Excellence in Flight."
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-500">
          <a href="#training" className="btn-primary px-10 py-4 rounded-sm text-sm inline-flex items-center gap-2 justify-center">
            Explore Programs <ArrowRight size={16} />
          </a>
          <a href="#contact" className="btn-outline px-10 py-4 rounded-sm text-sm inline-flex items-center gap-2 justify-center">
            Enroll Today <ChevronRight size={16} />
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
  const ref = useReveal();
  return (
    <Section id="about" className="section-navy">
      <div className="max-w-6xl mx-auto">
        <SectionTitle label="Who We Are" title="Your Gateway to the Skies" subtitle="Elite theoretical knowledge instruction for the next generation of aviation professionals." />

        <div ref={ref} className="reveal grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-6">
            <p className="text-blue-100/80 text-base leading-relaxed">
              Stratosphere Aeronautics offers elite private tuition designed to transform your passion for aviation into a professional reality. We provide the essential theoretical foundation every pilot and aviation professional needs.
            </p>
            <p className="text-blue-100/80 text-base leading-relaxed">
              Led by a specialist trained at the <span className="text-yellow-400 font-semibold">Regional School of Air Navigation and Management (ERNAM)</span>, our program delivers an internationally recognized curriculum that aligns with global aviation standards.
            </p>
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

          {/* Right — 3D card */}
          <div className="perspective-container">
            <div className="card-3d gold-border-glow rounded-2xl bg-gradient-to-br from-navy-800/60 to-navy-900/80 p-8 backdrop-blur-sm"
              style={{ background: 'linear-gradient(135deg, rgba(13,31,60,0.9), rgba(2,12,27,0.95))' }}>
              <div className="flex items-center gap-4 mb-6">
                <img src="/logo.png" alt="Stratosphere Aeronautics" className="w-20 h-20 object-contain" />
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
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── Mission ───────────────────────────────────────────────────────────────────
function Mission() {
  const ref = useReveal();
  return (
    <Section id="mission" className="section-navy-alt">
      <div className="max-w-5xl mx-auto">
        <SectionTitle label="Our Purpose" title="Our Mission" />

        <div ref={ref} className="reveal perspective-container">
          <div className="card-3d relative gold-border-glow rounded-2xl overflow-hidden animated-border"
            style={{ background: 'linear-gradient(135deg, rgba(10,22,40,0.95), rgba(17,41,80,0.5), rgba(2,12,27,0.95))' }}>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
            <div className="p-10 md:p-16 text-center relative">
              <div className="quote-marks relative inline-block pl-8 mb-8">
                <Plane className="text-yellow-500/30 mx-auto mb-4" size={48} />
              </div>
              <blockquote className="cinzel text-lg md:text-2xl font-semibold text-blue-100/90 leading-relaxed mb-8 italic">
                "To empower the next generation of aviation leaders through rigorous air navigation training and comprehensive systems management education."
              </blockquote>
              <p className="text-blue-200/65 text-base leading-relaxed max-w-3xl mx-auto">
                At Stratosphere Aeronautics, we bridge the gap between <span className="text-yellow-400">technical mastery</span> and <span className="text-yellow-400">organizational excellence</span>, ensuring our graduates navigate the complexities of the modern airspace with precision, safety, and professional integrity.
              </p>
              <div className="gold-divider w-40 mx-auto mt-10 mb-6" />
              <div className="flex flex-wrap justify-center gap-6 text-center">
                {[
                  { label: 'Precision', icon: <Navigation size={16} /> },
                  { label: 'Safety', icon: <Shield size={16} /> },
                  { label: 'Integrity', icon: <Star size={16} /> },
                  { label: 'Excellence', icon: <Award size={16} /> },
                ].map((v, i) => (
                  <div key={i} className="flex items-center gap-2 cinzel text-xs tracking-widest text-yellow-500/80 uppercase">
                    <span className="text-yellow-600">{v.icon}</span>
                    {v.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── Training Areas ────────────────────────────────────────────────────────────
const trainingAreas = [
  { icon: <BookOpen size={22} />, title: 'Air Law', desc: 'Rules of the air, international regulations, and operational procedures governing global airspace.' },
  { icon: <Plane size={22} />, title: 'Principles of Flight', desc: 'Deep-dive into aerodynamics, aircraft systems, performance, and the physics of flight.' },
  { icon: <Cloud size={22} />, title: 'Meteorology', desc: 'Understanding weather patterns, atmospheric science, and making safe go/no-go decisions.' },
  { icon: <Navigation size={22} />, title: 'Navigation & Flight Planning', desc: 'Master the mathematics and technology behind precision navigation and route planning.' },
  { icon: <Zap size={22} />, title: 'Aircraft General Knowledge', desc: 'Comprehensive understanding of aircraft systems, powerplants, and airframe components.' },
  { icon: <Users size={22} />, title: 'Human Performance', desc: 'Physiological and psychological factors affecting pilot performance and decision-making.' },
  { icon: <Radio size={22} />, title: 'Radio Communications', desc: 'Standard phraseology, communication procedures, and frequency management in all phases of flight.' },
  { icon: <Compass size={22} />, title: 'Air Traffic Control & AIM', desc: 'ATC procedures, airspace structure, and aeronautical information management essentials.' },
  { icon: <Shield size={22} />, title: 'Safety Management Systems', desc: 'SMS frameworks, risk assessment, hazard identification, and safety culture development.' },
  { icon: <Globe size={22} />, title: 'Language Proficiency Testing', desc: 'ICAO language proficiency requirements and preparation for operational level testing.' },
];

function Training() {
  return (
    <Section id="training" className="section-navy">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label="Curriculum"
          title="Key Training Areas"
          subtitle="Ten core pillars of aeronautical theory, delivered through personalized, high-impact private sessions aligned with ICAO standards."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {trainingAreas.map((area, i) => {
            const ref = useReveal();
            return (
              <div key={i} ref={ref} className="reveal card-3d gold-border-glow rounded-xl p-6 flex flex-col gap-4"
                style={{ background: 'linear-gradient(135deg, rgba(13,31,60,0.8), rgba(2,12,27,0.9))', animationDelay: `${i * 0.05}s` }}>
                <div className="training-icon-wrap w-12 h-12 rounded-xl flex items-center justify-center text-yellow-400 shrink-0">
                  {area.icon}
                </div>
                <div>
                  <h3 className="cinzel text-sm font-bold text-yellow-400/90 mb-2 leading-snug">{area.title}</h3>
                  <p className="text-blue-200/60 text-xs leading-relaxed">{area.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ASECNA / ICAO badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 gold-border-glow rounded-full"
            style={{ background: 'rgba(13,31,60,0.6)' }}>
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
const careerGroups = [
  {
    category: 'Flight Dispatch & Operations',
    icon: <Plane size={22} />,
    roles: ['Flight Dispatcher / Flight Operations Officer', 'Flight Follower'],
  },
  {
    category: 'Logistics & Ground Handling',
    icon: <Building size={22} />,
    roles: ['Loadmaster / Weight and Balance Officer', 'Aviation Logistics Coordinator', 'Ramp Operations Supervisor'],
  },
  {
    category: 'Safety & Regulatory Compliance',
    icon: <Shield size={22} />,
    roles: ['Safety Assistant (SMS)', 'Compliance Coordinator'],
  },
  {
    category: 'Technical & Administrative Support',
    icon: <Briefcase size={22} />,
    roles: ['Technical Records Specialist', 'Meteorological Assistant', 'Crew Scheduler'],
  },
  {
    category: 'Education & Further Training',
    icon: <GraduationCap size={22} />,
    roles: ['Pathway to PPL & CPL Licensing', 'Aviation Training Foundation'],
  },
];

function Careers() {
  return (
    <Section id="careers" className="section-navy-alt">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label="Career Outcomes"
          title="Career Pathways"
          subtitle="Our ICAO-compliant graduates are prepared for a wide range of roles across the global aviation industry."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerGroups.map((group, i) => {
            const ref = useReveal();
            return (
              <div key={i} ref={ref} className="reveal card-3d gold-border-glow rounded-xl overflow-hidden"
                style={{ background: 'linear-gradient(160deg, rgba(17,41,80,0.6), rgba(2,12,27,0.9))' }}>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="training-icon-wrap w-10 h-10 rounded-lg flex items-center justify-center text-yellow-400">
                      {group.icon}
                    </div>
                    <h3 className="cinzel text-sm font-bold text-yellow-400/90 leading-snug">{group.category}</h3>
                  </div>
                  <div className="space-y-2.5">
                    {group.roles.map((role, j) => (
                      <div key={j} className="flex items-start gap-2.5">
                        <ChevronRight size={12} className="text-yellow-600 mt-0.5 shrink-0" />
                        <span className="text-blue-100/70 text-sm leading-snug">{role}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="h-0.5 bg-gradient-to-r from-transparent via-yellow-600/40 to-transparent" />
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ── Why Choose Us ─────────────────────────────────────────────────────────────
const reasons = [
  {
    icon: <Shield size={28} />,
    title: 'Pathway to Licensing',
    desc: "We prepare you for the specific regulatory requirements of the PPL and CPL pathways — not just theoretical knowledge.",
  },
  {
    icon: <GraduationCap size={28} />,
    title: 'Expert Instruction',
    desc: 'Learn from an ERNAM-trained specialist with deep technical knowledge in air navigation and management.',
  },
  {
    icon: <Star size={28} />,
    title: 'Ab-Initio Specialists',
    desc: 'We excel at taking students with zero experience and building them into knowledgeable aviation candidates.',
  },
  {
    icon: <Globe size={28} />,
    title: 'International Standards',
    desc: 'Our syllabus is based on ICAO-compliant frameworks, making your knowledge valid and recognized worldwide.',
  },
];

function WhyUs() {
  return (
    <Section id="why-us" className="section-navy">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label="Our Advantage"
          title="Why Choose Stratosphere?"
          subtitle="We don't just teach theory — we build aviation professionals ready for the global stage."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {reasons.map((r, i) => {
            const ref = useReveal();
            return (
              <div key={i} ref={ref} className="reveal card-3d text-center p-8 rounded-2xl gold-border-glow"
                style={{ background: 'linear-gradient(180deg, rgba(17,41,80,0.5), rgba(2,12,27,0.8))', transitionDelay: `${i * 0.1}s` }}>
                <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center text-yellow-400"
                  style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.15), rgba(212,175,55,0.03))' }}>
                  {r.icon}
                </div>
                <h3 className="cinzel text-sm font-bold text-yellow-400/90 mb-3 leading-snug">{r.title}</h3>
                <p className="text-blue-200/65 text-sm leading-relaxed">{r.desc}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="relative rounded-2xl overflow-hidden gold-border-glow animated-border"
          style={{ background: 'linear-gradient(135deg, rgba(17,41,80,0.8), rgba(10,22,40,0.95))' }}>
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
        </div>
      </div>
    </Section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const ref = useReveal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Section id="contact" className="section-navy-alt">
      <div className="max-w-6xl mx-auto">
        <SectionTitle label="Get In Touch" title="Contact & Enrollment" subtitle="Secure your theoretical prerequisite and begin your journey toward the flight deck." />

        <div ref={ref} className="reveal grid md:grid-cols-2 gap-10">
          {/* Info */}
          <div className="space-y-8">
            <div className="card-3d p-8 rounded-2xl gold-border-glow"
              style={{ background: 'linear-gradient(135deg, rgba(13,31,60,0.9), rgba(2,12,27,0.95))' }}>
              <h3 className="cinzel text-lg font-bold gold-gradient-text-static mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="training-icon-wrap w-10 h-10 rounded-lg flex items-center justify-center text-yellow-400 shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="cinzel text-xs text-yellow-500/80 uppercase tracking-wider mb-1">Location</p>
                    <p className="text-blue-100/75 text-sm leading-relaxed">
                      Bahsane Building, 2nd Floor, Room 213<br />
                      Western Entrance (Facing West)<br />
                      Opposite Ex. National Cinema<br />
                      <span className="text-yellow-400">Hargeisa, Somaliland</span>
                    </p>
                  </div>
                </div>

                <div className="gold-divider" />

                <div className="flex items-start gap-4">
                  <div className="training-icon-wrap w-10 h-10 rounded-lg flex items-center justify-center text-yellow-400 shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="cinzel text-xs text-yellow-500/80 uppercase tracking-wider mb-2">Mobile</p>
                    <a href="tel:+252634482830" className="block text-yellow-400 hover:text-yellow-300 text-sm mb-1 transition-colors">
                      +252 (0) 63 4482830
                    </a>
                    <a href="tel:+252654482830" className="block text-yellow-400 hover:text-yellow-300 text-sm transition-colors">
                      +252 (0) 65 4482830
                    </a>
                    <a href="tel:0633347512" className="block text-yellow-400/70 hover:text-yellow-300 text-sm mt-1 transition-colors">
                      0633347512
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Accreditation */}
            <div className="p-6 rounded-xl gold-border-glow"
              style={{ background: 'rgba(17,41,80,0.3)' }}>
              <p className="cinzel text-xs tracking-[0.3em] text-yellow-600/80 uppercase mb-3">Accreditation & Affiliation</p>
              <div className="space-y-2">
                {['ICAO – International Civil Aviation Organization', 'ERNAM – Regional School of Air Navigation', 'ASECNA – Agency for Aerial Navigation Safety', 'ICAO WACAF Regional Office Partner'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <CheckCircle size={12} className="text-yellow-500 shrink-0" />
                    <span className="text-blue-200/65 text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 gold-border-glow rounded-2xl"
                style={{ background: 'linear-gradient(135deg, rgba(13,31,60,0.9), rgba(2,12,27,0.95))' }}>
                <CheckCircle className="text-yellow-400 mb-4" size={52} />
                <h3 className="cinzel text-xl font-bold gold-gradient-text-static mb-3">Enrollment Request Sent!</h3>
                <p className="text-blue-200/65 text-sm leading-relaxed max-w-sm">
                  Thank you for your interest in Stratosphere Aeronautics. We will contact you shortly to complete your enrollment.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 p-8 rounded-2xl gold-border-glow"
                style={{ background: 'linear-gradient(135deg, rgba(13,31,60,0.9), rgba(2,12,27,0.95))' }}>
                <h3 className="cinzel text-lg font-bold gold-gradient-text-static mb-2">Enrollment Inquiry</h3>
                <p className="text-blue-200/55 text-sm mb-6">Enrollment is open for aspiring pilots and aviation enthusiasts.</p>

                {[
                  { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
                  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                  { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+252 ...' },
                ].map(field => (
                  <div key={field.name}>
                    <label className="cinzel text-xs text-yellow-500/70 tracking-wider uppercase block mb-1.5">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      required
                      value={(form as Record<string, string>)[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full bg-navy-950/60 border border-yellow-600/25 rounded-lg px-4 py-3 text-blue-100/90 text-sm placeholder-blue-300/30 focus:outline-none focus:border-yellow-500/60 focus:ring-1 focus:ring-yellow-500/30 transition-all"
                      style={{ background: 'rgba(2,12,27,0.6)' }}
                    />
                  </div>
                ))}

                <div>
                  <label className="cinzel text-xs text-yellow-500/70 tracking-wider uppercase block mb-1.5">Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your aviation goals..."
                    className="w-full bg-navy-950/60 border border-yellow-600/25 rounded-lg px-4 py-3 text-blue-100/90 text-sm placeholder-blue-300/30 focus:outline-none focus:border-yellow-500/60 focus:ring-1 focus:ring-yellow-500/30 transition-all resize-none"
                    style={{ background: 'rgba(2,12,27,0.6)' }}
                  />
                </div>

                <button type="submit" className="btn-primary w-full py-4 rounded-lg text-sm tracking-widest cinzel flex items-center justify-center gap-2">
                  Submit Enrollment Request <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="relative z-10 border-t border-yellow-600/15 py-12 px-4"
      style={{ background: 'linear-gradient(180deg, rgba(2,12,27,0.95), #020c1b)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Stratosphere Aeronautics" className="w-14 h-14 object-contain" />
            <div>
              <p className="cinzel font-bold text-base gold-gradient-text-static">Stratosphere Aeronautics</p>
              <p className="cinzel text-xs text-yellow-600/70 tracking-widest">School for Air Navigation & Management</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {['#about', '#mission', '#training', '#careers', '#why-us', '#contact'].map((href, i) => (
              <a key={i} href={href} className="cinzel text-xs tracking-widest text-blue-200/50 hover:text-yellow-400 uppercase transition-colors">
                {href.replace('#', '')}
              </a>
            ))}
          </div>
        </div>

        <div className="gold-divider mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-blue-200/35 text-xs">
            &copy; {new Date().getFullYear()} Stratosphere Aeronautics. All rights reserved. Hargeisa, Somaliland.
          </p>
          <p className="cinzel text-xs text-yellow-600/50 italic tracking-wider">
            "Precision in Theory. Excellence in Flight."
          </p>
          <p className="text-blue-200/35 text-xs">ERNAM · ICAO Recognized · Est. 2026</p>
        </div>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="relative min-h-screen" style={{ background: '#020c1b' }}>
      <StarsBackground />
      <Navbar />
      <Hero />
      <StatsBanner />
      <About />
      <Mission />
      <Training />
      <Careers />
      <WhyUs />
      <Contact />
      <Footer />
    </div>
  );
}
