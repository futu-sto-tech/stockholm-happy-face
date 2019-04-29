const GiphyAPI = require('../lib/giphy')

const giphyApi = new GiphyAPI()

exports.search = async (req, res) => {
  const query = req.query.query
  const offset = parseInt(req.query.offset) || 0

  if (!query) return res.status(404).json({ message: 'Supply query parameter' })

  const images = await giphyApi.search(query, { offset })
  res.json({ images })
}
