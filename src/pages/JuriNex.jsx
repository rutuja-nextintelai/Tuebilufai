import { useEffect, useState, useCallback } from 'react'

import PageHero from '../components/PageHero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import DemoModal from '../components/DemoModal.jsx'
import GetInTouch from '../components/GetInTouch.jsx'

const JURINEX_URL = 'https://jurinex.ai/'

// Sample workspace shown in the overview mock; case names are the demo matters used on jurinex.ai
const MOCK_NAV = ['bi-grid-1x2', 'bi-folder2-open', 'bi-chat-dots', 'bi-file-earmark-richtext', 'bi-quote']
const MOCK_STATS = [['3', 'Active cases'], ['0', 'Hearings in 7 days'], ['1', 'Docs this month']]
const MOCK_CASES = [
  ['Sharma Traders vs Patil Industries', 'Writ Petition (Civil)', 'Active'],
  ['Verma Textiles vs State of Maharashtra', 'Writ Petition (Civil)', 'Active'],
  ['Sharma Traders vs Patil Industries', 'Writ Petition (Criminal)', 'Draft'],
]

const STATS = [
  { value: '5,00,000+', label: 'Pages processed' },
  { value: '95%', label: 'Accuracy' },
  { value: '100%', label: 'Data residency in India' },
]

// Built for Indian courts
const TECH = [
  { icon: 'deep-learning.svg', title: 'Supports Indian languages', text: 'Marathi, Hindi, Tamil, Telugu and other widely spoken Indian languages, so drafts and reports come out in the language the court and the client read.' },
  { icon: 'robot.svg', title: 'Built for the Indian court hierarchy', text: 'Drafts follow the formats expected by District Courts, High Courts, the Supreme Court and tribunals, so a filing is ready for the forum it is going to.' },
  { icon: 'compliance.svg', title: 'Zero-hallucination policy', text: 'Answers are drawn only from authorised, verified sources and pass multiple verification checks before they reach you. Gaps are flagged, never filled in.' },
  { icon: 'cloud.svg', title: 'Data sensitivity and security', text: 'All data is stored on infrastructure in India and handled under the Digital Personal Data Protection Act, 2023. No cross-border transfer, and end-to-end encryption for everything processed.' },
]

// The problem: six places the week goes
const PROBLEMS = [
  ['Hours lost to reading', 'Briefs, annexures, and precedents run into hundreds of pages before the real work begins.'],
  ['Research that drags', 'Finding the authority that actually supports your ground takes days of database trawling.'],
  ['Buried clauses and dates', 'The obligation, limitation date, or admission that decides the matter hides on page 214.'],
  ['Repetitive drafting', 'The same applications, notices, and replies get rebuilt from scratch, matter after matter.'],
  ['Scattered information', 'Facts live across emails, scans, and drafts. Nothing connects them into one case picture.'],
  ['Manual cross-checking', 'Reconciling pleadings against evidence and chronology is slow, error-prone work.'],
]
const SOLUTION = [
  'Every document analyzed, OCR included, the moment it lands in the case folder',
  'Ask questions in plain language and get answers grounded in your own papers',
  'Research, chronology, evidence matrix, and drafting share one case context',
]

// The Jurinex workflow
const WORKFLOW = [
  ['bi-cloud-arrow-up', '01 · Understand', 'Upload case documents', 'Scanned FIRs, bulky case files, judgments, affidavits. OCR extracts the text, RAG indexes it for semantic search, and the chronology builds automatically.'],
  ['bi-chat-square-text', '02 · Converse & summarize', 'Ask anything about the case', 'Ask questions in plain English across an entire case folder. Surface prior statements, cross-reference dates and pull key testimony in seconds.'],
  ['bi-file-earmark-text', '03 · Draft', 'Generate court-ready documents', 'Bail applications, petitions, writs, agreements. Upload your own templates or use the library, formatted for the bench you are filing in.'],
  ['bi-patch-check', '04 · Research & citation', 'Every citation verified', 'Court-approved format citations verified against source databases. If the system is not confident, it flags rather than invents.'],
  ['bi-safe2', '05 · Storage & case lifecycle', 'Every matter, end to end', 'Encrypted vault storage with full-text search. Track each case from filing through hearings to disposal, with deadlines, status and a clean archive.'],
]

