const client = require('./client')

describe('GET /users', () => {
  it('responds with JSON', async () => {
    const response = await client.get('/entries')

    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.data).toBeInstanceOf(Array)
  })

  it('filters entries by user ID', async () => {
    const usersResponse = await client.get('/users')
    const user = usersResponse.data
    const response = await client.get(`/entries?user=${user.id}`)

    for (const entry of response.data) {
      expect(entry.user.id).toBe(user.id)
    }
  })

  it('filters entries by user name', async () => {
    const usersResponse = await client.get('/users')
    const user = usersResponse.data
    const response = await client.get(`/entries?name=${user.name}`)

    for (const entry of response.data) {
      expect(user.name).toMatch(new RegExp(entry.user.name))
    }
  })

  it('filters entries by week number', async () => {
    const entriesResponse = await client.get('/entries')
    const entry = entriesResponse.data[0]
    const response = await client.get(`/entries?week=${entry.week}`)

    expect(response.data.find(item => item.id === entry.id)).toBeDefined()
    expect(response.data.length).toBeLessThanOrEqual(
      entriesResponse.data.length
    )
  })

  it('filters entries from the current week', async () => {
    const response = await client.get('/entries?week=current')

    expect(response.status).toBe(200)
    expect(response.data).toBeInstanceOf(Array)
  })
})

describe('GET /entries/:id', () => {
  it('responds with JSON', async () => {
    const entriesResponse = await client.get('/entries')
    const entry = entriesResponse.data[0]
    const response = await client.get(`/entries/${entry.id}`)

    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.data).toMatchObject(entry)
  })
})

describe('POST /entries', () => {
  it('creates a new entry', async () => {
    const gifUrl = 'https://media.giphy.com/media/uyWTOgNGGWfks/giphy.gif'
    const randomName = Math.random()
      .toString(36)
      .substring(7)
    const newUserResponse = await client.post('/users', { name: randomName })
    const newUser = newUserResponse.data
    const beforeResponse = await client.get(`/entries?user=${newUser.id}`)
    const response = await client.post('/entries', {
      user: newUser.id,
      gif: { url: gifUrl },
    })
    const afterResponse = await client.get(`/entries?user=${newUser.id}`)

    expect(beforeResponse.data.length).toBe(0)

    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.data.user.id).toBe(newUser.id)
    expect(response.data.gif.url).toBe(gifUrl)

    expect(afterResponse.data.length).toBe(1)
    expect(afterResponse.data[0]).toMatchObject({
      ...response.data,
      fromNow: expect.any(String),
    })
  })
})

describe('DELETE /entries/:id', () => {
  it('deletes an existing entry', async () => {
    const gifUrl = 'https://media.giphy.com/media/uyWTOgNGGWfks/giphy.gif'
    const usersResponse = await client.get('/users')
    const user = usersResponse.data[0]
    const newEntryResponse = await client.post('/entries', {
      user: user.id,
      gif: { url: gifUrl },
    })
    const beforeDeleteResponse = await client.get(`/entries?user=${user.id}`)
    const response = await client.delete(`/entries/${newEntryResponse.data.id}`)
    const afterDeleteResponse = await client.get(`/entries?user=${user.id}`)

    // GIVEN an entry exists in the backend
    expect(
      beforeDeleteResponse.data.find(
        entry => entry.id === newEntryResponse.data.id
      )
    ).toBeDefined()

    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.data.id).toBe(newEntryResponse.data.id)

    expect(
      afterDeleteResponse.data.find(
        entry => entry.id === newEntryResponse.data.id
      )
    ).toBeUndefined()
  })
})
