import PageHero from '../components/PageHero.jsx'
import ContactSection from '../components/ContactSection.jsx'
import GetInTouch from '../components/GetInTouch.jsx'

export default function Contact() {
  return (
    <>
      <PageHero
        crumbs={['Contact us']}
        title="Get in touch with us"
        lead="Tell us about your documents, workflows, or compliance needs and we'll map out where AI can help. Reach out to start a conversation."
      />
      <ContactSection withMap />
      <GetInTouch newsletterOnly />
    </>
  )
}
 