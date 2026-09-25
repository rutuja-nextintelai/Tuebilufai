// Vision statement on a dark band, same long-form treatment as WhoWeAre:
// muted copy with key phrases wrapped in <strong> so they read bright.
export default function OurVision() {
  return (
    <section className="abt-dark abt-who abt-vision" id="vision">
      <span className="abt-vision__glow" aria-hidden="true" />
      <div className="container">
        <div className="abt-who__inner" data-aos="fade-up">
          <span className="abt-eyebrow">Where we are headed</span>
          <h2 className="abt-who__title">Our vision</h2>

          <p>
            Our mission is to become <strong>India’s most trusted builder</strong> of{' '}
            <strong>domain-specific AI platforms</strong> that simplify complexity, enhance access and
            deliver intelligent automation. Tuebiluf AI connects OCR, multilingual NLP, LLMs and cloud
            infrastructure into systems that are reliable enough to run inside a courtroom or a bank
            branch, governed enough to earn trust and scalable enough to create measurable value.
          </p>

          <p>
            AI cannot stay <strong>trapped</strong> in pilots, demos and disconnected tools. The next
            advantage in India’s legal, public and enterprise sectors will belong to organisations that
            make AI part of <strong>how documents actually get processed</strong>, how decisions are
            made and how value compounds.
          </p>

          <p>
            We believe AI will become the <strong>infrastructure layer</strong> of India’s knowledge
            economy. The organisations that lead will build connected workflows where{' '}
            <strong>documents, language, models and human oversight</strong> work together with
            precision. Our role is to help them build that future now, starting with law and expanding
            to every <strong>document-driven workflow</strong>.
          </p>
        </div>
      </div>
    </section>
  )
}
