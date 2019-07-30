import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ArchiveScreen from './screen'
import { getWeekEntries } from '../../store/actions'
import { NEW_ENTRY_ROUTE } from '../../navigator/routes'

const INTERVAL_TIME = 5000

const ArchiveContainer = ({ navigation }) => {
  const dispatch = useDispatch()
  const entries = useSelector(state => state.weekEntries.value)
  const hasLoaded = useSelector(state => state.weekEntries.hasLoaded)

  const handlePressNewEntry = useCallback(() =>
    navigation.navigate(NEW_ENTRY_ROUTE)
  )

  useEffect(() => {
    dispatch(getWeekEntries())

    const interval = setInterval(() => {
      dispatch(getWeekEntries())
    }, INTERVAL_TIME)

    return () => clearInterval(interval)
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
