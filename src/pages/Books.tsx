import { MessageCircle, MapPin, Package } from 'lucide-react';
import Shell, { Filings, PageHead } from '../components/Shell';
import { BOOKS, CONTACT, PACKS } from '../data/site';

function orderHref(title: string) {
  return `${CONTACT.whatsapp}?text=${encodeURIComponent(
    `Hello, I would like to reserve or enquire about this textbook: ${title} at the Stratosphere Aeronautics school office in Hargeisa.`
  )}`;
}

export default function Books() {
  const heldCount = BOOKS.filter((b) => b.stock === 'held').length;

  return (
    <Shell>
      <PageHead
        kicker="School Library"
        title="Aviation Textbooks & Study Manuals"
        lede="One physical text per subject, held directly in stock at our Hargeisa campus. Reserve your copies or purchase through our school office."
      />

      <Filings />

      {/* ── 01 Textbook Catalog Grid ───────────────────────────────────────── */}
      <section className="section">
        <div className="shell">
          <div className="section-head">
            <span className="badge">Curriculum Texts</span>
            <h2 className="title-md">The 10 Core Subject Manuals</h2>
            <p className="desc-md">
              Every subject has a dedicated textbook. Currently, {heldCount} of 10 titles are held
              in physical stock in Hargeisa.
            </p>
          </div>

          <div className="book-cards-grid">
            {BOOKS.map((b) => (
              <div key={b.ref} className="school-book-card">
                <div className="school-book-card__cover">
                  <div>
                    <span className="school-book-card__code">{b.ref} · {b.subject}</span>
                    <h3 className="school-book-card__title" style={{ marginTop: 8 }}>{b.title}</h3>
                  </div>
                  <span className="school-book-card__edition">{b.edition}</span>
                </div>

                <div className="school-book-card__body">
                  <p className="school-book-card__note">{b.note}</p>

                  <div className="school-book-card__foot">
                    <span className={`stock-pill ${b.stock === 'held' ? 'stock-pill--held' : 'stock-pill--order'}`}>
                      {b.stock === 'held' ? 'In Stock (Hargeisa)' : 'On Order'}
                    </span>
                    <b style={{ color: 'var(--navy)', fontSize: '1rem' }}>
                      {b.price ? `$${b.price}` : 'Theory Included'}
                    </b>
                  </div>

                  <a
                    href={orderHref(b.title)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--sm btn--whatsapp"
                    style={{ width: '100%', marginTop: 8 }}
                  >
                    <MessageCircle size={15} />
                    Reserve on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02 Study Packs Bundles ─────────────────────────────────────────── */}
      <section className="section section--subtle">
        <div className="shell">
          <div className="section-head">
            <span className="badge badge--amber">Study Packs</span>
            <h2 className="title-md">Complete Licence Theory Bundles</h2>
            <p className="desc-md">
              Save time and study systematically by getting your full course books together.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {PACKS.map((pack) => (
              <div
                key={pack.code}
                style={{
                  padding: 28,
                  borderRadius: 'var(--radius-lg)',
                  background: '#ffffff',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge--amber">{pack.subjects}</span>
                  <Package size={20} style={{ color: 'var(--amber)' }} />
                </div>

                <h3 className="title-sm">{pack.name}</h3>
                <p className="desc-md">{pack.desc}</p>

                <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                  <a
                    href={`${CONTACT.whatsapp}?text=${encodeURIComponent(`Hello, I would like to enquire about the ${pack.name} bundle at Stratosphere Aeronautics.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--whatsapp"
                    style={{ width: '100%' }}
                  >
                    <MessageCircle size={18} />
                    Enquire on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 40,
              padding: 20,
              borderRadius: 'var(--radius)',
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <MapPin size={24} style={{ color: 'var(--blue)', flexShrink: 0 }} />
            <p style={{ fontSize: '0.9375rem', color: '#1e3a8a' }}>
              All books are stored and distributed directly from our campus office:
              <b> {CONTACT.lines[0]}, {CONTACT.city}</b>. You can collect your textbooks
              in person upon enrollment.
            </p>
          </div>
        </div>
      </section>
    </Shell>
  );
}
