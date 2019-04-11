const { prisma } = require('../generated/prisma-client')

exports.createUser = async (req, res) => {
  const result = await prisma.createUser({ ...req.body })
  res.json(result)
}

exports.getUsers = async (req, res) => {
  if (req.query.query) {
    res.json(await prisma.users({ where: { name_contains: req.query.query } }))
  } else {
    res.json(await prisma.users())
  }
}

exports.getUser = async (req, res) => {
  res.json(await prisma.user({ id: req.params.id }))
}

exports.getUserByName = async (req, res) => {
  res.json(await prisma.user({ name: req.params.name }))
}
