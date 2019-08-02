const winston = require('winston')
const expressWinston = require('express-winston')

const requestLog = () => {
  return expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.simple(),
    expressFormat: true,
    meta: false,
  })
}

module.exports = requestLog
