import { Shield, Star, Users, Globe, Award, BookOpen, CheckCircle, ArrowRight, Menu, X, ChevronRight, MapPin, Navigation } from 'lucide-react';
import PageHero from '../components/PageHero';
import { translations, Lang } from '../translations';
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LangContext = createContext<{ lang: Lang; t: (k: keyof typeof translations['en']) => string; setLang: (l: Lang) => void; }>({
  lang: 'en', t: (k) => translations.en[k], setLang: () => {},
});
function useLang() { return useContext(LangContext); }

function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: t('nav_about'), path: '/about' },
    { label: t('nav_training'), path: '/training' },
    { label: t('nav_careers'), path: '/careers' },
    { label: t('nav_why_us'), path: '/about' },
    { label: t('nav_certificate'), path: '/about' },
    { label: t('nav_contact'), path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-glass' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-[72px]">
        <button onClick={() => navigate('/')} className="flex items-center gap-3 group shrink-0">
          <img src="/logo-removebg-preview.png" alt="Stratosphere Aeronautics" className="w-11 h-11 object-contain transition-transform duration-300 group-hover:scale-110" />
          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-extrabold gradient-text-blue tracking-tight">Stratosphere</p>
            <p className="text-[10px] font-semibold text-[rgba(122,184,247,0.65)] tracking-[0.2em] uppercase">Aeronautics</p>
          </div>
        </button>
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {links.map(l => (
            <button key={l.path} onClick={() => navigate(l.path)} className="nav-link">{l.label}</button>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button onClick={() => navigate('/admissions')} className="btn-primary text-xs font-bold px-5 py-2.5 inline-flex items-center gap-1.5">
            {t('nav_enroll')} <ArrowRight size={13} />
          </button>
        </div>
        <div className="md:hidden flex items-center gap-2">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg text-[#7ab8f7] hover:bg-[rgba(36,114,232,0.1)] transition-colors" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <div className={`mobile-menu md:hidden transition-all duration-300 ease-out ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-6 py-6 flex flex-col gap-1">
          {links.map(l => (
            <button key={l.path} onClick={() => { navigate(l.path); setMenuOpen(false); }} className="flex items-center gap-3 py-3.5 px-3 rounded-lg text-sm font-semibold text-[rgba(180,210,255,0.8)] hover:text-[#7ab8f7] hover:bg-[rgba(36,114,232,0.08)] transition-all uppercase tracking-wider">
              <ChevronRight size={14} className="text-[#2472e8]" />{l.label}
            </button>
          ))}
          <button onClick={() => { navigate('/admissions'); setMenuOpen(false); }} className="btn-primary mt-4 text-sm font-bold px-6 py-3 text-center inline-flex items-center justify-center gap-2">
            {t('nav_enroll')} <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  const { t } = useLang();
  const navigate = useNavigate();
  const footerLinks = [
    { path: '/about', key: 'nav_about' as const }, { path: '/training', key: 'nav_training' as const },
    { path: '/careers', key: 'nav_careers' as const }, { path: '/about', key: 'nav_why_us' as const },
    { path: '/about', key: 'nav_certificate' as const }, { path: '/contact', key: 'nav_contact' as const },
  ];
  return (
    <footer className="footer-bg relative z-10 py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-10">
          <div className="flex items-center gap-4">
            <img src="/logo-removebg-preview.png" alt="Stratosphere Aeronautics" className="w-12 h-12 object-contain" />
            <div>
              <p className="text-base font-extrabold gradient-text-blue">Stratosphere Aeronautics</p>
              <p className="text-xs font-semibold text-[rgba(122,184,247,0.55)] tracking-wider mt-0.5">{t('footer_school')}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((item, i) => (
              <button key={i} onClick={() => navigate(item.path)} className="text-xs font-semibold tracking-widest text-[#4a6080] hover:text-[#7ab8f7] uppercase transition-colors duration-200">{t(item.key)}</button>
            ))}
          </div>
        </div>
        <div className="section-divider mb-8" />
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {[{ label: 'ICAO Compliant', icon: <Globe size={14} /> }, { label: 'ERNAM Certified', icon: <Award size={14} /> }, { label: 'Hargeisa, Somaliland', icon: <MapPin size={14} /> }, { label: 'Est. 2026', icon: <Star size={14} /> }].map((badge, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(36,114,232,0.15)] bg-[rgba(36,114,232,0.05)] text-xs font-semibold text-[#4a6080]"><span className="text-[#2472e8]">{badge.icon}</span>{badge.label}</div>
          ))}
        </div>
        <div className="section-divider mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs font-medium text-[rgba(122,184,247,0.4)] italic tracking-wide">{t('footer_tagline')}</p>
          <p className="text-[#2a3a50] text-xs font-medium">{t('footer_rights')}</p>
        </div>
        <div className="mt-8 pt-6 border-t border-[rgba(36,114,232,0.06)] flex justify-center">
          <a href="https://fikrado2.github.io/fikrado/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5 group">
            <img src="/fikrado_sec_(1).png" alt="Fikrado Security" className="w-9 h-9 object-contain opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
            <p className="text-xs font-semibold tracking-widest text-[#2a3a50] uppercase group-hover:text-[rgba(75,142,245,0.6)] transition-colors duration-300">Powered by <span className="text-[rgba(75,142,245,0.5)] group-hover:text-[rgba(75,142,245,0.8)]">FIKRADO SECURITY</span></p>
          </a>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFAB() {
  return (
    <a href="https://wa.me/252634482830" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="whatsapp-fab">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
    </a>
  );
}

export default function About() {
  const { t } = useLang();
  const highlights = [
    { icon: <Shield size={18} />, text: 'ICAO Compliant Syllabus', color: 'icon-box-blue' },
    { icon: <Star size={18} />, text: 'ERNAM-Trained Instructors', color: 'icon-box-amber' },
    { icon: <Users size={18} />, text: 'Ab-Initio Specialists', color: 'icon-box-green' },
    { icon: <Globe size={18} />, text: 'Internationally Valid', color: 'icon-box-cyan' },
  ];
  const values = [
    { icon: <Navigation size={18} />, label: t('val_precision'), color: 'text-[#4b8ef5]' },
    { icon: <Shield size={18} />, label: t('val_safety'), color: 'text-[#4ade80]' },
    { icon: <Star size={18} />, label: t('val_integrity'), color: 'text-[#fbbf24]' },
    { icon: <Award size={18} />, label: t('val_excellence'), color: 'text-[#a78bfa]' },
  ];
  const stats = [
    { value: '2026', label: t('about_founded') },
    { value: 'ICAO', label: 'Standard' },
    { value: 'ERNAM', label: 'Affiliated' },
    { value: '10+', label: 'Training Areas' },
  ];

  return (
    <>
      <Navbar />
      <PageHero label={t('about_label')} title={t('about_title')} description={t('about_subtitle')} breadcrumb={t('nav_about')} />

      {/* Story section */}
      <section className="section-alt">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6">
              <p className="text-[#94aed4] text-base leading-relaxed">{t('about_p1')}</p>
              <p className="text-[#94aed4] text-base leading-relaxed">{t('about_p2')}</p>
              <div className="grid grid-cols-2 gap-3 mt-6">
                {highlights.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-[rgba(14,35,80,0.5)] border border-[rgba(75,142,245,0.12)] transition-all duration-300 hover:border-[rgba(122,184,247,0.3)]">
                    <div className={`icon-box w-10 h-10 ${item.color} shrink-0`}>{item.icon}</div>
                    <span className="text-[#94aed4] text-sm font-medium leading-tight">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-modern p-8" style={{ background: 'linear-gradient(150deg, rgba(14,35,80,0.7), rgba(8,20,48,0.9))' }}>
              <div className="flex items-center gap-4 mb-6">
                <img src="/logo-removebg-preview.png" alt="Stratosphere Aeronautics" className="w-16 h-16 object-contain floating-icon" />
                <div>
                  <p className="text-base font-extrabold gradient-text-blue">Stratosphere</p>
                  <p className="text-sm font-semibold text-[#7ab8f7]">Aeronautics</p>
                  <p className="text-[#4a6080] text-xs mt-0.5 font-medium">Est. 2026</p>
                </div>
              </div>
              <div className="section-divider mb-6" />
              <div className="space-y-3 mb-6">
                {['Theoretical Knowledge Instruction (TKI)', 'Private & Small-Group Tuition', 'PPL & CPL Prerequisite Foundation', 'ASECNA | ICAO WACAF Office Partner', 'Based in Hargeisa, Somaliland'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3"><CheckCircle size={15} className="text-[#4b8ef5] shrink-0" /><span className="text-[#94aed4] text-sm">{item}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-base">
        <div className="max-w-5xl mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <span className="label-badge mb-4 inline-block">{t('mission_label')}</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold gradient-text-light mb-5 mt-3">{t('mission_title')}</h2>
          </div>
          <div className="mission-card animated-border p-10 md:p-14 text-center relative">
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[rgba(122,184,247,0.3)] rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[rgba(122,184,247,0.3)] rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[rgba(122,184,247,0.3)] rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[rgba(122,184,247,0.3)] rounded-br-lg" />
            <div className="mb-8 relative">
              <div className="absolute inset-0 rounded-full bg-[rgba(36,114,232,0.08)] blur-2xl scale-150" />
              <BookOpen className="text-[rgba(122,184,247,0.5)] mx-auto mb-5 relative" size={52} strokeWidth={1.2} />
            </div>
            <blockquote className="text-lg md:text-2xl font-semibold text-[#dceeff] leading-relaxed mb-8 italic">{t('mission_quote')}</blockquote>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {values.map((v, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs font-bold tracking-[0.15em] uppercase text-[#94aed4]">
                  <span className={`${v.color} w-7 h-7 rounded-lg flex items-center justify-center bg-[rgba(10,26,56,0.6)] border border-[rgba(75,142,245,0.15)]`}>{v.icon}</span>{v.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-alt">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center p-6 rounded-xl bg-[rgba(14,35,80,0.5)] border border-[rgba(75,142,245,0.12)]">
                <p className="stat-number text-3xl md:text-4xl font-extrabold mb-2">{s.value}</p>
                <p className="text-[#4a6080] text-xs font-semibold tracking-wider uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFAB />
    </>
  );
}

export function AboutWithLang() {
  const [lang, setLangState] = useState<Lang>('en');
  const setLang = (l: Lang) => { setLangState(l); document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'; document.documentElement.lang = l; };
  useEffect(() => { const b = navigator.language.toLowerCase(); if (b.startsWith('so')) setLang('so'); else if (b.startsWith('ar')) setLang('ar'); else setLang('en'); }, []);
  const t = (k: keyof typeof translations['en']) => translations[lang][k] ?? translations.en[k];
  return <LangContext.Provider value={{ lang, t, setLang }}><div className="relative min-h-screen" style={{ background: '#040b1a' }}><div className="ambient-bg" /><div className="grid-overlay" /><About /></div></LangContext.Provider>;
}
