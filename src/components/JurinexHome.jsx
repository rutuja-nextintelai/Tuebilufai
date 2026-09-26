import { Link } from 'react-router-dom'
import jurinexMark from '../assets/jurinex-mark.png'

const JURINEX_URL = 'https://jurinex.ai/'

const AUDIENCE = ['Advocates', 'Chambers', 'Law firms', 'Corporate legal teams']

const FEATURES = [
  {
    icon: 'bi-file-earmark-text',
    title: 'Read a 300-page brief in minutes',
    text: 'Summaries, chronology, and evidence tables from scanned or digital files, OCR included.',
  },
  {
    icon: 'bi-quote',
    title: 'Research with verified citations',
    text: 'Authorities matched to your grounds. When it is unsure, it flags the gap instead of inventing one.',
  },
  {
    icon: 'bi-file-earmark-richtext',
    title: 'Draft court-ready documents',
    text: 'Bail applications, writs, and notices in the format of your forum, in English or Marathi.',
  },
  {
    icon: 'bi-shield-check',
    title: 'Confidential by design',
    text: 'Data stored in India, DPDP Act compliant, and end-to-end encrypted.',
  },
]

const STATS = [
  ['5,00,000+', 'Pages processed'],
  ['95%', 'Accuracy'],
  ['100%', 'Data stored in India'],
  ['7-day', 'Free trial'],
]

// Sample workspace shown in the mock; case names are the demo matters used on jurinex.ai
const MOCK_NAV = ['bi-grid-1x2', 'bi-folder2-open', 'bi-chat-dots', 'bi-file-earmark-richtext', 'bi-quote']
const MOCK_STATS = [['12', 'Active cases'], ['4', 'Hearings this week'], ['38', 'Docs analysed']]
const MOCK_CASES = [
  ['Sharma Traders vs Patil Industries', 'Writ Petition (Civil)', 'Active'],
  ['Verma Textiles vs State of Maharashtra', 'Writ Petition (Civil)', 'Active'],
  ['State vs Rahul Deshmukh', 'Bail Application', 'Draft'],
]

function WorkspaceMock() {
  return (
    <div className="jxm jx-home__mock" aria-hidden="true">
      <div className="jxm__glow" />
      <div className="jxm__window">
        <div className="jxm__bar">
          <span /><span /><span />
          <em>jurinex.ai / workspace</em>
        </div>
        <div className="jxm__body">
          <aside className="jxm__nav">
            <span className="jxm__logo jx-home__logo"><img src={jurinexMark} alt="" /></span>
            {MOCK_NAV.map((ic, i) => <i className={`bi ${ic}${i === 1 ? ' is-on' : ''}`} key={ic} />)}
          </aside>
          <div className="jxm__main">
            <div className="jxm__head">
              <div>
                <strong>Case briefs</strong>
                <span>Manage, track and analyse every matter</span>
              </div>
              <b>+ New case</b>
            </div>
            <div className="jxm__stats">
              {MOCK_STATS.map(([n, l]) => <div key={l}><strong>{n}</strong><span>{l}</span></div>)}
            </div>
            <div className="jxm__table">
              <div className="jxm__tr jxm__tr--head"><span>Title</span><span>Type</span><span>Status</span></div>
              {MOCK_CASES.map(([t, ty, st]) => (
                <div className="jxm__tr" key={t}>
                  <span>{t}</span><span>{ty}</span><span className={`jxm__pill${st === 'Draft' ? ' jxm__pill--muted' : ''}`}>{st}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function JurinexHome() {
  return (
    <section className="jx-home" id="jurinex-intro">
      <div className="jx-home__tint" aria-hidden="true" />
      <div className="jx-home__dots" aria-hidden="true" />
      <div className="container">
        <div className="jx-home__layout">
          <div className="jx-home__intro" data-aos="fade-up">
            <span className="jx-home__eyebrow">Our flagship platform</span>
            <h2 className="jx-home__title">Meet <em>JuriNex</em></h2>
            <p className="jx-home__sub">The AI legal workspace built for Indian courts.</p>
            <p className="jx-home__lead">
              Upload a case once. JuriNex reads every page, builds the chronology, finds the
              authorities, and drafts court-ready documents, with every answer linked to the
              page it came from.
            </p>

            <ul className="jx-home__chips" aria-label="Built for">
              {AUDIENCE.map((a) => <li key={a}>{a}</li>)}
            </ul>

            <ul className="jx-home__features">
              {FEATURES.map((f) => (
                <li key={f.title}>
                  <span className="jx-home__icon" aria-hidden="true"><i className={`bi ${f.icon}`} /></span>
                  <div>
                    <h3>{f.title}</h3>
                    <p>{f.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="jx-home__actions">
              <a href={JURINEX_URL} target="_blank" rel="noopener noreferrer" className="hero-btn hero-btn--red">
                Start 7-day free trial
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2.5 11.5 L11.5 2.5 M4.5 2.5 H11.5 V9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </a>
              <Link to="/jurinex" className="jx-home__more">
                See how JuriNex works <i className="bi bi-arrow-right" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="jx-home__visual" data-aos="fade-up" data-aos-delay="120">
            <WorkspaceMock />
          </div>
        </div>

        <div className="jx-home__stats" data-aos="fade-up" data-aos-delay="80">
          {STATS.map(([value, label]) => (
            <div className="jx-home__stat" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
