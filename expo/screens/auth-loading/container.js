import React, { useEffect } from 'react'
import { AsyncStorage } from 'react-native'

import backend from '../../lib/backend'
import { logout } from '../../lib/auth'
import AuthLoadingScreen from './screen'

const AuthLoadingContainer = ({ navigation }) => {
  async function checkCurrentUser() {
    const username = await AsyncStorage.getItem('user')

    let user = null
    if (username) {
      user = await backend.getUser(username)
    }

    if (user) {
      navigation.navigate('Profile', { user })
    } else {
      await logout()
      navigation.navigate('Welcome')
    }
  }

  useEffect(() => {
    checkCurrentUser()
  }, [])

  return <AuthLoadingScreen />
}

export default AuthLoadingContainer
