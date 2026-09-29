import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { JOBS } from '../data/jobs.js'
import {
  STEPS, COUNTRIES, INDIAN_STATES, EMPLOYMENT_TYPES, WORK_MODES, JOB_TYPES, SHIFTS, TRAVEL, YES_NO,
  RESUME_TYPES, RESUME_MAX_MB, blankPersonal, blankWork, blankEducation, blankPreferences,
} from '../data/applyForm.js'
import { normalizeIndianMobile, indianMobileError } from '../utils/phone.js'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MIN_AGE = 16
const LAST = STEPS.length - 1

const isoDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const NOW = new Date()
const TODAY = isoDate(NOW)
const DOB_MAX = isoDate(new Date(NOW.getFullYear() - MIN_AGE, NOW.getMonth(), NOW.getDate()))
const YEAR_MAX = NOW.getFullYear() + 6
const YEARS = Array.from({ length: YEAR_MAX - 1969 }, (_, i) => String(YEAR_MAX - i))

// Read and write nested values by a dotted path such as "work.0.jobTitle"
const get = (obj, path) => path.split('.').reduce((o, k) => o?.[k], obj)
const setIn = (obj, path, value) => {
  const keys = path.split('.')
  const next = Array.isArray(obj) ? [...obj] : { ...obj }
  let node = next
  keys.slice(0, -1).forEach((k) => {
    node[k] = Array.isArray(node[k]) ? [...node[k]] : { ...node[k] }
    node = node[k]
  })
  node[keys.at(-1)] = value
  return next
}

const filled = (v) => String(v ?? '').trim() !== ''

