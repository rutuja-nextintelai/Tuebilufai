import { useEffect } from 'react'
import ContactForm from './ContactForm.jsx'

const FIELDS = [
  { name: 'name', placeholder: 'Full Name', icon: 'bi-person', col: 'col-md-6' },
  { name: 'email', placeholder: 'Email Address', icon: 'bi-envelope', type: 'email', col: 'col-md-6' },
  { name: 'phone', placeholder: 'Phone Number', icon: 'bi-telephone', type: 'tel', col: 'col-md-6' },
  { name: 'organization', placeholder: 'Organization', icon: 'bi-building', col: 'col-md-6' },
  { name: 'practice_area', placeholder: 'Select Practice Area', icon: 'bi-briefcase', type: 'select', col: 'col-12', options: ['Litigation', 'Corporate Law', 'Compliance', 'Contracts', 'Other'] },
  { name: 'message', placeholder: 'Tell us more about your needs...', icon: 'bi-chat-dots', type: 'textarea', col: 'col-12', height: 150 },
]

export default function DemoModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="demo-title" onClick={onClose}>
      <div className="dialog__panel" onClick={(e) => e.stopPropagation()}>
        <div className="dialog__head">
          <div>
            <span className="eyebrow">JuriNex</span>
            <h3 id="demo-title">Request a Demo</h3>
          </div>
          <button type="button" className="dialog__close" aria-label="Close" onClick={onClose}>
            <i className="bi bi-x-lg" />
          </button>
        </div>
        <div className="dialog__body">
          <ContactForm fields={FIELDS} submitLabel="Submit Request" sentText="Your demo request has been sent. Thank you!" />
        </div>
      </div>
    </div>
  )
}
