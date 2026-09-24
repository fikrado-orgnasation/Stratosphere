import { useState, useEffect, createContext, useContext } from 'react';
import { Plane, Building, Shield, Briefcase, GraduationCap, ChevronRight, ArrowRight, Globe, Award, MapPin, Star, Menu, X } from 'lucide-react';
import PageHero from '../components/PageHero';
import { translations, Lang } from '../translations';
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
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 40); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll); }, []);
  const links = [{ label: t('nav_about'), path: '/about' }, { label: t('nav_training'), path: '/training' }, { label: t('nav_careers'), path: '/careers' }, { label: t('nav_contact'), path: '/contact' }];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-glass' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-[72px]">
        <button onClick={() => navigate('/')} className="flex items-center gap-3 group shrink-0"><img src="/logo-removebg-preview.png" alt="Stratosphere Aeronautics" className="w-11 h-11 object-contain transition-transform duration-300 group-hover:scale-110" /><div className="hidden sm:block leading-tight"><p className="text-sm font-extrabold gradient-text-blue tracking-tight">Stratosphere</p><p className="text-[10px] font-semibold text-[rgba(122,184,247,0.65)] tracking-[0.2em] uppercase">Aeronautics</p></div></button>
        <div className="hidden md:flex items-center gap-5 lg:gap-7">{links.map(l => <button key={l.path} onClick={() => navigate(l.path)} className="nav-link">{l.label}</button>)}</div>
        <div className="hidden md:flex items-center gap-3"><button onClick={() => navigate('/admissions')} className="btn-primary text-xs font-bold px-5 py-2.5 inline-flex items-center gap-1.5">{t('nav_enroll')} <ArrowRight size={13} /></button></div>
        <div className="md:hidden flex items-center gap-2"><button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg text-[#7ab8f7] hover:bg-[rgba(36,114,232,0.1)] transition-colors" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button></div>
      </div>
      <div className={`mobile-menu md:hidden transition-all duration-300 ease-out ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-6 py-6 flex flex-col gap-1">{[{ label: 'Home', path: '/' }, ...links, { label: 'Admissions', path: '/admissions' }, { label: 'Student Life', path: '/student-life' }, { label: 'Resources', path: '/resources' }].map(l => <button key={l.path} onClick={() => { navigate(l.path); setMenuOpen(false); }} className="flex items-center gap-3 py-3.5 px-3 rounded-lg text-sm font-semibold text-[rgba(180,210,255,0.8)] hover:text-[#7ab8f7] transition-all uppercase tracking-wider"><ChevronRight size={14} className="text-[#2472e8]" />{l.label}</button>)}</div>
      </div>
    </nav>
  );
}

function Footer() {
  const { t } = useLang();
  const navigate = useNavigate();
  return (
    <footer className="footer-bg relative z-10 py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-10">
          <div className="flex items-center gap-4"><img src="/logo-removebg-preview.png" alt="Stratosphere Aeronautics" className="w-12 h-12 object-contain" /><div><p className="text-base font-extrabold gradient-text-blue">Stratosphere Aeronautics</p><p className="text-xs font-semibold text-[rgba(122,184,247,0.55)] tracking-wider mt-0.5">{t('footer_school')}</p></div></div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">{[{ path: '/about', key: 'nav_about' as const }, { path: '/training', key: 'nav_training' as const }, { path: '/careers', key: 'nav_careers' as const }, { path: '/contact', key: 'nav_contact' as const }].map((item, i) => <button key={i} onClick={() => navigate(item.path)} className="text-xs font-semibold tracking-widest text-[#4a6080] hover:text-[#7ab8f7] uppercase transition-colors duration-200">{t(item.key)}</button>)}</div>
        </div>
        <div className="section-divider mb-8" />
        <div className="flex flex-wrap justify-center gap-4 mb-8">{[{ label: 'ICAO Compliant', icon: <Globe size={14} /> }, { label: 'ERNAM Certified', icon: <Award size={14} /> }, { label: 'Hargeisa, Somaliland', icon: <MapPin size={14} /> }, { label: 'Est. 2026', icon: <Star size={14} /> }].map((badge, i) => <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(36,114,232,0.15)] bg-[rgba(36,114,232,0.05)] text-xs font-semibold text-[#4a6080]"><span className="text-[#2472e8]">{badge.icon}</span>{badge.label}</div>)}</div>
        <div className="section-divider mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left"><p className="text-xs font-medium text-[rgba(122,184,247,0.4)] italic tracking-wide">{t('footer_tagline')}</p><p className="text-[#2a3a50] text-xs font-medium">{t('footer_rights')}</p></div>
        <div className="mt-8 pt-6 border-t border-[rgba(36,114,232,0.06)] flex justify-center"><a href="https://fikrado2.github.io/fikrado/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5 group"><img src="/fikrado_sec_(1).png" alt="Fikrado Security" className="w-9 h-9 object-contain opacity-50 group-hover:opacity-80 transition-opacity duration-300" /><p className="text-xs font-semibold tracking-widest text-[#2a3a50] uppercase group-hover:text-[rgba(75,142,245,0.6)] transition-colors duration-300">Powered by <span className="text-[rgba(75,142,245,0.5)] group-hover:text-[rgba(75,142,245,0.8)]">FIKRADO SECURITY</span></p></a></div>
      </div>
    </footer>
  );
}

const careerData = [
  { icon: <Plane size={20} />, color: 'icon-box-blue', category: 'Flight Dispatch & Operations', roles: ['Flight Dispatcher / Flight Operations Officer', 'Flight Follower'] },
  { icon: <Building size={20} />, color: 'icon-box-cyan', category: 'Logistics & Ground Handling', roles: ['Loadmaster / Weight and Balance Officer', 'Aviation Logistics Coordinator', 'Ramp Operations Supervisor'] },
  { icon: <Shield size={20} />, color: 'icon-box-green', category: 'Safety & Regulatory Compliance', roles: ['Safety Assistant (SMS)', 'Compliance Coordinator'] },
  { icon: <Briefcase size={20} />, color: 'icon-box-amber', category: 'Technical & Administrative Support', roles: ['Technical Records Specialist', 'Meteorological Assistant', 'Crew Scheduler'] },
  { icon: <GraduationCap size={20} />, color: 'icon-box-purple', category: 'Education & Further Training', roles: ['Pathway to PPL & CPL Licensing', 'Aviation Training Foundation'] },
];

export default function Careers() {
  const { t } = useLang();
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <PageHero label={t('careers_label')} title={t('careers_title')} description={t('careers_subtitle')} breadcrumb={t('nav_careers')} />
      <section className="section-alt">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerData.map((item, i) => (
              <div key={i} className="card-modern p-7 group">
                <div className="flex items-start gap-4 mb-5">
                  <div className={`icon-box w-12 h-12 ${item.color} shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110`}>{item.icon}</div>
                  <h3 className="text-sm font-bold text-[#dceeff] leading-snug">{item.category}</h3>
                </div>
                <div className="space-y-2.5">
                  {item.roles.map((role, j) => (
                    <div key={j} className="flex items-start gap-2.5"><ChevronRight size={14} className="text-[#4b8ef5] mt-1 shrink-0" /><span className="text-[#94aed4] text-sm leading-snug">{role}</span></div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-[rgba(75,142,245,0.1)]" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-base">
        <div className="max-w-4xl mx-auto px-4 py-24">
          <div className="mission-card animated-border px-8 py-14 text-center">
            <p className="text-xs font-bold tracking-[0.35em] text-[#4b8ef5] uppercase mb-4">Your Career Starts Here</p>
            <h3 className="text-2xl md:text-3xl font-extrabold gradient-text-light mb-4">Build Your Aviation Future</h3>
            <p className="text-[#94aed4] text-base max-w-xl mx-auto mb-8 leading-relaxed">Our training opens doors to a wide spectrum of high-value careers across the global aviation industry. Start your journey today.</p>
            <button onClick={() => navigate('/admissions')} className="btn-primary px-9 py-4 text-sm font-bold inline-flex items-center gap-2">Apply Now <ArrowRight size={16} /></button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export function CareersWithLang() {
  const [lang, setLangState] = useState<Lang>('en');
  const setLang = (l: Lang) => { setLangState(l); document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'; document.documentElement.lang = l; };
  useEffect(() => { const b = navigator.language.toLowerCase(); if (b.startsWith('so')) setLang('so'); else if (b.startsWith('ar')) setLang('ar'); else setLang('en'); }, []);
  const t = (k: keyof typeof translations['en']) => translations[lang][k] ?? translations.en[k];
  return <LangContext.Provider value={{ lang, t, setLang }}><div className="relative min-h-screen" style={{ background: '#040b1a' }}><div className="ambient-bg" /><div className="grid-overlay" /><Careers /></div></LangContext.Provider>;
}
