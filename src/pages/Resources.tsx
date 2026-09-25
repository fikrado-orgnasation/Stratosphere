import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Shell, { Filings, PageHead } from '../components/Shell';
import { RESOURCES } from '../data/site';

export default function Resources() {
  return (
    <Shell>
      <PageHead
        kicker="Resources"
        code="RES-01"
        title="What you can read before you enrol."
        lede="Six shelves of material. Most of it is still being assembled — the place tells you which."
      />

      <Filings />

      <section className="band">
        <div className="shell">
          <div className="shelf">
            {RESOURCES.map((r) => (
              <div className="shelf__item" key={r.code}>
                <p className="mono mono--xs" style={{ color: 'var(--faint-ink)' }}>{r.code}</p>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
                {r.href ? (
                  <a className="act" href={r.href} target="_blank" rel="noreferrer">
                    Open {new URL(r.href).hostname.replace(/^www\./, '')}
                    <ArrowRight size={14} />
                  </a>
                ) : (
                  /* Say so, rather than shipping a link that goes nowhere. */
                  <span className="act" aria-disabled="true" style={{ color: 'var(--faint-ink)' }}>
                    In preparation
                  </span>
                )}
              </div>
            ))}
          </div>

          <p className="mono mono--xs muted" style={{ marginTop: 34, maxWidth: '54ch', lineHeight: 1.7 }}>
            The remaining shelves are being written against the current ERNAM framework.
            Enrolled students get them as each one is finished. If you need something
            from them before then, ask and we will send it.
          </p>

          <div style={{ marginTop: 30, display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            <Link to="/admissions" className="act">
              Ask for a resource
              <ArrowRight size={15} />
            </Link>
            <Link to="/contact" className="act act--muted">
              Message the school
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
