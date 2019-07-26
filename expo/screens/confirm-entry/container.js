import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { saveNewEntry } from '../../store/actions'
import { PROFILE_ROUTE } from '../../navigator/routes'
import ConfirmEntryScreen from './screen'

const ConfirmEntryContainer = ({ navigation }) => {
  const dispatch = useDispatch()
  const saving = useSelector(state => state.userCurrentEntry.saving)
  const currentEntry = useSelector(state => state.userCurrentEntry.value)
  const { image } = navigation.state.params

  const handlePressSave = () => dispatch(saveNewEntry(image))

  useEffect(() => {
    if (currentEntry) {
      navigation.navigate(PROFILE_ROUTE)
    }
  }, [currentEntry])

  return (
    <ConfirmEntryScreen
      image={image}
      onPressSave={handlePressSave}
      saving={saving}
    />
  )
}

export default ConfirmEntryContainer
