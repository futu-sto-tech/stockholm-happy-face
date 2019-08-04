const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')

const { logMiddleware } = require('../lib/log')

module.exports = [bodyParser.json(), helmet(), cors(), logMiddleware()]
