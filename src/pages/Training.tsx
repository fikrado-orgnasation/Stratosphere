import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Search, Clock, BarChart3, Check, Plus } from 'lucide-react';
import Shell, { Filings, PageHead } from '../components/Shell';
import TiltCard from '../components/TiltCard';
import { CONTACT, COURSE_CATEGORIES, TRAINING_COURSES, type CourseCategory } from '../data/site';

const LOGISTICS = [
  { title: 'Separate Assessment', body: 'Each program is examined and certificated individually. You progress on its own terms without having to repeat others.' },
  { title: '1-on-1 Instruction', body: 'Taught privately or in small cohorts of your choosing. Your questions are answered thoroughly.' },
  { title: 'Custom Pace', body: 'Morning, evening, or weekend sessions designed around your employment or operational commitments.' },
  { title: 'Career Pathway', body: 'From entry-level ramp roles to advanced management — build a sequential career in aviation operations.' },
];

const CATEGORY_COLORS: Record<CourseCategory, string> = {
  'Flight & Ramp Operations': 'category-badge--blue',
  'Safety & Compliance': 'category-badge--red',
  'Air Traffic & Navigation': 'category-badge--green',
  'Management & Quality': 'category-badge--gold',
};

const LEVEL_COLORS: Record<string, string> = {
  'Entry Level': 'level-tag--green',
  'Intermediate': 'level-tag--amber',
  'Advanced': 'level-tag--red',
};

