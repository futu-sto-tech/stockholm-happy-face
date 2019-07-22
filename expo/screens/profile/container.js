import React, { useState } from 'react'
import { NavigationEvents } from 'react-navigation'
import * as Haptics from 'expo-haptics'

import backend from '../../lib/backend'
import ProfileScreen from './screen'

const ProfileContainer = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [entries, setEntries] = useState([])
  const [currentEntry, setCurrentEntry] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handlePressInput = () => {
    const user = navigation.getParam('user')
    if (user) navigation.navigate('NewEntry', { user })
  }

  const handlePressEntry = async entry => {
    navigation.navigate('Entry', { entry })
    await Haptics.selectionAsync()
  }

  const updateEntries = async () => {
    const user = navigation.getParam('user')
    if (user) {
      setIsLoading(true)
      const userData = await backend.getUserEntries(user.id)
      setEntries(userData.entries)
      setCurrentEntry(userData.currentEntry)
      setIsLoading(false)
    }
  }

  const handlePressDeleteCurrentEntry = async () => {
    setIsDeleting(true)
    await backend.deleteEntry(currentEntry)
    setIsDeleting(false)
    await updateEntries()
  }

  const handleWillFocus = async payload => {
    if (payload.action.type !== 'Navigation/BACK') {
      await updateEntries()
    }
  }

  return (
    <>
      <NavigationEvents onWillFocus={handleWillFocus} />
      <ProfileScreen
        currentEntry={currentEntry}
        entries={entries}
        onPressInput={handlePressInput}
        onPressEntry={handlePressEntry}
        onPressDeleteCurrentEntry={handlePressDeleteCurrentEntry}
        isDeleting={isDeleting}
        loading={isLoading}
      />
    </>
  )
}

export default ProfileContainer
