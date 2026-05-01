// Approximate exchange rates with EUR as base (updated reference: 2025)
const RATES = {
  EUR: 1,
  USD: 1.08,
  MXN: 19.50,
  ARS: 1050,
  COP: 4500,
  CLP: 1000,
}

const LOCALES = {
  EUR: 'es-ES',
  USD: 'en-US',
  MXN: 'es-MX',
  ARS: 'es-AR',
  COP: 'es-CO',
  CLP: 'es-CL',
}

// ARS, COP, CLP have no meaningful decimal units at these magnitudes
const NO_DECIMALS = new Set(['ARS', 'COP', 'CLP'])

export function formatPrice(eurPrice, currency = 'EUR') {
  const amount = eurPrice * (RATES[currency] ?? 1)
  const decimals = NO_DECIMALS.has(currency) ? 0 : 2
  return new Intl.NumberFormat(LOCALES[currency] ?? 'es-ES', {
    style: 'currency',
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount)
}
