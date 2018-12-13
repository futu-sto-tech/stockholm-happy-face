import axios from "axios";
import ButterToast from "butter-toast";
import moment from "moment";

import { signIn } from "../auth";
import User from "../models/user";
import Entry from "../models/entry";
import * as actionTypes from "./actionTypes";

const RESOURCES = {
  users: "http://localhost:3000/api/v1/users",
  userByEmail: "http://localhost:3000/api/v1/users/email",
  entries: "http://localhost:3000/api/v1/entries",
  entriesLastWeek: "http://localhost:3000/api/v1/week/latest",
  gifSearch: "http://localhost:3000/api/v1/gif/search"
};

export const signInUser = () => {
  return async dispatch => {
    dispatch(fetchSignInUser());

    let tmpUserObj;
    try {
      tmpUserObj = await signIn();
    } catch (error) {
      ButterToast.raise({
        content: "Signing in failed, try again!"
      });
      return dispatch(signInUserFail(error.message));
    }
    let response;
    try {
      response = await axios.get(RESOURCES.userByEmail, {
        params: { email: tmpUserObj.email }
      });
    } catch (error) {
      if (!error.entry) {
        ButterToast.raise({ content: "Couldn't reach the server..." });
        return dispatch(signInUserFail(error.message));
      }
      if (error.entry.status === 404) {
        ButterToast.raise({
          content: `Creating new user: ${tmpUserObj.email}`
        });
        try {
          response = await axios.post(RESOURCES.users, {
            name: tmpUserObj.name,
            email: tmpUserObj.email,
            avatar: tmpUserObj.avatar
          });
        } catch (error) {
          if (error.entry.status === 400) {
            ButterToast.raise({
              content: "Creating new user failed, try another email!"
            });
          } else {
            ButterToast.raise({ content: "Creating new user failed" });
          }
          return dispatch(signInUserFail(error.message));
        }
      } else {
        ButterToast.raise({ content: "Sign in failed, try again!" });
        return dispatch(signInUserFail(error.message));
      }
    }

    const { id, name, nickname, email, avatar } = response.data.user;
    const userObj = new User(name, email, avatar, nickname);
    userObj.id = id;

    return dispatch(signInUserSuccess(userObj));
  };
};

export const fetchSignInUser = () => {
  return { type: actionTypes.SIGN_IN_USER_FETCH };
};

export const signInUserSuccess = userObj => {
  return { type: actionTypes.SIGN_IN_USER_SUCCESS, user: userObj };
};

export const signInUserFail = error => ({
  type: actionTypes.SIGN_IN_USER_FAIL,
  error
});

export const saveEntry = content => {
  return async (dispatch, getState) => {
    dispatch(postEntry());

    const currentUser = getState().currentUser;
    let response;
    try {
      response = await axios.post(RESOURCES.entries, {
        userId: currentUser.id,
        [content.includes("http") ? "link" : "text"]: content
      });
    } catch (error) {
      return dispatch(postEntryError(error.message));
    }

    const resData = response.data.entry;
    const entryObj = new Entry(
      resData.user,
      resData.text,
      resData.link,
      moment(resData.createdAt),
      resData.week,
      resData.id
    );

    ButterToast.raise({
      content: `New entry saved for week ${entryObj.week}`
    });
    dispatch(postEntrySuccess(entryObj));
  };
};

export const postEntry = () => ({ type: actionTypes.POST_ENTRY });

export const postEntrySuccess = entry => ({
  type: actionTypes.POST_ENTRY_SUCCESS,
  entry
});

export const postEntryError = error => ({
  type: actionTypes.POST_ENTRY_FAIL,
  error
});

export const getUserEntries = () => {
  return async (dispatch, getState) => {
    dispatch(fetchUserEntries());

    let axiosResponse;
    try {
      axiosResponse = await axios.get(RESOURCES.entries, {
        params: { userName: getState().currentUser.name }
      });
    } catch (error) {
      return dispatch(fetchUserEntriesError(error.message));
    }

    const entries = axiosResponse.data.entries.map(
      data =>
        new Entry(
          data.user,
          data.text,
          data.link,
          moment(data.createdAt),
          data.week,
          data.id
        )
    );
    dispatch(fetchUserEntriesSuccess(entries));
  };
};

export const fetchUserEntries = () => ({
  type: actionTypes.GET_USER_ENTRIES
});

export const fetchUserEntriesSuccess = entries => ({
  type: actionTypes.GET_USER_ENTRIES_SUCCESS,
  entries
});

export const fetchUserEntriesError = error => ({
  type: actionTypes.GET_USER_ENTRIES_FAIL,
  error
});

export const checkCurrentUser = userObj => {
  return async dispatch => {
    dispatch(findCurrentUser());
    let response;
    try {
      response = await axios.get(RESOURCES.userByEmail, {
        params: { email: userObj.email }
      });
    } catch (error) {
      return dispatch(invalidCurrentUser());
    }

    userObj.id = response.data.user.id;
    userObj.nickname = response.data.user.nickname;

    const currentEntry = response.data.user.currentEntry;
    if (currentEntry) {
      userObj.currentEntry = new Entry(
        userObj,
        currentEntry.text,
        currentEntry.link,
        moment(currentEntry.createdAt),
        currentEntry.week,
        currentEntry.id
      );
    }
    ButterToast.raise({
      content: `Found signed in user: ${userObj.name}`
    });
    dispatch(foundValidCurrentUser(userObj));
  };
};

