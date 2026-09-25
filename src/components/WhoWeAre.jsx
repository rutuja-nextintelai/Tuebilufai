// Long-form company statement on the dark band. Key phrases are wrapped in
// <strong> so they read bright against the muted body copy.
export default function WhoWeAre() {
  return (
    <section className="abt-dark abt-who" id="who-we-are">
      <div className="container">
        <div className="abt-who__inner" data-aos="fade-up">
          <span className="abt-eyebrow">About us</span>
          <h2 className="abt-who__title">Who we are?</h2>

          <p>
            <strong>Tuebiluf AI</strong> is a <strong>cutting-edge AI technology company</strong> that partners
            with <strong>legal, business, education and financial organisations</strong> that have invested in
            AI and need the document intelligence, data processing and language automation depth to make it
            perform at scale.
          </p>

          <p>
            What sets us apart is the way we combine <strong>AI/ML expertise with cloud-native engineering</strong>.
            We build production systems, not standalone experiments. Under every platform we deploy, there is
            OCR, multilingual NLP and LLM infrastructure that helps AI understand how Indian legal and business
            documents actually work. <strong>Connecting data, language and workflows</strong> into a single
            system is how we turn AI adoption into tangible value.
          </p>

          <p>
            Our journey has only been possible because of the team behind it. We work in an{' '}
            <strong>engineering-first culture</strong> where clean code, deep ownership and end-to-end thinking
            are table stakes. Engineers here do more than execute tickets. They shape how AI systems are{' '}
            <strong>architected, integrated and shipped to production</strong> on Google Cloud. Through{' '}
            <strong>founder-led technical execution</strong>, cross-functional exposure to the full AI stack and{' '}
            <strong>one-to-one mentorship</strong>, we help our people grow into leaders and innovators who build
            the <strong>AI-native way</strong>.
          </p>
        </div>
      </div>
    </section>
  )
}
