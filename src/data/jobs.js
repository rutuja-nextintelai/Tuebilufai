// Openings shown on the Careers page (first two, flagged `featured`) and in
// full on /careers/openings. Applications go to the Google Form below.
export const APPLY_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScAXiGz12nRN-BXVR6Q0EpJUB3JFqIggbTdKi5DG2wA936JyA/viewform?usp=publish-editor'

export const AREAS = ['Sales', 'AI & Data']
export const TYPES = ['Full-time', 'Internship']
export const EXPERIENCE = ['0-1 years', '1-3 years']

// Edit these four roles as the programme changes. The two flagged `featured`
// appear on the Careers page.
export const JOBS = [
  {
    slug: 'sales-executive',
    featured: true,
    title: 'Sales Executive',
    area: 'Sales',
    type: 'Full-time',
    experience: '1-3 years',
    location: 'Chhatrapati Sambhajinagar',
    summary: 'Take JuriNex to law chambers, firms and bar associations, from first conversation to signed subscription.',
    skills: ['B2B sales', 'Product demos', 'Lead follow-up', 'CRM discipline', 'Negotiation', 'Marathi, Hindi and English'],
    responsibilities: [
      'Build a pipeline of advocates, chambers and legal teams across Maharashtra.',
      'Run live JuriNex demos and free-trial onboarding, in person and online.',
      'Convert trials into Lite, Plus and Pro subscriptions and keep accounts renewing.',
      'Bring what customers say back to the product team every week.',
    ],
  },
  {
    slug: 'telecaller',
    featured: true,
    title: 'Telecaller',
    area: 'Sales',
    type: 'Full-time',
    experience: '0-1 years',
    location: 'Chhatrapati Sambhajinagar',
    summary: 'Be the first voice of Tuebiluf AI: call advocates and firms, explain JuriNex and book demos for the sales team.',
    skills: ['Clear phone manner', 'Marathi, Hindi and English', 'Lead qualification', 'Follow-up discipline', 'Basic computer skills', 'CRM entry'],
    responsibilities: [
      'Call and qualify leads from bar directories, events and inbound enquiries.',
      'Explain what JuriNex does in plain language and handle first questions.',
      'Schedule demos and free trials and keep every lead updated in the CRM.',
      'Follow up with trial users and pass warm accounts to the sales executive.',
    ],
  },
  {
    slug: 'junior-ai-engineer',
    title: 'Junior AI Engineer',
    area: 'AI & Data',
    type: 'Full-time',
    experience: '0-1 years',
    location: 'Chhatrapati Sambhajinagar',
    summary: 'Work alongside our senior engineers on OCR, retrieval and evaluation for legal documents in Indian languages.',
    skills: ['Python', 'Basic machine learning', 'Pandas', 'APIs', 'Git', 'Willingness to learn RAG and OCR'],
    responsibilities: [
      'Prepare and clean document datasets, including scanned Indian-language filings.',
      'Run evaluations on summaries, citations and drafts and report what changed.',
      'Ship small improvements to retrieval and extraction under a mentor.',
      'Write clear notes so the team can reproduce your experiments.',
    ],
  },
  {
    slug: 'ai-intern',
    title: 'AI Intern',
    area: 'AI & Data',
    type: 'Internship',
    experience: '0-1 years',
    location: 'Chhatrapati Sambhajinagar',
    summary: 'A six-month internship for students who want to see how document AI is built and shipped to real users.',
    skills: ['Python', 'Curiosity', 'Clear writing', 'Basic statistics', 'Any exposure to ML or NLP'],
    responsibilities: [
      'Label and organise evaluation sets from real document types.',
      'Run experiments with guidance and present results to the team.',
      'Help test new features with the feedback from advocates and legal teams.',
    ],
  },
]
