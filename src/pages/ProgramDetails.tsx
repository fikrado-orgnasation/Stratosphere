import { useState, useEffect, createContext, useContext } from 'react';
import { ArrowRight, ChevronRight, Clock, Users, Award, CheckCircle, Menu, X } from 'lucide-react';
import PageHero from '../components/PageHero';
import { translations, Lang } from '../translations';
import { useNavigate, useParams } from 'react-router-dom';

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
        <div className="px-6 py-6 flex flex-col gap-1">{[{ label: 'Home', path: '/' }, ...links, { label: 'Admissions', path: '/admissions' }].map(l => <button key={l.path} onClick={() => { navigate(l.path); setMenuOpen(false); }} className="flex items-center gap-3 py-3.5 px-3 rounded-lg text-sm font-semibold text-[rgba(180,210,255,0.8)] hover:text-[#7ab8f7] transition-all uppercase tracking-wider"><ChevronRight size={14} className="text-[#2472e8]" />{l.label}</button>)}</div>
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
        <div className="section-divider mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left"><p className="text-xs font-medium text-[rgba(122,184,247,0.4)] italic tracking-wide">{t('footer_tagline')}</p><p className="text-[#2a3a50] text-xs font-medium">{t('footer_rights')}</p></div>
      </div>
    </footer>
  );
}

const programData = [
  { title: 't1_title' as const, desc: 't1_desc' as const, duration: 'Self-paced', level: 'Beginner', topics: ['Rules of the Air', 'International Regulations', 'Operational Procedures', 'Airspace Classification'] },
  { title: 't2_title' as const, desc: 't2_desc' as const, duration: 'Self-paced', level: 'Beginner', topics: ['Aerodynamics', 'Aircraft Systems', 'Performance', 'Physics of Flight'] },
  { title: 't3_title' as const, desc: 't3_desc' as const, duration: 'Self-paced', level: 'Beginner', topics: ['Weather Patterns', 'Atmospheric Science', 'Go/No-Go Decisions', 'METAR/TAF Interpretation'] },
  { title: 't4_title' as const, desc: 't4_desc' as const, duration: 'Self-paced', level: 'Intermediate', topics: ['Precision Navigation', 'Route Planning', 'GPS Systems', 'VOR/ADF Navigation'] },
  { title: 't5_title' as const, desc: 't5_desc' as const, duration: 'Self-paced', level: 'Intermediate', topics: ['Aircraft Systems', 'Powerplants', 'Airframe Components', 'Electrical Systems'] },
  { title: 't6_title' as const, desc: 't6_desc' as const, duration: 'Self-paced', level: 'Intermediate', topics: ['Physiological Factors', 'Psychological Factors', 'Decision-Making', 'Human Error'] },
  { title: 't7_title' as const, desc: 't7_desc' as const, duration: 'Self-paced', level: 'Beginner', topics: ['Standard Phraseology', 'Communication Procedures', 'Frequency Management', 'Emergency Communications'] },
  { title: 't8_title' as const, desc: 't8_desc' as const, duration: 'Self-paced', level: 'Intermediate', topics: ['ATC Procedures', 'Airspace Structure', 'Aeronautical Information', 'Flight Plans'] },
  { title: 't9_title' as const, desc: 't9_desc' as const, duration: 'Self-paced', level: 'Advanced', topics: ['SMS Frameworks', 'Risk Assessment', 'Hazard Identification', 'Safety Culture'] },
  { title: 't10_title' as const, desc: 't10_desc' as const, duration: 'Self-paced', level: 'Intermediate', topics: ['ICAO Requirements', 'Operational Level Testing', 'Language Proficiency', 'Exam Preparation'] },
];

export default function ProgramDetails() {
  const { t } = useLang();
  const navigate = useNavigate();
  const { id } = useParams();
  const programIndex = id ? parseInt(id) - 1 : 0;
  const program = programData[programIndex] || programData[0];

  return (
    <>
      <Navbar />
      <PageHero label={t('training_label')} title={t(program.title)} description={t(program.desc)} breadcrumb={`${t('nav_training')} / ${t(program.title)}`} />
      <section className="section-alt">
        <div className="max-w-5xl mx-auto px-4 py-24">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="card-modern p-7 text-center">
              <Clock size={28} className="text-[#4b8ef5] mx-auto mb-3" />
              <p className="text-xs font-bold text-[#4b8ef5] uppercase tracking-wider mb-1">Duration</p>
              <p className="text-[#dceeff] text-sm font-semibold">{program.duration}</p>
            </div>
            <div className="card-modern p-7 text-center">
              <Users size={28} className="text-[#4ade80] mx-auto mb-3" />
              <p className="text-xs font-bold text-[#4ade80] uppercase tracking-wider mb-1">Level</p>
              <p className="text-[#dceeff] text-sm font-semibold">{program.level}</p>
            </div>
            <div className="card-modern p-7 text-center">
              <Award size={28} className="text-[#fbbf24] mx-auto mb-3" />
              <p className="text-xs font-bold text-[#fbbf24] uppercase tracking-wider mb-1">Certificate</p>
              <p className="text-[#dceeff] text-sm font-semibold">ICAO Aligned</p>
            </div>
          </div>
          <div className="card-modern p-8 md:p-10 mb-12">
            <h2 className="text-xl font-extrabold gradient-text-blue mb-6">What You Will Learn</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {program.topics.map((topic, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(14,35,80,0.5)] border border-[rgba(75,142,245,0.12)]">
                  <CheckCircle size={16} className="text-[#4b8ef5] shrink-0" />
                  <span className="text-[#94aed4] text-sm">{topic}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <button onClick={() => navigate('/admissions')} className="btn-primary px-9 py-4 text-sm font-bold inline-flex items-center gap-2">Enroll Now <ArrowRight size={16} /></button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export function ProgramDetailsWithLang() {
  const [lang, setLangState] = useState<Lang>('en');
  const setLang = (l: Lang) => { setLangState(l); document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'; document.documentElement.lang = l; };
  useEffect(() => { const b = navigator.language.toLowerCase(); if (b.startsWith('so')) setLang('so'); else if (b.startsWith('ar')) setLang('ar'); else setLang('en'); }, []);
  const t = (k: keyof typeof translations['en']) => translations[lang][k] ?? translations.en[k];
  return <LangContext.Provider value={{ lang, t, setLang }}><div className="relative min-h-screen" style={{ background: '#040b1a' }}><div className="ambient-bg" /><div className="grid-overlay" /><ProgramDetails /></div></LangContext.Provider>;
}
