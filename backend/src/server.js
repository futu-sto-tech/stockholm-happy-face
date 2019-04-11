const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { setupRoutes } = require('./routes')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.set('port', process.env.PORT || 3000)

setupRoutes(app)

const server = app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`)
  console.log(`Visit http://localhost:${app.get('port')}`)
  console.log('Press control + C to quit.')
})

module.exports = server
