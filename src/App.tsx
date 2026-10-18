import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Books from './pages/Books';
import About from './pages/About';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Community from './pages/Community';

const SITE = 'Stratosphere Aeronautics';
const DESC =
  'Stratosphere Aeronautics Theoretical Knowledge Instruction — aviation ground school in Hargeisa, Somaliland. Ten ICAO-aligned subjects taught one to one by ERNAM-trained instructors.';
const OG_IMAGE = '/somali_teacher_hero.jpg';

const TITLES: Record<string, string> = {
  '/': `${SITE} Theoretical Knowledge Instruction`,
  '/register': `Register for a subject | ${SITE}`,
  '/books': `Books and study packs | ${SITE}`,
  '/about': `About the school | ${SITE}`,
  '/community': `Facebook Community | ${SITE}`,
  '/careers': `Career pathways | ${SITE}`,
  '/contact': `Contact | ${SITE}`,
};

function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const canonical = pathname === '/admissions' ? '/register' : pathname;

    const title = TITLES[canonical] ?? `${SITE} Theoretical Knowledge Instruction`;

    document.title = title;

    const set = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    set('name', 'description', DESC);
    set('property', 'og:title', title);
    set('property', 'og:description', DESC);
    set('property', 'og:image', OG_IMAGE);
    set('name', 'twitter:title', title);
    set('name', 'twitter:description', DESC);
    set('name', 'twitter:image', OG_IMAGE);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <Seo />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<Books />} />
        <Route path="/about" element={<About />} />

        <Route path="/training" element={<Navigate to="/register" replace />} />
        <Route path="/training/:id" element={<Navigate to="/register" replace />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/community" element={<Community />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/admissions" element={<Navigate to="/register" replace />} />
        <Route path="/resources" element={<Navigate to="/books" replace />} />
        <Route path="/student-life" element={<Navigate to="/" replace />} />

        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
