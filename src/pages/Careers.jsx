import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import GetInTouch from '../components/GetInTouch.jsx'
import LottieArt from '../components/LottieArt.jsx'
import { JOBS, APPLY_URL } from '../data/jobs.js'

const FEATURED = JOBS.filter((j) => j.featured).slice(0, 2)

const BRAND = 'Tuebiluf AI'

const CULTURE = [
  { title: 'Freedom to **shape** your **own** journey.', text: 'Instead of forcing you into a mould, we give you the room and the real problems to shape your own path, whether that is deeper into models, closer to customers or across both.' },
  { title: 'An environment of **curiosity**.', text: 'Your days will be filled with open conversations, experiments that are allowed to fail, and the complete freedom to bring an idea to the table on day one.' },
  { title: 'Collaborative & **supportive** teams.', text: 'You will work alongside founders and teammates who actually listen, celebrate your wins, and give credit where it is due.' },
  { title: 'Visible **growth** & **impact**.', text: 'Every platform you ship goes live in a courtroom, a bank branch or a classroom. You see the impact, and the people around you push you to get better.' },
]

// Swap these for team photos (landscape, ~1600×900) when available; a styled
// placeholder is shown if a file is missing.
const WHY = [
  { num: '01', text: 'Learning that never stops, or slows down', image: '/assets/img/careers/why-1.jpg', hint: 'Two engineers working side by side on laptops' },
  { num: '02', text: 'Where innovation is everyday work', image: '/assets/img/careers/why-2.jpg', hint: 'Team discussion around a laptop' },
  { num: '03', text: 'Make an impact across India’s courts, banks and classrooms', image: '/assets/img/careers/why-3.jpg', hint: 'Team gathered around a laptop' },
  { num: '04', text: 'An AI culture you don’t just experience, you help build', image: '/assets/img/careers/why-4.jpg', hint: 'Colleagues laughing together' },
]

// Apply now opens this Google Form in a new tab.


const FAQS = [
  { q: `How do I apply for a role at ${BRAND}?`, a: 'Browse the open roles above and click Apply now on the one that fits. The application form opens in a new tab. Every application is read by a person, not just a filter.' },
  { q: 'Can I apply for more than one role at a time?', a: 'Yes. If multiple roles match your skills and interests, apply to each one. Tailor each application to explain why you are a strong fit for that team.' },
  { q: 'What does the interview process look like?', a: 'Typically an initial conversation with the team, one or two technical or role-specific rounds, and a final discussion with a founder. We keep you informed at every stage.' },
  { q: 'Do you offer remote or hybrid work options?', a: 'We believe in flexibility. Depending on the role, we offer hybrid and remote-friendly arrangements around our Chhatrapati Sambhajinagar offices.' },
  { q: 'What is the best way to stand out in my application?', a: 'Show us how you think and what you have built. Concrete projects, the impact you created and genuine interest in document-driven AI go a long way.' },
  { q: 'Do you hire interns or fresh graduates?', a: 'Absolutely. We actively hire interns and fresh graduates and invest in mentorship and structured learning to help you grow from day one.' },
]

const OFFICES = [
  { name: 'Registered office', city: 'Chhatrapati Sambhajinagar', address: 'Plot 20, Mitramandal Co-Op Housing Society, New Usmanpura, Chhatrapati Sambhajinagar (Aurangabad) – 431005, Maharashtra' },
  { name: 'Development office', city: 'MIDC, Chhatrapati Sambhajinagar', address: 'B11, c/o Grind Master Machines Pvt Ltd, MIDC, Chhatrapati Sambhajinagar (Aurangabad) – 431005' },
]

// Photo tile that falls back to a themed placeholder while the file is missing
function WhyPhoto({ src, hint }) {
  const [missing, setMissing] = useState(false)
  if (missing) {
    return (
      <div className="cr-why__ph" role="img" aria-label={hint}>
        <i className="bi bi-people" aria-hidden="true" />
        <span>{hint}</span>
        <small>{src.split('/').pop()}</small>
      </div>
    )
  }
  return <img src={src} alt="" loading="lazy" onError={() => setMissing(true)} />
}

function SectionHead({ title, lede, light = false }) {
  return (
    <div className={`cr-head${light ? ' cr-head--light' : ''}`} data-aos="fade-up">
      <h2 className="cr-title">{title}</h2>
      {lede && <p className="cr-lede">{lede}</p>}
    </div>
  )
}

// Renders **bold** markers in a culture title as <strong>
const rich = (str) => str.split('**').map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))