export default function Training() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<CourseCategory | 'All'>('All');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return TRAINING_COURSES.filter((c) => {
      const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
      const matchesSearch =
        q === '' ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const chips: (CourseCategory | 'All')[] = ['All', ...COURSE_CATEGORIES];

  const toggleCourse = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const selectedCourses = selectedIds
    .map((id) => TRAINING_COURSES.find((c) => c.id === id))
    .filter(Boolean) as typeof TRAINING_COURSES;

  const enrollUrl = selectedIds.length > 0
    ? `/register?courses=${selectedIds.join(',')}`
    : '/register';

  return (
    <Shell>
      <PageHead
        kicker="Training Programs"
        title="Aviation Training Programs"
        lede="Thirty-four specialized aviation courses covering flight operations, safety compliance, air traffic services, and quality management — aligned to ICAO standards and taught at our Hargeisa campus."
      />

      <Filings />

      {/* ── 01 Search, Filters & Course Grid ────────────────────────────────── */}
      <section className="section">
        <div className="shell">
          <div className="section-head">
            <span className="badge">All 34 Programs</span>
            <h2 className="title-md">Explore Aviation Training Courses</h2>
            <p className="desc-md">
              Search by title or keyword, filter by category, and select multiple courses to enroll in at once.
            </p>
          </div>

          {/* Search bar */}
          <div className="training-search-bar">
            <Search size={18} className="training-search-bar__icon" />
            <input
              type="text"
              className="training-search-bar__input"
              placeholder="Search courses by title or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search training courses"
            />
          </div>

          {/* Category filter chips */}
          <div className="training-filter-chips">
            {chips.map((chip) => (
              <button
                key={chip}
                type="button"
                className={`training-chip ${activeCategory === chip ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(chip)}
              >
                {chip}
                {chip !== 'All' && (
                  <span className="training-chip__count">
                    {TRAINING_COURSES.filter((c) => c.category === chip).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="training-results-count">
            {filtered.length} {filtered.length === 1 ? 'course' : 'courses'} found
            {selectedIds.length > 0 && (
              <span className="selected-count-pill">
                <Check size={13} />
                {selectedIds.length} selected
              </span>
            )}
          </p>

          {/* Course grid */}
          {filtered.length > 0 ? (
            <div className="training-grid">
              {filtered.map((course) => {
                const isSelected = selectedIds.includes(course.id);
                return (
                  <TiltCard key={course.id} maxTilt={5} className={`training-card ${isSelected ? 'training-card--selected' : ''}`}>
                    {/* Multi-select checkbox */}
                    <button
                      type="button"
                      className={`course-select-check ${isSelected ? 'is-checked' : ''}`}
                      onClick={() => toggleCourse(course.id)}
                      aria-label={isSelected ? `Deselect ${course.title}` : `Select ${course.title} for enrollment`}
                      aria-pressed={isSelected}
                    >
                      {isSelected ? <Check size={16} /> : <Plus size={16} />}
                    </button>

                    <div className="training-card__top">
                      <span className={`category-badge ${CATEGORY_COLORS[course.category]}`}>
                        {course.category}
                      </span>
                      <span className={`level-tag ${LEVEL_COLORS[course.level]}`}>
                        {course.level}
                      </span>
                    </div>
                    <h3 className="training-card__title">{course.title}</h3>
                    <p className="training-card__desc">{course.description}</p>
                    <div className="training-card__meta">
                      <span className="training-card__meta-item">
                        <Clock size={14} />
                        {course.duration}
                      </span>
                      <span className="training-card__meta-divider" />
                      <span className="training-card__meta-item">
                        <BarChart3 size={14} />
                        {course.level}
                      </span>
                    </div>
                    <div className="training-card__actions">
                      <Link
                        to={`/training/${course.id}`}
                        className="training-card__details-link"
                      >
                        View Course Details <ArrowRight size={14} />
                      </Link>
                      <button
                        type="button"
                        className={`btn btn--sm ${isSelected ? 'btn--secondary' : 'btn--primary'} btn--enroll-glow`}
                        onClick={() => toggleCourse(course.id)}
                      >
                        {isSelected ? (
                          <><Check size={14} /> Selected</>
                        ) : (
                          <><Plus size={14} /> Select</>
                        )}
                      </button>
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          ) : (
            <div className="training-empty">
              <Search size={36} />
              <p>No courses match your search. Try a different keyword or category.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── 02 Course Delivery Logistics ───────────────────────────────────── */}
      <section className="section section--subtle">
        <div className="shell">
          <div className="section-head">
            <span className="badge badge--gold">Course Delivery</span>
            <h2 className="title-md">How Our Training Programs Operate</h2>
            <p className="desc-md">
              Structured for serious progress, high exam pass rates, and lasting aviation mastery.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))', gap: 24 }}>
            {LOGISTICS.map((item) => (
              <TiltCard
                key={item.title}
                maxTilt={5}
                className="panel"
              >
                <b style={{ fontFamily: 'var(--font-serif)', color: 'var(--navy)', fontSize: '1.2rem', display: 'block', marginBottom: 10 }}>
                  {item.title}
                </b>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                  {item.body}
                </p>
              </TiltCard>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40, display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <Link to={enrollUrl} className="btn btn--primary">
              Enroll for Training
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

      {/* ── Floating Multi-Select Enrollment Bar ────────────────────────────── */}
      {selectedIds.length > 0 && (
        <div className="enroll-floating-bar" role="region" aria-label="Selected courses for enrollment">
          <div className="enroll-floating-bar__info">
            <span className="enroll-floating-bar__count">
              {selectedIds.length} {selectedIds.length === 1 ? 'course' : 'courses'} selected
            </span>
            <div className="enroll-floating-bar__chips">
              {selectedCourses.slice(0, 3).map((course) => (
                <span key={course.id} className="enroll-floating-bar__chip">
                  {course.title}
                </span>
              ))}
              {selectedCourses.length > 3 && (
                <span className="enroll-floating-bar__chip enroll-floating-bar__chip--more">
                  +{selectedCourses.length - 3} more
                </span>
              )}
            </div>
          </div>
          <div className="enroll-floating-bar__actions">
            <button
              type="button"
              className="btn btn--outline-white btn--sm"
              onClick={() => setSelectedIds([])}
            >
              Clear All
            </button>
            <Link to={enrollUrl} className="btn btn--primary btn--enroll-glow">
              Proceed to Enrolment
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </Shell>
  );
}
