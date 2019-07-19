import React, { useState } from 'react'

import backend from '../../lib/backend'
import EntryScreen from './screen'

const EntryContainer = ({ navigation }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const entry = navigation.getParam('entry')

  async function handlePressDelete() {
    console.log('Pressed delete')
    setIsDeleting(true)
    await backend.deleteEntry(entry)
    setIsDeleting(false)
    navigation.navigate('Profile')
  }

  return (
    <EntryScreen
      entry={entry}
      onPressDelete={handlePressDelete}
      isDeleting={isDeleting}
    />
  )
}

export default EntryContainer
