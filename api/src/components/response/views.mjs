import ResponseController from './controller'
import { UserController } from '../user';

const controller = new ResponseController()
const userController = new UserController()

export const getResponse = async (req, res) => {
  const responseId = req.params.id
  const responseObj = await controller.response(responseId)
  res.json({ response: responseObj.toJSON() })
}

export const getResponses = async (req, res) => {
  const userName = req.query.userName
  const responseObjs = await controller.responses({ userName })
  res.json({ responses: responseObjs.map(response => response.toJSON()) })
}

export const postResponse = async (req, res) => {
  const { userId, link, text } = req.body
  const userObj = await userController.user(userId)
  const responseObj = await controller.newResponse(userObj, link, text)
  res.json({ response: responseObj.toJSON() })
}

export const deleteResponse = async (req, res) => {
  const responseId = req.params.id
  const responseObj = await controller.deleteResponse(responseId)
  res.json({ response: responseObj.toJSON() })
}

export const getLatestWeek = async (req, res) => {
  const startOfWeek = moment().week().day('Monday').startOf('day')
  const endOfWeek = moment(startOfWeek).add('7', 'days')
}
