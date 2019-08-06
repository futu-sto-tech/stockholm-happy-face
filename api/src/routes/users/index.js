const { Router } = require('express')

const app = require('../../utils/app')
const { prisma } = require('../../generated/prisma-client')
const { log } = require('../../lib/log')

const router = Router()

router.get('/', async (req, res) => {
  if (req.query.query) {
    log.info(`get.users.withQuery.${req.query.query}`)
    res.json(await prisma.users({ where: { name_contains: req.query.query } }))
  } else {
    log.info('get.users.all')
    res.json(await prisma.users())
  }
})

router.post('/', async (req, res) => {
  res.json(await prisma.createUser({ ...req.body }))
})

router.get('/:id', async (req, res) => {
  const user = await prisma.user({ id: req.params.id })
  if (user) {
    res.json(user)
  } else {
    res.status(404).send('Not found')
  }
})

router.put('/:id', async (req, res) => {
  const { expoPushToken } = req.body
  res.json(
    await prisma.updateUser({
      where: { id: req.params.id },
      data: { expoPushToken },
    })
  )
})

router.get('/name/:name', async (req, res) => {
  const user = await prisma.user({ name: req.params.name })
  if (user) {
    res.json(user)
  } else {
    res.status(404).send('Not found')
  }
})

app.use('/api/users', router)

module.exports = app
