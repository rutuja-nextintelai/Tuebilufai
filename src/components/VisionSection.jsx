const STATEMENT =
  'To become India\'s most trusted builder of domain-specific AI platforms that simplify complexity, enhance access, and deliver intelligent automation across legal, public, and enterprise sectors—starting with law and expanding to every document-driven workflow.'

const TAGLINE = 'Building the AI Infrastructure for India\'s Knowledge Economy.'

const FOCUS = ['Legal', 'Public sector', 'Enterprise', 'Document-driven workflows']

export default function VisionSection() {
  return (
    <section className="vsn" id="vision">
      <div className="vsn__grid" aria-hidden="true" />
      <div className="vsn__glow" aria-hidden="true" />

      <div className="container">
        <div className="vsn__layout">
          <div className="vsn__main" data-aos="fade-up">
            <span className="vsn__eyebrow">Our vision</span>
            <h2 className="vsn__title">Company <em>Vision</em></h2>

            <blockquote className="vsn__quote" data-aos="fade-up" data-aos-delay="120">
              <span className="vsn__mark" aria-hidden="true">&ldquo;</span>
              <p>{STATEMENT}</p>
            </blockquote>

            <p className="vsn__tagline" data-aos="fade-up" data-aos-delay="220">
              <span>{TAGLINE}</span>
            </p>

            <ul className="vsn__focus" data-aos="fade-up" data-aos-delay="300">
              {FOCUS.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="vsn__aside" data-aos="fade-left" data-aos-delay="180">
            <div className="vsn__scope">
              <span className="vsn__ring vsn__ring--1" aria-hidden="true" />
              <span className="vsn__ring vsn__ring--2" aria-hidden="true" />
              <span className="vsn__cross" aria-hidden="true" />
              <img
                src="/assets/img/vision2.png"
                alt="Target with arrow illustrating focused goals"
                className="vsn__img"
              />
            </div>
            <div className="vsn__badge" data-aos="zoom-in" data-aos-delay="420">
              <i className="bi bi-graph-up-arrow" aria-hidden="true" />
              <div>
                <strong>Impact-driven</strong>
                <span>milestone</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
