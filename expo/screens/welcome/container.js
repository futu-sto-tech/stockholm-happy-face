import React, { useState, useEffect } from 'react'
import { AsyncStorage } from 'react-native'

import backend from '../../lib/backend'
import WelcomeScreen from './screen'

const WAIT_INTERVAL = 750
const BACKDROPS = [
  'https://media.giphy.com/media/mg2Xa0af44fFm/giphy.gif',
  'https://media.giphy.com/media/IhUKcho8IoBCOYYsNo/giphy.gif',
  'https://media.giphy.com/media/3oriO6qJiXajN0TyDu/giphy.gif',
  'https://media.giphy.com/media/e1BxgoFxAOmbK/giphy.gif',
  'https://media.giphy.com/media/l0Iy8OYsxXo4PlCIU/giphy.gif',
  'https://media1.tenor.com/images/7e2edceaf8a91f66934884e35dac08e6/tenor.gif?itemid=12764545',
  'https://media1.tenor.com/images/6fa0e916bf3af513df1c431bedecba80/tenor.gif?itemid=14510422',
  'https://media1.tenor.com/images/713612fafac0bd21221ad875e7ea63f3/tenor.gif?itemid=14476054',
  'https://media1.tenor.com/images/a0547cf79513f490216234a8bd030546/tenor.gif?itemid=12500634',
  'https://media1.tenor.com/images/b7faa01c214b91b9650763d44e9dbc7a/tenor.gif?itemid=12517455',
  'https://media1.tenor.com/images/1fc543bab32a141b52ccff15be5e9d73/tenor.gif?itemid=11998890',
  'https://media1.tenor.com/images/deed42dfbe38c7c953440f1a5595abef/tenor.gif?itemid=14439948',
  'https://media1.tenor.com/images/37b52b6cce82adebdb75d94f26947c5e/tenor.gif?itemid=14236145',
]

const BACKDROP = BACKDROPS[Math.floor(Math.random() * BACKDROPS.length)]

const WelcomeContainer = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [isMatchingUser, setIsMatchingUser] = useState(false)
  const [timer, setTimer] = useState(null)

  async function handlePressLogin() {
    if (username.length > 0) {
      setLoading(true)
      let user = await backend.getUser(username)

      if (!user) {
        user = await backend.createUser(username)
      }

      if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user))
        navigation.navigate('Profile', { user })
      }
      setLoading(false)
    }
  }

  function handleChangeUsername(newUsername) {
    setUsername(newUsername)
  }

  async function queryUsers() {
    setLoading(true)
    const results = await backend.queryUsers(username)
    setIsMatchingUser(results.find(name => name === username))
    setLoading(false)
  }

  useEffect(() => {
    clearTimeout(timer)

    setTimer(
      setTimeout(() => {
        if (username.length === 0) {
          setIsMatchingUser(false)
        } else {
          queryUsers()
        }
      }, WAIT_INTERVAL)
    )
  }, [username])

  async function checkCurrentUser() {
    const userJSON = await AsyncStorage.getItem('user')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      navigation.navigate('Profile', { user })
    }
  }

  useEffect(() => {
    checkCurrentUser()
  }, [])

  return (
    <WelcomeScreen
      onPressLogin={handlePressLogin}
      loading={loading}
      backdropUrl={BACKDROP}
      username={username}
      onChangeUsername={handleChangeUsername}
      isMatchingUser={isMatchingUser}
    />
  )
}

export default WelcomeContainer
