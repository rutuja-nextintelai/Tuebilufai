import { Link } from 'react-router-dom'

export default function CtaBand({ title, text, primary = { to: '/contact', label: 'Talk to us' }, secondary }) {
  return (
    <section className="cta-band">
      <div className="container" data-aos="fade-up">
        <div className="cta-band__inner">
          <div>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="cta-band__actions">
            {primary.onClick ? (
              <button type="button" className="btn btn-white" onClick={primary.onClick}>{primary.label}</button>
            ) : (
              <Link to={primary.to} className="btn btn-white">{primary.label}</Link>
            )}
            {secondary && (secondary.external ? (
              <a href={secondary.to} target="_blank" rel="noopener" className="btn btn-outline-white">{secondary.label} <i className="bi bi-arrow-up-right" /></a>
            ) : (
              <Link to={secondary.to} className="btn btn-outline-white">{secondary.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
