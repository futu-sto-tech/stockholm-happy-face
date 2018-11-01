export const DEV = process.env.NODE_ENV !== 'production'
export const PORT = parseInt(process.env.PORT, 10) || 3000
export const COMPANY_DOMAIN = process.env.COMPANY_DOMAIN || 'futurice.com'
