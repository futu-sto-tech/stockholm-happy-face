module.exports = {
  env: {
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    HASURA_GRAPHQL_ENDPOINT: process.env.HASURA_GRAPHQL_ENDPOINT,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  },

  experimental: {
    reactRefresh: true,
  },
};
