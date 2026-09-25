
const CARDS = [
  {
    icon: 'bi-shield-lock',
    title: 'Secure by design',
    text: 'Client data never leaves India. Every platform runs in Google Cloud’s Indian region with encryption at rest and in transit, role-based access control and complete audit trails.',
    tags: ['GCP India region', 'Encryption', 'RBAC', 'Audit trails', 'IP protection'],
  },
  {
    icon: 'bi-cloud-check',
    title: 'Production-grade cloud stack',
    text: 'Built on the same infrastructure that runs enterprise workloads at scale, so high availability, low latency and cost control are part of the design, not an afterthought.',
    tags: ['Google Cloud', 'GKE', 'Vertex AI', 'LangChain', 'FastAPI'],
  },
  {
    icon: 'bi-translate',
    title: 'Ready for Indian jurisdictions',
    text: 'Language and legal format support is built in, from regional-language OCR to citation styles and procedural templates used by courts, NGOs and law firms.',
    tags: ['English', 'Hindi', 'Marathi', 'Citation formats', 'Court templates'],
  },
]

// Three numbered pillars on a textured light band, divided by hairlines.
// No imagery: the section reads as a specification rather than a brochure.
export default function CredibilitySection() {
  return (
    <section className="abt-cred" id="credibility">
      <div className="abt-cred__bg" aria-hidden="true">
        <span className="abt-cred__dots" />
        <span className="abt-cred__glow abt-cred__glow--1" />
        <span className="abt-cred__glow abt-cred__glow--2" />
      </div>

      <div className="container">
        <div className="abt-cred__head" data-aos="fade-up">
          <span className="abt-eyebrow">Trust &amp; delivery</span>
          <h2 className="abt-cred__title">
            Where trust meets <em>capability</em>
          </h2>
          <p className="abt-cred__lede">
            The delivery depth that gives courts, firms and enterprises the confidence to move with us.
          </p>
        </div>

        <div className="abt-cred__pillars">
          {CARDS.map((c, i) => (
            <article className="abt-cred__pillar" key={c.title} data-aos="fade-up" data-aos-delay={i * 90}>
              <div className="abt-cred__pillar-top">
                <span className="abt-cred__icon" aria-hidden="true"><i className={`bi ${c.icon}`} /></span>
                <span className="abt-cred__num" aria-hidden="true">0{i + 1}</span>
              </div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <ul className="abt-cred__tags">
                {c.tags.map((t) => (
                  <li key={t}><i className="bi bi-check-lg" aria-hidden="true" />{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
