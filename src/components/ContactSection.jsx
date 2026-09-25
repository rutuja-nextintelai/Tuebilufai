import ContactForm from './ContactForm.jsx'

const FIELDS = [
  { name: 'name', label: 'Name', placeholder: 'Your full name', col: 'col-md-6' },
  { name: 'phone', label: 'Phone', placeholder: 'Your phone number', type: 'tel', col: 'col-md-6' },
  { name: 'email', label: 'Email', placeholder: 'you@company.com', type: 'email', col: 'col-md-6' },
  { name: 'subject', label: 'Subject', placeholder: 'What is this about?', optional: true, col: 'col-md-6' },
  {
    name: 'message',
    label: 'Message',
    placeholder: 'Tell us about your project, requirements or question...',
    type: 'textarea',
    col: 'col-12',
    height: 150,
  },
]

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.583512394697!2d75.31421567597825!3d19.857567926970713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb9950f6d9837d%3A0x32c259041ea6be1f!2sNexIntel%20Ai%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1758194958157!5m2!1sen!2sin'

const OFFICES = [
  {
    name: 'Registered Office',
    lines: ['Plot 20, Mitramandal Co-Op Housing Society, New Usmanpura, Chhatrapati Sambhajinagar 431005, Maharashtra'],
  },
  {
    name: 'Development Office',
    lines: ['B11, c/o Grind Master Machines Pvt Ltd MIDC, Chhatrapati Sambhajinagar 431005'],
  },
]

const HOURS = [
  { days: 'Monday – Saturday', time: '9:00 AM – 6:00 PM' },
  { days: 'Sunday', time: 'Closed', closed: true },
]

const CHANNELS = [
  { icon: 'bi-envelope', title: 'Email', value: 'info@nexintelai.com', href: 'mailto:info@nexintelai.com' },
  { icon: 'bi-telephone', title: 'Phone', value: '+91 92264 08832', href: 'tel:+919226408832' },
  { icon: 'bi-whatsapp', title: 'WhatsApp', value: '+91 92264 08832', href: 'https://wa.me/919226408832', external: true },
]

export default function ContactSection({ withMap = false, compact = false }) {
  return (
    <section className={`ctc${compact ? ' ctc--tint' : ''}`} id="contact">
      <div className="container">
        {/* 01 — the form */}
        <div className="ctc__stepline" data-aos="fade-up">
          <span className="ctc__step">01</span>
          <span className="ctc__step-label">Send us a message</span>
        </div>

        <div className="ctc__grid">
          <div className="ctc__lede" data-aos="fade-up">
            <span className="ctc__kicker">Contact</span>
            <h2 className="ctc__display">
              Let's <em>connect</em>
            </h2>

            <div className="ctc__block">
              <span className="ctc__label">Our office</span>
              {OFFICES.map((o) => (
                <div className="ctc__office" key={o.name}>
                  <strong>{o.name}</strong>
                  {o.lines.map((l) => <p key={l}>{l}</p>)}
                </div>
              ))}
            </div>

            <div className="ctc__pair">
              <div>
                <span className="ctc__label">Phone</span>
                <a href="tel:+919226408832">+91 92264 08832</a>
              </div>
              <div>
                <span className="ctc__label">Email</span>
                <a href="mailto:info@nexintelai.com">info@nexintelai.com</a>
              </div>
            </div>

            <div className="ctc__block">
              <span className="ctc__label">Working hours</span>
              <ul className="ctc__hours">
                {HOURS.map((h) => (
                  <li key={h.days}>
                    <span>{h.days}</span>
                    <b className={h.closed ? 'is-closed' : undefined}>{h.time}</b>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="ctc__panel" data-aos="fade-up" data-aos-delay="100">
            <h3 className="ctc__panel-title">Let's build something together</h3>
            <ContactForm
              fields={FIELDS}
              submitLabel="Send message"
              sentText="Your message has been sent. Thank you!"
              blockSubmit
            />
          </div>
        </div>

        {/* 02 — direct channels */}
        <div className="ctc__stepline ctc__stepline--spaced" data-aos="fade-up">
          <span className="ctc__step">02</span>
          <span className="ctc__step-label">Connect with us</span>
        </div>

        <h2 className="ctc__display ctc__display--wide" data-aos="fade-up">
          Follow <em>Tuebiluf AI</em>
        </h2>

        <div className="ctc__channels">
          {CHANNELS.map((c, i) => (
            <a
              className="ctc__channel"
              key={c.title}
              href={c.href}
              target={c.external ? '_blank' : undefined}
              rel={c.external ? 'noreferrer' : undefined}
              data-aos="fade-up"
              data-aos-delay={i * 90}
            >
              <span className="ctc__channel-icon"><i className={`bi ${c.icon}`} aria-hidden="true" /></span>
              <h4>{c.title}</h4>
              <span className="ctc__channel-value">{c.value}</span>
              <span className="ctc__channel-go">
                {c.title} <i className="bi bi-arrow-right" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>

        {withMap && (
          <div className="ctc__map" data-aos="fade-up">
            <iframe
              title="Tuebiluf AI office location"
              src={MAP_SRC}
              loading="lazy"
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </div>
    </section>
  )
}
