// Options and blank records for the job application form on /careers/apply.

export const STEPS = [
  { key: 'personal', label: 'Personal information', icon: 'bi-person', intro: 'Tell us who you are and how we can reach you.' },
  { key: 'work', label: 'Work experience', icon: 'bi-briefcase', intro: 'Add each job you have held, starting with the most recent.' },
  { key: 'education', label: 'Education', icon: 'bi-mortarboard', intro: 'Add your qualifications, starting with the most recent.' },
  { key: 'preferences', label: 'Career preferences', icon: 'bi-compass', intro: 'Everything on this step is optional. Share what you can so we can match you to the right role.' },
  { key: 'documents', label: 'Documents', icon: 'bi-file-earmark-arrow-up', intro: 'Upload your resume and submit your application.' },
]

export const EMPLOYMENT_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance']
export const WORK_MODES = ['Remote', 'Hybrid', 'On-site']
export const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Internship']
export const SHIFTS = ['Day', 'Night', 'Rotational', 'Flexible']
export const TRAVEL = ['Not willing', 'Occasionally', 'Frequently']
export const YES_NO = ['Yes', 'No']

export const RESUME_TYPES = ['.pdf', '.doc', '.docx']
export const RESUME_MAX_MB = 5

export const blankPersonal = () => ({
  firstName: '', lastName: '', dob: '', email: '', phone: '',
  country: 'India', state: '', city: '', address: '', zip: '',
  linkedin: '', github: '', portfolio: '',
})

export const blankWork = () => ({
  companyName: '', jobTitle: '', employmentType: '', startDate: '', endDate: '',
  current: 'No', location: '', responsibilities: '', achievements: '', skills: '',
})

export const blankEducation = () => ({
  degree: '', fieldOfStudy: '', institution: '', startYear: '', graduationYear: '',
  grade: '', location: '',
})

export const blankPreferences = () => ({
  salaryRange: '', locations: '', workMode: [], jobType: [],
  shift: '', travel: '', careerGoal: '', openToWork: '',
})

export const INDIAN_STATES = [
  'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh',
  'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand',
  'West Bengal',
]

export const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia',
  'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium',
  'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria',
  'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad',
  'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Côte d’Ivoire', 'Croatia', 'Cuba', 'Cyprus',
  'Czechia', 'Democratic Republic of the Congo', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
  'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji',
  'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala',
  'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India',
  'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya',
  'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya',
  'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta',
  'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia',
  'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand',
  'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau',
  'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar',
  'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines',
  'Samoa', 'San Marino', 'São Tomé and Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles',
  'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa',
  'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria',
  'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago',
  'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom',
  'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia',
  'Zimbabwe',
]
