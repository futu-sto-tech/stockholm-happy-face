import UserController from './controller'
import generateName from 'sillyname';

const controller = new UserController()

export const getUsers = async (req, res) => {
  const users = await controller.users()
  res.json({ users: users.map(user => user.toJSON()) })
}

export const getUser = async (req, res) => {
  const userId = req.params.id
  const userObj = await controller.user(userId)
  res.json({ user: userObj.toJSON() })
}

export const getUserByEmail = async (req, res) => {
  const userEmail = req.query.email
  const userObj = await controller.userByEmail(userEmail)
  if (!userObj) return res.status(404).json({ message: "User not found" })

  const data = userObj.toJSON()
  if (userObj.currentEntry) {
    data.currentEntry = userObj.currentEntry.toJSON()
  }
  res.json({ user: data })
}

export const postUser = async (req, res) => {
  const { name, email, avatar } = req.body
  try {
    const userObj = await controller.newUser(name, email, avatar)
    res.status(201).json({ user: userObj.toJSON() })
  } catch (error) {
    res.status(400).json(error.message)
  }
}

export const putUser = async (req, res) => {
  const userId = req.params.id
  let { nickname } = req.body

  if (nickname === 'RANDOM') {
    nickname = generateName().split(' ')[0]
  }

  try {
    const userObj = await controller.updateUser(userId, { nickname })
    res.status(200).json({ user: userObj.toJSON() })
  } catch (error) {
    res.status(400).json(error.message)
  }
}
