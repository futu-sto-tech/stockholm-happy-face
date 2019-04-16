const moment = require('moment')
const { prisma } = require('../generated/prisma-client')

const ENTRY_WITH_USER_FRAGMENT = /* GraphQL */ `
  fragment EntryWithUser on Entry {
    id
    createdAt
    updatedAt

    productivity
    positivity

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

exports.createEntry = async (req, res) => {
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
    res.json(
      await prisma.entry({ id: result.id }).$fragment(ENTRY_WITH_USER_FRAGMENT)
    )
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Unable to save entry' })
  }
}

exports.getEntries = async (req, res) => {
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
    res.json(entries)
  } catch (error) {
    res.status(500).send({ message: 'Unable to fetch entries' })
  }
}

exports.getEntry = async (req, res) => {
  const entry = await prisma
    .entry({ id: req.params.id })
    .$fragment(ENTRY_WITH_USER_FRAGMENT)

  res.json(entry)
}

exports.deleteEntry = async (req, res) => {
  try {
    const deletedEntry = await prisma.deleteEntry({ id: req.params.id })
    res.json(deletedEntry)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Unable to delete entry' })
  }
}
