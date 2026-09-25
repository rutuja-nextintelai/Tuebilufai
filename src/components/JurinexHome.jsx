import { Link } from 'react-router-dom'

const JURINEX_URL = 'https://jurinex.ai/'

const POINTS = [
  {
    icon: 'bi-folder2-open',
    title: 'Your whole matter, in one place',
    text: 'Upload the file once. Summaries, chronology, research, and drafts all come from the same case.',
  },
  {
    icon: 'bi-patch-check',
    title: 'Answers you can verify',
    text: 'Every response points back to the page it came from, so you can check it before you rely on it.',
  },
  {
    icon: 'bi-translate',
    title: 'Made for Indian practice',
    text: 'Court formats, citation styles, and Indian languages, with your data stored in India.',
  },
]

export default function JurinexHome() {
  return (
    <section className="jx-home" id="jurinex-intro">
      <div className="jx-home__glow" aria-hidden="true" />
      <div className="jx-home__grid" aria-hidden="true" />
      <div className="container">
        <div className="jx-home__intro" data-aos="fade-up">
          <span className="jx-home__eyebrow">Introducing our platform</span>
          <h2 className="jx-home__title">Meet <em>JuriNex</em></h2>
          <p className="jx-home__lead">
            JuriNex is Tuebiluf AI’s legal workspace for advocates, chambers, and law firms.
            Bring in the case you already have — FIRs, judgments, affidavits, bulky briefs —
            and it helps you read, research, draft, and check citations in the formats and
            languages Indian courts expect.
          </p>
          <div className="jx-home__actions">
            <a href={JURINEX_URL} target="_blank" rel="noopener noreferrer" className="hero-btn hero-btn--red">
              Visit jurinex.ai
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2.5 11.5 L11.5 2.5 M4.5 2.5 H11.5 V9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <Link to="/jurinex" className="jx-home__more">
              See how JuriNex works <i className="bi bi-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <ul className="jx-home__points">
          {POINTS.map((point, i) => (
            <li key={point.title} data-aos="fade-up" data-aos-delay={i * 80}>
              <span className="jx-home__icon" aria-hidden="true"><i className={`bi ${point.icon}`} /></span>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