// The platform
const FEATURES = [
  ['bi-file-earmark-text', 'AI Document Analysis', 'Upload petitions, contracts, and scanned briefs. Jurinex reads every page, OCR included, and returns structure, parties, dates, and issues in seconds.'],
  ['bi-list-columns', 'Intelligent Summarization', 'Structured, ground-wise summaries of lengthy filings, not vague abstracts.'],
  ['bi-chat-dots', 'Legal AI Assistant', 'Ask questions about your case files and get contextual answers that cite the exact passages they rely on.'],
  ['bi-quote', 'Citation Research', 'Find Indian Kanoon authorities matched to your pleaded grounds, with checks on whether a judgment still stands.'],
  ['bi-file-earmark-richtext', 'AI Drafting', 'Generate applications, notices, and pleadings from templates that follow your structure, section by section, in English or Marathi.'],
  ['bi-calendar-range', 'Evidence Matrix & Chronology', 'Auto-built timelines and evidence tables that map each fact to its source document.'],
  ['bi-translate', 'Legal Translation', 'Translate documents between English and regional languages with Devanagari-ready exports.'],
  ['bi-safe2', 'Secure Case Workspace', 'Organized matter folders with team roles, device-session controls, and private storage, from intake to final filing.'],
]

// Built for every stage of legal work
const USE_CASES = [
  ['bi-buildings', 'Law Firms', 'Juniors upload and organize; seniors analyze and draft. Shared case folders keep the whole team on one version of the truth.'],
  ['bi-briefcase', 'Corporate Legal Teams', 'Manage contracts, notices, and internal legal documents with structured extraction of obligations and key dates.'],
  ['bi-hammer', 'Litigation Teams', 'Build chronologies and evidence matrices from case materials, and find the fact that matters before the other side does.'],
  ['bi-search', 'Legal Researchers', 'Search judgments in natural language and get authorities matched to specific grounds, not keyword noise.'],
  ['bi-clipboard-check', 'Compliance Teams', 'Review policies and regulatory documents with AI extraction of duties, deadlines, and exposure.'],
  ['bi-person-badge', 'Individual Attorneys', 'A solo practice with the document-handling depth of a large chamber: reading, research, and drafting handled.'],
]

// The AI engine
const ENGINE_GROUPS = ['Understand the record', 'Extract and find', 'Produce and verify']
const ENGINE = [
  ['Context-aware analysis', 'The AI holds your whole case in context. Answers reflect the full record, not one page.'],
  ['Multi-document reasoning', 'Connects facts across 50+ documents in a single matter folder.'],
  ['Long-document processing', 'Handles filings running to hundreds of pages, scanned or digital.'],
  ['Structured extraction', 'Parties, dates, clauses, obligations, and reliefs pulled into usable structure.'],
  ['Semantic search', 'Finds passages by meaning, so the answer surfaces even when the wording differs.'],
  ['Summarization', 'Ground-wise, structured summaries tuned for legal reading.'],
  ['Question answering', 'Grounded responses with references back to your source documents.'],
  ['Draft generation', 'Section-by-section drafting that follows your templates and instructions.'],
  ['Grounded citations', 'Research results link to the underlying judgments. Verify everything.'],
]

// Security & confidentiality
const SECURITY = [
  ['bi-shield-lock', 'Secure authentication', 'Token-based sign-in with session controls. See every device logged into your account and revoke any of them.'],
  ['bi-lock', 'Encrypted data transfer', 'Documents and messages move over encrypted HTTPS connections end to end.'],
  ['bi-geo-alt', 'Data residency in India', 'All data storage infrastructure is in India, with a no cross-border data transfer policy. DPDPA compliant.'],
  ['bi-people', 'Role-based permissions', 'Firm admins control who can upload, analyze, and manage cases across the team.'],
  ['bi-phone', 'Device session limits', 'Concurrent-device caps and a live "where you are logged in" view guard against shared credentials.'],
  ['bi-credit-card', 'Trusted payments', 'Subscriptions are processed by Razorpay. Card details never touch our servers.'],
]

const TRUST_MARKS = ['Stored in India', 'DPDP Act compliant', 'End-to-end encrypted', 'No cross-border transfer']

