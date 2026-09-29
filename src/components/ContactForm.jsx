import { useState } from 'react'
import { normalizeIndianMobile, indianMobileError } from '../utils/phone.js'

/**
 * Shared form used by the contact section and the demo-request modal.
 * Validates on the client and reports success locally; pass `onSubmit(data)`
 * to send to a backend.
 */
export default function ContactForm({ fields, submitLabel, sentText, onSubmit, blockSubmit = false }) {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [phones, setPhones] = useState({})
  const [fieldErrors, setFieldErrors] = useState({})

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   const form = e.currentTarget
  //   const data = Object.fromEntries(new FormData(form).entries())
  //   setStatus('loading')
  //   setError('')
  //   try {
  //     if (onSubmit) await onSubmit(data)
  //     else await new Promise((r) => setTimeout(r, 600))
  //     setStatus('sent')
  //     form.reset()
  //   } catch (err) {
  //     setError(err?.message || 'Something went wrong. Please try again.')
  //     setStatus('error')
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    const nextErrors = {}
    for (const f of fields) {
      if (f.type !== 'tel') continue
      const digits = normalizeIndianMobile(data[f.name])
      const message = indianMobileError(digits, f.optional)
      if (message) nextErrors[f.name] = message
      else if (digits) data[f.name] = `+91${digits}`
    }
    if (Object.keys(nextErrors).length) {
      setFieldErrors(nextErrors)
      setStatus('idle')
      setError('')
      return
    }

    setFieldErrors({})
    setStatus('loading')
    setError('')
  
    try {
      if (onSubmit) {
        await onSubmit(data)
      } else {
        const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL
  
        if (!scriptUrl) {
          throw new Error('Contact form is not configured.')
        }
  
        const response = await fetch(scriptUrl, {
          method: 'POST',
          body: JSON.stringify(data),
        })
  
        const result = await response.json()
  
        if (!result.success) {
          throw new Error(
            result.error || 'Failed to submit the form.'
          )
        }
      }
  
      setStatus('sent')
      form.reset()
      setPhones({})
      setFieldErrors({})
  
    } catch (err) {
      console.error('Contact form error:', err)
  
      setError(
        err?.message ||
        'Something went wrong. Please try again.'
      )
  
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
                {f.icon && f.type !== 'tel' && <i className={`bi ${f.icon}`} />}
                {f.type === 'textarea' ? (
                  <textarea name={f.name} placeholder={f.placeholder} style={{ height: f.height || 150 }} required={!f.optional} />
                ) : f.type === 'select' ? (
                  <select name={f.name} defaultValue="" required={!f.optional}>
                    <option value="" disabled>{f.placeholder}</option>
                    {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : f.type === 'tel' ? (
                  <>
                    <span className={`form-field__phone${fieldErrors[f.name] ? ' is-invalid' : ''}`}>
                      <span className="form-field__code">
                        {f.icon && <i className={`bi ${f.icon}`} />}
                        <span className="visually-hidden">Country code </span>
                        +91
                      </span>
                      <input
                        type="tel"
                        name={f.name}
                        inputMode="numeric"
                        autoComplete="tel-national"
                        placeholder={f.placeholder || '10-digit mobile number'}
                        maxLength={10}
                        pattern="[6-9][0-9]{9}"
                        required={!f.optional}
                        aria-invalid={fieldErrors[f.name] ? 'true' : undefined}
                        aria-describedby={fieldErrors[f.name] ? `${f.name}-error` : undefined}
                        value={phones[f.name] ?? ''}
                        onChange={(e) => {
                          const digits = normalizeIndianMobile(e.target.value)
                          const message = indianMobileError(digits, f.optional)
                          e.target.setCustomValidity(message)
                          setPhones((prev) => ({ ...prev, [f.name]: digits }))
                          if (message) return
                          setFieldErrors((prev) => {
                            if (!prev[f.name]) return prev
                            const next = { ...prev }
                            delete next[f.name]
                            return next
                          })
                        }}
                        onInvalid={(e) => {
                          e.preventDefault()
                          const message = indianMobileError(normalizeIndianMobile(e.currentTarget.value), f.optional)
                            || 'Enter a valid 10-digit Indian mobile number.'
                          e.currentTarget.setCustomValidity(message)
                          setFieldErrors((prev) => ({ ...prev, [f.name]: message }))
                        }}
                      />
                    </span>
                    {fieldErrors[f.name] && (
                      <span className="form-field__error" id={`${f.name}-error`} role="alert">
                        {fieldErrors[f.name]}
                      </span>
                    )}
                  </>
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
