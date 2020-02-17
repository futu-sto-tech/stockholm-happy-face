const { Server } = require('miragejs');
const axios = require('axios');

new Server({
  routes() {
    this.namespace = '/api';

    this.get('/users', () => [
      { id: '1', name: 'Luke' },
      { id: '2', name: 'Leah' },
      { id: '3', name: 'Anakin' },
    ]);
  },
});

module.exports = axios.create({ baseURL: '/api' });
