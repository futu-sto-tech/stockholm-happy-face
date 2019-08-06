// next.config.js
const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  target: 'serverless',
  env: {
    API_BASE_URL: process.env.API_BASE_URL || '/api',
  },
})