// Accepts a link typed with or without the protocol; returns a URL or null.
function toUrl(value) {
  const text = String(value ?? '').trim()
  if (!text || /\s/.test(text)) return null
  try {
    const url = new URL(/^https?:\/\//i.test(text) ? text : `https://${text}`)
    return url.hostname.includes('.') ? url : null
  } catch {
    return null
  }
}
const onHost = (url, host) => url.hostname === host || url.hostname.endsWith(`.${host}`)

function validatePersonal(data) {
  const p = data.personal
  const errors = {}
  const need = (key, message) => { if (!filled(p[key])) errors[`personal.${key}`] = message }

  if (!filled(data.position)) errors.position = 'Choose the role you are applying for.'
  need('firstName', 'Enter your first name.')
  need('lastName', 'Enter your last name.')

  if (!p.dob) errors['personal.dob'] = 'Enter your date of birth.'
  else if (p.dob < '1900-01-01' || p.dob > TODAY) errors['personal.dob'] = 'Enter a valid date of birth.'
  else if (p.dob > DOB_MAX) errors['personal.dob'] = `You must be at least ${MIN_AGE} years old to apply.`

  if (!filled(p.email)) errors['personal.email'] = 'Enter your email address.'
  else if (!EMAIL.test(p.email.trim())) errors['personal.email'] = 'Enter a valid email address.'

  if (p.country === 'India') {
    const message = indianMobileError(p.phone)
    if (message) errors['personal.phone'] = message
  } else {
    const digits = p.phone.replace(/\D/g, '')
    if (!digits) errors['personal.phone'] = 'Enter your phone number with the country code.'
    else if (digits.length < 7 || digits.length > 15) errors['personal.phone'] = 'Enter a valid phone number with the country code.'
  }

  need('country', 'Select your country.')
  need('state', p.country === 'India' ? 'Select your state.' : 'Enter your state or province.')
  need('city', 'Enter your city.')
  need('address', 'Enter your address.')

  if (!filled(p.zip)) errors['personal.zip'] = p.country === 'India' ? 'Enter your PIN code.' : 'Enter your ZIP or postal code.'
  else if (p.country === 'India' ? !/^[1-9]\d{5}$/.test(p.zip.trim()) : !/^[A-Za-z0-9][A-Za-z0-9 -]{2,9}$/.test(p.zip.trim())) {
    errors['personal.zip'] = p.country === 'India' ? 'Enter a valid 6-digit PIN code.' : 'Enter a valid ZIP or postal code.'
  }

  const linkedin = toUrl(p.linkedin)
  if (!filled(p.linkedin)) errors['personal.linkedin'] = 'Enter your LinkedIn profile link.'
  else if (!linkedin || !onHost(linkedin, 'linkedin.com')) errors['personal.linkedin'] = 'Enter a valid LinkedIn link, such as linkedin.com/in/your-name.'

  if (filled(p.github)) {
    const github = toUrl(p.github)
    if (!github || !onHost(github, 'github.com')) errors['personal.github'] = 'Enter a valid GitHub link, such as github.com/your-name.'
  }
  if (filled(p.portfolio) && !toUrl(p.portfolio)) errors['personal.portfolio'] = 'Enter a valid link to your portfolio.'

  return errors
}

function validateWork(data) {
  const errors = {}
  if (data.noExperience) return errors
  data.work.forEach((w, i) => {
    const need = (key, message) => { if (!filled(w[key])) errors[`work.${i}.${key}`] = message }
    need('companyName', 'Enter the company name.')
    need('jobTitle', 'Enter your job title.')
    need('employmentType', 'Select the employment type.')
    need('location', 'Enter the job location.')
    need('responsibilities', 'Describe your responsibilities.')

    if (!w.startDate) errors[`work.${i}.startDate`] = 'Enter the start date.'
    else if (w.startDate > TODAY) errors[`work.${i}.startDate`] = 'The start date cannot be in the future.'

    if (w.current !== 'Yes') {
      if (!w.endDate) errors[`work.${i}.endDate`] = 'Enter the end date, or mark this as your current job.'
      else if (w.startDate && w.endDate < w.startDate) errors[`work.${i}.endDate`] = 'The end date cannot be before the start date.'
    }
  })
  return errors
}

function validateEducation(data) {
  const errors = {}
  data.education.forEach((ed, i) => {
    const need = (key, message) => { if (!filled(ed[key])) errors[`education.${i}.${key}`] = message }
    need('degree', 'Enter the degree.')
    need('fieldOfStudy', 'Enter the field of study.')
    need('institution', 'Enter the institution name.')
    need('startYear', 'Select the start year.')
    need('graduationYear', 'Select the graduation year.')
    need('grade', 'Enter your grade or CGPA.')
    need('location', 'Enter the location.')
    if (ed.startYear && ed.graduationYear && Number(ed.graduationYear) < Number(ed.startYear)) {
      errors[`education.${i}.graduationYear`] = 'The graduation year cannot be before the start year.'
    }
  })
  return errors
}

function resumeError(file) {
  if (!file) return 'Upload your resume.'
  const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
  if (!RESUME_TYPES.includes(extension)) return 'Upload your resume as a PDF, DOC or DOCX file.'
  if (file.size > RESUME_MAX_MB * 1024 * 1024) return `Your resume must be ${RESUME_MAX_MB} MB or smaller.`
  if (file.size === 0) return 'That file is empty. Choose another one.'
  return ''
}

const VALIDATORS = [validatePersonal, validateWork, validateEducation, () => ({})]

const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '')
  reader.onerror = () => reject(new Error('Your resume could not be read. Please choose the file again.'))
  reader.readAsDataURL(file)
})

