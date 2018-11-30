import * as actionTypes from "./actionTypes";
import randomEmojis from "../emojis";

export const initialState = {
  currentUser: null,
  userEntries: [],
  isLoadingCurrentUser: false,
  isLoadingSignIn: false,
  isLoadingNewEntry: false,
  isLoadingUserEntries: false,
  checkedAuthState: false,
  isDeletingEntry: false,
  isUpdatingUser: false,
  isSearchingGifs: false,
  gifs: [],
  error: null,
  emojis: randomEmojis(24).map(emoji => ({ value: emoji, selected: false }))
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHECK_CURRENT_USER:
      return { ...state, isLoadingCurrentUser: true };

    case actionTypes.CURRENT_USER_VALID:
      return {
        ...state,
        isLoadingCurrentUser: false,
        currentUser: action.user,
        checkedAuthState: true
      };

    case actionTypes.CURRENT_USER_VOID:
      return {
        ...state,
        isLoadingCurrentUser: false,
        currentUser: null,
        checkedAuthState: true
      };

    case actionTypes.SIGN_IN_USER_FETCH:
      return { ...state, isLoadingSignIn: true };

    case actionTypes.SIGN_IN_USER_SUCCESS:
      return { ...state, isLoadingSignIn: false, currentUser: action.user };

    case actionTypes.SIGN_IN_USER_FAIL:
      return {
        ...state,
        isLoadingSignIn: false,
        currentUser: null,
        error: action.error
      };

    case actionTypes.POST_ENTRY:
      return { ...state, isLoadingNewEntry: true };

    case actionTypes.POST_ENTRY_SUCCESS:
      return {
        ...state,
        isLoadingNewEntry: false,
        currentUser: { ...state.currentUser, currentEntry: action.entry },
        gifs: []
      };

    case actionTypes.POST_ENTRY_FAIL:
      return { ...state, isLoadingNewEntry: false, error: action.error };

    case actionTypes.GET_USER_ENTRIES:
      return { ...state, isLoadingUserEntries: true };

    case actionTypes.GET_USER_ENTRIES_SUCCESS:
      return {
        ...state,
        isLoadingUserEntries: false,
        userEntries: action.entries
      };

    case actionTypes.GET_USER_ENTRIES_FAIL:
      return {
        ...state,
        isLoadingUserEntries: false,
        error: action.error,
        userEntries: []
      };

    case actionTypes.DELETE_ENTRY:
      return {
        ...state,
        isDeletingEntry: true
      };

    case actionTypes.DELETE_ENTRY_SUCCESS:
      return {
        ...state,
        isDeletingEntry: false,
        userEntries: state.userEntries.filter(
          entry => entry.id !== action.entryId
        ),
        currentUser: {
          ...state.currentUser,
          currentEntry:
            state.currentUser.currentEntry.id === action.entryId
              ? null
              : state.currentUser.currentEntry
        }
      };

    case actionTypes.DELETE_ENTRY_FAIL:
      return {
        ...state,
        isDeletingEntry: false,
        error: action.error
      };

    case actionTypes.UPDATE_USER:
      return {
        ...state,
        isUpdatingUser: true
      };

    case actionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.user,
        isUpdatingUser: false
      };

    case actionTypes.UPDATE_USER_FAIL:
      return {
        ...state,
        isUpdatingUser: false,
        error: action.error
      };

    case actionTypes.SEARCH_GIFS:
      return {
        ...state,
        isSearchingGifs: true,
        gifs: []
      };

    case actionTypes.SEARCH_GIFS_SUCCESS:
      return {
        ...state,
        isSearchingGifs: false,
        gifs: action.gifs
      };

    case actionTypes.SEARCH_GIFS_FAIL:
      return {
        ...state,
        isSearchingGifs: false,
        error: action.error
      };

    case actionTypes.SELECT_GIF:
      return {
        ...state,
        gifs: state.gifs.map(gif => ({ ...gif, selected: gif === action.gif }))
      };

    case actionTypes.GET_RANDOM_EMOJIS:
      return {
        ...state,
        emojis: randomEmojis(24).map(emoji => ({
          value: emoji,
          selected: false
        }))
      };

    case actionTypes.TOGGLE_EMOJI:
      return {
        ...state,
        emojis: state.emojis.map(emoji => {
          if (emoji === action.emoji) {
            return { ...emoji, selected: !emoji.selected };
          }
          return emoji;
        })
      };

    default:
      return state;
  }
};

export default reducer;
