import { createContext, useContext } from 'react';

export type Lang = 'en' | 'so';

export const STRINGS = {
  en: {
    nav: {
      home: 'Home',
      training: 'Courses & Syllabus',
      enroll: 'Enroll',
      books: 'Books',
      careers: 'Careers',
      about: 'About Us',
      contact: 'Contact',
    },
    enrollNow: 'Enroll Now',
    menu: 'Menu',
    whatsappAdmissions: 'WhatsApp Admissions',
    enrollCourses: 'Enroll in Courses',
    admissionsOpen: 'Admissions Open for 2026–2027 Ground School',
    hargeisa: 'Hargeisa, Somaliland',
    poweredBy: 'Powered by Fikrado Security',
    rights: 'Precision in theory. Excellence in flight.',
    courses: 'Courses',
    schoolLife: 'School Life',
    admissionsDesk: 'Admissions Desk',
    aviationCareerRoutes: 'Aviation Career Routes',
    aboutInstructors: 'About Instructors',
    enrollmentGuide: 'Enrollment Guide',
    campusMap: 'Campus Map & Directions',
    allSubjects: 'All 10 ICAO Subjects',
    textbooks: 'Textbooks & Manuals',
  },
  so: {
    nav: {
      home: 'Bogga Hore',
      training: 'Koorsooyinka & Barsanaysiga',
      enroll: 'Isdiiwaangeli',
      books: 'Kutubta',
      careers: 'Shaqooyinka Diyaaradaha',
      about: 'Nagu Sahal',
      contact: 'La Xidhiidh',
    },
    enrollNow: 'Isdiiwaangeli Hadda',
    menu: 'Liiska',
    whatsappAdmissions: 'WhatsApp iska diwan gali',
    enrollCourses: 'Isdiwan gali hada',
    admissionsOpen: 'Diiwaangelinta laga furan yahay 2026–2027',
    hargeisa: 'Hargaysa, Soomaaliland',
    poweredBy: 'waxa dhisay website gan shirkada Fikrado Security',
    rights: 'Saxnidood waa aragti. Ficil gadood waa dayaxgalka.',
    courses: 'Koorsooyinka',
    schoolLife: 'Nolosha Dugsiga',
    admissionsDesk: 'Qabashada Aragti',
    aviationCareerRoutes: 'Jadwalka Shaqada Diyaaradaha',
    aboutInstructors: 'Barayaasha da',
    enrollmentGuide: 'Xalka la iska Diiwaangelinta',
    campusMap: 'Khariidada Kolejka & Saacadaha Martida',
    allSubjects: 'Dhammaan madooyinka',
    textbooks: 'Buugaggata',
  },
};

type Strings = typeof STRINGS['en'];

export const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Strings;
}>({
  lang: 'en',
  setLang: () => {},
  t: STRINGS.en as Strings,
});

export function useLang() {
  return useContext(LangContext);
}
