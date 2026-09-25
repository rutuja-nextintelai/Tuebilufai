import PageHero from '../components/PageHero.jsx'
import WaveDivider from '../components/WaveDivider.jsx'
import MissionSection from '../components/MissionSection.jsx'
import WhoWeAre from '../components/WhoWeAre.jsx'
import BuildDifferently from '../components/BuildDifferently.jsx'
import CredibilitySection from '../components/CredibilitySection.jsx'
import WhySection from '../components/WhySection.jsx'
import StackSection from '../components/StackSection.jsx'
import OurVision from '../components/OurVision.jsx'
import GetInTouch from '../components/GetInTouch.jsx'

// Hero → mission + stats → dark band (who we are, how we build) → light band
// (credibility, differentiators) → dark vision band → AI stack → contact + newsletter,
// with curved seams between the bands.
export default function Company() {
  return (
    <>
      <PageHero
        crumbs={['Company', 'About us']}
        title="Built by engineers focused on the future of document-driven AI"
        lead="Tuebiluf AI is an AI product company building scalable, cloud-native intelligence systems for legal, business, education and financial workflows."
      />
      <MissionSection />
      <WaveDivider from="var(--white)" to="var(--grey-950)" shape="dip" />
      <WhoWeAre />
      <BuildDifferently />
      <WaveDivider from="var(--grey-950)" to="var(--white)" shape="hump" />
      <CredibilitySection />
      <WhySection />
      <WaveDivider from="var(--abt-light)" to="var(--grey-950)" shape="dip" />
      <OurVision />
      <StackSection />
      <GetInTouch />
    </>
  )
}
