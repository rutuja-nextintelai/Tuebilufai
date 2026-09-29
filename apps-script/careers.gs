/**
 * Receives job applications from the website form (/careers/apply).
 * Saves the resume to a Drive folder and adds one row per application to a
 * Google Sheet.
 *
 * Setup
 * 1. Create a Google Sheet and a Drive folder for resumes; paste their IDs below.
 * 2. In the Sheet: Extensions > Apps Script, paste this file, save.
 * 3. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone.
 * 4. Put the web app URL in the site's .env as VITE_CAREERS_SCRIPT_URL and rebuild.
 */
const SHEET_ID = 'PASTE_SPREADSHEET_ID_HERE'
const RESUME_FOLDER_ID = 'PASTE_DRIVE_FOLDER_ID_HERE'
const SHEET_NAME = 'Applications'
const MAX_RESUME_BYTES = 5 * 1024 * 1024
const RESUME_EXTENSIONS = ['pdf', 'doc', 'docx']

const HEADERS = [
  'Submitted at', 'Position', 'First name', 'Last name', 'Date of birth', 'Email', 'Phone',
  'Country', 'State', 'City', 'Address', 'ZIP / PIN', 'LinkedIn', 'GitHub', 'Portfolio',
  'Work experience', 'Education',
  'Preferred salary', 'Preferred locations', 'Work mode', 'Job type',
  'Preferred shift', 'Willing to travel', 'Career goal', 'Open to opportunities',
  'Resume',
]

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    if (data.formType !== 'career-application') throw new Error('Unknown form.')

    const p = data.personal || {}
    const prefs = data.preferences || {}
    if (!p.firstName || !p.email || !data.resume) throw new Error('The application is incomplete.')

    const resumeUrl = saveResume(data.resume, p)

    const sheet = getSheet()
    sheet.appendRow([
      new Date(), data.position, p.firstName, p.lastName, p.dob, p.email, p.phone,
      p.country, p.state, p.city, p.address, p.zip, p.linkedin, p.github, p.portfolio,
      (data.workExperience || []).map(formatWork).join('\n\n') || 'Fresher',
      (data.education || []).map(formatEducation).join('\n\n'),
      prefs.salaryRange, prefs.locations, list(prefs.workMode), list(prefs.jobType),
      prefs.shift, prefs.travel, prefs.careerGoal, prefs.openToWork,
      resumeUrl,
    ].map(safe))

    return respond({ success: true })
  } catch (err) {
    return respond({ success: false, error: String((err && err.message) || err) })
  }
}

function saveResume(resume, person) {
  const extension = String(resume.name || '').split('.').pop().toLowerCase()
  if (RESUME_EXTENSIONS.indexOf(extension) === -1) throw new Error('The resume must be a PDF, DOC or DOCX file.')

  const bytes = Utilities.base64Decode(resume.base64)
  if (bytes.length > MAX_RESUME_BYTES) throw new Error('The resume is larger than 5 MB.')

  const name = [person.firstName, person.lastName, 'resume'].join(' ').replace(/[^\w .-]/g, '') + '.' + extension
  const blob = Utilities.newBlob(bytes, resume.type, name)
  return DriveApp.getFolderById(RESUME_FOLDER_ID).createFile(blob).getUrl()
}

function getSheet() {
  const book = SpreadsheetApp.openById(SHEET_ID)
  const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME)
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS)
    sheet.setFrozenRows(1)
  }
  return sheet
}

function formatWork(w) {
  return [
    w.jobTitle + ' at ' + w.companyName + ' (' + w.employmentType + ')',
    w.startDate + ' to ' + (w.current === 'Yes' ? 'Present' : w.endDate) + ', ' + w.location,
    'Responsibilities: ' + w.responsibilities,
    w.achievements ? 'Achievements: ' + w.achievements : '',
    w.skills ? 'Skills: ' + w.skills : '',
  ].filter(String).join('\n')
}

function formatEducation(ed) {
  return [
    ed.degree + ', ' + ed.fieldOfStudy,
    ed.institution + ', ' + ed.location,
    ed.startYear + ' to ' + ed.graduationYear + ', ' + ed.grade,
  ].join('\n')
}

function list(value) {
  return Array.isArray(value) ? value.join(', ') : value || ''
}

// Applicants control this text, so stop Sheets from running it as a formula
function safe(value) {
  if (typeof value !== 'string') return value == null ? '' : value
  return /^[=+\-@\t\r]/.test(value) ? "'" + value : value
}

function respond(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON)
}
