import { useEffect, useRef } from 'react'

const STRENGTHS = [
  { icon: '1.svg', title: 'India-centric AI product design', text: 'Purpose-built solutions for Indian legal, linguistic, and policy environments—designed from the ground up for local compliance, regional language support, and workflow compatibility.' },
  { icon: '2.svg', title: 'Deep expertise in document intelligence', text: 'Advanced pipelines combining OCR, NLP, LLMs, and vector retrieval to convert unstructured legal or administrative documents into structured, actionable intelligence.' },
  { icon: '3.svg', title: 'SaaS productization engine', text: 'Proven capability to turn complex AI architectures into scalable, low-cost SaaS platforms—tailored for NGOs, SMBs, courts, and enterprises.' },
  { icon: '4.svg', title: 'Cloud-native & scalable architecture', text: 'Robust infrastructure built on Google Cloud Platform (GCP), using Vertex AI, Kubernetes (GKE), LangChain, and FastAPI—ensuring high availability, low latency, and horizontal scalability.' },
  { icon: '5.svg', title: 'IP-conscious & secure by design', text: 'Every solution follows strict Indian data residency, encryption, and role-based access control (RBAC), with a focus on protecting customer IP and AI integrity.' },
  { icon: '6.svg', title: 'Multilingual & multi-jurisdiction ready', text: 'Support for Indian legal languages (English, Hindi, Marathi), citation formats, and procedural templates—enabling adoption by courts, NGOs, and legal firms.' },
  { icon: '7.svg', title: 'Founder-led technical execution', text: 'Strategic leadership from both CEO and CTO ensures tight alignment between market needs, product design, and AI implementation.' },
]

export default function StrengthsTimeline() {
  const listRef = useRef(null)

  // The centre line draws itself as the reader scrolls down the list
  useEffect(() => {
    const el = listRef.current
    if (!el) return
    const update = () => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const progress = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / r.height))
      el.style.setProperty('--line-progress', progress.toFixed(3))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <section className="section strengths" id="strengths">
      <div className="container">
        <div className="intro__head" data-aos="fade-up">
          <span className="intro__eyebrow">Our</span>
          <h2 className="intro__title">
            Core <em>strengths</em>
          </h2>
        </div>

        <ol className="tl" ref={listRef}>
          {STRENGTHS.map((s, i) => {
            const flip = i % 2 === 1
            return (
              <li className={`tl__item${flip ? ' tl__item--flip' : ''}`} key={s.title}>
                <div className="tl__icon" data-aos="zoom-in" data-aos-delay="100">
                  <img src={`/assets/img/${s.icon}`} alt="" width="40" height="40" />
                </div>
                <div className="tl__card" data-aos={flip ? 'fade-left' : 'fade-right'} data-aos-delay="150">
                  <span className="tl__num">0{i + 1}</span>
                  <h4>{s.title}</h4>
                  <p>{s.text}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
