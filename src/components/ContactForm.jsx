import { useState } from 'react'

/**
 * Shared form used by the contact section and the demo-request modal.
 * Validates on the client and reports success locally; pass `onSubmit(data)`
 * to send to a backend.
 */
export default function ContactForm({ fields, submitLabel, sentText, onSubmit, blockSubmit = false }) {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())
    setStatus('loading')
    setError('')
    try {
      if (onSubmit) await onSubmit(data)
      else await new Promise((r) => setTimeout(r, 600))
      setStatus('sent')
      form.reset()
    } catch (err) {
      setError(err?.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form" noValidate={false}>
      <div className="row g-3">
        {fields.map((f) => (
          <div className={f.col} key={f.name}>
            <label className={`form-field${f.icon ? '' : ' form-field--bare'}`}>
              {f.label && (
                <span className="form-field__label">
                  {f.label}
                  {f.optional ? <b>(optional)</b> : <em aria-hidden="true">*</em>}
                </span>
              )}
              <span className="form-field__control">
                {f.icon && <i className={`bi ${f.icon}`} />}
                {f.type === 'textarea' ? (
                  <textarea name={f.name} placeholder={f.placeholder} style={{ height: f.height || 150 }} required={!f.optional} />
                ) : f.type === 'select' ? (
                  <select name={f.name} defaultValue="" required={!f.optional}>
                    <option value="" disabled>{f.placeholder}</option>
                    {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input type={f.type || 'text'} name={f.name} placeholder={f.placeholder} required={!f.optional} />
                )}
              </span>
            </label>
          </div>
        ))}

        {status === 'error' && (
          <div className="col-12"><div className="form-alert form-alert--error">{error}</div></div>
        )}
        {status === 'sent' && (
          <div className="col-12">
            <div className="form-alert form-alert--ok"><i className="bi bi-check-circle" /> {sentText}</div>
          </div>
        )}

        <div className="col-12">
          <button type="submit" className={`btn btn-red${blockSubmit ? ' btn-block' : ''}`} disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending…' : submitLabel} <i className="bi bi-send" />
          </button>
        </div>
      </div>
    </form>
  )
}
