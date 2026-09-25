import { useEffect, useRef, useState } from 'react'
import PageHero from '../components/PageHero.jsx'
import CtaBand from '../components/CtaBand.jsx'
import GetInTouch from '../components/GetInTouch.jsx'
import saurabhImg from '../assets/saurabh.jpg'
import santoshImg from '../assets/santosh.jpg'
import milindImg from '../assets/milind.jpg'

const MEMBERS = [
  {
    name: 'Mr. Saurabh Ramchandra Bhogale',
    role: 'Director (CEO)',
    photo: saurabhImg,
    bio: 'With a Commerce degree and specialized training in manufacturing system management from the UK, Saurabh brings a unique blend of business acumen and technical precision to Tuebiluf AI. Starting his career on the shop floor, he has transformed operations through lean manufacturing techniques, 5S implementation, and error-proof practices. His hands-on, process-driven leadership ensures our AI platforms are built with cutting-edge technology while maintaining robustness, quality, and operational excellence.',
    tags: ['Lean Manufacturing', '5S Implementation', 'Process Optimization', 'Quality Management'],
  },
  {
    name: 'Mr. Santosh Dehadrai',
    role: 'Director (CTO)',
    photo: santoshImg,
    bio: 'As a visionary leader at Tuebiluf AI, Santosh drives strategic innovation and business development initiatives. With extensive experience in technology leadership and market expansion, he focuses on identifying emerging opportunities in the AI landscape and building strategic partnerships. His forward-thinking approach and deep understanding of market dynamics ensure that Tuebiluf AI stays ahead of industry trends while delivering exceptional value to clients across diverse sectors.',
    tags: ['Strategic Planning', 'Business Development', 'Market Analysis', 'Partnership Management'],
  },
  {
    name: 'Mr. Milind Kelkar',
    role: 'Mentor',
    photo: milindImg,
    bio: 'Mr. Milind Kelkar serves as a guiding force at Tuebiluf AI, nurturing talent and fostering a culture of continuous learning. With deep expertise in operations research and data analytics, he mentors teams to think strategically, streamline processes, and embrace innovation. His approach goes beyond project execution—he instills problem-solving skills, encourages cross-functional collaboration, and empowers individuals to unlock their full potential. As a mentor, his vision and guidance shape future leaders, ensuring that the pursuit of excellence and scalability remains at the heart of Tuebiluf AI.',
    tags: ['Operations Management', 'Data Analytics', 'Workflow Optimization', 'Team Collaboration'],
  },
]

// How the leadership team runs the company; drawn from the biographies above.
const PRINCIPLES = [
  {
    icon: 'bi-person-check',
    title: 'Founder-led execution',
    text: 'The founders stay hands-on with product, delivery and client work, so market needs, product design and AI implementation never drift apart.',
  },
  {
    icon: 'bi-diagram-3',
    title: 'Discipline from the shop floor',
    text: 'Lean manufacturing habits such as 5S and error-proofing shape how we build software: repeatable processes, measured quality and no surprises in production.',
  },
  {
    icon: 'bi-compass',
    title: 'Strategy grounded in the market',
    text: 'We watch where the AI landscape is heading, choose opportunities carefully and build partnerships that make our platforms more valuable to clients.',
  },
  {
    icon: 'bi-mortarboard',
    title: 'Mentorship and continuous learning',
    text: 'Experienced mentors help the team think strategically, collaborate across functions and keep improving, so people grow alongside the products.',
  },
]

