import { useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * Closing band used at the foot of every page: points visitors at the contact
 * page and collects newsletter sign-ups. On the contact page itself pass
 * `newsletterOnly` so the redundant call to action is dropped. The subscribe
 * handler only reports success locally — wire it to a backend when one exists.
 */
export default function GetInTouch({ newsletterOnly = false }) {
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    e.currentTarget.reset()
    setSubscribed(true)
  }

  return (
    <section className={`gtouch${newsletterOnly ? ' gtouch--news-only' : ''}`} id="get-in-touch">
      <div className="gtouch__grid" aria-hidden="true" />
      <div className="gtouch__prisms" aria-hidden="true">
        <span className="gtouch__glow" />
        <span className="gtouch__prism gtouch__prism--1" />
        <span className="gtouch__prism gtouch__prism--2" />
        <span className="gtouch__prism gtouch__prism--3" />
        <span className="gtouch__prism gtouch__prism--4" />
      </div>
      <div className="container">
        {!newsletterOnly && (
          <div className="gtouch__top" data-aos="fade-up">
            <div className="gtouch__lede">
              <span className="gtouch__kicker">Contact</span>
              <h2 className="gtouch__title">
                Get in touch with <em>Tuebiluf AI</em>
              </h2>
              <p className="gtouch__text">
                Have a question, a requirement, or an idea you'd like to discuss? Send us a message and
                our team will get back to you.
              </p>
            </div>
            <Link to="/contact" className="gtouch__cta">
              Contact <i className="bi bi-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        )}

        <div className="gtouch__news" data-aos="fade-up" data-aos-delay="100">
          <div className="gtouch__news-copy">
            <strong>
              <i className="bi bi-envelope" aria-hidden="true" /> Subscribe to our newsletter
            </strong>
            <p>Occasional news and updates from Tuebiluf AI. No spam, unsubscribe any time.</p>
          </div>
          <form className="gtouch__news-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              aria-label="Email address"
              required
            />
            <button type="submit" className="gtouch__news-btn">
              Subscribe <i className="bi bi-arrow-right" aria-hidden="true" />
            </button>
          </form>
          {subscribed && (
            <p className="gtouch__news-ok" role="status">
              <i className="bi bi-check-circle" aria-hidden="true" /> Thank you for subscribing.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
