import { Check, MessageCircle } from 'lucide-react';
import Shell, { Filings, PageHead } from '../components/Shell';
import { BOOKS, CONTACT, PACKS } from '../data/site';

function orderHref(title: string) {
  return `${CONTACT.whatsapp}?text=${encodeURIComponent(
    `Hello, I would like to order: ${title}. Is it available at the school?`,
  )}`;
}

function money(n: number) {
  return `$${n.toFixed(2)}`;
}

export default function Books() {
  const held = BOOKS.filter((b) => b.stock === 'held').length;

  return (
    <Shell>
      <PageHead
        kicker="Books"
        code="BKS-01"
        title="The texts for the ten subjects, kept in stock."
        lede="Each subject has a book the school holds copies of. Buy at the school, or message us and we will set one aside for you."
      >
        <div className="figures" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' }}>
          <div><b>{BOOKS.length}</b><span>Titles</span></div>
          <div><b>{held}</b><span>Held now</span></div>
        </div>
      </PageHead>

      <Filings />

      {/* ── the shelf ─────────────────────────────────────────────────────── */}
      <section className="band">
        <div className="shell">
          <div className="band__head">
            <p className="datum">By subject</p>
            <h2 className="h2">One title per subject.</h2>
            <p className="body">
              Study them in any order. If you take all ten, you take all ten books.
            </p>
          </div>

          <div className="books">
            {BOOKS.map((b) => (
              <article className={`book ${b.price === null ? 'book--tbc' : ''}`} key={b.ref}>
                <div className="book__cover" aria-hidden="true">
                  <span className="book__cover-mark" />
                  <span className="book__cover-code">{b.ref} · {b.subject}</span>
                  <span className="book__cover-title">{b.title}</span>
                </div>

                <div className="book__meta">
                  <p className="book__ref">{b.ref} · {b.subject}</p>
                  <h3 className="book__title">{b.title}</h3>
                  <p className="book__edition">{b.edition}</p>
                  <p className="book__note">{b.note}</p>

                  <div className="book__buy">
                    <span className="book__price">
                      {b.price === null ? 'Price to be confirmed' : money(b.price)}
                    </span>
                    <span className={`book__stock ${b.stock === 'held' ? 'book__stock--held' : 'book__stock--order'}`}>
                      {b.stock === 'held' ? 'Held at the school' : 'On order'}
                    </span>
                  </div>

                  <a
                    className="act book__order"
                    href={orderHref(b.title)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {b.stock === 'held' ? 'Ask to set one aside' : 'Ask about availability'}
                    <MessageCircle size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── study packs ───────────────────────────────────────────────────── */}
      <section className="band band--edge">
        <div className="shell rule rule--split">
          <div className="stack">
            <p className="datum">Study packs</p>
            <h2 className="h2">Or buy the set.</h2>
            <p className="body">
              The packs are the books for a licence, bundled. Pack prices are not set
              yet — message us and we will confirm before you pay anything.
            </p>
            <p className="mono mono--xs muted">
              Held and sold at {CONTACT.lines[0]}, {CONTACT.city}.
            </p>
          </div>

          <div>
            {PACKS.map((p) => (
              <div className="values" key={p.code} style={{ marginBottom: 4 }}>
                <li style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 20, alignItems: 'baseline' }}>
                  <span style={{ maxWidth: 'none' }}>
                    <b style={{ display: 'block', fontSize: '1.0625rem', fontWeight: 600, letterSpacing: '-0.015em', color: 'var(--chalk)' }}>
                      {p.name}
                    </b>
                    <span style={{ display: 'block', marginTop: 5 }}>{p.desc}</span>
                  </span>
                  <span style={{ textAlign: 'right' }}>
                    <span className="book__price" style={{ display: 'block' }}>
                      {p.price === null ? 'TBC' : money(p.price)}
                    </span>
                    <span className="choose__meta" style={{ display: 'block', marginTop: 5 }}>
                      {p.subjects}
                    </span>
                  </span>
                </li>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── honesty about the catalogue ───────────────────────────────────── */}
      <section className="band band--edge band--tight">
        <div className="shell">
          <div className="annunciator" style={{ maxWidth: '62ch' }}>
            <b><Check size={14} /> Before you order</b>
            <p>
              This list is not a confirmed catalogue yet. The titles, editions and
              stock shown are the school’s current shortlist, not verified supplier
              records, and pack prices are still to be set. Message us before you
              travel — we will confirm the exact book and the price, and tell you if
              it needs ordering in.
            </p>
          </div>
        </div>
      </section>
    </Shell>
  );
}
