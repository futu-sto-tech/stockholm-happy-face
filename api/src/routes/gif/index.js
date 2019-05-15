const { Router } = require('express')

const app = require('../../utils/app')
const GiphyAPI = require('../../lib/giphy')

const router = Router()
const giphyApi = new GiphyAPI()

router.get('/search', async (req, res) => {
  const query = req.query.query
  const offset = parseInt(req.query.offset) || 0

  if (!query) return res.status(404).json({ message: 'Supply query parameter' })

  const images = await giphyApi.search(query, { offset })
  res.json({ images })
})

app.use('/api/gif', router)

module.exports = app
