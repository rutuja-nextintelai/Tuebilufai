/** Indian mobile numbers are 10 digits and start with 6, 7, 8, or 9. */
const INDIAN_MOBILE = /^[6-9]\d{9}$/

export function normalizeIndianMobile(raw) {
  const text = String(raw ?? '').trim()
  let digits = text.replace(/\D/g, '')
  // Keep a typed national number. Only drop 91 when it is clearly the country code.
  const pastedCode = /^\+?\s*91[\s-]/.test(text) || /^\+91/.test(text) || /^00\s*91/.test(text) || digits.startsWith('0091')
  if (pastedCode) {
    digits = digits.replace(/^00/, '').replace(/^91/, '')
  } else if (digits.startsWith('91') && digits.length === 12) {
    digits = digits.slice(2)
  } else if (digits.startsWith('0') && digits.length === 11) {
    digits = digits.slice(1)
  }
  return digits.slice(0, 10)
}

export function indianMobileError(digits, optional) {
  if (!digits) return optional ? '' : 'Enter a 10-digit Indian mobile number.'
  if (!INDIAN_MOBILE.test(digits)) {
    return 'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9.'
  }
  return ''
}
