const IS_DEV = process.env.NODE_ENV !== "production"

if (IS_DEV) require('dotenv').load()

module.exports = {
  publicRuntimeConfig: {
    API_KEY: process.env.FIREBASE_API_KEY,
    AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    IS_DEV
  }
};
