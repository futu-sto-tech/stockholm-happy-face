import * as actionTypes from "./actionTypes";

export const initialState = {
  currentUser: null,
  userResponses: [],
  isLoadingCurrentUser: false,
  isLoadingSignIn: false,
  isLoadingNewResponse: false,
  isLoadingUserResponses: false,
  checkedAuthState: false,
  isDeletingCurrentResponse: false,
  isUpdatingUser: false,
  error: null
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

    case actionTypes.POST_RESPONSE:
      return { ...state, isLoadingNewResponse: true };

    case actionTypes.POST_RESPONSE_SUCCESS:
      return {
        ...state,
        isLoadingNewResponse: false,
        currentUser: { ...state.currentUser, currentResponse: action.response }
      };

    case actionTypes.POST_RESPONSE_FAIL:
      return { ...state, isLoadingNewResponse: false, error: action.error };

    case actionTypes.GET_USER_RESPONSES:
      return { ...state, isLoadingUserResponses: true };

    case actionTypes.GET_USER_RESPONSES_SUCCESS:
      return {
        ...state,
        isLoadingUserResponses: false,
        userResponses: action.responses
      };

    case actionTypes.GET_USER_RESPONSES_FAIL:
      return {
        ...state,
        isLoadingUserResponses: false,
        error: action.error,
        userResponses: []
      };

    case actionTypes.DELETE_CURRENT_RESPONSE:
      return {
        ...state,
        isDeletingCurrentResponse: true
      };

    case actionTypes.DELETE_CURRENT_RESPONSE_SUCCESS:
      return {
        ...state,
        isDeletingCurrentResponse: false,
        currentUser: {
          ...state.currentUser,
          currentResponse: null
        }
      };

    case actionTypes.DELETE_CURRENT_RESPONSE_FAIL:
      return {
        ...state,
        isDeletingCurrentResponse: false,
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

    default:
      return state;
  }
};

export default reducer;
