import { useEffect, useState } from 'react'

export default function ScrollTop() {
  const [active, setActive] = useState(false)
  useEffect(() => {
    const onScroll = () => setActive(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button
      type="button"
      className={`scroll-top${active ? ' is-active' : ''}`}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <i className="bi bi-arrow-up" />
    </button>
  )
}
