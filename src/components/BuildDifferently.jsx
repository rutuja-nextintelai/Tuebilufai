const PILLARS = [
  {
    title: 'Driving research to production',
    text: 'A working demo is where our job starts, not where it ends. Every model we train is wrapped in deployment, monitoring and governance so it keeps performing once it meets real case files and real users.',
  },
  {
    title: 'Founders with engineering depth',
    text: 'Our founders write architecture and sit in customer calls. What to build and how to build it get decided in the same conversation, so nothing is lost in a handoff between strategy and engineering.',
  },
  {
    title: 'Strong document & language foundation',
    text: 'Court orders, GST filings, loan files and exam scripts each have their own structure and language. We encode that domain knowledge, from citation formats to Hindi and Marathi, into the pipeline itself.',
  },
  {
    title: 'Measurable outcomes built in',
    text: 'Before a platform goes live we agree on the numbers: extraction accuracy, turnaround time, data residency. Every release is measured against those benchmarks, not against a feeling.',
  },
]

// Split layout on the dark band: sticky heading on the left, a numbered list
// of principles with hairline separators on the right.
export default function BuildDifferently() {
  return (
    <section className="abt-dark abt-build" id="how-we-build">
      <div className="container">
        <div className="abt-build__layout">
          <div className="abt-build__intro" data-aos="fade-up">
            <span className="abt-eyebrow">Our approach</span>
            <h2 className="abt-build__title">How we build differently</h2>
            <p>
              Four habits that shape every platform we ship, from the first OCR pass to the
              day it goes live in a courtroom or a bank branch.
            </p>
          </div>

          <ol className="abt-build__list">
            {PILLARS.map((p, i) => (
              <li className="abt-principle" key={p.title} data-aos="fade-up" data-aos-delay={60 + i * 60}>
                <span className="abt-principle__num" aria-hidden="true">0{i + 1}</span>
                <div className="abt-principle__body">
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
                <i className="bi bi-arrow-up-right abt-principle__arrow" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
