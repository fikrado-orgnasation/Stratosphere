import { useMemo, useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Check, ChevronLeft, ChevronRight, Plus,
  Plane, Cloud, Compass, Radio, Gauge, BookOpen, Languages,
  Shield, RadioTower, FileText, Sparkles, Send,
} from 'lucide-react';
import Shell, { Filings, InquiryForm, PageHead } from '../components/Shell';
import { CONTACT, FAQS, SUBJECTS } from '../data/site';

const STAGES = [
  { code: '01', title: 'Tell us where you are', body: 'Flying already, or starting from nothing, both work. It changes the order we would suggest, not whether you can start.' },
  { code: '02', title: 'Pick your subjects', body: 'One subject to see how it goes, or the full set for a licence. Most people begin with one.' },
  { code: '03', title: 'Talk it through', body: 'A free consultation. We give you a real timeline rather than a brochure number, and tell you honestly if we are not the right school for you.' },
  { code: '04', title: 'Enrol', body: 'Register, collect your materials, and start private instruction on a schedule you set.' },
];

const SUBJECT_ICONS: Record<string, typeof Plane> = {
  M01: FileText,
  M02: Plane,
  M03: Cloud,
  M04: Compass,
  M05: Gauge,
  M06: Shield,
  M07: Radio,
  M08: RadioTower,
  M09: BookOpen,
  M10: Languages,
};

