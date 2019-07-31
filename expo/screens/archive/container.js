import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getWeekEntries } from '../../store/actions'
import { NEW_ENTRY_ROUTE } from '../../navigator/routes'
import ArchiveScreen from './screen'

const ArchiveContainer = ({ navigation }) => {
  const dispatch = useDispatch()
  const entries = useSelector(state => state.weekEntries.value)
  const hasLoaded = useSelector(state => state.weekEntries.hasLoaded)

  const handlePressNewEntry = useCallback(() =>
    navigation.navigate(NEW_ENTRY_ROUTE)
  )

  useEffect(() => {
    if (!hasLoaded) {
      dispatch(getWeekEntries())
    }
  }, [])

  return (
    <ArchiveScreen
      entries={entries}
      hasLoaded={hasLoaded}
      onPressNewEntry={handlePressNewEntry}
    />
  )
}

export default ArchiveContainer
