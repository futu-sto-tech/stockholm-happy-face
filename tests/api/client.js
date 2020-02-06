const axios = require('axios');

jest.setTimeout(30000);

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/api';
const client = axios.default.create({ baseURL: BASE_URL });

module.exports = client;
