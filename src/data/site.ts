/* Single source of truth for every fact the site states about the school.
   Previously these were hand-copied into 8 different page files, which is how
   the phone list, the email list and the postal address drifted apart. */

export const CONTACT = {
  lines: [
    'Bahsane Building, 2nd Floor, Room 213',
    'Western entrance, facing west',
    'Opposite the former National Cinema',
  ],
  city: 'Hargeisa, Somaliland',
  phones: [
    { display: '+252 63 4482830', href: 'tel:+252634482830' },
    { display: '+252 65 4482830', href: 'tel:+252654482830' },
    { display: '+252 63 3347512', href: 'tel:+252633347512' },
  ],
  emails: [
    'info@stratosphereaeronautics.com',
    'abdirahman.dahir@stratosphereaeronautics.com',
  ],
  whatsapp: 'https://wa.me/252634482830',
} as const;

export const ACCREDITATION = [
  'ICAO — International Civil Aviation Organization',
  'ERNAM — Regional School of Air Navigation and Management',
  'ASECNA — Agency for Aerial Navigation Safety',
  'ICAO WACAF regional office partner',
] as const;

/* The ten theoretical knowledge subjects. Codes are ours, not ICAO's —
   they read as subject numbers on a training record, the way they would on
   a real school roster. */
export const SUBJECTS = [
  { code: 'M01', title: 'Air Law', topics: ['Rules of the air', 'International regulations', 'Operational procedures', 'Airspace classification'] },
  { code: 'M02', title: 'Principles of Flight', topics: ['Aerodynamics', 'Aircraft systems', 'Performance', 'The physics of flight'] },
  { code: 'M03', title: 'Meteorology', topics: ['Weather patterns', 'Atmospheric science', 'Go and no-go decisions', 'METAR and TAF interpretation'] },
  { code: 'M04', title: 'Navigation and Flight Planning', topics: ['Precision navigation', 'Route planning', 'GPS systems', 'VOR and ADF'] },
  { code: 'M05', title: 'Aircraft General Knowledge', topics: ['Aircraft systems', 'Powerplants', 'Airframe components', 'Electrical systems'] },
  { code: 'M06', title: 'Human Performance', topics: ['Physiological factors', 'Psychological factors', 'Decision-making', 'Human error'] },
  { code: 'M07', title: 'Radio Communications', topics: ['Standard phraseology', 'Communication procedures', 'Frequency management', 'Emergency communications'] },
  { code: 'M08', title: 'Air Traffic Control and AIM', topics: ['ATC procedures', 'Airspace structure', 'Aeronautical information', 'Flight plans'] },
  { code: 'M09', title: 'Safety Management Systems', topics: ['SMS frameworks', 'Risk assessment', 'Hazard identification', 'Safety culture'] },
  { code: 'M10', title: 'Language Proficiency', topics: ['ICAO requirements', 'Operational level testing', 'Proficiency', 'Examination preparation'] },
] as const;

export const FLEET = [
  { type: 'Cessna 172', role: 'Primary trainer', tail: 'N428' },
  { type: 'Diamond DA40', role: 'Primary trainer', tail: 'N540' },
  { type: 'Cessna 182', role: 'Cross-country', tail: 'N182' },
] as const;

export const CAREERS = [
  {
    code: 'OPS',
    title: 'Flight dispatch and operations',
    roles: ['Flight dispatcher', 'Flight operations officer', 'Flight follower'],
  },
  {
    code: 'GND',
    title: 'Logistics and ground handling',
    roles: ['Loadmaster and weight and balance officer', 'Aviation logistics coordinator', 'Ramp operations supervisor'],
  },
  {
    code: 'SAF',
    title: 'Safety and regulatory compliance',
    roles: ['Safety assistant (SMS)', 'Compliance coordinator'],
  },
  {
    code: 'TEC',
    title: 'Technical and administrative support',
    roles: ['Technical records specialist', 'Meteorological assistant', 'Crew scheduler'],
  },
  {
    code: 'EDU',
    title: 'Education and further training',
    roles: ['Ground instructor', 'Theoretical knowledge examiner'],
  },
] as const;

export const STUDENT_JOURNEY = [
  { code: '01', title: 'Enroll', body: 'Send your inquiry and book a consultation.' },
  { code: '02', title: 'Learn', body: 'Begin private theoretical knowledge instruction.' },
  { code: '03', title: 'Practise', body: 'Apply what you have learned in practical exercises.' },
  { code: '04', title: 'Graduate', body: 'Receive your certificate and start toward a licence.' },
] as const;

