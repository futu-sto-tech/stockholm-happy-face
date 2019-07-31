import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../../store/actions'
import { WELCOME_ROUTE } from '../../navigator/routes'
import ProfileHeaderRight from './header-right'

const ProfileHeaderRightContainer = ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userData.value)

  const handlePressLogout = useCallback(() => dispatch(logout()))

  useEffect(() => {
    if (!user) navigation.navigate(WELCOME_ROUTE)
  }, [user])

  return <ProfileHeaderRight onPressLogout={handlePressLogout} />
}

export default ProfileHeaderRightContainer
