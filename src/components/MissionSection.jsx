import { useEffect, useRef, useState } from 'react'

const BRAND = 'Tuebiluf AI'

const STATS = [
  { target: '4+', label: 'Sector-specific AI platforms' },
  { target: '3', label: 'Indian languages supported' },
  { target: '100%', label: 'Data residency on GCP India' },
]

// Counts from 0 up to the number inside `target` once the stat scrolls into
// view, keeping any prefix/suffix characters (+, %, K) fixed around it.
function StatCounter({ target, label }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  const [shown, setShown] = useState(target)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setSeen(true)
    }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!seen) return
    const num = parseFloat(target.replace(/[^0-9.]/g, ''))
    if (Number.isNaN(num)) return
    const suffix = target.replace(/[0-9.]/g, '')
    let raf = 0
    let t0 = null
    const tick = (now) => {
      if (t0 === null) t0 = now
      const p = Math.min((now - t0) / 1600, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      if (p >= 1) setShown(target)
      else {
        setShown(Math.floor(eased * num) + suffix)
        raf = requestAnimationFrame(tick)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, target])

  return (
    <div className="abt-stat" ref={ref}>
      <strong>{shown}</strong>
      <span>{label}</span>
    </div>
  )
}

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
              {STATS.map((s) => <StatCounter key={s.label} {...s} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
