const BRAND = 'Tuebiluf AI'

const REASONS = [
  { icon: 'bi-geo-alt', title: 'India-centric product design', text: 'Built from the ground up for Indian legal, linguistic and policy environments, with local compliance and workflow compatibility.' },
  { icon: 'bi-layers', title: 'Deep document intelligence', text: 'OCR, NLP, LLMs and vector retrieval that turn unstructured legal and administrative records into actionable intelligence.' },
  { icon: 'bi-box-seam', title: 'SaaS productization engine', text: 'Complex AI architectures turned into scalable, low-cost platforms for NGOs, SMBs, courts and enterprises.' },
  { icon: 'bi-shield-lock', title: 'Secure & IP-conscious by design', text: 'Indian data residency, encryption and role-based access control protect customer IP and AI integrity.' },
  { icon: 'bi-globe2', title: 'Multi-jurisdiction ready', text: 'Support for Indian legal languages, citation formats and procedural templates used by courts, NGOs and legal firms.' },
  { icon: 'bi-people', title: 'Founder-led technical execution', text: 'CEO and CTO leadership keeps market needs, product design and AI implementation tightly aligned.' },
]

export default function WhySection() {
  return (
    <section className="abt-why" id="why-us">
      <div className="container">
        <div className="abt-head" data-aos="fade-up">
          <span className="abt-eyebrow">Differentiators</span>
          <h2 className="abt-title">Why {BRAND}</h2>
        </div>
        <div className="abt-why__grid">
          {REASONS.map((r, i) => (
            <article className="abt-card" key={r.title} data-aos="fade-up" data-aos-delay={60 + (i % 3) * 70}>
              <span className="abt-card__icon" aria-hidden="true"><i className={`bi ${r.icon}`} /></span>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
