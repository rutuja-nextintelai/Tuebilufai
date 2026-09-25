// Brand logos live in public/assets/img/stack; `tint` is the brand colour used
// for the icon chip so the column reads as colourful rather than monochrome.
const STACK = [
  { logo: 'googlecloud', tint: '#4285F4', name: 'Google Cloud Platform', detail: 'Compute, Cloud Run, BigQuery' },
  { logo: 'googlegemini', tint: '#4285F4', name: 'Google Vertex AI', detail: 'Gemini, PaLM, Document AI' },
  { logo: 'meta', tint: '#0467DF', name: 'Meta', detail: 'Llama 3.1, SAM 2' },
  { logo: 'openai', tint: '#10A37F', name: 'OpenAI', detail: 'GPT-5, ChatGPT, Whisper' },
  { logo: 'claude', tint: '#D97757', name: 'Claude', detail: 'Opus, Sonnet, Haiku' },
]

// Copy on the left; on the right a column of stack cards that scrolls upward
// without end over a vivid gradient band. The list is rendered twice so the
// loop never shows a seam.
export default function StackSection() {
  return (
    <section className="abt-stack" id="stack">
      <span className="abt-stack__glow abt-stack__glow--1" aria-hidden="true" />
      <span className="abt-stack__glow abt-stack__glow--2" aria-hidden="true" />
      <span className="abt-stack__glow abt-stack__glow--3" aria-hidden="true" />
      <div className="container">
        <div className="abt-stack__layout">
          <div className="abt-stack__copy" data-aos="fade-up">
            <h2 className="abt-stack__title">
              The AI stack we <em>build on</em>
            </h2>
            <p>
              AI models are only as useful as the infrastructure that runs them, and that infrastructure
              is only as trustworthy as the judgement behind it.
            </p>
            <p>
              Tuebiluf AI builds across the leading AI platforms, matching each model’s strengths to the
              workflow in front of it: long-context reasoning for case research, multilingual models for
              Indian-language documents, and vision models for scanned records. Every choice is weighed
              against data residency, cost of ownership and how easily it can be governed, observed and
              audited.
            </p>
            <p>
              The result is a purpose-built stack for document-driven work: not locked to a single
              vendor’s roadmap, never exposed to a single point of failure, and designed to keep
              compounding as each platform matures.
            </p>
          </div>

          <div className="abt-stack__ticker" data-aos="fade-up" data-aos-delay="120" aria-label="AI platforms we build on">
            <div className="abt-stack__track">
              {[0, 1].map((copy) => (
                <ul className="abt-stack__list" key={copy} aria-hidden={copy === 1}>
                  {STACK.map((s) => (
                    <li className="abt-stack__card" key={s.name}>
                      <span className="abt-stack__icon" style={{ '--tint': s.tint }} aria-hidden="true">
                        <img src={`/assets/img/stack/${s.logo}.svg`} alt="" loading="lazy" />
                      </span>
                      <div>
                        <strong>{s.name}</strong>
                        <span>{s.detail}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
