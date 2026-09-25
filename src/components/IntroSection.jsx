import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import aiBrowsingImg from '../assets/is-ai-going-to-be-the-future-of-web-browsing.avif'
import aiWebDevImg from '../assets/ai-web-development.png'

const BRAND = 'Tuebiluf AI'

const HIGHLIGHTS = {
  home: [
    {
      icon: 'bi-lightbulb',
      title: 'Intelligent Sector-Specific Automation',
      text: 'Empower lawyers, judges, and NGOs with AI-driven summarization, drafting, and case analysis tailored to Indian legal formats and regional languages.',
    },
    {
      icon: 'bi-cloud-check',
      title: 'Scalable Cloud-Native Solutions',
      text: 'AI-powered solutions tailored for legal, business, education, and financial workflows, enabling faster decision-making, reduced errors, and actionable insights across industries.',
    },
  ],
  company: [
    {
      icon: 'bi-lightbulb',
      title: 'Intelligent Sector-Specific Automation',
      text: 'Empower lawyers, judges, and NGOs with AI-driven summarization, drafting, and case analysis tailored to Indian legal formats and regional languages.',
    },
    {
      icon: 'bi-cloud-check',
      title: 'Scalable Cloud-Native Solutions',
      text: 'Leverage GCP-optimized AI/ML platforms for secure, cost-efficient processing of massive data volumes and real-time insights.',
    },
  ],
}

const TITLE_WORDS = ['Quick', 'introduction', 'to']

// Two magazine rows: photo with the paragraph card overlapping its corner, mirrored.
// Each card opens with an icon + caption tag naming what the paragraph covers.
const ROWS = [
  {
    icon: 'bi-building',
    label: 'Who we are',
    image: aiBrowsingImg,
    alt: 'Person using an AI-powered browser on a laptop',
    text: `${BRAND} Pvt. Ltd. is a cutting-edge AI technology company building scalable, cloud-native solutions for document intelligence, data processing, and language-based automation. With deep expertise in AI/ML, OCR, LLMs, and multilingual NLP, our systems are designed to process massive data volumes, enable real-time insights, and power intelligent workflows across industries. Our core platforms are built on Google Cloud Platform (GCP), optimized for security, speed, and cost-efficiency.`,
  },
  {
    icon: 'bi-stars',
    label: 'What we do',
    image: aiWebDevImg,
    alt: 'Illustration of AI-assisted web development',
    text: `${BRAND} delivers AI solutions that transform key sectors. In legal workflows, we streamline case research, drafting, and multilingual document analysis. For business and compliance, we automate financial reporting and regulatory checks. In education, AI enhances evaluation, plagiarism detection, and content summarization. In the financial sector, our systems digitize loan files, assess credit risk, and automate reporting. Across all sectors, ${BRAND}’s AI simplifies complexity, saves time, and delivers actionable insights.`,
  },
]

export default function IntroSection({ showLink = false, variant = 'home' }) {
  const photoRefs = useRef([])

  // Gentle parallax: each photo drifts a little against the scroll
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const vh = window.innerHeight
      photoRefs.current.forEach((el) => {
        if (!el) return
        const r = el.getBoundingClientRect()
        const t = (r.top + r.height / 2 - vh / 2) / vh // -1 … 1 through the viewport
        el.style.setProperty('--py', `${(t * -28).toFixed(1)}px`)
      })
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="intro" id="about">
      <div className="intro__glow" aria-hidden="true" />
      <div className="intro__mesh" aria-hidden="true" />
      <div className="container">
        <div className="intro__head" data-aos="fade-up">
          <div className="intro__head-copy">
            <span className="intro__eyebrow">About</span>
            <h2 className="intro__title" aria-label={`Quick introduction to ${BRAND}`}>
              {TITLE_WORDS.map((w, i) => (
                <span className="w" style={{ '--i': i }} key={w}>{w}&nbsp;</span>
              ))}
              <em>
                {BRAND.split(' ').map((w, i) => (
                  <span className="w" style={{ '--i': TITLE_WORDS.length + i }} key={w}>{w}&nbsp;</span>
                ))}
              </em>
            </h2>
          </div>
          {showLink && (
            <Link to="/company" className="hero-btn hero-btn--red intro__cta">
              Explore About us
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2.5 11.5 L11.5 2.5 M4.5 2.5 H11.5 V9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          )}
        </div>

        <div className="mag">
          {ROWS.map((r, i) => (
            <div className={`mag-row${i % 2 ? ' mag-row--flip' : ''}`} key={r.image} data-aos="fade-up" data-aos-delay="60">
              <span className="mag-row__orb" aria-hidden="true" />
              <div className="mag-row__photo" ref={(el) => { photoRefs.current[i] = el }}>
                <img src={r.image} alt={r.alt} loading={i === 0 ? 'eager' : 'lazy'} />
                <span className="mag-row__sweep" aria-hidden="true" />
              </div>
              <div className="mag-row__card">
                <div className="mag-row__meta">
                  <span className="mag-row__tag">
                    <i className={`bi ${r.icon}`} aria-hidden="true" />
                    {r.label}
                  </span>
                  <span className="mag-row__rule" />
                </div>
                <p>{r.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="intro__highlights" data-aos="fade-up" data-aos-delay="140">
          {HIGHLIGHTS[variant].map((h, i) => (
            <article className="intro-hl" style={{ '--i': i }} key={h.title}>
              <div className="intro-hl__meta">
                <span className="intro-hl__num">0{i + 1}</span>
                <span className="intro-hl__icon" aria-hidden="true"><i className={`bi ${h.icon}`} /></span>
              </div>
              <h3>{h.title}</h3>
              <p>{h.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
