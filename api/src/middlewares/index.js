const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')

module.exports = [bodyParser.json(), helmet(), cors()]
