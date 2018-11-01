import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'

import { PORT } from './config'
import { getResponse, getResponses, postResponse, deleteResponse, getLatestWeek } from './components/response'
import { getUsers, getUser, getUserByEmail, postUser, putUser } from './components/user'

const API_PREFIX = '/api/v1'

const server = express()
server.use(bodyParser.json())
server.use(cors())
server.use(morgan("combined", { immediate: true }));
server.use(morgan("combined"));

server.get(`${API_PREFIX}/week/latest`, getLatestWeek)
server.get(`${API_PREFIX}/responses`, getResponses)
server.get(`${API_PREFIX}/responses/:id`, getResponse)
server.post(`${API_PREFIX}/responses`, postResponse)
server.delete(`${API_PREFIX}/responses/:id`, deleteResponse)
server.get(`${API_PREFIX}/users`, getUsers)
server.get(`${API_PREFIX}/users/email`, getUserByEmail)
server.get(`${API_PREFIX}/users/:id`, getUser)
server.post(`${API_PREFIX}/users`, postUser)
server.put(`${API_PREFIX}/users/:id`, putUser)

server.listen(PORT, error => {
  if (error) throw error

  console.log(`Server listening on http://localhost:${PORT}`)
})
