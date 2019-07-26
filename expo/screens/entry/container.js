import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PROFILE_ROUTE } from '../../navigator/routes'
import EntryScreen from './screen'
import { deleteEntry } from '../../store/actions'

const EntryContainer = ({ navigation }) => {
  const dispatch = useDispatch()
  const deleting = useSelector(state => state.userEntries.deleting)
  const { entry } = navigation.state.params

  const handlePressDelete = async () => {
    dispatch(deleteEntry(entry))
    navigation.navigate(PROFILE_ROUTE)
  }

  return (
    <EntryScreen
      entry={entry}
      onPressDelete={handlePressDelete}
      deleting={deleting}
    />
  )
}

export default EntryContainer
