import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from 'react-native'

import { PROFILE_ROUTE } from '../../navigator/routes'
import EntryScreen from './screen'
import { deleteEntry } from '../../store/actions'

const EntryContainer = ({ navigation }) => {
  const dispatch = useDispatch()
  const deleting = useSelector(state => state.userEntries.deleting)
  const { entry } = navigation.state.params

  const handlePressDelete = async () => {
    Alert.alert(
      'Delete entry?',
      'This entry will be removed completely. You will not be able to undo this action.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteEntry(entry))
            navigation.navigate(PROFILE_ROUTE)
          },
        },
      ]
    )
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
