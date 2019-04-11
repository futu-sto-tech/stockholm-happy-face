const GiphyAPI = require('../lib/giphy')

const giphyApi = new GiphyAPI()

exports.search = async (req, res) => {
  const query = req.query.query

  if (!query) return res.status(404).json({ message: 'Supply query parameter' })

  const images = await giphyApi.search(query)
  res.json({ images })
}
