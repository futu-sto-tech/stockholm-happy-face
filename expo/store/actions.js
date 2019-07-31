import { AsyncStorage } from 'react-native'

import * as auth from '../lib/auth'
import { registerForPushNotificationsAsync } from '../lib/permission'
import {
  MARK_CHECKED_EXISTING_USER,
  FETCH_USER_QUERY,
  FETCH_USER_QUERY_DONE,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  DELETE_CURRENT_ENTRY,
  DELETE_CURRENT_ENTRY_SUCCESS,
  DELETE_CURRENT_ENTRY_ERROR,
  DELETE_ENTRY,
  DELETE_ENTRY_SUCCESS,
  DELETE_ENTRY_ERROR,
  SAVE_NEW_ENTRY,
  SAVE_NEW_ENTRY_SUCCESS,
  SAVE_NEW_ENTRY_ERROR,
  FETCH_WEEK_ENTRIES,
  FETCH_WEEK_ENTRIES_SUCCESS,
  FETCH_WEEK_ENTRIES_ERROR,
} from './action-types'

const markCheckedExistingUser = ({
  user = null,
  entries = [],
  currentEntry = null,
} = {}) => ({
  type: MARK_CHECKED_EXISTING_USER,
  payload: { user, entries, currentEntry },
})

export const checkExistingUser = () => async (dispatch, _, { api }) => {
  const username = await AsyncStorage.getItem('user')
  if (username) {
    const user = await api.getUser(username)
    if (user) {
      const { entries, currentEntry } = await api.getUserEntries(user.id)
      dispatch(markCheckedExistingUser({ user, entries, currentEntry }))
      return
    }
  }

  dispatch(markCheckedExistingUser())
}

const fetchUserQuery = () => ({ type: FETCH_USER_QUERY })
const fetchUserQueryDone = users => ({
  type: FETCH_USER_QUERY_DONE,
  payload: { users },
})

export const queryUsers = query => async (dispatch, _, { api }) => {
  dispatch(fetchUserQuery())
  if (query) {
    const users = await api.queryUsers(query)
    dispatch(fetchUserQueryDone(users))
  } else {
    dispatch(fetchUserQueryDone([]))
  }
}

const loginUser = () => ({ type: LOGIN_USER })
const loginUserSuccess = ({ user, entries, currentEntry }) => ({
  type: LOGIN_USER_SUCCESS,
  payload: { user, entries, currentEntry },
})
const loginUserError = error => ({ type: LOGIN_USER_ERROR, payload: { error } })

export const login = username => async (dispatch, _, { api }) => {
  dispatch(loginUser())

  let user = await api.getUser(username)

  if (!user) {
    user = await api.createUser(username)
  }

  if (user) {
    await auth.login(user.name)
    const { entries, currentEntry } = await api.getUserEntries(user.id)
    const updatedUser = await registerForPushNotificationsAsync(user)
    dispatch(
      loginUserSuccess({ user: updatedUser || user, entries, currentEntry })
    )
  } else {
    dispatch(loginUserError('Unable to login'))
  }
}

const logoutUser = () => ({ type: LOGOUT_USER })

export const logout = () => async dispatch => {
  await auth.logout()
  dispatch(logoutUser())
}

const deleteCurrentEntryStart = () => ({ type: DELETE_CURRENT_ENTRY })
const deleteCurrentEntrySuccess = () => ({ type: DELETE_CURRENT_ENTRY_SUCCESS })
const deleteCurrentEntryError = error => ({
  type: DELETE_CURRENT_ENTRY_ERROR,
  payload: { error },
})

export const deleteCurrentEntry = () => async (dispatch, getState, { api }) => {
  dispatch(deleteCurrentEntryStart())
  const currentEntry = getState().userCurrentEntry.value
  const deletedEntry = await api.deleteEntry(currentEntry)
  if (deletedEntry) {
    dispatch(deleteCurrentEntrySuccess())
  } else {
    dispatch(deleteCurrentEntryError('Unable to delete current entry'))
  }
}

const deleteEntryStart = () => ({ type: DELETE_ENTRY })
const deleteEntrySuccess = entry => ({
  type: DELETE_ENTRY_SUCCESS,
  payload: { entry },
})
const deleteEntryError = error => ({
  type: DELETE_ENTRY_ERROR,
  payload: { error },
})

export const deleteEntry = entry => async (dispatch, _, { api }) => {
  dispatch(deleteEntryStart())
  const deletedEntry = await api.deleteEntry(entry)
  if (deletedEntry) {
    dispatch(deleteEntrySuccess(deletedEntry))
  } else {
    dispatch(deleteEntryError('Unable to delete entry'))
  }
}

const saveNewEntryStart = () => ({ type: SAVE_NEW_ENTRY })
const saveNewEntrySuccess = entry => ({
  type: SAVE_NEW_ENTRY_SUCCESS,
  payload: { entry },
})
const saveNewEntryError = error => ({
  type: SAVE_NEW_ENTRY_ERROR,
  payload: { error },
})

export const saveNewEntry = image => async (dispatch, getState, { api }) => {
  dispatch(saveNewEntryStart())
  const user = getState().userData.value
  const { id: giphyId, ...imageData } = image
  const newEntry = await api.saveEntry(user, { giphyId, ...imageData.original })
  if (newEntry) {
    dispatch(saveNewEntrySuccess(newEntry))
  } else {
    dispatch(saveNewEntryError('Unable to save entry'))
  }
}

const fetchWeekEntries = () => ({ type: FETCH_WEEK_ENTRIES })
const fetchWeekEntriesSuccess = entries => ({
  type: FETCH_WEEK_ENTRIES_SUCCESS,
  payload: { entries },
})
const fetchWeekEntriesError = error => ({
  type: FETCH_WEEK_ENTRIES_ERROR,
  payload: { error },
})

export const getWeekEntries = () => async (dispatch, _, { api }) => {
  dispatch(fetchWeekEntries())
  try {
    const entries = await api.getWeeklyEntries()
    dispatch(fetchWeekEntriesSuccess(entries))
  } catch (error) {
    dispatch(fetchWeekEntriesError(error))
  }
}
