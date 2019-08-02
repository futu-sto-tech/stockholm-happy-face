const { Router } = require('express')

const app = require('../../utils/app')
const log = require('../../lib/log')
const { prisma } = require('../../generated/prisma-client')

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
  const result = await prisma.createUser({ ...req.body })
  res.json(result)
})

router.get('/:id', async (req, res) => {
  res.json(await prisma.user({ id: req.params.id }))
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
  res.json(await prisma.user({ name: req.params.name }))
})

app.use('/api/users', router)

module.exports = app
