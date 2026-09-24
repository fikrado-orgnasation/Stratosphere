import { useState, useEffect, createContext, useContext } from 'react';
import { ArrowRight, Phone, Mail, MapPin, CheckCircle, Globe, Award, Star, Menu, X } from 'lucide-react';
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
        <div className="hidden md:flex items-center gap-5 lg:gap-7"><a href="/about" className="nav-link">{t('nav_about')}</a><a href="/training" className="nav-link">{t('nav_training')}</a><a href="/careers" className="nav-link">{t('nav_careers')}</a><a href="#contact" className="nav-link active">{t('nav_contact')}</a></div>
        <div className="hidden md:flex items-center gap-3"><a href="#contact" className="btn-primary text-xs font-bold px-5 py-2.5 inline-flex items-center gap-1.5">{t('nav_enroll')} <ArrowRight size={13} /></a></div>
        <div className="md:hidden flex items-center gap-2"><button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-lg text-[#7ab8f7] hover:bg-[rgba(36,114,232,0.1)] transition-colors" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button></div>
      </div>
      <div className={`mobile-menu md:hidden transition-all duration-300 ease-out ${menuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-6 py-4 flex flex-col gap-1">{[{ label: 'Home', href: '/' }, { label: t('nav_about'), href: '/about' }, { label: t('nav_training'), href: '/training' }, { label: t('nav_careers'), href: '/careers' }, { label: t('nav_contact'), href: '#contact' }].map(l => <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} className="block py-3 px-3 rounded-lg text-sm font-semibold text-[rgba(180,210,255,0.8)] hover:text-[#7ab8f7] transition-all uppercase tracking-wider">{l.label}</a>)}</div>
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
      </div>
    </footer>
  );
}

export default function Contact() {
  const { t } = useLang();
  const accKeys = ['acc1', 'acc2', 'acc3', 'acc4'] as const;
  return (
    <>
      <Navbar />
      <PageHero label={t('contact_label')} title={t('contact_title')} description={t('contact_subtitle')} breadcrumb={t('nav_contact')} />
      <section className="section-alt">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="card-modern p-8">
                <h3 className="text-base font-bold gradient-text-blue mb-6">{t('contact_info')}</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="icon-box w-11 h-11 icon-box-blue shrink-0 mt-0.5"><MapPin size={17} /></div>
                    <div><p className="text-xs font-bold text-[#4b8ef5] uppercase tracking-wider mb-1">{t('contact_address')}</p><p className="text-[#94aed4] text-sm leading-relaxed">Bahsane Building, 2nd Floor, Room 213<br />Western Entrance (Facing West)<br />Opposite Ex. National Cinema<br /><span className="text-[#7ab8f7] font-semibold">{t('contact_address_val')}</span></p></div>
                  </div>
                  <div className="section-divider" />
                  <div className="flex items-start gap-4">
                    <div className="icon-box w-11 h-11 icon-box-green shrink-0 mt-0.5"><Phone size={17} /></div>
                    <div><p className="text-xs font-bold text-[#4ade80] uppercase tracking-wider mb-2">{t('contact_mobile')}</p><a href="tel:+252****2830" className="block text-[#7ab8f7] hover:text-[#a8d4fb] text-sm mb-1 transition-colors font-medium">+252 63 4482830</a><a href="tel:+252****2830" className="block text-[#7ab8f7] hover:text-[#a8d4fb] text-sm mb-1 transition-colors font-medium">+252 65 4482830</a><a href="tel:+252****7512" className="block text-[#7ab8f7] hover:text-[#a8d4fb] text-sm transition-colors font-medium">+252 63 3347512</a></div>
                  </div>
                  <div className="section-divider" />
                  <div className="flex items-start gap-4">
                    <div className="icon-box w-11 h-11 icon-box-purple shrink-0 mt-0.5"><Mail size={17} /></div>
                    <div><p className="text-xs font-bold text-[#a78bfa] uppercase tracking-wider mb-2">{t('contact_email')}</p><a href="mailto:info@stratosphereaeronautics.com" className="block text-[#7ab8f7] hover:text-[#a8d4fb] text-sm transition-colors break-all font-medium">info@stratosphereaeronautics.com</a><a href="mailto:abdirahman.dahir@stratosphereaeronautics.com" className="block text-[#7ab8f7] hover:text-[#a8d4fb] text-sm transition-colors break-all font-medium mt-1">abdirahman.dahir@stratosphereaeronautics.com</a></div>
                  </div>
                </div>
              </div>
              <div className="card-modern p-6">
                <p className="text-xs font-bold tracking-[0.25em] text-[#4b8ef5] uppercase mb-4">{t('contact_accreditation')}</p>
                <div className="space-y-2.5">{accKeys.map((key, i) => <div key={i} className="flex items-center gap-3"><CheckCircle size={15} className="text-[#4b8ef5] shrink-0" /><span className="text-[#94aed4] text-sm font-medium">{t(key)}</span></div>)}</div>
              </div>
            </div>
            <div className="card-modern p-10 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#ffffff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </div>
              <h3 className="text-xl font-extrabold gradient-text-blue mb-3">{t('contact_whatsapp_title')}</h3>
              <p className="text-[#94aed4] text-sm leading-relaxed mb-8 max-w-sm">{t('contact_whatsapp_desc')}</p>
              <a href="https://wa.me/252634482830" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl text-sm font-bold tracking-wider inline-flex items-center gap-3 transition-all duration-300 hover:scale-105" style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)', color: '#ffffff', boxShadow: '0 4px 20px rgba(37,211,102,0.35)' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                +252 63 4482830
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export function ContactWithLang() {
  const [lang, setLangState] = useState<Lang>('en');
  const setLang = (l: Lang) => { setLangState(l); document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr'; document.documentElement.lang = l; };
  useEffect(() => { const b = navigator.language.toLowerCase(); if (b.startsWith('so')) setLang('so'); else if (b.startsWith('ar')) setLang('ar'); else setLang('en'); }, []);
  const t = (k: keyof typeof translations['en']) => translations[lang][k] ?? translations.en[k];
  return <LangContext.Provider value={{ lang, t, setLang }}><div className="relative min-h-screen" style={{ background: '#040b1a' }}><div className="ambient-bg" /><div className="grid-overlay" /><Contact /></div></LangContext.Provider>;
}
