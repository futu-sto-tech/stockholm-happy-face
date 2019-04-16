import React, { createContext, useReducer } from "react";

export const ACTION_TYPE = {
  UPDATE_USERNAME: "UPDATE_USERNAME",

  START_LOGIN: "START_LOGIN",
  COMPLETE_LOGIN: "COMPLETE_LOGIN",
  FAIL_LOGIN: "FAIL_LOGIN",

  START_SAVE_ENTRY: "START_SAVE_ENTRY",
  COMPLETE_SAVE_ENTRY: "COMPLETE_SAVE_ENTRY",
  FAIL_SAVE_ENTRY: "FAIL_SAVE_ENTRY",

  UPDATE_GIF_QUERY: "UPDATE_GIF_QUERY",
  START_GIF_SEARCH: "START_GIF_SEARCH",
  COMPLETE_GIF_SEARCH: "COMPLETE_GIF_SEARCH",
  FAIL_GIF_SEARCH: "COMPLETE_GIF_SEARCH",

  UPDATE_GIF_URL: "UPDATE_GIF_URL",
  UPDATE_SELECTED_GIF: "UPDATE_SELECTED_GIF",
  COMPLETE_SELECT_GIF: "COMPLETE_SELECT_GIF",

  START_DELETE_ENTRY: "START_DELETE_ENTRY",
  COMPLETE_DELETE_ENTRY: "COMPLETE_DELETE_ENTRY",
  FAIL_DELETE_ENTRY: "COMPLETE_DELETE_ENTRY",

  UPDATE_CURRENT_ENTRY: "UPDATE_CURRENT_ENTRY",

  UPDATE_PRODUCTIVITY_POSITIVITY: "UPDATE_PRODUCTIVITY_POSITIVITY"
};

const Context = createContext();

const initialState = {
  user: null,
  loadingUser: false,

  username: "",

  loadingSaveEntry: false,
  currentEntry: null,

  productivity: 0,
  positivity: 0,

  gifQuery: "",
  loadingGifSearch: false,

  selectedGif: { url: "" },
  hasEnteredGif: false,

  loadingDeleteEntry: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.UPDATE_USERNAME:
      return { ...state, username: action.payload.username };

    case ACTION_TYPE.START_LOGIN:
      return { ...state, loadingUser: true };

    case ACTION_TYPE.COMPLETE_LOGIN:
      return { ...state, loadingUser: false, user: action.payload.user };

    case ACTION_TYPE.FAIL_LOGIN:
      return { ...state, loadingUser: false };

    case ACTION_TYPE.START_SAVE_ENTRY:
      return { ...state, loadingSaveEntry: true };

    case ACTION_TYPE.COMPLETE_SAVE_ENTRY:
      return {
        ...state,
        loadingSaveEntry: false,
        currentEntry: action.payload.entry
      };

    case ACTION_TYPE.FAIL_SAVE_ENTRY:
      return { ...state, loadingSaveEntry: false, currentEntry: null };

    case ACTION_TYPE.UPDATE_GIF_QUERY:
      return { ...state, gifQuery: action.payload.query };

    case ACTION_TYPE.UPDATE_GIF_URL:
      return { ...state, selectedGif: { url: action.payload.url } };

    case ACTION_TYPE.UPDATE_SELECTED_GIF:
      return { ...state, selectedGif: action.payload.gif };

    case ACTION_TYPE.START_DELETE_ENTRY:
      return { ...state, loadingDeleteEntry: true };

    case ACTION_TYPE.COMPLETE_DELETE_ENTRY:
      return {
        ...state,
        loadingDeleteEntry: false,
        currentEntry: null,
        hasEnteredGif: false
      };

    case ACTION_TYPE.FAIL_DELETE_ENTRY:
      return { ...state, loadingDeleteEntry: false };

    case ACTION_TYPE.UPDATE_CURRENT_ENTRY:
      return { ...state, currentEntry: action.payload.entry };

    case ACTION_TYPE.UPDATE_PRODUCTIVITY_POSITIVITY:
      return { ...state, ...action.payload };

    case ACTION_TYPE.COMPLETE_SELECT_GIF:
      return { ...state, hasEnteredGif: true };

    default:
      return state;
  }
};

export const ContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

export const ContextConsumer = Context.Consumer;

export default Context;
