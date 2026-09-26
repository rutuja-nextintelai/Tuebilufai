import { Link } from 'react-router-dom'
import VideoBackdrop from '../components/VideoBackdrop.jsx'
import IntroSection from '../components/IntroSection.jsx'
import ApproachSection from '../components/ApproachSection.jsx'
import GetInTouch from '../components/GetInTouch.jsx'
import JurinexHome from '../components/JurinexHome.jsx'

export default function Home() {
  return (
    <>
      <section className="hero hero--video">
        <VideoBackdrop />
        <div className="hero--video__inner">
          <div className="hero--video__copy">
            <span className="hero--video__eyebrow">Tuebiluf AI</span>
            <h1 className="hero--video__title">
              India’s trusted <br className="d-none d-sm-block" /><em>AI platform</em> builders
            </h1>
            <p className="hero--video__lead">We design scalable AI solutions for document intelligence, compliance, and automation</p>
            <div className="hero--video__actions">
              <Link to="/jurinex" className="hero-btn hero-btn--red">
                Explore JuriNex
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2.5 11.5 L11.5 2.5 M4.5 2.5 H11.5 V9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link to="/contact" className="hero-btn hero-btn--grey">Contact us</Link>
            </div>
          </div>
        </div>
      </section>

      <JurinexHome />
      <IntroSection showLink />
      <ApproachSection />
      <GetInTouch />
    </>
  )
}
