const winston = require('winston')
const expressWinston = require('express-winston')
const { Timber } = require('@timberio/node')
const { TimberTransport } = require('@timberio/winston')

const IS_PROD = process.env.NODE_ENV === 'production'

const log = IS_PROD
  ? new Timber(process.env.TIMBER_API_KEY, process.env.TIMBER_SOURCE_ID)
  : console

const logMiddleware = () =>
  expressWinston.logger({
    transports: [
      IS_PROD ? new TimberTransport(log) : new winston.transports.Console(),
    ],
    meta: IS_PROD,
    expressFormat: true,
  })

module.exports = {
  log,
  logMiddleware,
}
