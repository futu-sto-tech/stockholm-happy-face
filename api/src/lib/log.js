const winston = require('winston')
const expressWinston = require('express-winston')
const { Timber } = require('@timberio/node')
const { TimberTransport } = require('@timberio/winston')

const IS_DEV = process.env.NODE_ENV === 'development'

const log = IS_DEV
  ? console
  : new Timber(process.env.TIMBER_API_KEY, process.env.TIMBER_SOURCE_ID)

const logMiddleware = () =>
  expressWinston.logger({
    transports: [
      IS_DEV ? new winston.transports.Console() : new TimberTransport(log),
    ],
    meta: !IS_DEV,
    expressFormat: true,
  })

module.exports = {
  log,
  logMiddleware,
}
