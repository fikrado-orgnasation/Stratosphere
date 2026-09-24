import { useState, useEffect, createContext, useContext } from 'react';
import { ArrowRight, Phone, Mail, MapPin, Globe, Award, Star, Menu, X, ChevronRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import { translations, Lang } from '../translations';

const LangContext = createContext<{ lang: Lang; t: (k: keyof typeof translations['en']) => string; setLang: (l: Lang) => void; }>({
  lang: 'en', t: (k) => translations.en[k], setLang: () => {},
});
function useLang() { return useContext(LangContext); }

function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 40); window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll); }, []);
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-glass' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-[72px]">
        <a href="#top" className="flex items-center gap-3 group shrink-0"><img src="/logo-removebg-preview.png" alt="Stratosphere Aeronautics" className="w-11 h-11 object-contain transition-transform duration-300 group-hover:scale-110" /><div className="hidden sm:block leading-tight"><p className="text-sm font-extrabold gradient-text-blue tracking-tight">Stratosphere</p><p className="text-[10px] font-semibold text-[rgba(122,184,247,0.65)] tracking-[0.2em] uppercase">Aeronautics</p></div></a>
        <div className="hidden md:flex items-center gap-5 lg:gap-7"><a href="#top" className="nav-link">{t('nav_about')}</a><a href="#programs" className="nav-link">{t('nav_training')}</a><a href="#careers" className="nav-link">{t('nav_careers')}</a><a href="#contact" className="nav-link">{t('nav_contact')}</a></div>
        <div className="hidden md:flex items-center gap-3"><a href="#contact" className="btn-primary text-xs font-bold px-5 py-2.5 inline-flex items-center gap-1.5">{t('nav_enroll')} <ArrowRight size={13} /></a></div>
        <div className="md:hidden flex items-center gap-2"><button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg text-[#7ab8f7] hover:bg-[rgba(36,114,232,0.1)] transition-colors" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button></div>
      </div>
      <div className={`mobile-menu md:hidden transition-all duration-300 ease-out ${menuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-6 py-4 flex flex-col gap-1">{[{ label: 'Home', href: '#top' }, { label: t('nav_about'), href: '#about' }, { label: t('nav_training'), href: '#programs' }, { label: t('nav_careers'), href: '#careers' }, { label: t('nav_contact'), href: '#contact' }].map(l => <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block py-3 px-3 rounded-lg text-sm font-semibold text-[rgba(180,210,255,0.8)] hover:text-[#7ab8f7] hover:bg-[rgba(36,114,232,0.08)] transition-all uppercase tracking-wider">{l.label}</a>)}</div>
      </div>
    </nav>
  );
}

function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer-bg relative z-10 py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-10">
          <div className="flex items-center gap-4"><img src="/logo-removebg-preview.png" alt="Stratosphere Aeronautics" className="w-12 h-12 object-contain" /><div><p className="text-base font-extrabold gradient-text-blue">Stratosphere Aeronautics</p><p className="text-xs font-semibold text-[rgba(122,184,247,0.55)] tracking-wider mt-0.5">{t('footer_school')}</p></div></div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">{[{ label: 'ICAO Compliant', icon: <Globe size={14} /> }, { label: 'ERNAM Certified', icon: <Award size={14} /> }, { label: 'Hargeisa, Somaliland', icon: <MapPin size={14} /> }, { label: 'Est. 2026', icon: <Star size={14} /> }].map((badge, i) => <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(36,114,232,0.15)] bg-[rgba(36,114,232,0.05)] text-xs font-semibold text-[#4a6080]"><span className="text-[#2472e8]">{badge.icon}</span>{badge.label}</div>)}</div>
        </div>
        <div className="section-divider mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left"><p className="text-xs font-medium text-[rgba(122,184,247,0.4)] italic tracking-wide">{t('footer_tagline')}</p><p className="text-[#2a3a50] text-xs font-medium">{t('footer_rights')}</p></div>
        <div className="mt-8 pt-6 border-t border-[rgba(36,114,232,0.06)] flex justify-center"><a href="https://fikrado2.github.io/fikrado/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1.5 group"><img src="/fikrado_sec_(1).png" alt="Fikrado Security" className="w-9 h-9 object-contain opacity-50 group-hover:opacity-80 transition-opacity duration-300" /><p className="text-xs font-semibold tracking-widest text-[#2a3a50] uppercase group-hover:text-[rgba(75,142,245,0.6)] transition-colors duration-300">Powered by <span className="text-[rgba(75,142,245,0.5)] group-hover:text-[rgba(75,142,245,0.8)]">FIKRADO SECURITY</span></p></a></div>
      </div>
    </footer>
  );
}

export default function Admissions() {
  const { t } = useLang();
  const steps = [
    { title: 'Submit Inquiry', desc: 'Fill out the enrollment form or contact us via WhatsApp. We will respond within 24 hours.' },
    { title: 'Consultation', desc: 'Schedule a free consultation to discuss your goals, schedule, and learning style.' },
    { title: 'Enrollment', desc: 'Complete registration and begin your personalized training program.' },
  ];
  const faqs = [
    { q: 'What are the entry requirements?', a: 'No prior aviation experience is required. Our programs are designed for beginners and aspiring professionals.' },
    { q: 'How long is the training?', a: 'Programs are flexible and self-paced, depending on your schedule and learning goals. Contact us for a personalized timeline.' },
    { q: 'Are the certificates recognized?', a: 'Yes. Our curriculum is aligned with ICAO standards and ERNAM frameworks, recognized internationally.' },
    { q: 'Do you offer private sessions?', a: 'Yes. All programs are available as private 1-on-1 or small-group sessions tailored to your pace.' },
  ];
  return (
    <>
      <Navbar />
      <PageHero label="Enrollment" title="Admissions" description="Begin your aviation journey with Stratosphere Aeronautics. Follow our simple enrollment process." breadcrumb="Admissions" />
      <section className="section-alt">
        <div className="max-w-5xl mx-auto px-4 py-24">
          <div className="text-center mb-16"><span className="label-badge mb-4 inline-block">How to Apply</span><h2 className="text-3xl md:text-4xl font-extrabold gradient-text-light mb-5 mt-3">Enrollment Process</h2></div>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {steps.map((s, i) => (
              <div key={i} className="card-modern p-8 text-center relative">
                <div className="w-10 h-10 rounded-full bg-[rgba(36,114,232,0.15)] border border-[rgba(75,142,245,0.3)] text-[#7ab8f7] font-extrabold text-sm flex items-center justify-center mx-auto mb-5">{i + 1}</div>
                <h3 className="text-base font-bold text-[#dceeff] mb-3">{s.title}</h3>
                <p className="text-[#94aed4] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="card-modern p-8 md:p-10">
            <h3 className="text-xl font-extrabold gradient-text-blue mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4"><div className="icon-box w-10 h-10 icon-box-blue shrink-0"><MapPin size={17} /></div><div><p className="text-xs font-bold text-[#4b8ef5] uppercase tracking-wider mb-1">{t('contact_address')}</p><p className="text-[#94aed4] text-sm">Bahsane Building, 2nd Floor, Room 213, Western Entrance, Opposite Ex. National Cinema, {t('contact_address_val')}</p></div></div>
              <div className="flex items-start gap-4"><div className="icon-box w-10 h-10 icon-box-green shrink-0"><Phone size={17} /></div><div><p className="text-xs font-bold text-[#4ade80] uppercase tracking-wider mb-1">{t('contact_mobile')}</p><a href="tel:+252****2830" className="text-[#7ab8f7] text-sm">+252 63 4482830</a><a href="tel:+252****7512" className="text-[#7ab8f7] text-sm ml-3">+252 63 3347512</a></div></div>
              <div className="flex items-start gap-4"><div className="icon-box w-10 h-10 icon-box-purple shrink-0"><Mail size={17} /></div><div><p className="text-xs font-bold text-[#a78bfa] uppercase tracking-wider mb-1">{t('contact_email')}</p><a href="mailto:info@stratosphereaeronautics.com" className="text-[#7ab8f7] text-sm">info@stratosphereaeronautics.com</a></div></div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-base">
        <div className="max-w-4xl mx-auto px-4 py-24">
          <div className="text-center mb-12"><span className="label-badge mb-4 inline-block">FAQ</span><h2 className="text-3xl md:text-4xl font-extrabold gradient-text-light mb-5 mt-3">Frequently Asked Questions</h2></div>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="card-modern p-6 cursor-pointer group">
                <summary className="flex items-center justify-between text-sm font-bold text-[#dceeff] list-none">{f.q}<ChevronRight size={18} className="text-[#4b8ef5] transition-transform duration-300 group-open:rotate-90" /></summary>
                <p className="text-[#94aed4] text-sm leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export function AdmissionsWithLang() {
  const [lang, setLangState] = useState<Lang>('en');
  const setLang = (l: Lang) => { setLangState(l); document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'; document.documentElement.lang = l; };
  useEffect(() => { const b = navigator.language.toLowerCase(); if (b.startsWith('so')) setLang('so'); else if (b.startsWith('ar')) setLang('ar'); else setLang('en'); }, []);
  const t = (k: keyof typeof translations['en']) => translations[lang][k] ?? translations.en[k];
  return <LangContext.Provider value={{ lang, t, setLang }}><div className="relative min-h-screen" style={{ background: '#040b1a' }}><div className="ambient-bg" /><div className="grid-overlay" /><Admissions /></div></LangContext.Provider>;
}
