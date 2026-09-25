import { Link } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/company', label: 'Our Company' },
  { to: '/team', label: 'Our Team' },
  { to: '/careers', label: 'Careers' },
  { to: '/jurinex', label: 'Platforms' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-5">
            <img src="/assets/img/tuebiluf-logo-light.png" alt="Tuebiluf AI" className="site-footer__logo" />
            <p className="site-footer__blurb">
              Building intelligent automation for document-heavy, compliance-first industries. From legal tech
              to MSME operations, we deliver clarity, speed, and scale through AI.
            </p>
            <div className="site-footer__social">
              <a href="mailto:info@nexintelai.com" aria-label="Email"><i className="bi bi-envelope" /></a>
              <a href="tel:+919226408832" aria-label="Phone"><i className="bi bi-telephone" /></a>
              <a href="https://wa.me/919226408832" target="_blank" rel="noreferrer" aria-label="WhatsApp"><i className="bi bi-whatsapp" /></a>
            </div>
          </div>

          <div className="col-6 col-lg-2">
            <h4>Useful Links</h4>
            <ul>
              {LINKS.map((l) => (
                <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className="col-lg-5">
            <div className="site-footer__office">
              <h4>Registered Office</h4>
              <p>Plot 20, Mitramandal Co-Op Housing Society, New Usmanpura, Chhatrapati Sambhajinagar(Aurangabad) – 431005, Maharashtra</p>
            </div>
            <div className="site-footer__office">
              <h4>Development Office</h4>
              <p>B11, c/o Grind Master Machines Pvt Ltd MIDC, Chhatrapati Sambhajinagar(Aurangabad) – 431005</p>
            </div>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>Copyright © Tuebiluf AI All Rights Reserved</p>
          <p>
            Designed by Tuebiluf AI
          </p>
        </div>
      </div>
    </footer>
  )
}
