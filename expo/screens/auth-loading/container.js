import React, { useEffect } from 'react'
import { AsyncStorage } from 'react-native'

import AuthLoadingScreen from './screen'

const AuthLoadingContainer = ({ navigation }) => {
  async function checkCurrentUser() {
    const userJSON = await AsyncStorage.getItem('user')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      navigation.navigate('Profile', { user })
    } else {
      navigation.navigate('Welcome')
    }
  }

  useEffect(() => {
    checkCurrentUser()
  }, [])

  return <AuthLoadingScreen />
}

export default AuthLoadingContainer