// Flat vector cyclist riding to the left: geometric shapes, thin clean bike
// outlines, minimal face, limited palette. Wheels and crank turn
// counter-clockwise; each leg and shoe follows the pedal via path keyframes
// (inverse kinematics); the upper body bobs gently.
function Cyclist() {
  const wheels = [150, 360]
  return (
    <svg className="cr-bike" viewBox="0 0 520 317" role="img" aria-label="Illustration of a man riding a bicycle">
      <circle className="cr-bike__dome" cx="290" cy="395" r="255" />
      {/* signboard */}
      <g className="cr-bike__sign">
        <rect x="443" y="176" width="5" height="88" rx="2" className="cr-bike__pole" />
        <rect x="405" y="118" width="82" height="62" rx="6" className="cr-bike__board" />
        <circle cx="466" cy="136" r="9" className="cr-bike__sign-sun" />
        <path d="M405 180 L438 148 L458 168 L470 156 L487 174 L487 180 Z" className="cr-bike__sign-hill" />
        <rect x="411" y="118" width="9" height="22" className="cr-bike__sign-tab" />
      </g>
      {/* far leg + shoe */}
      <path className="cr-bike__leg cr-bike__leg--back" d="M306 170 L258.3 215.6 L302.0 265.0" />
      <path className="cr-bike__shoe cr-bike__shoe--back" d="M310.0 265.0 L286.0 265.0" />
      {/* wheels: thin outlines, simple spokes, flat hub */}
      {wheels.map((cx) => (
        <g className="cr-bike__wheel" key={cx} style={{ transformOrigin: `${cx}px 265px` }}>
          <circle cx={cx} cy="265" r="52" className="cr-bike__tyre" />
          <circle cx={cx} cy="265" r="44" className="cr-bike__rim" />
          {[0, 45, 90, 135].map((a) => (
            <line key={a} x1={cx} y1="221" x2={cx} y2="309" transform={`rotate(${a} ${cx} 265)`} className="cr-bike__spoke" />
          ))}
          <circle cx={cx} cy="265" r="14" className="cr-bike__hub-ring" />
          <circle cx={cx} cy="265" r="6" className="cr-bike__hub" />
        </g>
      ))}
      {/* frame */}
      <g className="cr-bike__frame">
        <path d="M280 265 L305 178 L180 180 L280 265 L360 265 L305 178 M180 180 L150 265" />
        <path d="M290 176 L320 176" className="cr-bike__seat" />
        <path d="M166 178 L194 178" className="cr-bike__bar" />
      </g>
      {/* crank + pedals */}
      <g className="cr-bike__crank" style={{ transformOrigin: '280px 265px' }}>
        <line x1="258" y1="265" x2="302" y2="265" />
        <rect x="296" y="261" width="12" height="8" rx="3" />
        <rect x="252" y="261" width="12" height="8" rx="3" />
      </g>
      <circle cx="280" cy="265" r="6" className="cr-bike__bb" />
      {/* trousers waist */}
      <path className="cr-bike__waist" d="M288 190 L324 178 L322 198 C314 206 298 208 290 204 Z" />
      {/* upper body (bobs): flat shirt, one-piece arms, simple head */}
      <g className="cr-bike__body">
        <path className="cr-bike__shirt" d="M290 190 L324 178 C322 148 294 116 252 104 L232 122 C264 134 284 158 290 190 Z" />
        <path className="cr-bike__sleeve cr-bike__sleeve--far" d="M248 132 L216 160 L188 184" />
        <path className="cr-bike__sleeve" d="M242 122 L210 150 L180 178" />
        <circle className="cr-bike__hand" cx="180" cy="179" r="6" />
        <path className="cr-bike__neck" d="M232 120 L224 108" />
        <circle className="cr-bike__head" cx="212" cy="88" r="22" />
        <path className="cr-bike__hair" d="M190 86 C190 60 232 54 236 82 C236 90 234 96 234 100 C230 84 216 80 190 86 Z" />
        <path className="cr-bike__beard" d="M192 96 C194 114 214 122 232 108 L234 98 C230 112 216 116 204 110 C198 107 194 102 192 96 Z" />
        <circle className="cr-bike__eye" cx="198" cy="88" r="2.4" />
        <circle className="cr-bike__ear" cx="230" cy="90" r="4" />
      </g>
      {/* near leg + shoe */}
      <path className="cr-bike__leg cr-bike__leg--front" d="M306 170 L247.2 199.9 L258.0 265.0" />
      <path className="cr-bike__shoe cr-bike__shoe--front" d="M266.0 265.0 L242.0 265.0" />
    </svg>
  )
}

