const client = require('./client');

describe('GET /users', () => {
  it('responds with JSON', async () => {
    const response = await client.get('/users');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.data).toBeInstanceOf(Array);
  });

  it('filters users by name', async () => {
    const usersResponse = await client.get('/users');
    const user = usersResponse.data[0];
    const response = await client.get(`/users?query=${user.name}`);
    expect(response.status).toBe(200);
    expect(response.data.length <= usersResponse.data.length);
  });
});

describe('GET /users/:id', () => {
  it('responds with JSON', async () => {
    const usersResponse = await client.get('/users');
    const user = usersResponse.data[0];
    const response = await client.get(`/users/${user.id}`);
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.data).toMatchObject(user);
  });
});

describe('GET /users/name/:name', () => {
  it('responds with JSON', async () => {
    const usersResponse = await client.get('/users');
    const user = usersResponse.data[0];
    const response = await client.get(`/users/name/${user.name}`);

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.data).toMatchObject(user);
  });
});

describe('POST /users', () => {
  it('creates a new user', async () => {
    const beforeResponse = await client.get('/users');
    const randomName = Math.random()
      .toString(36)
      .substring(7);
    const response = await client.post('/users', { name: randomName });
    const afterResponse = await client.get('/users');

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.data.name).toBe(randomName);

    expect(beforeResponse.data.length).toBeLessThan(afterResponse.data.length);
    expect(afterResponse.data.find(user => user.id === response.data.id)).toBeDefined();
  });
});

describe('PUT /users/:id', () => {
  it('updates the expo token for a user', async () => {
    const randomName = Math.random()
      .toString(36)
      .substring(7);
    const randomExpoTokenString = Math.random()
      .toString(36)
      .substring(7);
    const newUserResponse = await client.post('/users', { name: randomName });
    const newUser = newUserResponse.data;
    const expoPushToken = `ExponentPushToken[${randomExpoTokenString}]`;
    const response = await client.put(`/users/${newUser.id}`, { expoPushToken });

    expect(newUser.expoPushToken).toBeNull();

    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/application\/json/);
    expect(response.data.id).toBe(newUser.id);
    expect(response.data.expoPushToken).toBe(expoPushToken);
  });
});
