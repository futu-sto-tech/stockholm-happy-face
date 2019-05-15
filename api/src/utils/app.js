const app = require('express')()

const commonMiddlewares = require('../middlewares')

app.use(...commonMiddlewares)

module.exports = app
