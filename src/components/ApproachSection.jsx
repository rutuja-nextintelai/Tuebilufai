import { useEffect, useRef, useState } from 'react'

const STEPS = [
  {
    num: '01', title: 'Discover', icon: 'bi-search',
    text: 'Understand the problem and the people experiencing it.',
    body: [
      'Every product begins with understanding the problem before thinking about the solution. We study the challenges people and businesses face, understand existing workflows, identify inefficiencies, and explore where technology can make a meaningful difference.',
      'We focus on the real-world context behind a problem — who experiences it, why it exists, what makes it difficult, and what an effective solution should achieve.',
    ],
  },
  {
    num: '02', title: 'Research', icon: 'bi-lightbulb',
    text: 'Explore technology, AI capabilities, and potential solutions.',
    body: [
      'Once we understand the problem, we explore different approaches to solving it. Our research combines user needs with advances in artificial intelligence, machine learning, automation, software engineering, and emerging technologies.',
      'We experiment with ideas, evaluate different technologies, and identify the right combination of capabilities needed to build a practical and scalable product.',
      'Our goal is not to use technology simply because it is new, but to use the right technology where it can create meaningful value.',
    ],
  },
  {
    num: '03', title: 'Build', icon: 'bi-code-slash',
    text: 'Design and engineer scalable products.',
    body: [
      'Ideas become products through thoughtful design and strong engineering. We transform validated concepts into intuitive, reliable, and scalable software products.',
      'Our teams work across product design, frontend and backend engineering, AI systems, data, infrastructure, security, and user experience to create products that are built for real-world use.',
      'We focus on creating strong foundations so our products can evolve as users, technology, and business requirements change.',
    ],
  },
  {
    num: '04', title: 'Learn', icon: 'bi-arrow-repeat',
    text: 'Use real-world feedback to continuously improve.',
    body: [
      'Building a product does not end when the first version is released. Real learning begins when people start using it.',
      'We continuously observe how our products perform, listen to user feedback, analyze usage patterns, identify opportunities for improvement, and test new ideas.',
      'This continuous learning cycle helps us refine the product, improve the user experience, solve new challenges, and adapt to changing needs.',
    ],
  },
  {
    num: '05', title: 'Scale', icon: 'bi-graph-up-arrow',
    text: 'Grow products into reliable platforms serving more users.',
    body: [
      'When a product demonstrates meaningful value, we focus on building the foundation required for sustainable growth.',
      'We improve performance, reliability, security, infrastructure, and scalability while continuously expanding the product’s capabilities.',
      'Our objective is to transform successful ideas into robust products and platforms that can serve a growing number of users, businesses, and use cases while maintaining the quality and experience that made the product valuable in the first place.',
    ],
  },
]

const CYCLE_MS = 7000

// Five-step process path. The connector fills as the section scrolls into
// view and the steps light up one by one; hovering or tapping a step focuses
// it, and the panel underneath expands on the focused step. Cycling pauses
// while the pointer is over the path so the copy can be read.
export default function ApproachSection() {
  const pathRef = useRef(null)
  const [active, setActive] = useState(0)
  const [seen, setSeen] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const el = pathRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSeen(true) }, { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // once visible, walk through the steps, then keep cycling slowly
  useEffect(() => {
    if (!seen || paused) return
    const t = setInterval(() => setActive((a) => (a + 1) % STEPS.length), CYCLE_MS)
    return () => clearInterval(t)
  }, [seen, paused])

  const current = STEPS[active]

  return (
    <section className={`apr${seen ? ' is-seen' : ''}`} id="approach">
      <span className="apr__glow" aria-hidden="true" />
      <div className="container">
        <div className="apr__head" data-aos="fade-up">
          <div>
            <span className="apr__eyebrow">Our approach</span>
            <h2 className="apr__title">We believe great products start with <em>meaningful problems.</em></h2>
          </div>
          <p className="apr__lede">
            Our product development process combines research, technology, design, and continuous
            iteration to transform complex problems into simple, useful products.
          </p>
        </div>

        <div
          className="apr__path"
          ref={pathRef}
          style={{ '--active': active }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="apr__rail">
          <span className="apr__track" aria-hidden="true"><span className="apr__fill" /></span>
          <ol className="apr__steps">
            {STEPS.map((s, i) => (
              <li
                className={`apr__step${i === active ? ' is-active' : ''}${i < active ? ' is-done' : ''}`}
                key={s.num}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                style={{ '--i': i }}
              >
                <span className="apr__node" aria-hidden="true">
                  <i className={`bi ${s.icon}`} />
                  <span className="apr__ring" />
                </span>
                <div className="apr__card">
                  <span className="apr__num">{s.num} <span className="apr__dash">—</span> {s.title}</span>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          </div>

          <div className="apr__detail" key={current.num} aria-live="polite">
            <div className="apr__detail-head">
              <span className="apr__detail-num">{current.num}</span>
              <div>
                <span className="apr__detail-kicker">Step {current.num} of 0{STEPS.length}</span>
                <h3 className="apr__detail-title">{current.title}</h3>
                <p className="apr__detail-lede">{current.text}</p>
              </div>
            </div>
            <div className="apr__detail-body">
              {current.body.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <span className="apr__detail-progress" aria-hidden="true">
              {STEPS.map((s, i) => (
                <button
                  type="button"
                  key={s.num}
                  className={i === active ? 'is-on' : ''}
                  onClick={() => setActive(i)}
                  tabIndex={-1}
                />
              ))}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