const formatSize = (bytes) => (bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`)

const trimAll = (record) => Object.fromEntries(
  Object.entries(record).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v]),
)

async function buildPayload(data, resume) {
  const p = trimAll(data.personal)
  return {
    formType: 'career-application',
    submittedAt: new Date().toISOString(),
    position: data.position,
    noExperience: data.noExperience,
    consent: data.consent,
    personal: {
      ...p,
      phone: p.country === 'India' ? `+91${p.phone}` : p.phone,
      linkedin: toUrl(p.linkedin)?.href ?? '',
      github: toUrl(p.github)?.href ?? '',
      portfolio: toUrl(p.portfolio)?.href ?? '',
    },
    workExperience: data.noExperience
      ? []
      : data.work.map((w) => trimAll({ ...w, endDate: w.current === 'Yes' ? '' : w.endDate })),
    education: data.education.map(trimAll),
    preferences: trimAll(data.preferences),
    resume: {
      name: resume.name,
      type: resume.type || 'application/octet-stream',
      size: resume.size,
      base64: await fileToBase64(resume),
    },
  }
}

function FieldError({ path, error }) {
  if (!error) return null
  return <span className="form-field__error" id={`${path}-error`} role="alert">{error}</span>
}

function Field({ form, path, label, optional, plain, type = 'text', options, placeholder, col = 'col-md-6', ...rest }) {
  const error = form.errors[path]
  const control = {
    name: path,
    value: get(form.data, path) ?? '',
    onChange: (e) => form.set(path, e.target.value),
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': error ? `${path}-error` : undefined,
    ...rest,
  }
  if (type !== 'select') control.placeholder = placeholder
  return (
    <div className={col}>
      <label className="form-field form-field--bare">
        <span className="form-field__label">
          {label}
          {!plain && (optional ? <b>(optional)</b> : <em aria-hidden="true">*</em>)}
        </span>
        <span className="form-field__control">
          {type === 'textarea' ? (
            <textarea rows={4} {...control} />
          ) : type === 'select' ? (
            <select {...control}>
              <option value="" disabled>{placeholder || 'Select'}</option>
              {options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : (
            <input type={type} {...control} />
          )}
        </span>
        <FieldError path={path} error={error} />
      </label>
    </div>
  )
}

function PhoneField({ form, path, india }) {
  const error = form.errors[path]
  const control = {
    type: 'tel',
    name: path,
    value: get(form.data, path) ?? '',
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': error ? `${path}-error` : undefined,
  }
  return (
    <div className="col-md-6">
      <label className="form-field form-field--bare">
        <span className="form-field__label">Phone number<em aria-hidden="true">*</em></span>
        <span className="form-field__control">
          {india ? (
            <span className={`form-field__phone${error ? ' is-invalid' : ''}`}>
              <span className="form-field__code"><span className="visually-hidden">Country code </span>+91</span>
              <input
                {...control}
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="10-digit mobile number"
                // no maxLength: a pasted "+91 98765 43210" must reach the normaliser whole
                onChange={(e) => form.set(path, normalizeIndianMobile(e.target.value))}
              />
            </span>
          ) : (
            <input
              {...control}
              autoComplete="tel"
              placeholder="+1 415 555 0100"
              maxLength={20}
              onChange={(e) => form.set(path, e.target.value.replace(/[^\d+\s()-]/g, ''))}
            />
          )}
        </span>
        <FieldError path={path} error={error} />
      </label>
    </div>
  )
}

// A row of option buttons: pick one, or several with `multiple`.
function ChoiceGroup({ form, path, label, options, multiple = false, required = false, col = 'col-md-6', onPick }) {
  const id = useId()
  const value = get(form.data, path)
  const isOn = (o) => (multiple ? value.includes(o) : value === o)
  const pick = (o) => {
    let next
    if (multiple) next = isOn(o) ? value.filter((v) => v !== o) : [...value, o]
    else next = isOn(o) && !required ? '' : o
    form.set(path, next)
    onPick?.(next)
  }
  return (
    <div className={col}>
      <div className="form-field" role="group" aria-labelledby={id}>
        <span className="form-field__label" id={id}>
          {label}
          {required && <em aria-hidden="true">*</em>}
        </span>
        <div className={`ap-chips${multiple ? ' ap-chips--multi' : ''}`}>
          {options.map((o) => (
            <button type="button" key={o} className={`ap-chip${isOn(o) ? ' is-on' : ''}`} aria-pressed={isOn(o)} onClick={() => pick(o)}>
              {o}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// One repeatable record (a job or a qualification) with its own remove button
function Entry({ number, title, onRemove, children }) {
  return (
    <div className="ap-entry">
      <div className="ap-entry__head">
        <div className="ap-entry__title">
          <span className="ap-entry__num" aria-hidden="true">{number}</span>
          <h4>{title}</h4>
        </div>
        {onRemove && (
          <button type="button" className="ap-entry__remove" onClick={onRemove}>
            <i className="bi bi-trash3" aria-hidden="true" /> Remove
          </button>
        )}
      </div>
      <div className="ap-entry__body">
        <div className="row g-3">{children}</div>
      </div>
    </div>
  )
}

// A titled block of related fields inside a step
function Group({ title, hint, children }) {
  return (
    <section className="ap-group">
      <div className="ap-group__head">
        <h3>{title}</h3>
        {hint && <p>{hint}</p>}
      </div>
      <div className="row g-3">{children}</div>
    </section>
  )
}

function ResumePicker({ file, error, onPick }) {
  const [over, setOver] = useState(false)
  const drop = (e) => {
    e.preventDefault()
    setOver(false)
    if (e.dataTransfer.files[0]) onPick(e.dataTransfer.files[0])
  }
  return (
    <div className="col-12">
      <div className="form-field">
        <label
          className={`ap-drop${over ? ' is-over' : ''}${error ? ' is-invalid' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setOver(true) }}
          onDragLeave={() => setOver(false)}
          onDrop={drop}
        >
          <input
            type="file"
            name="resume"
            aria-label="Resume"
            className="visually-hidden"
            accept={RESUME_TYPES.join(',')}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error ? 'resume-error' : undefined}
            onChange={(e) => {
              if (e.target.files[0]) onPick(e.target.files[0])
              e.target.value = ''
            }}
          />
          <span className="ap-drop__icon" aria-hidden="true"><i className="bi bi-cloud-arrow-up" /></span>
          <strong>{file ? 'Replace your resume' : 'Drop your resume here, or click to browse'}</strong>
          <span>PDF, DOC or DOCX, up to {RESUME_MAX_MB} MB</span>
        </label>
        {file && (
          <div className="ap-file">
            <i className="bi bi-file-earmark-text" aria-hidden="true" />
            <span className="ap-file__name">{file.name}</span>
            <span className="ap-file__size">{formatSize(file.size)}</span>
            <button type="button" aria-label={`Remove ${file.name}`} onClick={() => onPick(null)}>
              <i className="bi bi-x-lg" aria-hidden="true" />
            </button>
          </div>
        )}
        <FieldError path="resume" error={error} />
      </div>
    </div>
  )
}

