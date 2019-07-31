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

const INITIAL_STATE = {
  hasCheckedExistingUser: false,
  userData: {
    loading: false,
    error: null,
    value: null,
  },
  userEntries: {
    loading: false,
    error: null,
    deleting: false,
    deleteError: null,
    value: [],
  },
  userCurrentEntry: {
    loading: false,
    error: null,
    deleting: false,
    deleteError: null,
    saving: false,
    saveError: null,
    value: null,
  },
  queryUsers: {
    loading: false,
    value: [],
  },
  weekEntries: {
    hasLoaded: false,
    loading: false,
    error: null,
    value: [],
  },
}

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MARK_CHECKED_EXISTING_USER:
      return {
        ...state,
        hasCheckedExistingUser: true,
        userData: { ...state.userData, value: action.payload.user },
        userEntries: {
          ...state.userEntries,
          value: action.payload.entries,
        },
        userCurrentEntry: {
          ...state.userCurrentEntry,
          value: action.payload.currentEntry,
        },
      }

    case FETCH_USER_QUERY:
      return { ...state, queryUsers: { ...state.queryUsers, loading: true } }

    case FETCH_USER_QUERY_DONE:
      return {
        ...state,
        queryUsers: { loading: false, value: action.payload.users },
      }

    case LOGIN_USER:
      return { ...state, userData: { ...state.userData, loading: true } }

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        userData: { loading: false, error: null, value: action.payload.user },
        userEntries: {
          ...state.userEntries,
          error: null,
          value: action.payload.entries,
        },
        userCurrentEntry: {
          ...state.userCurrentEntry,
          error: null,
          value: action.payload.currentEntry,
        },
      }

    case LOGIN_USER_ERROR:
      return {
        ...state,
        userData: {
          ...state.userData,
          loading: false,
          error: action.payload.error,
        },
      }

    case LOGOUT_USER:
      return INITIAL_STATE

    case DELETE_CURRENT_ENTRY:
      return {
        ...state,
        userCurrentEntry: { ...state.userCurrentEntry, deleting: true },
      }

    case DELETE_CURRENT_ENTRY_SUCCESS:
      return {
        ...state,
        userCurrentEntry: {
          ...state.userCurrentEntry,
          deleting: false,
          value: null,
          deleteError: null,
        },
        weekEntries: {
          ...state.weekEntries,
          value: state.weekEntries.value.filter(
            entry => entry.id !== state.userCurrentEntry.value.id
          ),
        },
      }

    case DELETE_CURRENT_ENTRY_ERROR:
      return {
        ...state,
        userCurrentEntry: {
          ...state.userCurrentEntry,
          deleting: false,
          deleteError: action.payload.error,
        },
      }

    case DELETE_ENTRY:
      return { ...state, userEntries: { ...state.userEntries, deleting: true } }

    case DELETE_ENTRY_SUCCESS:
      return {
        ...state,
        userEntries: {
          ...state.userEntries,
          deleting: false,
          deleteError: null,
          value: state.userEntries.value.filter(
            entry => entry.id !== action.payload.entry.id
          ),
        },
      }

    case DELETE_ENTRY_ERROR:
      return {
        ...state,
        userEntries: {
          ...state.userEntries,
          deleting: false,
          deleteError: action.payload.error,
        },
      }

    case SAVE_NEW_ENTRY:
      return {
        ...state,
        userCurrentEntry: { ...state.userCurrentEntry, saving: true },
      }

    case SAVE_NEW_ENTRY_SUCCESS:
      return {
        ...state,
        userCurrentEntry: {
          ...state.userCurrentEntry,
          saving: false,
          value: action.payload.entry,
          saveError: null,
        },
        weekEntries: {
          ...state.weekEntries,
          value: state.weekEntries.hasLoaded
            ? [...state.weekEntries.value, action.payload.entry]
            : state.weekEntries.value,
        },
      }

    case SAVE_NEW_ENTRY_ERROR:
      return {
        ...state,
        userCurrentEntry: {
          ...state.userCurrentEntry,
          saving: false,
          saveError: action.payload.error,
        },
      }

    case FETCH_WEEK_ENTRIES:
      return { ...state, weekEntries: { ...state.weekEntries, loading: true } }

    case FETCH_WEEK_ENTRIES_SUCCESS:
      return {
        ...state,
        weekEntries: {
          ...state.weekEntries,
          hasLoaded: true,
          loading: false,
          error: null,
          value: action.payload.entries,
        },
      }

    case FETCH_WEEK_ENTRIES_ERROR:
      return {
        ...state,
        weekEntries: {
          ...state.weekEntries,
          loading: false,
          error: action.payload.error,
        },
      }

    default:
      return state
  }
}

export default rootReducer
