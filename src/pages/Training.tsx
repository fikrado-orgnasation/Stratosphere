import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Search, ChevronDown, Clock, Award, Globe, BookOpen,
  Download, Layers, ShieldCheck, MessageCircle,
} from 'lucide-react';
import Shell, { Filings } from '../components/Shell';
import CinematicAtmosphere from '../components/CinematicAtmosphere';
import {
  CONTACT,
  COURSE_CATEGORIES,
  TRAINING_COURSES,
  type CourseCategory,
  type TrainingCourse,
} from '../data/site';

type LevelFilter = 'All Modules' | 'Entry Level' | 'Intermediate' | 'Advanced';

const LEVEL_TABS: LevelFilter[] = ['All Modules', 'Entry Level', 'Intermediate', 'Advanced'];

const CATEGORY_META: Record<CourseCategory, { icon: typeof Layers; desc: string }> = {
  'Flight & Ramp Operations': { icon: Layers, desc: 'Core curriculum topics covering dispatch, ramp handling, fuelling, cargo, and crew coordination.' },
  'Safety & Compliance': { icon: ShieldCheck, desc: 'Safety management systems, regulatory compliance, security operations, and audit competencies.' },
  'Air Traffic & Navigation': { icon: Globe, desc: 'Air traffic control, aeronautical information, meteorology, and flight data analysis.' },
  'Management & Quality': { icon: Award, desc: 'Station leadership, turnaround management, and quality assurance for aviation operations.' },
};

const TOTAL_WEEKS = TRAINING_COURSES.reduce((sum, c) => {
  const n = parseInt(c.duration);
  return sum + (isNaN(n) ? 0 : n);
}, 0);

function levelPillClass(level: TrainingCourse['level']): string {
  switch (level) {
    case 'Entry Level':   return 'mp-level-pill mp-level-pill--green';
    case 'Intermediate':  return 'mp-level-pill mp-level-pill--blue';
    case 'Advanced':      return 'mp-level-pill mp-level-pill--indigo';
    default:              return 'mp-level-pill';
  }
}

