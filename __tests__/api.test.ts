/* eslint-env jest */

import next from 'next';
import request from 'supertest';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

describe('GET /users', () => {
  it('responds with json containing list', done => {
    request(handle)
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
