import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import GetInTouch from '../components/GetInTouch.jsx'
import { JOBS, APPLY_URL, AREAS, TYPES, EXPERIENCE } from '../data/jobs.js'

const GROUPS = [
  { key: 'area', label: 'Area of interest', options: AREAS },
  { key: 'type', label: 'Job type', options: TYPES },
  { key: 'experience', label: 'Experience', options: EXPERIENCE },
]

// One collapsible filter group with checkboxes.
function FilterGroup({ group, selected, onToggle, open, onOpen }) {
  const count = selected.length
  return (
    <div className={`op-filter${open ? ' is-open' : ''}`}>
      <button type="button" className="op-filter__head" aria-expanded={open} onClick={onOpen}>
        <span>{group.label}{count > 0 && <em>{count}</em>}</span>
        <i className={`bi ${open ? 'bi-dash-lg' : 'bi-plus-lg'}`} aria-hidden="true" />
      </button>
      {open && (
        <ul className="op-filter__list">
          {group.options.map((o) => (
            <li key={o}>
              <label>
                <input type="checkbox" checked={selected.includes(o)} onChange={() => onToggle(group.key, o)} />
                <span>{o}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function JobCard({ job, expanded, onToggle }) {
  return (
    <article className={`op-job${expanded ? ' is-open' : ''}`} id={job.slug}>
      <div className="op-job__head">
        <div>
          <span className="op-job__area">{job.area}</span>
          <h2>{job.title}</h2>
        </div>
        <a className="btn btn-red btn-sm op-job__apply" href={APPLY_URL} target="_blank" rel="noopener noreferrer">
          Apply now <i className="bi bi-arrow-up-right" />
        </a>
      </div>
      <ul className="op-job__tags">
        <li><i className="bi bi-briefcase" /> {job.type}</li>
        <li><i className="bi bi-bar-chart-steps" /> {job.experience}</li>
        <li><i className="bi bi-geo-alt" /> {job.location}</li>
      </ul>
      <p className="op-job__summary">{job.summary}</p>
      <div className="op-job__skills">
        <span className="op-job__label">Required skills</span>
        <ul>
          {job.skills.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </div>
      {expanded && (
        <div className="op-job__more">
          <span className="op-job__label">What you will do</span>
          <ul>
            {job.responsibilities.map((r) => <li key={r}><i className="bi bi-check-lg" /> {r}</li>)}
          </ul>
        </div>
      )}
      <button type="button" className="op-job__toggle" aria-expanded={expanded} onClick={onToggle}>
        {expanded ? 'Show less' : 'Read more'} <i className={`bi ${expanded ? 'bi-dash' : 'bi-plus'}`} />
      </button>
    </article>
  )
}

export default function Openings() {
  const { hash } = useLocation()
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({ area: [], type: [], experience: [] })
  const [openGroup, setOpenGroup] = useState('area')
  const [expanded, setExpanded] = useState(() => (hash ? hash.slice(1) : null))

  // a deep link like /careers/openings#full-stack-engineer opens that role
  useEffect(() => {
    if (hash) setExpanded(hash.slice(1))
  }, [hash])

  const toggle = (key, value) => setFilters((f) => ({
    ...f,
    [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value],
  }))
  const clear = () => { setFilters({ area: [], type: [], experience: [] }); setQuery('') }
  const active = Object.values(filters).some((v) => v.length) || query.trim() !== ''

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return JOBS.filter((j) => (
      (!filters.area.length || filters.area.includes(j.area)) &&
      (!filters.type.length || filters.type.includes(j.type)) &&
      (!filters.experience.length || filters.experience.includes(j.experience)) &&
      (!q || [j.title, j.summary, j.location, ...j.skills].join(' ').toLowerCase().includes(q))
    ))
  }, [query, filters])

  return (
    <>
      <PageHero
        crumbs={['Careers', 'Openings']}
        title="Open roles at Tuebiluf AI"
        lead="Bring your whole self to a small team building document AI for India's courts, banks and classrooms. Find the role that matches your ambition and apply in a few minutes."
      />

      <section className="section op" id="openings">
        <div className="container">
          <div className="op__layout">
            <aside className="op__side" data-aos="fade-up">
              <div className="op__side-head">
                <h3>Filters</h3>
                {active && <button type="button" className="op__clear" onClick={clear}>Clear all</button>}
              </div>
              {GROUPS.map((g) => (
                <FilterGroup
                  key={g.key}
                  group={g}
                  selected={filters[g.key]}
                  onToggle={toggle}
                  open={openGroup === g.key}
                  onOpen={() => setOpenGroup((c) => (c === g.key ? null : g.key))}
                />
              ))}
              <div className="op__side-note">
                <i className="bi bi-envelope-paper" aria-hidden="true" />
                <p>Don't see the right role? <Link to="/contact">Write to us</Link> with your CV and a short note. Every application is read by a person.</p>
              </div>
            </aside>

            <div className="op__main">
              <div className="op__bar" data-aos="fade-up">
                <span className="op__count"><strong>{results.length}</strong> {results.length === 1 ? 'open role' : 'open roles'}</span>
                <label className="op__search">
                  <i className="bi bi-search" aria-hidden="true" />
                  <input
                    type="search"
                    placeholder="Search by role, skill or location"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    aria-label="Search openings"
                  />
                </label>
              </div>

              {results.length === 0 ? (
                <div className="op__empty" data-aos="fade-up">
                  <i className="bi bi-binoculars" aria-hidden="true" />
                  <h3>No roles match those filters</h3>
                  <p>Try clearing a filter, or send us a note and we will keep your profile on file.</p>
                  <button type="button" className="btn btn-outline-dark btn-sm" onClick={clear}>Clear filters</button>
                </div>
              ) : (
                <div className="op__list">
                  {results.map((j, i) => (
                    <div key={j.slug} data-aos="fade-up" data-aos-delay={Math.min(i, 4) * 60}>
                      <JobCard
                        job={j}
                        expanded={expanded === j.slug}
                        onToggle={() => setExpanded((e) => (e === j.slug ? null : j.slug))}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <GetInTouch />
    </>
  )
}
