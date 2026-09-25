import { useEffect } from 'react'

export default function Lightbox({ src, onClose }) {
  useEffect(() => {
    if (!src) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [src, onClose])

  if (!src) return null
  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button type="button" className="lightbox-close" aria-label="Close" onClick={onClose}>
        <i className="bi bi-x-lg" />
      </button>
      <img src={src} alt="" onClick={(e) => e.stopPropagation()} />
    </div>
  )
}
