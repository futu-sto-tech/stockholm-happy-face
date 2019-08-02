import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert } from 'react-native'

import { PROFILE_ROUTE } from '../../navigator/routes'
import i18n from '../../lib/i18n'
import EntryScreen from './screen'
import { deleteEntry } from '../../store/actions'

const EntryContainer = ({ navigation }) => {
  const dispatch = useDispatch()
  const deleting = useSelector(state => state.userEntries.deleting)
  const { entry } = navigation.state.params

  const handlePressDelete = async () => {
    Alert.alert(
      i18n.t('entry.deletePrompt.title'),
      i18n.t('entry.deletePrompt.message'),
      [
        {
          text: i18n.t('entry.deletePrompt.cancelButton'),
          style: 'cancel',
        },
        {
          text: i18n.t('entry.deletePrompt.deleteButton'),
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
