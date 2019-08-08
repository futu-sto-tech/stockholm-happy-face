const client = require('./client')

describe('GET /gif/search', () => {
  it('responds with JSON', async () => {
    const query = 'hello'
    const response = await client.get(`/gif/search?query=${query}`)

    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toMatch(/application\/json/)
    expect(response.data.images).toBeInstanceOf(Array)
  })

  it('skips results with offset param', async () => {
    const query = 'test'
    const offset = 5
    const [noOffsetResponse, offsetResponse] = await Promise.all([
      client.get(`/gif/search?query=${query}`),
      client.get(`/gif/search?query=${query}&offset=${offset}`),
    ])

    const noOffsetImages = noOffsetResponse.data.images
    const offsetImages = offsetResponse.data.images

    expect(noOffsetImages.length).toBe(offsetImages.length)
    expect(noOffsetImages[0].id).not.toBe(offsetImages[0].id)
    expect(noOffsetImages[offset].id).toBe(offsetImages[0].id)
  })

  it('responds with error without query param', async () => {
    await expect(client.get('/gif/search?offset=10')).rejects.toThrow()
  })
})