/**
 * Multi-step job application: personal information, work experience,
 * education, career preferences and documents. Each step is validated before
 * the next one opens; the finished application is posted as JSON (resume
 * included as base64) to `VITE_CAREERS_SCRIPT_URL`.
 */
export default function ApplicationForm({ job }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState(() => ({
    position: job?.title ?? '',
    personal: blankPersonal(),
    noExperience: false,
    work: [blankWork()],
    education: [blankEducation()],
    preferences: blankPreferences(),
    consent: false,
  }))
  const [resume, setResume] = useState(null)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [submitError, setSubmitError] = useState('')
  const [focusTick, setFocusTick] = useState(0)
  const topRef = useRef(null)
  const mainRef = useRef(null)
  const headingRef = useRef(null)
  const mounted = useRef(false)

  // Each new step (and the confirmation) starts at the top of the form
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return }
    mainRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    headingRef.current?.focus({ preventScroll: true })
  }, [step, status === 'sent'])

  // After a failed check, move to the first field that needs attention
  useEffect(() => {
    if (focusTick) topRef.current?.querySelector('[aria-invalid="true"]')?.focus()
  }, [focusTick])

  const clearError = (path) => setErrors((e) => {
    if (!e[path]) return e
    const next = { ...e }
    delete next[path]
    return next
  })
  const set = (path, value) => {
    setData((d) => setIn(d, path, value))
    clearError(path)
  }
  const form = { data, errors, set }

  const addEntry = (key, blank) => setData((d) => ({ ...d, [key]: [...d[key], blank()] }))
  const removeEntry = (key, index) => {
    setData((d) => ({ ...d, [key]: d[key].filter((_, i) => i !== index) }))
    // indexes shift after a removal, so drop that list's messages
    setErrors((e) => Object.fromEntries(Object.entries(e).filter(([path]) => !path.startsWith(`${key}.`))))
  }

  const pickResume = (file) => {
    const message = file ? resumeError(file) : ''
    setResume(message ? null : file)
    setErrors((e) => ({ ...e, resume: message }))
  }

  const fail = (found) => {
    setErrors(found)
    setFocusTick((t) => t + 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'loading') return

    if (step < LAST) {
      const found = VALIDATORS[step](data)
      if (Object.keys(found).length) return fail(found)
      setErrors({})
      setStep(step + 1)
      return
    }

    const found = {}
    const resumeMessage = resumeError(resume)
    if (resumeMessage) found.resume = resumeMessage
    if (!data.consent) found.consent = 'Please confirm before you submit.'
    if (Object.keys(found).length) return fail(found)

    setErrors({})
    setSubmitError('')
    setStatus('loading')
    try {
      const scriptUrl = import.meta.env.VITE_CAREERS_SCRIPT_URL
      if (!scriptUrl) throw new Error('The application form is not configured yet. Please email your resume to info@nexintelai.com.')

      const response = await fetch(scriptUrl, {
        method: 'POST',
        body: JSON.stringify(await buildPayload(data, resume)),
      })
      // A wrongly set-up deployment returns a Google HTML page instead of JSON
      const result = await response.json().catch(() => {
        throw new Error('Your application could not be submitted. Please try again, or email your resume to info@nexintelai.com.')
      })
      if (!result.success) throw new Error(result.error || 'Your application could not be submitted.')

      setStatus('sent')
    } catch (err) {
      console.error('Application form error:', err)
      setSubmitError(err?.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="ap ap--done" ref={topRef}>
        <div className="ap__card ap__main ap-done" ref={mainRef}>
          <span className="ap-done__icon" aria-hidden="true"><i className="bi bi-check-lg" /></span>
          <h2 ref={headingRef} tabIndex={-1}>Application received</h2>
          <p>
            Thank you, {data.personal.firstName.trim()}. Your application for <strong>{data.position}</strong> is with our team.
            Every application is read by a person, and we will write to you at {data.personal.email.trim()}.
          </p>
          <div className="ap-done__actions">
            <Link to="/careers/openings" className="btn btn-red">Browse other openings <i className="bi bi-arrow-right" /></Link>
            <Link to="/careers" className="ap__back">Back to Careers</Link>
          </div>
        </div>
      </div>
    )
  }

  const india = data.personal.country === 'India'
  const current = STEPS[step]
  const role = JOBS.find((j) => j.title === data.position)
  const percent = Math.round((step / STEPS.length) * 100)
  const busy = status === 'loading'

  return (
    <div className="ap" ref={topRef}>
      <aside className="ap__side">
        <div className="ap-panel ap-role">
          <span className="ap-panel__kicker">Applying for</span>
          <h3>{data.position || 'Choose a role'}</h3>
          {role ? (
            <ul>
              <li><i className="bi bi-briefcase" aria-hidden="true" /> {role.type}</li>
              <li><i className="bi bi-bar-chart-steps" aria-hidden="true" /> {role.experience}</li>
              <li><i className="bi bi-geo-alt" aria-hidden="true" /> {role.location}</li>
            </ul>
          ) : (
            <p>Select the position in the first step.</p>
          )}
        </div>

        <nav className="ap-panel" aria-label="Application progress">
          <div className="ap-progress">
            <span>Step {step + 1} of {STEPS.length}</span>
            <strong>{percent}% complete</strong>
          </div>
          <div className="ap-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-label="Application progress">
            <span style={{ width: `${percent}%` }} />
          </div>
          <ol className="ap-steps">
            {STEPS.map((s, i) => {
              const state = i === step ? ' is-current' : i < step ? ' is-done' : ''
              return (
                <li key={s.key} className={`ap-steps__item${state}`} aria-current={i === step ? 'step' : undefined}>
                  <button type="button" disabled={i >= step || busy} onClick={() => { setErrors({}); setStep(i) }}>
                    <span className="ap-steps__dot">{i < step ? <i className="bi bi-check-lg" aria-hidden="true" /> : i + 1}</span>
                    <span className="ap-steps__text">
                      <span className="ap-steps__label">{s.label}</span>
                      <span className="ap-steps__state">{i < step ? 'Completed' : i === step ? 'In progress' : 'Pending'}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
        </nav>

        <div className="ap-help">
          <i className="bi bi-shield-check" aria-hidden="true" />
          <p>Your details are used only to review this application. Questions? Write to <a href="mailto:info@nexintelai.com">info@nexintelai.com</a>.</p>
        </div>
      </aside>

      <form className="ap__card ap__main form" ref={mainRef} onSubmit={handleSubmit} noValidate>
        <div className="ap__head">
          <span className="ap__head-icon" aria-hidden="true"><i className={`bi ${current.icon}`} /></span>
          <div className="ap__head-copy">
            <span className="ap__count">Step {step + 1} of {STEPS.length}</span>
            <h2 ref={headingRef} tabIndex={-1}>{current.label}</h2>
            <p>{current.intro}</p>
          </div>
          {step !== 3 && <span className="ap__legend"><em aria-hidden="true">*</em> Required</span>}
        </div>

        <div className="ap__body">
          {step === 0 && (
            <>
              <Group title="Position">
                <Field form={form} path="position" label="Position applying for" type="select" options={JOBS.map((j) => j.title)} placeholder="Select a role" col="col-12" />
              </Group>
              <Group title="Basic details">
                <Field form={form} path="personal.firstName" label="First name" placeholder="First name" autoComplete="given-name" />
                <Field form={form} path="personal.lastName" label="Last name" placeholder="Last name" autoComplete="family-name" />
                <Field form={form} path="personal.dob" label="Date of birth" type="date" min="1900-01-01" max={DOB_MAX} autoComplete="bday" />
                <Field form={form} path="personal.email" label="Email" type="email" placeholder="you@example.com" autoComplete="email" />
              </Group>
              <Group title="Phone and address">
                <Field
                  form={form}
                  path="personal.country"
                  label="Country"
                  type="select"
                  options={COUNTRIES}
                  placeholder="Select a country"
                  autoComplete="country-name"
                  onChange={(e) => {
                    // state, PIN and phone formats differ by country, so start those again
                    const changed = (e.target.value === 'India') !== india
                    set('personal.country', e.target.value)
                    if (changed) ['state', 'zip', 'phone'].forEach((k) => set(`personal.${k}`, ''))
                  }}
                />
                <PhoneField form={form} path="personal.phone" india={india} />
                {india ? (
                  <Field form={form} path="personal.state" label="State" type="select" options={INDIAN_STATES} placeholder="Select a state" autoComplete="address-level1" />
                ) : (
                  <Field form={form} path="personal.state" label="State / Province" placeholder="State or province" autoComplete="address-level1" />
                )}
                <Field form={form} path="personal.city" label="City" placeholder="City" autoComplete="address-level2" />
                <Field form={form} path="personal.address" label="Address" placeholder="House number, street, area" autoComplete="street-address" col="col-md-8" />
                <Field
                  form={form}
                  path="personal.zip"
                  label={india ? 'PIN code' : 'ZIP / Postal code'}
                  placeholder={india ? '431005' : 'ZIP or postal code'}
                  autoComplete="postal-code"
                  inputMode={india ? 'numeric' : undefined}
                  maxLength={india ? 6 : 10}
                  col="col-md-4"
                />
              </Group>
              <Group title="Online profiles">
                <Field form={form} path="personal.linkedin" label="LinkedIn profile" placeholder="linkedin.com/in/your-name" inputMode="url" col="col-12" />
                <Field form={form} path="personal.github" label="GitHub profile" placeholder="github.com/your-name" inputMode="url" optional />
                <Field form={form} path="personal.portfolio" label="Portfolio" placeholder="your-site.com" inputMode="url" optional />
              </Group>
            </>
          )}

          {step === 1 && (
            <div className="ap-list">
              <label className="ap-check ap-check--box">
                <input type="checkbox" checked={data.noExperience} onChange={(e) => { setErrors({}); set('noExperience', e.target.checked) }} />
                <span>I am a fresher with no prior work experience</span>
              </label>
              {!data.noExperience && (
                <>
                  {data.work.map((w, i) => (
                    <Entry
                      key={i}
                      number={i + 1}
                      title={filled(w.jobTitle) && filled(w.companyName) ? `${w.jobTitle.trim()}, ${w.companyName.trim()}` : `Experience ${i + 1}`}
                      onRemove={data.work.length > 1 ? () => removeEntry('work', i) : null}
                    >
                      <Field form={form} path={`work.${i}.companyName`} label="Company name" placeholder="Company name" autoComplete="organization" />
                      <Field form={form} path={`work.${i}.jobTitle`} label="Job title" placeholder="Job title" autoComplete="organization-title" />
                      <Field form={form} path={`work.${i}.employmentType`} label="Employment type" type="select" options={EMPLOYMENT_TYPES} placeholder="Select a type" />
                      <Field form={form} path={`work.${i}.location`} label="Location" placeholder="City, Country" />
                      <ChoiceGroup
                        form={form}
                        path={`work.${i}.current`}
                        label="Currently working here"
                        options={YES_NO}
                        required
                        col="col-12"
                        onPick={(v) => v === 'Yes' && set(`work.${i}.endDate`, '')}
                      />
                      <Field form={form} path={`work.${i}.startDate`} label="Start date" type="date" max={TODAY} />
                      {w.current === 'Yes' ? (
                        <Field form={form} path={`work.${i}.endDate`} label="End date" type="text" value="Present" plain disabled />
                      ) : (
                        <Field form={form} path={`work.${i}.endDate`} label="End date" type="date" min={w.startDate || undefined} />
                      )}
                      <Field form={form} path={`work.${i}.responsibilities`} label="Responsibilities" type="textarea" placeholder="What you were responsible for day to day" col="col-12" />
                      <Field form={form} path={`work.${i}.achievements`} label="Achievements" type="textarea" placeholder="Results you are proud of, with numbers where you have them" col="col-12" optional />
                      <Field form={form} path={`work.${i}.skills`} label="Technologies / Skills used" placeholder="Python, CRM, Negotiation" col="col-12" optional />
                    </Entry>
                  ))}
                  <button type="button" className="ap-add" onClick={() => addEntry('work', blankWork)}>
                    <i className="bi bi-plus-lg" aria-hidden="true" /> Add another experience
                  </button>
                </>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="ap-list">
              {data.education.map((ed, i) => (
                <Entry
                  key={i}
                  number={i + 1}
                  title={filled(ed.degree) && filled(ed.institution) ? `${ed.degree.trim()}, ${ed.institution.trim()}` : `Education ${i + 1}`}
                  onRemove={data.education.length > 1 ? () => removeEntry('education', i) : null}
                >
                  <Field form={form} path={`education.${i}.degree`} label="Degree" placeholder="B.Tech, B.Com, MBA" />
                  <Field form={form} path={`education.${i}.fieldOfStudy`} label="Field of study" placeholder="Computer Science" />
                  <Field form={form} path={`education.${i}.institution`} label="Institution name" placeholder="College or university" col="col-12" />
                  <Field form={form} path={`education.${i}.startYear`} label="Start year" type="select" options={YEARS} placeholder="Select a year" />
                  <Field form={form} path={`education.${i}.graduationYear`} label="Graduation year" type="select" options={YEARS} placeholder="Actual or expected" />
                  <Field form={form} path={`education.${i}.grade`} label="Grade / CGPA" placeholder="8.4 CGPA or 78%" />
                  <Field form={form} path={`education.${i}.location`} label="Location" placeholder="City, Country" />
                </Entry>
              ))}
              <button type="button" className="ap-add" onClick={() => addEntry('education', blankEducation)}>
                <i className="bi bi-plus-lg" aria-hidden="true" /> Add another qualification
              </button>
            </div>
          )}

          {step === 3 && (
            <>
              <Group title="Salary and location">
                <Field form={form} path="preferences.salaryRange" label="Preferred salary range" placeholder="₹4–6 LPA" plain />
                <Field form={form} path="preferences.locations" label="Preferred locations" placeholder="Chhatrapati Sambhajinagar, Pune" plain />
              </Group>
              <Group title="Work arrangement" hint="Choose every option that suits you.">
                <ChoiceGroup form={form} path="preferences.workMode" label="Work mode" options={WORK_MODES} multiple col="col-12" />
                <ChoiceGroup form={form} path="preferences.jobType" label="Job type" options={JOB_TYPES} multiple col="col-12" />
                <ChoiceGroup form={form} path="preferences.shift" label="Preferred shift" options={SHIFTS} col="col-12" />
                <ChoiceGroup form={form} path="preferences.travel" label="Willingness to travel" options={TRAVEL} col="col-12" />
              </Group>
              <Group title="Goals">
                <Field form={form} path="preferences.careerGoal" label="Career goal" type="textarea" placeholder="Where you want to be in the next few years" col="col-12" plain />
                <ChoiceGroup form={form} path="preferences.openToWork" label="Open to job opportunities" options={YES_NO} col="col-12" />
              </Group>
            </>
          )}

          {step === 4 && (
            <>
              <Group title={<>Resume<em aria-hidden="true">*</em></>} hint="Upload your latest resume. One file only.">
                <ResumePicker file={resume} error={errors.resume} onPick={pickResume} />
              </Group>
              <Group title="Declaration">
                <div className="col-12">
                  <label className="ap-check">
                    <input
                      type="checkbox"
                      checked={data.consent}
                      aria-invalid={errors.consent ? 'true' : undefined}
                      aria-describedby={errors.consent ? 'consent-error' : undefined}
                      onChange={(e) => set('consent', e.target.checked)}
                    />
                    <span>I confirm that the information in this application is accurate, and I agree to be contacted about it.</span>
                  </label>
                  <FieldError path="consent" error={errors.consent} />
                </div>
                {status === 'error' && (
                  <div className="col-12"><div className="form-alert form-alert--error" role="alert">{submitError}</div></div>
                )}
              </Group>
            </>
          )}
        </div>

        <div className="ap__nav">
          {step > 0 ? (
            <button type="button" className="ap__back" disabled={busy} onClick={() => { setErrors({}); setStep(step - 1) }}>
              <i className="bi bi-arrow-left" aria-hidden="true" /> Back
            </button>
          ) : <span />}
          <button type="submit" className="btn btn-red" disabled={busy}>
            {step < LAST ? (
              <>Continue <i className="bi bi-arrow-right" /></>
            ) : (
              <>{busy ? 'Submitting…' : 'Submit application'} <i className="bi bi-send" /></>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}