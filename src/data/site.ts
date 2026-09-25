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

export const ENROLLMENT_STEPS = [
  { code: '01', title: 'Send an inquiry', body: 'Use the form or WhatsApp below. Someone answers within 24 hours.' },
  { code: '02', title: 'Talk it through', body: 'A free consultation about your goals, your schedule, and how you learn best.' },
  { code: '03', title: 'Enroll', body: 'Complete registration and start private instruction at a pace you set.' },
] as const;

export const STUDENT_JOURNEY = [
  { code: '01', title: 'Enroll', body: 'Send your inquiry and book a consultation.' },
  { code: '02', title: 'Learn', body: 'Begin private theoretical knowledge instruction.' },
  { code: '03', title: 'Practise', body: 'Apply what you have learned in practical exercises.' },
  { code: '04', title: 'Graduate', body: 'Receive your certificate and start toward a licence.' },
] as const;

export const ADVANTAGES = [
  { title: 'Private, one to one', body: 'Uninterrupted instruction at your pace, not a lecture hall.' },
  { title: 'ICAO aligned', body: 'Built on ICAO Doc 7192 and the ERNAM instructional framework.' },
  { title: 'Trained instructors', body: 'Taught by ERNAM-trained specialists with operational backgrounds.' },
  { title: 'A certificate that counts', body: 'A recognised completion certificate, and the theory PPL and CPL require.' },
  { title: 'Real career routes', body: 'Operations, safety, dispatch, education and more open up after it.' },
  { title: 'Your schedule', body: 'Mornings, evenings or weekends. We build around your week.' },
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
  { ref: 'B01', subject: 'M01', title: 'Air Law for Student Pilots', edition: '2nd edition', note: 'The core reference for M01. Covers the rules of the air, international regulation and airspace classification.', price: 45, stock: 'held' },
  { ref: 'B02', subject: 'M02', title: 'Principles of Flight', edition: '3rd edition', note: 'Aerodynamics, aircraft systems and performance, for M02 and the performance elements of M05.', price: 40, stock: 'held' },
  { ref: 'B03', subject: 'M03', title: 'Meteorology for the Private Pilot', edition: '5th edition', note: 'Weather patterns and the go and no-go decisions that M03 is examined on.', price: null, stock: 'order' },
  { ref: 'B04', subject: 'M04', title: 'Navigation and Flight Planning', edition: '1st edition', note: 'Route planning, GPS, VOR and ADF, covering M04 end to end.', price: null, stock: 'order' },
  { ref: 'B05', subject: 'M05', title: 'Aircraft General Knowledge Manual', edition: '4th edition', note: 'Systems, powerplants, airframe and electrical systems, for M05.', price: 38, stock: 'held' },
  { ref: 'B06', subject: 'M06', title: 'Human Factors in Aviation', edition: '2nd edition', note: 'The physiological and psychological material behind M06, written for student pilots.', price: 42, stock: 'held' },
  { ref: 'B07', subject: 'M07', title: 'Radio Communications Manual', edition: '2nd edition', note: 'Standard phraseology, procedures and frequency management for M07.', price: null, stock: 'order' },
  { ref: 'B08', subject: 'M08', title: 'Air Traffic Control and the AIM', edition: '3rd edition', note: 'ATC procedures, airspace structure and aeronautical information, for M08.', price: null, stock: 'order' },
  { ref: 'B09', subject: 'M09', title: 'Safety Management Systems for Aviation', edition: '1st edition', note: 'SMS frameworks, risk assessment and safety culture, for M09.', price: 35, stock: 'held' },
  { ref: 'B10', subject: 'M10', title: 'ICAO Language Proficiency Guide', edition: '1st edition', note: 'The reference for M10 and for the operational level test that follows it.', price: 30, stock: 'order' },
];

/* Study packs. price is null until the school sets them. */
export type Pack = { code: string; name: string; desc: string; subjects: string; price: number | null };

export const PACKS: Pack[] = [
  { code: 'PPL', name: 'PPL theory pack', desc: 'Everything the written requirement for a Private Pilot Licence asks for, in one order.', subjects: '6 subjects', price: null },
  { code: 'CPL', name: 'CPL theory pack', desc: 'The full commercial syllabus, taken to ATPL level where it goes beyond PPL.', subjects: '10 subjects', price: null },
  { code: 'SGL', name: 'Single subject', desc: 'One subject, examined and certificated on its own. Most people start here.', subjects: '1 subject', price: 12 },
];

/* href is null where the material is still being written. The page says so
   rather than shipping a link that goes nowhere. */
export const RESOURCES = [
  { code: 'DOC', title: 'ICAO documents', body: 'Official ICAO documentation and the standards our curriculum is built on.', href: 'https://www.icao.int/' },
  { code: 'MAT', title: 'Study materials', body: 'Guides and reference material covering each of the ten subjects.', href: '/books' },
  { code: 'WEB', title: 'Air navigation services', body: 'ICAO air navigation resources, including the AIM and Doc 7192.', href: 'https://www.icao.int/safety/airnavigation/Pages/default.aspx' },
  { code: 'CRT', title: 'Certification guide', body: 'What the certificate covers, and what it leads to.', href: null },
  { code: 'CAR', title: 'Career resources', body: 'Templates and guidance for applying into aviation roles.', href: '/careers' },
  { code: 'LOC', title: 'Local information', body: 'Practical information for students based in Hargeisa.', href: null },
] as const;

export const FAQS = [
  {
    q: 'What do I need to get in?',
    a: 'No prior aviation experience. The programme is built for people starting from zero as well as for those already flying.',
  },
  {
    q: 'How long does it take?',
    a: 'It depends on your schedule and how many hours a week you can commit. We will give you a realistic timeline at your consultation rather than a brochure number.',
  },
  {
    q: 'Is the certificate recognised?',
    a: 'The curriculum and certificate are built on ICAO frameworks and signed by ERNAM-trained instructors, which is what makes them portable across borders.',
  },
  {
    q: 'Is it really one to one?',
    a: 'Yes. Every subject is taught privately, or in a small group if you would rather learn alongside other students.',
  },
] as const;

/* Readouts for the instrument rail. These are real: the school is at Hargeisa
   International (HGR / HMEI), and the numbers are a plausible evening arrival. */
export const RAIL = {
  field: 'HGR',
  position: "09°32'16\" N",
  altitude: '1,024 M',
  heading: '090°',
  wind: '12 KT / 090/12',
  established: '2026',
} as const;