/* ── books ───────────────────────────────────────────────────────────────── */
/* The school's own titles, one per subject.

   READ THIS BEFORE PUBLISHING: every field below is a PLACEHOLDER. The
   titles, editions and prices are illustrative so the page can be laid out
   and reviewed — they are not a real stock list, and the price is the only
   field the school must fill in for a line to go on sale. `stock` is already
   set per the school's own stock list; `price: null` means "not yet priced"
   and the page says so rather than showing a number.

   `isbn` is null everywhere, so the books page currently states plainly that
   it is not yet a catalogue of confirmed titles. Replace `title` and
   `edition` with the real ones, add the ISBN, and the copy updates itself. */
export type Book = {
  ref: string;
  subject: string;
  title: string;
  edition: string;
  note: string;
  price: number | null;
  stock: 'held' | 'order';
};

export const BOOKS: Book[] = [
  { ref: 'B01', subject: 'M01', title: 'Air Law for Aviation Students', edition: '2nd edition', note: 'The core reference for M01. Covers the rules of the air, international regulation and airspace classification.', price: 45, stock: 'held' },
  { ref: 'B02', subject: 'M02', title: 'Principles of Flight', edition: '3rd edition', note: 'Aerodynamics, aircraft systems and performance, for M02 and the performance elements of M05.', price: 40, stock: 'held' },
  { ref: 'B03', subject: 'M03', title: 'Meteorology for Aviation', edition: '5th edition', note: 'Weather patterns and the go and no-go decisions that M03 is examined on.', price: null, stock: 'order' },
  { ref: 'B04', subject: 'M04', title: 'Navigation and Flight Planning', edition: '1st edition', note: 'Route planning, GPS, VOR and ADF, covering M04 end to end.', price: null, stock: 'order' },
  { ref: 'B05', subject: 'M05', title: 'Aircraft General Knowledge Manual', edition: '4th edition', note: 'Systems, powerplants, airframe and electrical systems, for M05.', price: 38, stock: 'held' },
  { ref: 'B06', subject: 'M06', title: 'Human Factors in Aviation', edition: '2nd edition', note: 'The physiological and psychological material behind M06, written for aviation students.', price: 42, stock: 'held' },
  { ref: 'B07', subject: 'M07', title: 'Radio Communications Manual', edition: '2nd edition', note: 'Standard phraseology, procedures and frequency management for M07.', price: null, stock: 'order' },
  { ref: 'B08', subject: 'M08', title: 'Air Traffic Control and the AIM', edition: '3rd edition', note: 'ATC procedures, airspace structure and aeronautical information, for M08.', price: null, stock: 'order' },
  { ref: 'B09', subject: 'M09', title: 'Safety Management Systems for Aviation', edition: '1st edition', note: 'SMS frameworks, risk assessment and safety culture, for M09.', price: 35, stock: 'held' },
  { ref: 'B10', subject: 'M10', title: 'ICAO Language Proficiency Guide', edition: '1st edition', note: 'The reference for M10 and for the operational level test that follows it.', price: 30, stock: 'order' },
];

/* Study packs. price is null until the school sets them. */
export type Pack = { code: string; name: string; desc: string; subjects: string; price: number | null };

export const PACKS: Pack[] = [
  { code: 'PPL', name: 'PPL theory pack', desc: 'Everything the written requirement for a Private Licence asks for, in one order.', subjects: '6 subjects', price: null },
  { code: 'CPL', name: 'CPL theory pack', desc: 'The full commercial syllabus, taken to ATPL level where it goes beyond PPL.', subjects: '10 subjects', price: null },
  { code: 'SGL', name: 'Single subject', desc: 'One subject, examined and certificated on its own. Most people start here.', subjects: '1 subject', price: 12 },
];

export const SUBJECT_PHOTOS: Record<string, string> = {
  M01: '/images/aviation/m01.jpg',
  M02: '/images/aviation/m02.jpg',
  M03: '/images/aviation/m03.jpg',
  M04: '/images/aviation/m04.jpg',
  M05: '/images/aviation/m05.jpg',
  M06: '/images/aviation/m06.jpg',
  M07: '/images/aviation/m07.jpg',
  M08: '/images/aviation/m08.jpg',
  M09: '/images/aviation/m09.jpg',
  M10: '/images/aviation/m10.jpg',
};

export const FLEET_PHOTOS = [
  '/images/aviation/fleet_0.jpg',
  '/images/aviation/fleet_1.jpg',
  '/images/aviation/fleet_2.jpg',
];