/* ── Accordion Section per Category ──────────────────────────────────────── */
function CurriculumTable({
  category,
  courses,
  search,
  levelFilter,
  isOpen,
  onToggle,
}: {
  category: CourseCategory;
  courses: TrainingCourse[];
  search: string;
  levelFilter: LevelFilter;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const meta = CATEGORY_META[category];
  const Icon = meta.icon;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return courses.filter((c) => {
      const matchesLevel = levelFilter === 'All Modules' || c.level === levelFilter;
      const matchesSearch =
        q === '' ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q);
      return matchesLevel && matchesSearch;
    });
  }, [courses, search, levelFilter]);

  return (
    <div className={`mp-table-card ${isOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        className="mp-table-card__header"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`mp-table-${category}`}
      >
        <div className="mp-table-card__header-left">
          <div className="mp-table-card__icon">
            <Icon size={22} />
          </div>
          <div>
            <h3 className="mp-table-card__title">{category} Curriculum</h3>
            <p className="mp-table-card__desc">{meta.desc}</p>
          </div>
        </div>
        <div className="mp-table-card__header-right">
          <span className="mp-table-card__count">
            {filtered.length} {filtered.length === 1 ? 'topic' : 'topics'}
          </span>
          <ChevronDown
            size={22}
            className={`mp-table-card__chevron ${isOpen ? 'is-flipped' : ''}`}
          />
        </div>
      </button>

      <div
        id={`mp-table-${category}`}
        className="mp-table-card__body"
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        {filtered.length > 0 ? (
          <div className="mp-table-scroll">
            <table className="mp-table">
              <thead>
                <tr>
                  <th>Module / Subject Area</th>
                  <th className="mp-table__col-level">Level</th>
                  <th className="mp-table__col-duration">Estimated Duration</th>
                  <th>Core Competencies &amp; Coverage</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((course, i) => (
                  <tr key={course.id} className={i % 2 === 1 ? 'mp-row-alt' : ''}>
                    <td data-label="Module">
                      <span className="mp-module-link">
                        {course.title}
                      </span>
                    </td>
                    <td data-label="Level">
                      <span className={levelPillClass(course.level)}>
                        {course.level}
                      </span>
                    </td>
                    <td data-label="Duration">
                      <span className="mp-duration-cell">
                        <Clock size={13} />
                        {course.duration}
                      </span>
                    </td>
                    <td data-label="Competencies">
                      <p className="mp-competency-text">{course.description}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mp-table-empty">
            <Search size={28} />
            <p>No curriculum topics match your search in this subject area.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────────────────────────── */
export default function Training() {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('All Modules');
  const [openSections, setOpenSections] = useState<Record<CourseCategory, boolean>>({
    'Flight & Ramp Operations': true,
    'Safety & Compliance': true,
    'Air Traffic & Navigation': true,
    'Management & Quality': true,
  });

  const coursesByCategory = useMemo(() => {
    const map = {} as Record<CourseCategory, TrainingCourse[]>;
    for (const cat of COURSE_CATEGORIES) {
      map[cat] = TRAINING_COURSES.filter((c) => c.category === cat);
    }
    return map;
  }, []);

  const totalFiltered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return TRAINING_COURSES.filter((c) => {
      const matchesLevel = levelFilter === 'All Modules' || c.level === levelFilter;
      const matchesSearch =
        q === '' ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q);
      return matchesLevel && matchesSearch;
    }).length;
  }, [search, levelFilter]);

  const toggleSection = (cat: CourseCategory) => {
    setOpenSections((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const expandAll = () => {
    setOpenSections({
      'Flight & Ramp Operations': true,
      'Safety & Compliance': true,
      'Air Traffic & Navigation': true,
      'Management & Quality': true,
    });
  };

  const collapseAll = () => {
    setOpenSections({
      'Flight & Ramp Operations': false,
      'Safety & Compliance': false,
      'Air Traffic & Navigation': false,
      'Management & Quality': false,
    });
  };

  return (
    <Shell>
      {/* ── Hero Section ────────────────────────────────────────────────────── */}
      <section className="mp-hero">
        <CinematicAtmosphere />
        <div className="shell">
          <div className="mp-hero__content">
            <span className="badge badge--white">
              <Award size={14} style={{ color: 'var(--gold-light)' }} />
              Master Aviation Training Program
            </span>

            <h1 className="mp-hero__title">
              Master Aviation Operations &amp; Technical Management Program
            </h1>

            <p className="mp-hero__subtitle">
              A single, comprehensive training program covering 34 core operational
              competencies across flight operations, safety management, navigation, and
              station leadership.
            </p>

            {/* Key Metrics */}
            <div className="mp-hero__metrics">
              <div className="mp-metric">
                <div className="mp-metric__icon"><Clock size={20} /></div>
                <div>
                  <span className="mp-metric__value">{TOTAL_WEEKS}+ Weeks</span>
                  <span className="mp-metric__label">Total Program Duration</span>
                </div>
              </div>
              <div className="mp-metric">
                <div className="mp-metric__icon"><Layers size={20} /></div>
                <div>
                  <span className="mp-metric__value">34 Modules</span>
                  <span className="mp-metric__label">Multi-Disciplinary Certification</span>
                </div>
              </div>
              <div className="mp-metric">
                <div className="mp-metric__icon"><Globe size={20} /></div>
                <div>
                  <span className="mp-metric__value">ICAO Aligned</span>
                  <span className="mp-metric__label">Global Standard Alignment</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mp-hero__actions">
              <Link to="/register" className="btn btn--primary btn--enroll-glow">
                Enroll in Program
                <ArrowRight size={17} />
              </Link>
              <button type="button" className="btn btn--outline-white" onClick={() => window.print()}>
                <Download size={16} />
                Download Syllabus PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      <Filings />

      {/* ── One Course Summary ──────────────────────────────────────────────── */}
      <section className="section mp-course-summary-section">
        <div className="shell">
          <div className="mp-course-summary">
            <div className="mp-course-summary__mark">
              <Layers size={26} />
            </div>
            <div className="mp-course-summary__content">
              <span className="mp-course-summary__eyebrow">One Course • 34 Topics • Four Subject Areas</span>
              <h2>One Master Aviation Training Course</h2>
              <p>
                You are enrolling in one complete course. The topics below are the internal curriculum
                coverage, not separate courses or separate enrollments.
              </p>
            </div>
            <Link to="/register" className="btn btn--primary btn--enroll-glow">
              Enroll in the One Course
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Search & Filter Controls ────────────────────────────────────────── */}
      <section className="section">
        <div className="shell">
          <div className="section-head">
            <span className="badge">Full Curriculum Breakdown</span>
            <h2 className="title-md">One Course Curriculum</h2>
            <p className="desc-md">
              This is one master course organized into four subject areas. Each table below
              shows the topics, levels, estimated durations, and competencies covered inside it.
            </p>
          </div>

          {/* Search bar */}
          <div className="mp-controls">
            <div className="training-search-bar mp-search-bar">
              <Search size={18} className="training-search-bar__icon" />
              <input
                type="text"
                className="training-search-bar__input"
                placeholder="Search topics by title or competency..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search curriculum topics"
              />
            </div>

            {/* Level filter tabs */}
            <div className="mp-level-tabs">
              {LEVEL_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`mp-level-tab ${levelFilter === tab ? 'is-active' : ''}`}
                  onClick={() => setLevelFilter(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Results + expand/collapse */}
          <div className="mp-results-bar">
            <span className="mp-results-count">
              {totalFiltered} of {TRAINING_COURSES.length} curriculum topics shown
            </span>
            <div className="mp-results-actions">
              <button type="button" className="mp-expand-btn" onClick={expandAll}>
                Expand All Subject Areas
              </button>
              <span className="mp-expand-divider" />
              <button type="button" className="mp-expand-btn" onClick={collapseAll}>
                Collapse All Subject Areas
              </button>
            </div>
          </div>

          {/* Curriculum Tables */}
          <div className="mp-tables-container">
            {COURSE_CATEGORIES.map((category) => (
              <CurriculumTable
                key={category}
                category={category}
                courses={coursesByCategory[category]}
                search={search}
                levelFilter={levelFilter}
                isOpen={openSections[category]}
                onToggle={() => toggleSection(category)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Program Highlights ──────────────────────────────────────────────── */}
      <section className="section section--subtle">
        <div className="shell">
          <div className="section-head">
            <span className="badge badge--gold">Program Highlights</span>
            <h2 className="title-md">Why Choose the Master Program</h2>
            <p className="desc-md">
              One enrollment gives you access to the full aviation operations curriculum. The 34 topics
              are delivered as one coordinated course at our Hargeisa campus.
            </p>
          </div>

          <div className="mp-highlights-grid">
            <div className="panel" style={{ padding: 26 }}>
              <div className="mp-highlight-icon">
                <BookOpen size={22} />
              </div>
              <h4>Complete Curriculum</h4>
              <p>All 34 curriculum topics are included in one course, from entry-level ramp operations through advanced station management.</p>
            </div>
            <div className="panel" style={{ padding: 26 }}>
              <div className="mp-highlight-icon">
                <ShieldCheck size={22} />
              </div>
              <h4>ICAO-Aligned Standards</h4>
              <p>Every topic follows ICAO-aligned standards and contributes to your complete aviation operations training.</p>
            </div>
            <div className="panel" style={{ padding: 26 }}>
              <div className="mp-highlight-icon">
                <Award size={22} />
              </div>
              <h4>Multi-Disciplinary Certification</h4>
              <p>The one master course builds a broad portfolio of operational competencies across four connected subject areas.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 40, display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn--primary btn--enroll-glow">
              Enroll in the One Master Course
              <ArrowRight size={16} />
            </Link>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn btn--whatsapp"
            >
              <MessageCircle size={18} />
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </Shell>
  );
}
