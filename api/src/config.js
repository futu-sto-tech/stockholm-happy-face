module.exports = Object.freeze({
  DEV: process.env.NODE_ENV !== "production",
  PORT: parseInt(process.env.PORT, 10) || 3000,
  COMPANY_DOMAIN: process.env.COMPANY_DOMAIN || "futurice.com"
});
