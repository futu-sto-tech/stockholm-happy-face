const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const winston = require('winston')
const expressWinston = require('express-winston')

const requestLog = require('./request-log')

module.exports = [
  bodyParser.json(),
  helmet(),
  cors(),
  requestLog(),
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.json(),
  }),
]
