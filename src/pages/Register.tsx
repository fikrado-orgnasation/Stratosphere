import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Plus } from 'lucide-react';
import Shell, { Filings, InquiryForm, PageHead } from '../components/Shell';
import { CONTACT, FAQS, SUBJECTS } from '../data/site';

const STAGES = [
  { code: '01', title: 'Tell us where you are', body: 'Flying already, or starting from nothing, both work. It changes the order we would suggest, not whether you can start.' },
  { code: '02', title: 'Pick your subjects', body: 'One subject to see how it goes, or the full set for a licence. Most people begin with one.' },
  { code: '03', title: 'Talk it through', body: 'A free consultation. We give you a real timeline rather than a brochure number, and tell you honestly if we are not the right school for you.' },
  { code: '04', title: 'Enrol', body: 'Register, collect your materials, and start private instruction on a schedule you set.' },
];

export default function Register() {
  const [picked, setPicked] = useState<string[]>(['M01', 'M02']);

  const toggle = (code: string) =>
    setPicked((p) => (p.includes(code) ? p.filter((c) => c !== code) : [...p, code]));

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
        lede="No prior experience needed. Tell us what you are after and we will come back within 24 hours with a real answer about timing and cost."
      />

      <Filings />

      {/* ── pick subjects, then enquire ────────────────────────────────────── */}
      <section className="band">
        <div className="shell rule rule--split">
          <div>
            <p className="datum">Choose your subjects</p>
            <h2 className="h2" style={{ marginTop: 18, marginBottom: 10 }}>
              One, or all ten.
            </h2>
            <p className="body" style={{ marginBottom: 26 }}>
              Tick what you want and the enquiry beside it fills itself in. Change your
              mind as much as you like — nothing is submitted until you send it.
            </p>

            <div className="choose">
              {SUBJECTS.map((s) => {
                const on = picked.includes(s.code);
                return (
                  <button
                    key={s.code}
                    className={`choose__item ${on ? 'is-on' : ''}`}
                    onClick={() => toggle(s.code)}
                    aria-pressed={on}
                  >
                    <span className="choose__box" aria-hidden="true"><Check size={12} strokeWidth={3} /></span>
                    <span>
                      <span className="choose__name">{s.title}</span>
                      <span className="choose__desc">{s.topics.slice(0, 3).join(' · ')}</span>
                    </span>
                    <span className="choose__meta">{s.code}</span>
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 24 }}>
              <button className="act act--muted" onClick={() => setPicked(SUBJECTS.map((s) => s.code))}>
                Select all ten
              </button>
              <button className="act act--muted" onClick={() => setPicked([])}>
                Clear
              </button>
            </div>
          </div>

          <div style={{ position: 'sticky', top: 100, alignSelf: 'start' }}>
            <p className="datum">Your selection</p>
            <div style={{ border: '1px solid var(--edge)', background: 'var(--ink-deep)', padding: 24, marginTop: 18 }}>
              <p className="mono mono--xs" style={{ color: 'var(--faint-ink)' }}>Enquiry will cover</p>
              <p className="h3" style={{ marginTop: 10, marginBottom: 8 }}>{title}</p>
              <p className="body" style={{ fontSize: '0.875rem', maxWidth: '38ch' }}>{message}</p>
              <a
                className="act"
                style={{ marginTop: 20 }}
                href={`${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noreferrer"
              >
                Send this on WhatsApp
              </a>
            </div>
            <p className="form-note" style={{ marginTop: 16 }}>
              Or use the form below and it reaches us by email instead.
            </p>
          </div>
        </div>
      </section>

      {/* ── the form ───────────────────────────────────────────────────────── */}
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
            <InquiryForm />
          </div>
        </div>
      </section>

      {/* ── direct lines ───────────────────────────────────────────────────── */}
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

      {/* ── questions ──────────────────────────────────────────────────────── */}
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
            Still unsure? <Link to="/books" style={{ color: 'var(--amber)' }}>See what you would need to buy</Link> first.
          </p>
        </div>
      </section>
    </Shell>
  );
}
