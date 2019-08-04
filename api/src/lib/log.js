const expressWinston = require('express-winston')
const { Timber } = require('@timberio/node')
const { TimberTransport } = require('@timberio/winston')

const timber = new Timber(
  process.env.TIMBER_API_KEY,
  process.env.TIMBER_SOURCE_ID
)

console.log(process.env.TIMBER_API_KEY, process.env.TIMBER_SOURCE_ID)

const logMiddleware = () =>
  expressWinston.logger({
    transports: [new TimberTransport(timber)],
    meta: true,
    expressFormat: true,
  })

module.exports = {
  timber,
  log: timber,
  logMiddleware,
}
