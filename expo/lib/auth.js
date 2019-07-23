import { AsyncStorage } from 'react-native'

import backend from './backend'

export const login = async username => {
  let user = await backend.getUser(username)

  if (!user) {
    user = await backend.createUser(username)
  }

  if (user) {
    await AsyncStorage.setItem('user', user.name)
    return user
  }

  return null
}

export const logout = async () => {
  await AsyncStorage.removeItem('user')
}
