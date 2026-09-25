import { Link } from 'react-router-dom'
import VideoBackdrop from './VideoBackdrop.jsx'

export default function PageHero({ eyebrow, title, lead, crumbs = [] }) {
  const label = eyebrow || crumbs.join(' · ')

  return (
    <section className="page-hero">
      <VideoBackdrop scrim />
      <div className="page-hero__glow" aria-hidden="true" />
      <div className="container">
        <div className="page-hero__copy">
          <Link to="/" className="page-hero__back">
            <i className="bi bi-arrow-left" aria-hidden="true" /> Back to Home
          </Link>
          {label && <span className="page-hero__pill">{label}</span>}
          <h1>{title}</h1>
          {lead && <p>{lead}</p>}
        </div>
      </div>
    </section>
  )
}
