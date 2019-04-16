const GifController = require('./controllers/gif')
const UserController = require('./controllers/user')
const EntryController = require('./controllers/entry')

exports.setupRoutes = app => {
  app.get('/gif/search', GifController.search)
  app.get('/users', UserController.getUsers)
  app.get('/users/:id', UserController.getUser)
  app.get('/users/name/:name', UserController.getUserByName)
  app.post('/users', UserController.createUser)
  app.get('/entries', EntryController.getEntries)
  app.post('/entries', EntryController.createEntry)
  app.get('/entries/:id', EntryController.getEntry)
  app.delete('/entries/:id', EntryController.deleteEntry)
}
