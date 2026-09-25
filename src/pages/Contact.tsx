import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Shell, { Filings, InquiryForm, PageHead } from '../components/Shell';
import { ACCREDITATION, CONTACT } from '../data/site';

export default function Contact() {
  return (
    <Shell>
      <PageHead
        kicker="Contact"
        code="CON-01"
        title="Three phone lines, two inboxes, one address."
        lede="Use whichever is easiest. The form reaches the same people as the phone, and both reach us within the school day."
      />

      <Filings />

      <section className="band">
        <div className="shell rule rule--split">
          {/* ── the details ───────────────────────────────────────────────── */}
          <div>
            <p className="datum">Where to find us</p>
            <dl className="details" style={{ marginTop: 20 }}>
              <div>
                <dt><MapPin size={14} /> Visit</dt>
                <dd>
                  <address>
                    {CONTACT.lines.map((l) => <span key={l} style={{ display: 'block' }}>{l}</span>)}
                    <span style={{ display: 'block', marginTop: 6 }}>{CONTACT.city}</span>
                  </address>
                </dd>
              </div>
              <div>
                <dt><Phone size={14} /> Telephone</dt>
                <dd>
                  {CONTACT.phones.map((p) => (
                    <a key={p.display} href={p.href}>{p.display}</a>
                  ))}
                </dd>
              </div>
              <div>
                <dt><Mail size={14} /> Email</dt>
                <dd>
                  {CONTACT.emails.map((e) => (
                    <a key={e} href={`mailto:${e}`}>{e}</a>
                  ))}
                </dd>
              </div>
              <div>
                <dt><MessageCircle size={14} /> WhatsApp</dt>
                <dd>
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}
                  >
                    {CONTACT.phones[0].display}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          {/* ── the form ──────────────────────────────────────────────────── */}
          <div>
            <p className="datum">Enquiry form</p>
            <h2 className="h3" style={{ marginTop: 14, marginBottom: 8 }}>Send us a message</h2>
            <p className="body" style={{ marginBottom: 28 }}>
              Tell us what you are hoping to do and we will tell you what it takes.
            </p>
            <InquiryForm />
          </div>
        </div>
      </section>

      {/* ── accreditation ─────────────────────────────────────────────────── */}
      <section className="band band--edge">
        <div className="shell rule rule--split">
          <div className="stack">
            <p className="datum">Recognition</p>
            <h2 className="h2">Who we are aligned with.</h2>
          </div>
          <ul className="values">
            {ACCREDITATION.map((a) => (
              <li key={a}>
                <b style={{ fontSize: '0.9375rem', fontWeight: 500 }}>{a}</b>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Shell>
  );
}
