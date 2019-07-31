import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { deleteCurrentEntry } from '../../store/actions'
import { NEW_ENTRY_ROUTE, ENTRY_ROUTE } from '../../navigator/routes'
import ProfileNavigationTitle from './navigation-title'
import ProfileScreen from './screen'

const ProfileContainer = ({ navigation }) => {
  const dispatch = useDispatch()
  const entries = useSelector(state => state.userEntries.value)
  const currentEntry = useSelector(state => state.userCurrentEntry.value)
  const deletingCurrentEntry = useSelector(
    state => state.userCurrentEntry.deleting
  )

  const handlePressInput = () => navigation.navigate(NEW_ENTRY_ROUTE)
  const handlePressEntry = entry => navigation.navigate(ENTRY_ROUTE, { entry })
  const handlePressDeleteCurrentEntry = () => dispatch(deleteCurrentEntry())

  return (
    <ProfileScreen
      currentEntry={currentEntry}
      entries={entries}
      onPressInput={handlePressInput}
      onPressEntry={handlePressEntry}
      onPressDeleteCurrentEntry={handlePressDeleteCurrentEntry}
      isDeleting={deletingCurrentEntry}
    />
  )
}

ProfileContainer.navigationOptions = {
  headerTitle: <ProfileNavigationTitle />,
}

export default ProfileContainer
