const winston = require('winston')

const log = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.simple(),
})

module.exports = log
