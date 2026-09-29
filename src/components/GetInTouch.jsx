import { useState } from 'react'
import { Link } from 'react-router-dom'

const FALLBACK_ERROR = 'We could not add your email right now. Please try again in a moment.'

/**
 * Closing band used at the foot of every page: points visitors at the contact
 * page and collects newsletter sign-ups. On the contact page itself pass
 * `newsletterOnly` so the redundant call to action is dropped. Sign-ups are
 * posted as JSON to `VITE_NEWSLETTER_SCRIPT_URL`, a Google Apps Script web app
 * that saves them to the "Newsletter Subscribers" sheet.
 */
export default function GetInTouch({ newsletterOnly = false }) {
  const [status, setStatus] = useState('idle') // idle | loading | done | error
  const [message, setMessage] = useState('')
  const busy = status === 'loading'

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (busy) return
    const form = e.currentTarget
    const fields = new FormData(form)

    setStatus('loading')
    setMessage('')
    try {
      const scriptUrl = import.meta.env.VITE_NEWSLETTER_SCRIPT_URL
      if (!scriptUrl) throw new Error('Newsletter sign-up is not available yet. Please try again later.')

      // No Content-Type header: a plain POST avoids the browser pre-check that Apps Script cannot answer
      const response = await fetch(scriptUrl, {
        method: 'POST',
        body: JSON.stringify({
          formType: 'newsletter',
          email: String(fields.get('email') ?? '').trim(),
          website: String(fields.get('website') ?? ''),
          source: window.location.pathname,
          submittedAt: new Date().toISOString(),
        }),
      }).catch(() => { throw new Error(FALLBACK_ERROR) })
      // A wrongly set-up deployment returns a Google HTML page instead of JSON
      const result = await response.json().catch(() => { throw new Error(FALLBACK_ERROR) })
      if (!result.success) throw new Error(result.error || FALLBACK_ERROR)

      form.reset()
      setMessage(result.alreadySubscribed ? 'You are already subscribed. Thank you!' : 'Thank you for subscribing.')
      setStatus('done')
    } catch (err) {
      console.error('Newsletter sign-up error:', err)
      setMessage(err?.message || FALLBACK_ERROR)
      setStatus('error')
    }
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
              autoComplete="email"
              maxLength={254}
              required
            />
            {/* Kept off-screen and empty by people; sign-ups from bots that fill it are ignored */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', width: 1, height: 1, overflow: 'hidden' }}>
              <label>
                Leave this field empty
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <button type="submit" className="gtouch__news-btn" disabled={busy}>
              {busy ? 'Subscribing…' : 'Subscribe'} <i className="bi bi-arrow-right" aria-hidden="true" />
            </button>
          </form>
          {status === 'done' && (
            <p className="gtouch__news-ok" role="status">
              <i className="bi bi-check-circle" aria-hidden="true" /> {message}
            </p>
          )}
          {status === 'error' && (
            <p className="gtouch__news-ok gtouch__news-ok--error" role="alert">
              <i className="bi bi-exclamation-circle" aria-hidden="true" /> {message}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}