// Life at: rotating culture statement on the left, cyclist on the right
function CultureSlider() {
  const [i, setI] = useState(0)
  const n = CULTURE.length
  const go = (d) => setI((c) => (c + d + n) % n)
  useEffect(() => {
    const t = setInterval(() => go(1), 7000)
    return () => clearInterval(t)
  }, [])
  const c = CULTURE[i]
  return (
    <div className="cr-life" data-aos="fade-up" data-aos-delay="100">
      <div className="cr-life__copy">
        <div className="cr-life__slide" key={i}>
          <h3>{rich(c.title)}</h3>
          <p>{c.text}</p>
        </div>
        <div className="cr-slider__nav">
          <button type="button" onClick={() => go(-1)} aria-label="Previous"><i className="bi bi-arrow-left" /></button>
          <div className="cr-slider__dots">
            {CULTURE.map((_, k) => (
              <button type="button" key={k} className={k === i ? 'is-active' : ''} onClick={() => setI(k)} aria-label={`Slide ${k + 1}`} />
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label="Next"><i className="bi bi-arrow-right" /></button>
        </div>
      </div>
      <div className="cr-life__art">
        {/* Drop a licensed animation at public/assets/lottie/life-at.json to replace the SVG rider */}
        <LottieArt src="/assets/lottie/life-at.json" className="cr-lottie" fallback={<Cyclist />} />
      </div>
    </div>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <div className="cr-faq" data-aos="fade-up" data-aos-delay="80">
      {FAQS.map((f, k) => (
        <div className={`cr-faq__item${open === k ? ' is-open' : ''}`} key={f.q}>
          <button type="button" aria-expanded={open === k} onClick={() => setOpen(open === k ? -1 : k)}>
            <span>{f.q}</span>
            <i className={`bi ${open === k ? 'bi-dash-lg' : 'bi-plus-lg'}`} aria-hidden="true" />
          </button>
          <div className="cr-faq__body"><p>{f.a}</p></div>
        </div>
      ))}
    </div>
  )
}

export default function Careers() {
  return (
    <>
      <PageHero
        crumbs={['Company', 'Careers']}
        title="Innovate, belong, and grow"
        lead={`Bring your whole self to a team that believes in you. At ${BRAND}, you will find a place that sees your potential, nurtures it, and celebrates it.`}
      />

      {/* Life at */}
      <section className="cr-band cr-band--light cr-band--life" id="life">
        <div className="container">
          <SectionHead
            title={<>Life at <em>{BRAND}</em></>}
            lede="A culture that grows around your whole self, not just the role you fill."
          />
          <CultureSlider />
        </div>
      </section>

      {/* Why join */}
      <section className="cr-band cr-band--dark" id="why-join">
        <div className="container">
          <SectionHead title={<>Why join <em>{BRAND}</em></>} lede="Because you deserve more than just a job." light />
          <div className="cr-why">
            {WHY.map((w, k) => (
              <div className={`cr-why__row${k % 2 ? ' cr-why__row--flip' : ''}`} key={w.text} data-aos="fade-up" data-aos-delay={k * 60}>
                <div className="cr-why__img"><WhyPhoto src={w.image} hint={w.hint} /></div>
                <div className="cr-why__copy">
                  <span className="cr-why__num">{w.num}</span>
                  <p>{w.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs + FAQ */}
      <section className="cr-band cr-band--light" id="openings">
        <div className="container">
          <SectionHead
            title={<>Job <em>opportunities</em></>}
            lede="From fresh challenges to career-defining roles, find the one that matches your ambitions."
          />
          <div className="cr-jobs">
            {FEATURED.map((j, k) => (
              <article className="cr-job" key={j.title} data-aos="fade-up" data-aos-delay={k * 80}>
                <span className="cr-job__flag"><i className="bi bi-stars" aria-hidden="true" /> Featured opening</span>
                <h3>{j.title}</h3>
                <span className="cr-job__meta">{j.type} · {j.location}</span>
                <p>{j.summary}</p>
                <div className="cr-job__actions">
                  <Link to={`/careers/openings#${j.slug}`} className="cr-job__link">View details <i className="bi bi-arrow-right" /></Link>
                  <a className="btn btn-dark btn-sm" href={APPLY_URL} target="_blank" rel="noopener noreferrer">
                    Apply now <i className="bi bi-arrow-up-right" />
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="cr-talent" data-aos="fade-up">
            <p>We are constantly looking for great talent. <span className="cr-talent__count">{JOBS.length} open roles</span></p>
            <Link to="/careers/openings" className="btn btn-red">Browse all openings <i className="bi bi-arrow-right" /></Link>
          </div>

          <SectionHead title={<>Frequently asked <em>questions</em></>} />
          <Faq />
        </div>
      </section>

      {/* Offices */}
      <section className="cr-band cr-band--dark" id="offices">
        <div className="container">
          <SectionHead title={<>Our <em>offices</em></>} light />
          <div className="cr-offices">
            {OFFICES.map((o, k) => (
              <article className="cr-office" key={o.name} data-aos="fade-up" data-aos-delay={k * 80}>
                <span className="cr-office__pin" aria-hidden="true"><i className="bi bi-geo-alt-fill" /></span>
                <span className="cr-office__kicker">{o.name}</span>
                <h3>{o.city}</h3>
                <p>{o.address}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <GetInTouch />
    </>
  )
}
