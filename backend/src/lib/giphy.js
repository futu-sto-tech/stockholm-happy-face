const axios = require('axios')
require('axios-debug-log')

const { GIPHY_API_KEY } = require('../config')

class GiphyAPI {
  constructor() {
    this.axios = axios.create({ baseURL: 'https://api.giphy.com/v1/gifs' })

    this.axios.defaults.params = {
      api_key: GIPHY_API_KEY,
      lang: 'en',
      rating: 'PG-13',
    }
  }

  parseGifData(data) {
    const { id, title, images } = data
    const { width, height, url } = images.preview_gif

    return {
      id,
      title,
      preview: {
        width,
        height,
        url,
      },
      original: {
        width: images.original.width,
        height: images.original.height,
        url: images.original.url,
      },
    }
  }

  async search(query, limit = 10) {
    const response = await this.axios.get('search', {
      params: { q: query, limit },
    })

    return response.data.data.map(this.parseGifData)
  }
}

module.exports = GiphyAPI
