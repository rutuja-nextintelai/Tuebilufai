import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

const MENU = [
  {
    label: 'About',
    items: [
      { to: '/company', label: 'Company', desc: 'Who we are and how we build' },
      { to: '/team', label: 'Team', desc: 'Leadership and mentors' },
    ],
  },
  {
    label: 'Platforms',
    items: [
      { to: '/jurinex', label: 'JuriNex', desc: 'AI-driven legal intelligence' },
    ],
  },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState(null)
  const { pathname } = useLocation()

  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    return () => document.body.classList.remove('nav-open')
  }, [open])

  const close = () => {
    setOpen(false)
    setOpenGroup(null)
  }

  const groupActive = (g) => g.items.some((i) => i.to.split('#')[0] === pathname)

  return (
    <header className="pill-header">
      <div className="container">
        <div className="pill-header__bar">
          <Link to="/" className="pill-header__logo" onClick={close} aria-label="Tuebiluf AI home">
            <img src="/assets/img/tuebiluf-logo.png" alt="Tuebiluf AI" />
          </Link>

          <nav className={`pill-nav${open ? ' is-open' : ''}`} aria-label="Primary">
            <NavLink to="/" end className={({ isActive }) => `pill-nav__link${isActive ? ' is-active' : ''}`} onClick={close}>
              Home
            </NavLink>
            {MENU.map((g) => (
              <div className={`pill-nav__group${openGroup === g.label ? ' is-open' : ''}`} key={g.label}>
                <button
                  type="button"
                  className={`pill-nav__link${groupActive(g) ? ' is-active' : ''}`}
                  aria-expanded={openGroup === g.label}
                  onClick={() => setOpenGroup((c) => (c === g.label ? null : g.label))}
                >
                  {g.label} <i className="bi bi-chevron-down" />
                </button>
                <div className="pill-nav__menu">
                  {g.items.map((it) => (
                    <Link to={it.to} key={it.label} className="pill-nav__item" onClick={close}>
                      <span>{it.label}</span>
                      <small>{it.desc}</small>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <NavLink to="/careers" className={({ isActive }) => `pill-nav__link${isActive ? ' is-active' : ''}`} onClick={close}>
              Careers
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `pill-nav__link${isActive ? ' is-active' : ''}`} onClick={close}>
              Contact
            </NavLink>
            <Link to="/contact" className="btn btn-red pill-nav__cta" onClick={close}>
              Contact us <i className="bi bi-arrow-up-right" />
            </Link>
          </nav>

          <div className="pill-header__actions">
            <Link to="/contact" className="btn btn-red btn-sm d-none d-lg-inline-flex">
              Contact us <i className="bi bi-arrow-up-right" />
            </Link>
            <button
              type="button"
              className="pill-header__toggle d-lg-none"
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              <i className={`bi ${open ? 'bi-x-lg' : 'bi-list'}`} />
            </button>
          </div>
        </div>
      </div>
      {open && <button type="button" className="pill-nav__backdrop" aria-label="Close menu" onClick={close} />}
    </header>
  )
}
