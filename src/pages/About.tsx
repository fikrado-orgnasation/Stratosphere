import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Shell, { Filings, PageHead } from '../components/Shell';
import { ACCREDITATION, CONTACT, RAIL } from '../data/site';

const VALUES = [
  { term: 'Precision', gloss: 'If a number can be checked, it gets checked. Theory is the part you cannot wing.' },
  { term: 'Safety', gloss: 'The first thing we teach and the first thing we hold ourselves to.' },
  { term: 'Integrity', gloss: 'We would rather tell you a subject is not ready than sign it off early.' },
  { term: 'Excellence', gloss: 'The standard is international, and it does not bend because the school is local.' },
];

export default function About() {
  return (
    <Shell>
      <PageHead
        kicker="About us"
        code="ABT-01"
        title="A ground school, in the country that needed one."
        lede="Stratosphere Aeronautics was established in 2026 so that the theoretical knowledge behind a pilot licence could be studied in Hargeisa — privately, properly, and to a standard that travels."
      />

      <section className="band band--tight" style={{ paddingTop: 0 }}>
        <div className="shell rule rule--split">
          <div className="stack">
            <p className="body">
              Until now, anyone in Somaliland who wanted the theory behind a pilot
              licence had to leave the country. Stratosphere was set up in Hargeisa so
              that the syllabus could be studied here, in Somali, at a cost that does
              not require a visa.
            </p>
            <p className="body">
              Our curriculum follows ICAO Doc 7192 and the ERNAM instructional
              framework. The instruction is delivered by specialists trained at ERNAM,
              and the certificate is signed by them. That combination is what makes it
              portable: the theory you pass here counts towards a PPL or CPL anywhere
              the standards are recognised.
            </p>
          </div>

          <div>
            <p className="datum" style={{ marginBottom: 16 }}>What the school is</p>
            <ul className="values">
              {[
                'School of Theoretical Knowledge Instruction',
                'Private tuition, one to one or in a small group',
                'PPL and CPL theoretical prerequisite',
                'ASECNA and ICAO WACAF office partner',
                `Based in ${CONTACT.city}`,
              ].map((item) => (
                <li key={item} style={{ display: 'grid', gridTemplateColumns: '20px 1fr', gap: 12, alignItems: 'start' }}>
                  <Check size={15} style={{ color: 'var(--amber)', marginTop: 5 }} />
                  <b style={{ fontSize: '0.9375rem', fontWeight: 500 }}>{item}</b>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Filings />

      {/* ── mission ────────────────────────────────────────────────────────── */}
      <section className="band">
        <div className="shell">
          <div className="band__head" style={{ maxWidth: '44ch' }}>
            <p className="datum">What we are for</p>
            <h2 className="h2">The written half of a licence, taught properly.</h2>
          </div>

          <div className="rule rule--split">
            <p className="pull">
              Rigorous air navigation training, and the systems thinking that goes with
              it. <em>Technical mastery and professional judgement, taught together.</em>
            </p>
            <ul className="values">
              {VALUES.map((v) => (
                <li key={v.term}>
                  <b>{v.term}</b>
                  <span>{v.gloss}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── numbers ───────────────────────────────────────────────────────── */}
      <section className="band band--edge">
        <div className="shell">
          <div className="figures">
            <div><b>{RAIL.established}</b><span>Founded</span></div>
            <div><b>ICAO</b><span>Curriculum standard</span></div>
            <div><b>ERNAM</b><span>Instructor training</span></div>
            <div><b>10</b><span>Subjects taught</span></div>
          </div>
        </div>
      </section>

      {/* ── accreditation ──────────────────────────────────────────────────── */}
      <section className="band band--edge">
        <div className="shell rule rule--split">
          <div className="stack">
            <p className="datum">Recognition</p>
            <h2 className="h2">What we are aligned to.</h2>
            <p className="body">
              We are not accredited to issue licences. We are aligned to the frameworks
              that decide what a licence requires, which is the part a student actually
              needs covered.
            </p>
            <Link to="/training" className="act" style={{ width: 'fit-content' }}>
              See the syllabus
              <ArrowRight size={15} />
            </Link>
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
