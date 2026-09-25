import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Books from './pages/Books';
import About from './pages/About';
import Training from './pages/Training';
import ProgramDetails from './pages/ProgramDetails';
import Careers from './pages/Careers';
import StudentLife from './pages/StudentLife';
import Contact from './pages/Contact';
import { SUBJECTS } from './data/site';

const SITE = 'Stratosphere Aeronautics';
const DESC =
  'Theoretical knowledge instruction in Hargeisa. Ten ICAO-aligned subjects taught one to one by ERNAM-trained instructors. PPL and CPL written prerequisite.';

/* Four main pages. Everything else still exists and is still reachable, it
   has just moved out of the masthead. */
const TITLES: Record<string, string> = {
  '/': `${SITE} — Theoretical Knowledge Instruction, Hargeisa`,
  '/register': `Register for a subject | ${SITE}`,
  '/books': `Books and study packs | ${SITE}`,
  '/about': `About the school | ${SITE}`,
  '/training': `Full syllabus — ten ICAO subjects | ${SITE}`,
  '/careers': `Career pathways | ${SITE}`,
  '/student-life': `Student life | ${SITE}`,
  '/resources': `Resources | ${SITE}`,
  '/contact': `Contact | ${SITE}`,
};

function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    /* /admissions is now /register, but the address was on the web before
       the rename, so it keeps working and does not compete with /register. */
    const canonical = pathname === '/admissions' ? '/register' : pathname;

    const detail = canonical.match(/^\/training\/(\d+)$/);
    const subject = detail ? SUBJECTS[Number(detail[1]) - 1] : undefined;
    const title = subject ? `${subject.title} — Syllabus | ${SITE}` : TITLES[canonical] ?? SITE;

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
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <Seo />
      <Routes>
        {/* the four */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<Books />} />
        <Route path="/about" element={<About />} />

        {/* still built, reachable from the footer and from Home */}
        <Route path="/training" element={<Training />} />
        <Route path="/training/:id" element={<ProgramDetails />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/student-life" element={<StudentLife />} />
        <Route path="/contact" element={<Contact />} />

        {/* retired in favour of a main page, without breaking old links */}
        <Route path="/admissions" element={<Navigate to="/register" replace />} />
        <Route path="/resources" element={<Navigate to="/books" replace />} />

        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
