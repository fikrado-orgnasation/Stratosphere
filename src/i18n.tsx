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
    admissionsOpen: 'Diiwaangelinta waa la bilabay galasyada 2026–2027',
    hargeisa: 'Hargaysa, Soomaaliland',
    poweredBy: 'waxa dhisay website gan shirkada Fikrado Security',
    rights: 'Khaliya mahan barasho ee waa xirfada lagu duulo hawada',
    courses: 'Koorsooyinka',
    schoolLife: 'Ardayda Waxa la baraya',
    admissionsDesk: 'xalkan iska diwan gali',
    aviationCareerRoutes: 'Jadwalka Shaqada Diyaaradaha',
    aboutInstructors: 'baro malinkaga ku dhigaya',
    enrollmentGuide: 'Xalka la iska Diiwaangelinta',
    campusMap: 'goobta iyo xalku iskulku ku yalo',
    allSubjects: 'Dhammaan madooyinka',
    textbooks: 'Buugaggata',
  },
};

type Strings = typeof STRINGS['so'];

export const LangContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Strings;
}>({
  lang: 'so',
  setLang: () => {},
  t: STRINGS.en as Strings,
});

export function useLang() {
  return useContext(LangContext);
}
