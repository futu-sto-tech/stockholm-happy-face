import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ArchiveScreen from './screen'
import { getWeekEntries } from '../../store/actions'

const INTERVAL_TIME = 5000

const ArchiveContainer = () => {
  const dispatch = useDispatch()
  const entries = useSelector(state => state.weekEntries.value)

  useEffect(() => {
    dispatch(getWeekEntries())

    const interval = setInterval(() => {
      dispatch(getWeekEntries())
    }, INTERVAL_TIME)

    return () => clearInterval(interval)
  }, [])

  return <ArchiveScreen entries={entries} />
}

export default ArchiveContainer