export const findCurrentUser = () => ({
  type: actionTypes.CHECK_CURRENT_USER
});

export const foundValidCurrentUser = userObj => ({
  type: actionTypes.CURRENT_USER_VALID,
  user: userObj
});

export const invalidCurrentUser = () => ({
  type: actionTypes.CURRENT_USER_VOID
});

export const deleteEntry = entry => {
  return async dispatch => {
    dispatch(requestDeleteEntry());

    let response;
    try {
      response = await axios.delete(`${RESOURCES.entries}/${entry.id}`);
    } catch (error) {
      return dispatch(failDeleteEntry(error.message));
    }

    ButterToast.raise({
      content: `${response.data.entry.id}: deleted`
    });
    return dispatch(succeedDeleteEntry(response.data.entry.id));
  };
};

export const requestDeleteEntry = () => ({
  type: actionTypes.DELETE_ENTRY
});

export const succeedDeleteEntry = entryId => ({
  type: actionTypes.DELETE_ENTRY_SUCCESS,
  entryId
});

export const failDeleteEntry = error => ({
  type: actionTypes.DELETE_ENTRY_FAIL,
  error
});

export const updateCurrentUser = ({ nickname }) => {
  return async (dispatch, getState) => {
    dispatch(updateUser());

    const currentUser = getState().currentUser;
    let response;
    try {
      response = await axios.put(`${RESOURCES.users}/${currentUser.id}`, {
        nickname
      });
    } catch (error) {
      ButterToast.raise({ content: `Unable to save user... 🤔` });
      return dispatch(updateUserFail(error.message));
    }

    const {
      id,
      name,
      nickname: newNickname,
      email,
      avatar
    } = response.data.user;
    const userObj = new User(name, email, avatar, newNickname);
    userObj.id = id;

    if (nickname === "RANDOM") {
      ButterToast.raise({ content: `Your new nickname is ${newNickname}!` });
    } else {
      ButterToast.raise({ content: `User updated!` });
    }
    dispatch(updateUserSuccess(userObj));
  };
};

export const updateUser = () => ({ type: actionTypes.UPDATE_USER });

export const updateUserSuccess = userObj => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
  user: userObj
});

export const updateUserFail = error => ({
  type: actionTypes.UPDATE_USER_FAIL,
  error
});

const searchGifsSuccess = gifs => ({
  type: actionTypes.SEARCH_GIFS_SUCCESS,
  gifs
});

const searchGifsFail = error => ({
  type: actionTypes.SEARCH_GIFS_FAIL,
  error
});

const searchGifsStart = () => ({ type: actionTypes.SEARCH_GIFS });

export const searchGifs = query => {
  return async dispatch => {
    dispatch(searchGifsStart());

    let response;
    try {
      response = await axios.get(RESOURCES.gifSearch, { params: { query } });
    } catch (error) {
      ButterToast.raise({ content: `Failed to search for gifs... 🤔` });
      return dispatch(searchGifsFail(error.message));
    }

    dispatch(searchGifsSuccess(response.data.images));
  };
};

export const selectGif = gif => ({
  type: actionTypes.SELECT_GIF,
  gif
});

export const randomizeEmojiSelection = () => {
  return dispatch => dispatch({ type: actionTypes.GET_RANDOM_EMOJIS });
};

export const toggleEmojiSelection = emoji => {
  return (dispatch, getState) => {
    const selectedEmojis = getState().emojis.filter(
      prevEmoji => prevEmoji.selected
    );
    if (selectedEmojis.length === 3 && !selectedEmojis.includes(emoji)) {
      ButterToast.raise({ content: `You can only select 3 emojis` });
      return;
    }

    return dispatch({ type: actionTypes.TOGGLE_EMOJI, emoji });
  };
};

export const nextUser = () => ({ type: actionTypes.NEXT_USER });
export const prevUser = () => ({ type: actionTypes.PREV_USER });

export const getWeeklyEntries = () => {
  return async dispatch => {
    dispatch(fetchWeeklyEntries());

    let response;
    try {
      response = await axios.get(RESOURCES.entriesLastWeek);
    } catch (error) {
      ButterToast.raise({ content: `Unable to load present view... 🤔` });
      return dispatch(fetchWeeklyEntriesFail(error.message));
    }

    const userObjs = response.data.users.map(user => {
      const { id, name, nickname, email, avatar } = user;
      const userObj = new User(name, email, avatar, nickname);
      userObj.id = id;

      if (user.entry) {
        userObj.entry = new Entry(
          user.entry.user,
          user.entry.text,
          user.entry.link,
          moment(user.entry.createdAt),
          user.entry.week,
          user.entry.id
        );
      }

      return userObj;
    });
    return dispatch(fetchWeeklyEntriesSuccess(userObjs));
  };
};

const fetchWeeklyEntries = () => ({
  type: actionTypes.GET_WEEKLY_ENTRIES
});
const fetchWeeklyEntriesSuccess = users => ({
  type: actionTypes.GET_WEEKLY_ENTRIES_SUCCESS,
  users
});
const fetchWeeklyEntriesFail = error => ({
  type: actionTypes.GET_WEEKLY_ENTRIES_FAIL,
  error
});
