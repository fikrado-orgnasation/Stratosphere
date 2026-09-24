import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { HomeWithLang } from './pages/Home';
import { AboutWithLang } from './pages/About';
import { TrainingWithLang } from './pages/Training';
import { CareersWithLang } from './pages/Careers';
import { AdmissionsWithLang } from './pages/Admissions';
import { StudentLifeWithLang } from './pages/StudentLife';
import { ResourcesWithLang } from './pages/Resources';
import { ContactWithLang } from './pages/Contact';
import { ProgramDetailsWithLang } from './pages/ProgramDetails';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function TitleUpdater() {
  const { pathname } = useLocation();
  useEffect(() => {
    const titles: Record<string, string> = {
      '/': "Stratosphere Aeronautics — Somaliland's No. 1 Aviation School",
      '/about': 'About Us — Stratosphere Aeronautics',
      '/training': 'Training Programs — Stratosphere Aeronautics',
      '/careers': 'Career Pathways — Stratosphere Aeronautics',
      '/admissions': 'Admissions — Stratosphere Aeronautics',
      '/student-life': 'Student Life — Stratosphere Aeronautics',
      '/resources': 'Resources — Stratosphere Aeronautics',
      '/contact': 'Contact — Stratosphere Aeronautics',
    };
    document.title = titles[pathname] || 'Stratosphere Aeronautics';
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <TitleUpdater />
      <Routes>
        <Route path="/" element={<HomeWithLang />} />
        <Route path="/about" element={<AboutWithLang />} />
        <Route path="/training" element={<TrainingWithLang />} />
        <Route path="/training/:id" element={<ProgramDetailsWithLang />} />
        <Route path="/careers" element={<CareersWithLang />} />
        <Route path="/admissions" element={<AdmissionsWithLang />} />
        <Route path="/student-life" element={<StudentLifeWithLang />} />
        <Route path="/resources" element={<ResourcesWithLang />} />
        <Route path="/contact" element={<ContactWithLang />} />
        <Route path="*" element={<HomeWithLang />} />
      </Routes>
    </>
  );
}