export default function Register() {
  const [picked, setPicked] = useState<string[]>(['M01', 'M02']);
  const [activeSlide, setActiveSlide] = useState(0);

  const toggle = useCallback((code: string) => {
    setPicked((p) => (p.includes(code) ? p.filter((c) => c !== code) : [...p, code]));
  }, []);

  const nextSlide = useCallback(() => {
    setActiveSlide((s) => (s + 1) % SUBJECTS.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlide((s) => (s - 1 + SUBJECTS.length) % SUBJECTS.length);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [nextSlide, prevSlide]);

  const { title, message } = useMemo(() => {
    if (picked.length === 0) {
      return {
        title: 'Ten-subject enquiry',
        message: 'I would like to register for the full theoretical knowledge programme. Please send me the timetable and the cost.',
      };
    }
    if (picked.length === 1) {
      const s = SUBJECTS.find((x) => x.code === picked[0]);
      return {
        title: `${picked[0]} · ${s?.title ?? ''}`.trim(),
        message: `I would like to register for ${picked[0]} (${s?.title}). When can I start?`,
      };
    }
    return {
      title: `${picked.length} subjects`,
      message: `I would like to register for these subjects: ${picked.join(', ')}. Please send me the timetable and the cost.`,
    };
  }, [picked]);

  return (
    <Shell>
      <PageHead
        kicker="Register"
        code="REG-01"
        title="Register for the subjects you want."
        lede="No prior experience needed. Slide through and pick your subjects, and we will come back within 24 hours with a real answer about timing and cost."
      />

      <Filings />

      {/* ── subject carousel ─────────────────────────────────────────────────── */}
      <section className="band">
        <div className="shell">
          <div className="band__head">
            <p className="datum">Choose your subjects</p>
            <h2 className="h2">One, or all ten. Slide through and pick.</h2>
            <p className="body">
              Browse the subject carousel, tap to select, and the enquiry below fills
              itself in. Change your mind as much as you like — nothing is submitted
              until you send it.
            </p>
          </div>

          <div className="reg-carousel">
            {/* main slide */}
            <div className="reg-slide-wrap">
              <button className="reg-nav reg-nav--prev" onClick={prevSlide} aria-label="Previous subject">
                <ChevronLeft size={22} />
              </button>
              <button className="reg-nav reg-nav--next" onClick={nextSlide} aria-label="Next subject">
                <ChevronRight size={22} />
              </button>

              <div className="reg-slide-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                {SUBJECTS.map((s, i) => {
                  const Icon = SUBJECT_ICONS[s.code] ?? BookOpen;
                  const isOn = picked.includes(s.code);
                  return (
                    <div
                      key={s.code}
                      className={`reg-slide ${i === activeSlide ? 'is-active' : ''} ${isOn ? 'is-picked' : ''}`}
                      aria-hidden={i !== activeSlide}
                    >
                      <div className="reg-slide__glow" aria-hidden="true" />
                      <div className="reg-slide__content">
                        <div className="reg-slide__icon-row">
                          <span className="reg-slide__icon"><Icon size={28} /></span>
                          <span className="reg-slide__code">{s.code}</span>
                        </div>
                        <h3 className="reg-slide__title">{s.title}</h3>
                        <ul className="reg-slide__topics">
                          {s.topics.map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                        <button
                          className={`btn ${isOn ? 'btn--primary' : 'btn--ghost'} reg-slide__btn`}
                          onClick={() => toggle(s.code)}
                          aria-pressed={isOn}
                        >
                          {isOn ? (<><Check size={16} strokeWidth={3} /> Selected</>) : (<>Select this subject <Plus size={16} /></>)}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* dots + counter */}
            <div className="reg-carousel__controls">
              <span className="reg-counter mono mono--xs">
                {String(activeSlide + 1).padStart(2, '0')} / {String(SUBJECTS.length).padStart(2, '0')}
              </span>
              <div className="reg-dots">
                {SUBJECTS.map((s, i) => (
                  <button
                    key={s.code}
                    className={`reg-dot ${i === activeSlide ? 'is-active' : ''} ${picked.includes(s.code) ? 'is-picked' : ''}`}
                    onClick={() => setActiveSlide(i)}
                    aria-label={`Go to ${s.title}`}
                  >
                    {picked.includes(s.code) && <Check size={8} strokeWidth={4} />}
                  </button>
                ))}
              </div>
              <div className="reg-carousel__actions">
                <button className="act act--muted" onClick={() => setPicked(SUBJECTS.map((s) => s.code))}>
                  Select all ten
                </button>
                <button className="act act--muted" onClick={() => setPicked([])}>
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── selection summary + quick send ────────────────────────────────────── */}
      <section className="band band--edge">
        <div className="shell rule rule--split">
          <div className="stack">
            <p className="datum">Your selection</p>
            <h2 className="h3" style={{ marginTop: 4 }}>{title}</h2>
            <p className="body" style={{ maxWidth: '42ch' }}>{message}</p>

            {picked.length > 0 && (
              <div className="reg-chips">
                {picked.map((code) => {
                  const s = SUBJECTS.find((x) => x.code === code);
                  const Icon = s ? (SUBJECT_ICONS[s.code] ?? BookOpen) : BookOpen;
                  return (
                    <span key={code} className="reg-chip">
                      <Icon size={14} />
                      {code}
                      <button onClick={() => toggle(code)} aria-label={`Remove ${code}`} className="reg-chip__x">
                        <Plus size={11} strokeWidth={3} style={{ transform: 'rotate(45deg)' }} />
                      </button>
                    </span>
                  );
                })}
              </div>
            )}

            <div className="reg-quick-actions">
              <a
                className="btn btn--primary"
                href={`${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noreferrer"
              >
                <Send size={16} />
                Send on WhatsApp
              </a>
              <p className="form-note">Or use the form below — it reaches us by email.</p>
            </div>
          </div>

          <div className="reg-summary-card">
            <div className="reg-summary-card__head">
              <span className="reg-summary-card__icon"><Sparkles size={20} /></span>
              <div>
                <p className="mono mono--xs" style={{ color: 'var(--faint-ink)' }}>Enquiry will cover</p>
                <p className="h3" style={{ marginTop: 4 }}>{title}</p>
              </div>
            </div>
            <div className="reg-summary-card__body">
              <div className="reg-summary-stat">
                <b>{picked.length}</b>
                <span>Subject{picked.length !== 1 ? 's' : ''} selected</span>
              </div>
              <div className="reg-summary-stat">
                <b>{SUBJECTS.length - picked.length}</b>
                <span>Remaining</span>
              </div>
            </div>
            <div className="reg-summary-card__bar">
              <div className="reg-summary-card__bar-fill" style={{ width: `${(picked.length / SUBJECTS.length) * 100}%` }} />
            </div>
            <p className="mono mono--xs muted" style={{ marginTop: 12 }}>
              {picked.length === SUBJECTS.length
                ? 'Full programme — CPL theory pack'
                : picked.length === 0
                  ? 'Full ten-subject enquiry'
                  : `${picked.length} of ${SUBJECTS.length} subjects`}
            </p>
          </div>
        </div>
      </section>

      {/* ── how registration works + form ─────────────────────────────────────── */}
      <section className="band band--edge">
        <div className="shell rule rule--split">
          <div className="stack">
            <p className="datum">How registration works</p>
            <ol className="steps" style={{ marginTop: 22 }}>
              {STAGES.map((s) => (
                <li key={s.code}>
                  <b>{s.title}</b>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <p className="datum">Enquiry form</p>
            <h2 className="h3" style={{ marginTop: 14, marginBottom: 8 }}>Send it to us</h2>
            <p className="body" style={{ marginBottom: 28 }}>
              The more you tell us about where you are now, the more useful our reply.
            </p>
            <InquiryForm defaultMsg={message} />
          </div>
        </div>
      </section>

      {/* ── direct lines ──────────────────────────────────────────────────────── */}
      <section className="band band--edge">
        <div className="shell rule rule--split">
          <div className="stack">
            <p className="datum">Or just call</p>
            <h2 className="h2">If it is easier to talk.</h2>
            <p className="body">
              There is a form above, but a sentence on the phone works just as well.
            </p>
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="btn btn--primary" style={{ width: 'fit-content' }}>
              Message us on WhatsApp
            </a>
          </div>

          <dl className="details">
            <div>
              <dt>Telephone</dt>
              <dd>
                {CONTACT.phones.map((p) => (
                  <a key={p.display} href={p.href}>{p.display}</a>
                ))}
              </dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>
                {CONTACT.emails.map((e) => (
                  <a key={e} href={`mailto:${e}`}>{e}</a>
                ))}
              </dd>
            </div>
            <div>
              <dt>Visit</dt>
              <dd>
                <address>
                  {CONTACT.lines.map((l) => <span key={l} style={{ display: 'block' }}>{l}</span>)}
                  <span style={{ display: 'block', marginTop: 6 }}>{CONTACT.city}</span>
                </address>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── questions ─────────────────────────────────────────────────────────── */}
      <section className="band band--edge">
        <div className="shell" style={{ maxWidth: 900 }}>
          <div className="band__head">
            <p className="datum">Before you register</p>
            <h2 className="h2">The four questions we get most.</h2>
          </div>
          <div className="faq">
            {FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}<Plus size={18} /></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mono mono--xs muted" style={{ marginTop: 28 }}>
            Still unsure? <Link to="/books" style={{ color: 'var(--gold)' }}>See what you would need to buy</Link> first.
          </p>
        </div>
      </section>
    </Shell>
  );
}
