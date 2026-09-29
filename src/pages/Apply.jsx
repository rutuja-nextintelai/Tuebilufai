import { useParams } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import ApplicationForm from '../components/ApplicationForm.jsx'
import { JOBS } from '../data/jobs.js'

export default function Apply() {
  const { slug } = useParams()
  const job = JOBS.find((j) => j.slug === slug)

  return (
    <>
      <PageHero
        crumbs={['Careers', 'Apply']}
        title={job ? `Apply for ${job.title}` : 'Apply to Tuebiluf AI'}
        lead="Five short steps: your details, experience, education, preferences and resume. Every application is read by a person."
      />

      <section className="section" id="apply">
        <div className="container">
          {/* keyed so a different role starts a fresh form */}
          <ApplicationForm key={slug ?? 'open'} job={job} />
        </div>
      </section>
    </>
  )
}