// Why legal professionals choose Jurinex
const WHY = [
  ['bi-bank', 'Built for Indian legal practice', 'Indian Kanoon research, Indian citation formats, bilingual drafting, and pricing in rupees. Not a Western tool with a coat of paint.'],
  ['bi-patch-check', 'Answers you can verify', 'Summaries, research, and chat responses reference the documents and judgments behind them.'],
  ['bi-layers', 'The whole case in context', 'Context caching keeps your entire matter in the AI’s working memory across sessions. No re-uploading, no re-explaining.'],
  ['bi-diagram-3', 'Intake to filing, one place', 'Upload, analysis, research, evidence, drafting, and export to Word or PDF. A complete pipeline, not a point tool.'],
]

// Outcomes
const OUTCOMES = [
  ['Read less. Understand more.', 'A 300-page brief becomes a structured summary, a chronology, and an evidence table before your first cup of chai is done.'],
  ['Research faster.', 'Authorities matched to your pleaded grounds from Indian Kanoon, with the reasoning for why each one fits.'],
  ['Draft smarter.', 'Filings generated from your own templates and the actual case record, ready for a senior’s red pen instead of a blank page.'],
  ['Work with confidence.', 'Every AI answer points back to its source, so you can verify before you rely.'],
]

const PRACTICES = [
  { num: 'I', name: 'Solo practitioners', seats: '3 seats' },
  { num: 'II', name: 'Small law firms', seats: '4 to 10 seats' },
  { num: 'III', name: 'Large law firms & enterprises', seats: '11 and above seats' },
]

const PLATFORMS = [
  { icon: 'bi-building', name: 'BizNex', subtitle: 'Business & Compliance AI Platform', text: 'Automates GST filings, compliance checks, and financial summaries.', audience: 'SMEs, Corporates, Business Consultants', features: ['Auto-check missing compliance clauses', 'Intelligent invoice OCR processing', 'Automated contract auditing'] },
  { icon: 'bi-bank2', name: 'FinNex', subtitle: 'Financial & Banking AI Platform', text: 'Loan file digitization, credit risk analysis, and automated contract compliance.', audience: 'Banks, NBFCs, Fintech Organization', features: ['AI-driven creditworthiness scoring', 'Fraud detection', 'Automated regulatory reports'] },
  { icon: 'bi-mortarboard', name: 'EduNex', subtitle: 'Education AI Platform', text: 'Automates exam paper evaluation, plagiarism detection, and academic content summarization.', audience: 'Universities, Schools, EdTech Organization', features: ['AI-generated lesson briefs', 'Multilingual transcripts', 'Research summarization'] },
]

