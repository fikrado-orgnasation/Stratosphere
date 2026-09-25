import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Shell, { Filings, InquiryForm, PageHead } from '../components/Shell';
import { CONTACT, FAQS } from '../data/site';

export default function Admissions() {
  return (
    <Shell>
      <PageHead
        kicker="Admissions"
        code="ADM-01"
        title="Start here. It takes about two minutes."
        lede="Send an enquiry and someone will reply within 24 hours — with an honest answer about timing, not a brochure."
      />

      <Filings />

      {/* ── process ────────────────────────────────────────────────────────── */}
      <section className="band">
        <div className="shell rule rule--split">
          <div>
            <p className="datum">The process</p>
            <ol className="steps" style={{ marginTop: 24 }}>
              {[
                { title: 'Send an enquiry', body: 'Use the form or message us on WhatsApp. Either works, and both reach the same people.' },
                { title: 'Talk it through', body: 'A free consultation about your goals, your weekly hours, and how you learn best.' },
                { title: 'Enrol', body: 'Register, and start private instruction on a schedule we agree together.' },
              ].map((s, i) => (
                <li key={s.title}>
                  <b>{s.title}</b>
                  <p>{s.body}</p>
                  {i === 0 && (
                    <a href="#enquiry" className="act" style={{ marginTop: 12 }}>
                      Go to the form
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* The missing half of a project that was already half-built */}
          <div id="enquiry" style={{ scrollMarginTop: 100 }}>
            <p className="datum">Enquiry form</p>
            <h2 className="h3" style={{ marginTop: 14, marginBottom: 8 }}>Send us a message</h2>
            <p className="body" style={{ marginBottom: 28 }}>
              The more you tell us about where you are now, the more useful our reply will be.
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
              There is a form above, but if you would rather sort it out in a sentence
              on the phone, that is fine too.
            </p>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="btn btn--primary"
              style={{ width: 'fit-content' }}
            >
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
            <p className="datum">Before you ask</p>
            <h2 className="h2">The four questions we get most.</h2>
          </div>
          <div className="faq">
            {FAQS.map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q}
                  <Plus size={18} />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mono mono--xs muted" style={{ marginTop: 28 }}>
            Still unsure? <Link to="/contact" style={{ color: 'var(--amber)' }}>Ask us directly</Link>.
          </p>
        </div>
      </section>
    </Shell>
  );
}