// Flip card: photo, name and role on the front; bio and skills on the back.
// Hover flips it on pointer devices; tap / Enter toggles it elsewhere.
function MemberCard({ member, index }) {
  const [flipped, setFlipped] = useState(false)
  const bioRef = useRef(null)
  const toggle = () => setFlipped((f) => !f)

  // Stretch the biography's line spacing so it fills the card down to the tags.
  useEffect(() => {
    const p = bioRef.current
    if (!p) return
    const card = p.closest('.flip__inner')
    let frame = 0
    const fit = () => {
      p.style.flex = 'none'
      p.style.lineHeight = '1.6'
      const content = p.scrollHeight
      p.style.flex = ''
      const available = p.clientHeight
      if (!available || !content) return
      const next = Math.min(2.2, Math.max(1.6, 1.6 * (available / content) * 0.98))
      p.style.lineHeight = next.toFixed(3)
    }
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(fit)
    }
    schedule()
    const observer = new ResizeObserver(schedule)
    if (card) observer.observe(card)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [])

  return (
    <div
      className={`flip${flipped ? ' is-flipped' : ''}`}
      tabIndex={0}
      role="button"
      aria-pressed={flipped}
      aria-label={`${member.name}, ${member.role}. Activate to read bio`}
      onClick={toggle}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle() } }}
    >
      <div className="flip__inner">
        <article className="flip__face flip__front">
          <img className="flip__photo" src={member.photo} alt={member.name} loading="lazy" />
          <span className="flip__shade" aria-hidden="true" />
          <span className="flip__num" aria-hidden="true">0{index + 1}</span>
          <span className="flip__open" aria-hidden="true"><i className="bi bi-arrow-up-right" /></span>
          <div className="flip__id">
            <span className="flip__role">{member.role}</span>
            <h3>{member.name}</h3>
            <span className="flip__hint"><i className="bi bi-arrow-repeat" /> Hover to read bio</span>
          </div>
        </article>

        <article className="flip__face flip__back" aria-hidden={!flipped}>
          <div className="flip__back-head">
            <img src={member.photo} alt="" />
            <div>
              <h3>{member.name}</h3>
              <span className="flip__role">{member.role}</span>
            </div>
          </div>
          <p ref={bioRef}>{member.bio}</p>
          <ul className="tag-list">
            {member.tags.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </article>
      </div>
    </div>
  )
}

export default function Team() {
  return (
    <>
      <PageHero
        crumbs={['Company', 'Team']}
        title="The people behind Tuebiluf AI"
        lead="Founder-led technical execution, keeping market needs, product design, and AI implementation tightly aligned."
      />

      <section className="section" id="team">
        <div className="container">
          <div className="intro__head" data-aos="fade-up">
            <div className="intro__head-copy">
              <span className="intro__eyebrow">Team</span>
              <h2 className="intro__title">
                Meet our <em>leadership team</em>
              </h2>
            </div>
            <p className="tm-lede">
              Tuebiluf AI is founder-led. The people below set the direction, stay close to delivery
              and mentor the team building our platforms.
            </p>
          </div>
          <div className="flip-grid">
            {MEMBERS.map((m, i) => (
              <div key={m.name} data-aos="fade-up" data-aos-delay={i * 80}>
                <MemberCard member={m} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint tm-lead" id="how-we-lead">
        <div className="container">
          <div className="intro__head" data-aos="fade-up">
            <div className="intro__head-copy">
              <span className="intro__eyebrow">How we lead</span>
              <h2 className="intro__title">
                What the team <em>brings to every build</em>
              </h2>
            </div>
            <p className="tm-lede">
              Different backgrounds, one way of working: understand the problem properly, build with
              discipline, and keep learning from the people who use what we ship.
            </p>
          </div>
          <ul className="tm-principles">
            {PRINCIPLES.map((p, i) => (
              <li className="tm-principle" key={p.title} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="tm-principle__icon" aria-hidden="true"><i className={`bi ${p.icon}`} /></span>
                <span className="tm-principle__num" aria-hidden="true">0{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Want to build with this team?"
        text="We are growing, and we are always keen to talk to engineers, designers and partners who care about solving real problems with AI."
        primary={{ to: '/careers', label: 'See open roles' }}
        secondary={{ to: '/contact', label: 'Talk to us' }}
      />

      <GetInTouch />
    </>
  )
}
