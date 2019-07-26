import React from 'react'
import { useDispatch } from 'react-redux'

import { logout } from '../../store/actions'
import { WELCOME_ROUTE } from '../../navigator/routes'
import ProfileHeaderRight from './header-right'

const ProfileHeaderRightContainer = ({ navigation }) => {
  const dispatch = useDispatch()

  const handlePressLogout = () => {
    dispatch(logout())
    navigation.navigate(WELCOME_ROUTE)
  }

  return <ProfileHeaderRight onPressLogout={handlePressLogout} />
}

export default ProfileHeaderRightContainer
