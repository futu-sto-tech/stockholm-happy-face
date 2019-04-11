const { prisma } = require('../generated/prisma-client')

const ENTRY_WITH_USER_FRAGMENT = /* GraphQL */ `
  fragment EntryWithUser on Entry {
    id
    createdAt
    updatedAt
    emoji

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
  if (req.query.user) {
    res.json(
      (await prisma
        .user({ id: req.query.user })
        .entries()
        .$fragment(ENTRY_WITH_USER_FRAGMENT)) || []
    )
  } else if (req.query.name) {
    res.json(
      (await prisma
        .user({ name: req.query.name })
        .entries()
        .$fragment(ENTRY_WITH_USER_FRAGMENT)) || []
    )
  } else {
    res.json(await prisma.entries().$fragment(ENTRY_WITH_USER_FRAGMENT))
  }
}

exports.getEntry = async (req, res) => {
  res.json(
    await prisma
      .entry({ id: req.params.id })
      .$fragment(ENTRY_WITH_USER_FRAGMENT)
  )
}

exports.getRandomEntry = async (req, res) => {
  const entries = await prisma.entries()
  const randomEntry = entries[Math.floor(Math.random() * entries.length)]

  res.json(
    await prisma
      .entry({ id: randomEntry.id })
      .$fragment(ENTRY_WITH_USER_FRAGMENT)
  )
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
