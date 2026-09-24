import { useState, useEffect, createContext, useContext } from 'react';
import { Plane, Navigation, Cloud, Zap, Users, Radio, Compass, Shield, BookOpen, ArrowRight, Clock, Award, Menu, X, Globe, MapPin, Star } from 'lucide-react';
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
        <div className="px-6 py-6 flex flex-col gap-1">{[{ label: 'Home', path: '/' }, ...links, { label: 'Admissions', path: '/admissions' }, { label: 'Student Life', path: '/student-life' }, { label: 'Resources', path: '/resources' }].map(l => <button key={l.path} onClick={() => { navigate(l.path); setMenuOpen(false); }} className="flex items-center gap-3 py-3.5 px-3 rounded-lg text-sm font-semibold text-[rgba(180,210,255,0.8)] hover:text-[#7ab8f7] transition-all uppercase tracking-wider"><Navigation size={14} className="text-[#2472e8]" />{l.label}</button>)}</div>
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

const trainingPrograms = [
  { icon: <BookOpen size={22} />, color: 'icon-box-blue', title: 't1_title' as const, desc: 't1_desc' as const, duration: 'Flexible' },
  { icon: <Plane size={22} />, color: 'icon-box-cyan', title: 't2_title' as const, desc: 't2_desc' as const, duration: 'Flexible' },
  { icon: <Cloud size={22} />, color: 'icon-box-sky', title: 't3_title' as const, desc: 't3_desc' as const, duration: 'Flexible' },
  { icon: <Navigation size={22} />, color: 'icon-box-blue', title: 't4_title' as const, desc: 't4_desc' as const, duration: 'Flexible' },
  { icon: <Zap size={22} />, color: 'icon-box-amber', title: 't5_title' as const, desc: 't5_desc' as const, duration: 'Flexible' },
  { icon: <Users size={22} />, color: 'icon-box-green', title: 't6_title' as const, desc: 't6_desc' as const, duration: 'Flexible' },
  { icon: <Radio size={22} />, color: 'icon-box-purple', title: 't7_title' as const, desc: 't7_desc' as const, duration: 'Flexible' },
  { icon: <Compass size={22} />, color: 'icon-box-cyan', title: 't8_title' as const, desc: 't8_desc' as const, duration: 'Flexible' },
  { icon: <Shield size={22} />, color: 'icon-box-green', title: 't9_title' as const, desc: 't9_desc' as const, duration: 'Flexible' },
  { icon: <Globe size={22} />, color: 'icon-box-blue', title: 't10_title' as const, desc: 't10_desc' as const, duration: 'Flexible' },
];

export default function Training() {
  const { t } = useLang();
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <PageHero label={t('training_label')} title={t('training_title')} description={t('training_subtitle')} breadcrumb={t('nav_training')} />
      <section className="section-alt">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingPrograms.map((p, i) => (
              <div key={i} className="card-modern p-7 group cursor-pointer" onClick={() => navigate(`/training/${i + 1}`)}>
                <div className="flex items-start justify-between mb-5">
                  <div className={`icon-box w-14 h-14 ${p.color} transition-transform duration-300 group-hover:scale-110`}>{p.icon}</div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#4a6080] bg-[rgba(36,114,232,0.06)] px-3 py-1.5 rounded-full border border-[rgba(75,142,245,0.15)]">{p.duration}</span>
                </div>
                <h3 className="text-base font-bold text-[#dceeff] mb-2">{t(p.title)}</h3>
                <p className="text-[#4a6080] text-sm leading-relaxed mb-4">{t(p.desc)}</p>
                <div className="flex items-center gap-2 text-[#4b8ef5] text-sm font-semibold group-hover:text-[#7ab8f7] transition-colors">
                  Learn More <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full glass border border-[rgba(36,114,232,0.2)]">
              <Globe className="text-[#4b8ef5]" size={18} /><span className="text-sm font-semibold tracking-[0.1em] text-[#7ab8f7] uppercase">ASECNA · ICAO WACAF Office Partner</span><Globe className="text-[#4b8ef5]" size={18} />
            </div>
          </div>
        </div>
      </section>
      <section className="section-base">
        <div className="max-w-5xl mx-auto px-4 py-24">
          <div className="text-center mb-12">
            <span className="label-badge mb-4 inline-block">Enrollment</span>
            <h2 className="text-3xl md:text-4xl font-extrabold gradient-text-light mb-5 mt-3">Start Your Training Journey</h2>
            <p className="text-[#94aed4] max-w-2xl mx-auto">All programs are available as private 1-on-1 or small-group sessions. Contact us to schedule a consultation.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[{ icon: <Clock size={24} />, title: 'Flexible Scheduling', desc: 'Morning, evening, and weekend sessions designed around your lifestyle.' }, { icon: <Award size={24} />, title: 'ICAO Aligned', desc: 'Curriculum built on ICAO Doc 7192 and ERNAM instructional frameworks.' }, { icon: <Users size={24} />, title: 'Private Tuition', desc: 'Dedicated 1-on-1 instruction tailored to your pace and learning style.' }].map((item, i) => (
              <div key={i} className="card-modern p-8 text-center">
                <div className="icon-box w-14 h-14 icon-box-blue mx-auto mb-4">{item.icon}</div>
                <h3 className="text-sm font-bold text-[#dceeff] mb-2">{item.title}</h3>
                <p className="text-[#94aed4] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <button onClick={() => navigate('/admissions')} className="btn-primary px-9 py-4 text-sm font-bold inline-flex items-center gap-2">Apply Now <ArrowRight size={16} /></button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export function TrainingWithLang() {
  const [lang, setLangState] = useState<Lang>('en');
  const setLang = (l: Lang) => { setLangState(l); document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'; document.documentElement.lang = l; };
  useEffect(() => { const b = navigator.language.toLowerCase(); if (b.startsWith('so')) setLang('so'); else if (b.startsWith('ar')) setLang('ar'); else setLang('en'); }, []);
  const t = (k: keyof typeof translations['en']) => translations[lang][k] ?? translations.en[k];
  return <LangContext.Provider value={{ lang, t, setLang }}><div className="relative min-h-screen" style={{ background: '#040b1a' }}><div className="ambient-bg" /><div className="grid-overlay" /><Training /></div></LangContext.Provider>;
}
