const express = require('express')
const bodyParser = require('body-parser')

const GiphyAPI = require('./lib/giphy')
const { prisma } = require('./generated/prisma-client')

const giphyApi = new GiphyAPI()

const app = express()

app.use(bodyParser.json())

app.post(`/users`, async (req, res) => {
  const result = await prisma.createUser({ ...req.body })
  res.json(result)
})

app.get('/users', async (req, res) => {
  res.json(await prisma.users())
})

app.get('/users/:id', async (req, res) => {
  res.json(await prisma.user({ id: req.params.id }))
})

app.post('/entries', async (req, res) => {
  const { user, ...data } = req.body
  const result = await prisma.createEntry({
    ...data,
    user: { connect: { id: user } },
  })
  res.json(result)
})

app.get('/entries', async (req, res) => {
  if (req.query.user) {
    res.json(await prisma.user({ id: req.query.user }).entries())
  } else {
    res.json(await prisma.entries())
  }
})

app.get('/entries/:id', async (req, res) => {
  const fragment = /* GraphQL */ `
    fragment EntryWithUser on Entry {
      id
      createdAt
      updatedAt
      link
      content
      user {
        id
        email
        name
      }
    }
  `
  res.json(await prisma.entry({ id: req.params.id }).$fragment(fragment))
})

app.get('/gif/search', async (req, res) => {
  const query = req.query.query

  if (!query) return res.status(404).json({ message: 'Supply query parameter' })

  const images = await giphyApi.search(query)
  res.json({ images })
})

app.listen(3000, () =>
  console.log('Server is running on http://localhost:3000')
)
