import { AsyncStorage } from 'react-native'

export const login = async username => {
  await AsyncStorage.setItem('user', username)
}

export const logout = async () => {
  await AsyncStorage.removeItem('user')
}
