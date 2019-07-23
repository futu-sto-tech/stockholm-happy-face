import React, { useEffect } from 'react'
import { AsyncStorage } from 'react-native'

import { login } from '../../lib/auth'
import AuthLoadingScreen from './screen'

const AuthLoadingContainer = ({ navigation }) => {
  async function checkCurrentUser() {
    const username = await AsyncStorage.getItem('user')

    let user = null
    if (username) {
      user = await login(username)
    }

    if (user) {
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
