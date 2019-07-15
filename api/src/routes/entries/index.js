const { Router } = require('express')
const moment = require('moment')

const app = require('../../utils/app')
const { prisma } = require('../../generated/prisma-client')

const router = Router()

const ENTRY_WITH_USER_FRAGMENT = /* GraphQL */ `
  fragment EntryWithUser on Entry {
    id
    createdAt
    updatedAt

    gif {
      id
      url
      width
      height
      giphyId
    }

    user {
      id
      name
    }
  }
`

const convertEntry = entry => {
  const createdAt = moment(entry.createdAt)

  return {
    ...entry,
    fromNow: createdAt.fromNow(),
    week: createdAt.isoWeek(),
  }
}

router.get('/', async (req, res) => {
  const whereQuery = {}

  if (req.query.user) {
    whereQuery.user = { id: req.query.user }
  }

  if (req.query.name) {
    whereQuery.user = { name: req.query.name }
  }

  if (req.query.week) {
    let fromDate, toDate
    if (req.query.week === 'current') {
      fromDate = moment().startOf('isoWeek')
      toDate = moment().endOf('isoWeek')
    } else {
      fromDate = moment()
        .week(req.query.week)
        .startOf('isoWeek')
      toDate = moment()
        .week(req.query.week)
        .endOf('isoWeek')
    }

    whereQuery.createdAt_gte = fromDate
    whereQuery.createdAt_lte = toDate
  }

  try {
    const entries = await prisma
      .entries({ where: whereQuery })
      .$fragment(ENTRY_WITH_USER_FRAGMENT)
    res.json(entries.map(convertEntry))
  } catch (error) {
    res.status(500).send({ message: 'Unable to fetch entries' })
  }
})

router.post('/', async (req, res) => {
  const { user, gif, ...data } = req.body

  const entryInput = {
    ...data,
    user: { connect: { id: user } },
  }

  if (gif) {
    entryInput.gif = { create: { ...gif } }
  }

  try {
    const result = await prisma.createEntry(entryInput)
    const entry = await prisma
      .entry({ id: result.id })
      .$fragment(ENTRY_WITH_USER_FRAGMENT)
    res.json(convertEntry(entry))
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Unable to save entry' })
  }
})

router.get('/:id', async (req, res) => {
  const entry = await prisma
    .entry({ id: req.params.id })
    .$fragment(ENTRY_WITH_USER_FRAGMENT)

  res.json(convertEntry(entry))
})

router.delete('/:id', async (req, res) => {
  try {
    const deletedEntry = await prisma.deleteEntry({ id: req.params.id })
    res.json(convertEntry(deletedEntry))
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Unable to delete entry' })
  }
})

app.use('/api/entries', router)

module.exports = app
