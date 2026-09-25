const BRAND = 'Tuebiluf AI'

const STATS = [
  { target: '15+', label: 'Indian languages supported' },
  { target: '100%', label: 'Data residency on GCP India' },
  { target: '24/7', label: 'Monitored cloud infrastructure' },
]

export default function MissionSection() {
  return (
    <section className="abt-mission" id="mission">
      <div className="container">
        <div className="abt-mission__layout">
          <div className="abt-mission__copy" data-aos="fade-up">
            <span className="abt-eyebrow">Our mission</span>
            <h2 className="abt-title">AI platforms designed for real document-driven workflows</h2>
            <p>
              {BRAND} Pvt. Ltd. is a cutting-edge AI technology company building scalable, cloud-native
              solutions for document intelligence, data processing, and language-based automation. With
              deep expertise in AI/ML, OCR, LLMs, and multilingual NLP, our systems process massive data
              volumes, enable real-time insights, and power intelligent workflows across the legal,
              business, education, and financial sectors.
            </p>
            <blockquote className="abt-mission__quote">
              <p>
                “Our vision is to become India’s most trusted builder of domain-specific AI platforms
                that simplify complexity, enhance access, and deliver intelligent automation.”
              </p>
            </blockquote>
          </div>

          <div className="abt-mission__aside" data-aos="fade-left" data-aos-delay="120">
            <div className="abt-stats">
              {STATS.map((s) => (
                <div className="abt-stat" key={s.label}>
                  <strong>{s.target}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
