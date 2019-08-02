import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { queryUsers, login } from '../../store/actions'
import { PROFILE_ROUTE } from '../../navigator/routes'
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
  const dispatch = useDispatch()
  const users = useSelector(state => state.queryUsers.value)
  const user = useSelector(state => state.userData.value)
  const loadingUser = useSelector(state => state.userData.loading)
  const loadingUsers = useSelector(state => state.queryUsers.loading)

  const [username, setUsername] = useState('')
  const [timer, setTimer] = useState(null)

  const handlePressLogin = async () => {
    if (username.length > 0) {
      dispatch(login(username))
    }
  }

  const handleChangeUsername = newUsername => setUsername(newUsername)

  useEffect(() => {
    clearTimeout(timer)

    setTimer(
      setTimeout(() => {
        if (username.length > 0) {
          dispatch(queryUsers(username))
        }
      }, WAIT_INTERVAL)
    )
  }, [username])

  useEffect(() => {
    if (user) {
      navigation.navigate(PROFILE_ROUTE)
    }
  }, [user])

  return (
    <WelcomeScreen
      onPressLogin={handlePressLogin}
      loading={loadingUser || loadingUsers}
      backdropUrl={BACKDROP}
      username={username}
      onChangeUsername={handleChangeUsername}
      isMatchingUser={users.find(name => name === username)}
    />
  )
}

export default WelcomeContainer
