import axios from 'axios'
import Constants from 'expo-constants'

const apiClient = axios.create({ baseURL: Constants.manifest.extra.baseUrl })

apiClient.queryUsers = async query => {
  try {
    const response = await apiClient.get('/users', { params: { query } })
    return response.data.map(user => user.name)
  } catch (error) {
    console.error(error)
    return []
  }
}

apiClient.getUser = async username => {
  try {
    const response = await apiClient.get(`/users/name/${username}`)
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

apiClient.createUser = async name => {
  try {
    const response = await apiClient.post('/users', { name })
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

apiClient.getUserEntries = async userId => {
  try {
    const [userResponse, entryResponse] = await Promise.all([
      apiClient.get('/entries', { params: { user: userId } }),
      apiClient.get('/entries', { params: { user: userId, week: 'current' } }),
    ])

    const currentEntry =
      entryResponse.data.length > 0 ? entryResponse.data[0] : null

    return {
      currentEntry,
      entries: userResponse.data
        .reverse()
        .filter(entry => entry.id !== (currentEntry || {}).id),
    }
  } catch (error) {
    console.log(error)
    return { currentEntry: null, entries: [] }
  }
}

apiClient.searchGifImages = async query => {
  try {
    const response = await apiClient.get('/gif/search', { params: { query } })
    return response.data.images
  } catch (error) {
    console.log(error)
    return []
  }
}

apiClient.deleteEntry = async entry => {
  try {
    await apiClient.delete(`/entries/${entry.id}`)
    return entry
  } catch (error) {
    console.log(error)
    return null
  }
}

apiClient.saveEntry = async (user, { giphyId, url, width, height }) => {
  try {
    const response = await apiClient.post('/entries', {
      user: user.id,
      gif: { giphyId, url, width, height },
    })
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

apiClient.updateUser = async (user, { expoPushToken }) => {
  try {
    const response = await apiClient.put(`/users/${user.id}`, { expoPushToken })
    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export default apiClient
