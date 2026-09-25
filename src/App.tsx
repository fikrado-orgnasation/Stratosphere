import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Training from './pages/Training';
import ProgramDetails from './pages/ProgramDetails';
import Careers from './pages/Careers';
import Admissions from './pages/Admissions';
import StudentLife from './pages/StudentLife';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import { SUBJECTS } from './data/site';

const SITE = 'Stratosphere Aeronautics';
const DESC =
  'Theoretical knowledge instruction in Hargeisa. Ten ICAO-aligned subjects taught one to one by ERNAM-trained instructors. PPL and CPL written prerequisite.';

function TitleUpdater() {
  const { pathname } = useLocation();

  useEffect(() => {
    const detail = pathname.match(/^\/training\/(\d+)$/);
    const subject = detail ? SUBJECTS[Number(detail[1]) - 1] : undefined;

    const title = subject
      ? `${subject.title} — Syllabus | ${SITE}`
      : {
          '/': `${SITE} — Theoretical Knowledge Instruction, Hargeisa`,
          '/about': `About | ${SITE}`,
          '/training': `Syllabus — ten ICAO subjects | ${SITE}`,
          '/careers': `Careers | ${SITE}`,
          '/admissions': `Admissions and enquiry form | ${SITE}`,
          '/student-life': `Student life | ${SITE}`,
          '/resources': `Resources | ${SITE}`,
          '/contact': `Contact | ${SITE}`,
        }[pathname] ?? SITE;

    document.title = title;

    /* The old build set og:title by hand and let the description go stale
       on every route. Both come from one place now. */
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
      <TitleUpdater />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/training" element={<Training />} />
        <Route path="/training/:id" element={<ProgramDetails />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/student-life" element={<StudentLife />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