export default function JuriNex() {
  const [modalOpen, setModalOpen] = useState(false)
  const [feature, setFeature] = useState(0)
  const [featurePaused, setFeaturePaused] = useState(false)

  // cycle the platform showcase slowly; hovering or focusing it pauses the cycle
  useEffect(() => {
    if (featurePaused) return
    const id = setInterval(() => setFeature((f) => (f + 1) % FEATURES.length), 4500)
    return () => clearInterval(id)
  }, [featurePaused])
  const openModal = useCallback((e) => { e?.preventDefault(); setModalOpen(true) }, [])
  const closeModal = useCallback(() => setModalOpen(false), [])

  return (
    <>
      <PageHero
        crumbs={['Platforms', 'JuriNex']}
        title="Enterprise-grade legal operating system for law professionals, powered by AI"
        lead="Work faster, practice smarter with the power of AI. Jurinex handles your research, drafting, citations and case files, purpose-built for Indian courts and Indian languages."
      />

      <section className="section pb-0" id="overview">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="jxm" aria-hidden="true">
                <div className="jxm__glow" />
                <div className="jxm__window">
                  <div className="jxm__bar">
                    <span /><span /><span />
                    <em>jurinex.ai / workspace</em>
                  </div>
                  <div className="jxm__body">
                    <aside className="jxm__nav">
                      <span className="jxm__logo">J</span>
                      {MOCK_NAV.map((ic, i) => <i className={`bi ${ic}${i === 1 ? ' is-on' : ''}`} key={ic} />)}
                    </aside>
                    <div className="jxm__main">
                      <div className="jxm__head">
                        <div>
                          <strong>Case briefs</strong>
                          <span>Manage, track and analyze every matter</span>
                        </div>
                        <b>+ New case</b>
                      </div>
                      <div className="jxm__stats">
                        {MOCK_STATS.map(([n, l]) => <div key={l}><strong>{n}</strong><span>{l}</span></div>)}
                      </div>
                      <div className="jxm__table">
                        <div className="jxm__tr jxm__tr--head"><span>Title</span><span>Type</span><span>Status</span></div>
                        {MOCK_CASES.map(([t, ty, st], i) => (
                          <div className="jxm__tr" key={i} style={{ '--i': i }}>
                            <span>{t}</span><span>{ty}</span><span className={`jxm__pill${st === 'Draft' ? ' jxm__pill--muted' : ''}`}>{st}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="jxm__chat">
                  <div className="jxm__q"><i className="bi bi-person" /> What is the limitation date in this matter?</div>
                  <div className="jxm__a">
                    <i className="bi bi-stars" />
                    <div>
                      <span className="jxm__typing"><span /><span /><span /></span>
                      <p>Answer grounded in your own papers, with the exact passages cited.</p>
                      <small><i className="bi bi-link-45deg" /> 3 sources · Annexure P-3, p. 214</small>
                    </div>
                  </div>
                </div>

                <div className="jxm__cite">
                  <i className="bi bi-patch-check-fill" />
                  <div>
                    <strong>Citation verified</strong>
                    <span>Court-approved format · still good law</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <span className="eyebrow">Developed, tried and tested by experienced lawyers</span>
              <h2 className="jx-title">Research, drafting, citations and case files in one place</h2>
              <p className="text-lead">
                Jurinex turns scanned FIRs, judgments, affidavits and bulky case files into searchable,
                summarised, court-ready work: ask questions across a whole matter, generate drafts formatted
                for the bench you are filing in, and verify every citation against source databases.
              </p>
              <p className="text-muted-2">
                Not adapted for India as an afterthought. Engineered around the forums, formats and
                languages Indian practice actually runs on.
              </p>
              <div className="jx-stats">
                {STATS.map((st) => (
                  <div className="jx-stat" key={st.label}>
                    <strong>{st.value}</strong>
                    <span>{st.label}</span>
                  </div>
                ))}
              </div>
              <div className="jx-actions">
                <a href={JURINEX_URL} target="_blank" rel="noopener" className="btn btn-red">
                  Start free trial <i className="bi bi-arrow-up-right" />
                </a>
                <button type="button" className="btn btn-outline-dark" onClick={openModal}>Request a demo</button>
              </div>
            </div>
          </div>

          <div className="jxd-pillars" data-aos="fade-up">
            {TECH.map((t, i) => (
              <div className="jxd-pillar" key={t.title} style={{ '--i': i }}>
                <span className="jxd-pillar__icon"><img src={`/assets/img/${t.icon}`} alt="" /></span>
                <h4>{t.title}</h4>
                <p>{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint pb-0" id="problem">
        <div className="container">
          <div className="jxd-split">
            <div className="jxd-split__aside" data-aos="fade-up">
              <span className="intro__eyebrow">The problem</span>
              <h2 className="intro__title">
                Legal work shouldn’t be slowed down by <em>information overload</em>
              </h2>
              <p className="jx-lede">
                The practice of law is judgment and strategy. Yet most of a legal professional’s week
                disappears into reading, searching, and re-typing.
              </p>
              <span className="jxd-split__note">Six places the week goes</span>
            </div>
            <ol className="jxd-list" data-aos="fade-up" data-aos-delay="80">
              {PROBLEMS.map(([title, text], i) => (
                <li className="jxd-list__row" key={title}>
                  <span className="jxd-list__num">0{i + 1}</span>
                  <div>
                    <h4>{title}</h4>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="jxd-band" data-aos="fade-up">
          <div className="container jxd-band__inner">
            <div className="jxd-band__copy">
              <span className="eyebrow eyebrow--light">The solution</span>
              <h3>One intelligent workspace for your legal work</h3>
              <p>
                Upload a matter once. Jurinex processes every page, including scans, then keeps the entire
                case in context: summaries, chronology, evidence, research, and drafts all draw from the same
                understanding of your file.
              </p>
            </div>
            <ol className="jxd-stepper">
              {SOLUTION.map((t, i) => (
                <li key={t}><span>{i + 1}</span><p>{t}</p></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section" id="workflow">
        <div className="container">
          <div className="intro__head" data-aos="fade-up">
            <div className="intro__head-copy">
              <span className="intro__eyebrow">How it works</span>
              <h2 className="intro__title">
                The Jurinex <em>workflow</em>
              </h2>
            </div>
            <p className="jx-lede">
              A single pipeline carries your matter from raw papers to a hearing-ready position, and all the
              way to a clean archive. Every step works from the same case context: nothing is re-uploaded,
              nothing is re-explained.
            </p>
          </div>
          <ol className="jxd-timeline" data-aos="fade-up">
            {WORKFLOW.map(([icon, step, title, text], i) => (
              <li className="jxd-timeline__step" key={step} style={{ '--i': i }}>
                <span className="jxd-timeline__node"><i className={`bi ${icon}`} /></span>
                <span className="jxd-timeline__label">{step}</span>
                <h4>{title}</h4>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section pt-0" id="features">
        <div className="container">
          <div className="intro__head" data-aos="fade-up">
            <div className="intro__head-copy">
              <span className="intro__eyebrow">The platform</span>
              <h2 className="intro__title">
                Everything you need to <em>work smarter</em>
              </h2>
            </div>
            <p className="jx-lede">
              One connected workspace where documents, research, evidence, and drafting share the same
              understanding of your case.
            </p>
          </div>

          <div
            className="jxd-showcase"
            data-aos="fade-up"
            onMouseEnter={() => setFeaturePaused(true)}
            onMouseLeave={() => setFeaturePaused(false)}
            onFocus={() => setFeaturePaused(true)}
            onBlur={() => setFeaturePaused(false)}
          >
            <ul className="jxd-showcase__nav" role="tablist" aria-label="Platform features">
              {FEATURES.map(([, title], i) => (
                <li key={title}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={i === feature}
                    className={i === feature ? 'is-active' : ''}
                    onClick={() => setFeature(i)}
                    onMouseEnter={() => setFeature(i)}
                  >
                    <span>0{i + 1}</span>{title}
                  </button>
                </li>
              ))}
            </ul>
            <div className="jxd-showcase__panel" key={feature} role="tabpanel">
              <i className={`bi ${FEATURES[feature][0]}`} aria-hidden="true" />
              <h3>{FEATURES[feature][1]}</h3>
              <p>{FEATURES[feature][2]}</p>
              <span className="jxd-showcase__count">0{feature + 1} / 0{FEATURES.length}</span>
            </div>
          </div>

          <div className="jxd-strip" data-aos="fade-up">
            <div className="jxd-strip__head">
              <h3>Built for every kind of legal practice</h3>
              <p>Whether you’re a solo practitioner or a corporate legal team, Jurinex is the solution. Plans and workspaces scale from a single chamber to a multi-partner firm.</p>
            </div>
            {PRACTICES.map((pr) => (
              <div className="jxd-strip__cell" key={pr.name}>
                <span className="jxd-strip__num">{pr.num}</span>
                <strong>{pr.name}</strong>
                <span>{pr.seats}</span>
              </div>
            ))}
          </div>

          <div className="jxd-usecases">
            <div className="intro__head" data-aos="fade-up">
              <div className="intro__head-copy">
                <span className="intro__eyebrow">Built for every stage of legal work</span>
                <h2 className="intro__title">
                  Six ways teams <em>use Jurinex</em>
                </h2>
              </div>
            </div>
            <ul className="jxd-rows" data-aos="fade-up">
              {USE_CASES.map(([icon, title, text]) => (
                <li className="jxd-row" key={title}>
                  <span className="jxd-row__icon"><i className={`bi ${icon}`} /></span>
                  <div>
                    <h4>{title}</h4>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--tint" id="engine">
        <div className="container">
          <div className="intro__head" data-aos="fade-up">
            <div className="intro__head-copy">
              <span className="intro__eyebrow">The AI engine</span>
              <h2 className="intro__title">
                The intelligence <em>behind the platform</em>
              </h2>
            </div>
            <p className="jx-lede">
              Every feature on the surface is powered by the same set of legal-tuned AI capabilities underneath.
            </p>
          </div>
          <div className="jxd-columns" data-aos="fade-up">
            {ENGINE_GROUPS.map((group, g) => (
              <div className="jxd-column" key={group}>
                <span className="jxd-column__label"><i className="bi bi-cpu" /> {group}</span>
                <ul>
                  {ENGINE.slice(g * 3, g * 3 + 3).map(([title, text]) => (
                    <li key={title}>
                      <strong>{title}</strong>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark" id="security">
        <div className="container">
          <div className="jxd-split jxd-split--dark">
            <div className="jxd-split__aside" data-aos="fade-up">
              <span className="intro__eyebrow intro__eyebrow--light">Security &amp; confidentiality</span>
              <h2 className="intro__title intro__title--light">
                Your legal data deserves <em>enterprise-grade protection</em>
              </h2>
              <p className="jx-lede jx-lede--light">
                Privilege and confidentiality are not features; they are the baseline. Case files stay inside
                your workspace, access is controlled at every layer, and you can see exactly who is signed in,
                from where. Matters are isolated per workspace, and what your team uploads is visible only to
                the people you grant access.
              </p>
              <ul className="jxd-marks">
                {TRUST_MARKS.map((m) => <li key={m}><i className="bi bi-shield-check" /> {m}</li>)}
              </ul>
            </div>
            <ul className="jxd-seclist" data-aos="fade-up" data-aos-delay="80">
              {SECURITY.map(([icon, title, text]) => (
                <li key={title}>
                  <i className={`bi ${icon}`} aria-hidden="true" />
                  <div>
                    <h4>{title}</h4>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="why">
        <div className="container">
          <div className="intro__head" data-aos="fade-up">
            <div className="intro__head-copy">
              <span className="intro__eyebrow">Why Jurinex</span>
              <h2 className="intro__title">
                Why legal professionals <em>choose Jurinex</em>
              </h2>
            </div>
            <p className="jx-lede">
              Not another general-purpose chatbot with a legal skin: a platform built around how matters are actually run.
            </p>
          </div>
          <div className="jxd-reasons" data-aos="fade-up">
            {WHY.map(([icon, title, text], i) => (
              <div className="jxd-reason" key={title} style={{ '--i': i }}>
                <div className="jxd-reason__meta">
                  <span className="jxd-reason__num">0{i + 1}</span>
                  <i className={`bi ${icon}`} aria-hidden="true" />
                </div>
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            ))}
          </div>

          <div className="jxd-outcomes" data-aos="fade-up">
            <div className="jxd-outcomes__head">
              <span className="intro__eyebrow">Outcomes</span>
              <h3>What changes when the reading is done for you</h3>
            </div>
            <ul className="jxd-outcomes__list">
              {OUTCOMES.map(([title, text]) => (
                <li key={title}><strong>{title}</strong><span>{text}</span></li>
              ))}
            </ul>
            <p className="jxd-outcomes__note">
              <i className="bi bi-people" /> Built with practicing advocates. Every workflow was shaped in a working
              chamber before it shipped, not designed from a spec.
            </p>
          </div>
        </div>
      </section>

      <section className="section pb-0 pt-0" id="cta">
        <CtaBand
          title="Ready to transform your legal workflow?"
          text="Bring document intelligence, AI research, evidence analysis, and drafting into one secure workspace built for legal professionals. Start your 7-day free trial today."
          primary={{ label: 'Schedule a demo', onClick: openModal }}
          secondary={{ to: JURINEX_URL, label: 'Visit jurinex.ai', external: true }}
        />
      </section>

      <section className="section" id="platforms">
        <div className="container">
          <div className="intro__head" data-aos="fade-up">
            <div className="intro__head-copy">
              <span className="intro__eyebrow">Our platforms</span>
              <h2 className="intro__title">
                Coming soon: <em>AI solutions</em>
              </h2>
            </div>
          </div>
          <div className="row g-4">
            {PLATFORMS.map((p, i) => (
              <div className="col-md-6 col-lg-4" key={p.name} data-aos="fade-up" data-aos-delay={i * 80}>
                <div className="platform-card h-100">
                  <div className="platform-card__head">
                    <span className="platform-card__icon"><i className={`bi ${p.icon}`} /></span>
                    <span className="tag tag--grey">Coming soon</span>
                  </div>
                  <h4>{p.name}</h4>
                  <span className="platform-card__sub">{p.subtitle}</span>
                  <p>{p.text}</p>
                  <div className="platform-card__aud">
                    <span>Demographic</span> {p.audience}
                  </div>
                  <ul className="check-list">
                    {p.features.map((f) => <li key={f}><i className="bi bi-check-lg" /> {f}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GetInTouch />

      <DemoModal open={modalOpen} onClose={closeModal} />
    </>
  )
}
