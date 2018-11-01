import axios from "axios";
import ButterToast from "butter-toast";
import moment from "moment";

import { signIn } from "../auth";
import User from "../models/user";
import Response from "../models/response";
import * as actionTypes from "./actionTypes";

const RESOURCES = {
  users: "http://localhost:3000/api/v1/users",
  userByEmail: "http://localhost:3000/api/v1/users/email",
  responses: "http://localhost:3000/api/v1/responses"
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
      if (!error.response) {
        ButterToast.raise({ content: "Couldn't reach the server..." });
        return dispatch(signInUserFail(error.message));
      }
      if (error.response.status === 404) {
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
          if (error.response.status === 400) {
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

export const saveResponse = content => {
  return async (dispatch, getState) => {
    dispatch(postResponse());

    const currentUser = getState().currentUser;
    let response;
    try {
      response = await axios.post(RESOURCES.responses, {
        userId: currentUser.id,
        [content.includes("http") ? "link" : "text"]: content
      });
    } catch (error) {
      return dispatch(postResponseError(error.message));
    }

    const resData = response.data.response;
    const responseObj = new Response(
      resData.user,
      resData.text,
      resData.link,
      moment(resData.createdAt),
      resData.week,
      resData.id
    );

    ButterToast.raise({
      content: `New response saved for week ${responseObj.week}`
    });
    dispatch(postResponseSuccess(responseObj));
  };
};

export const postResponse = () => ({ type: actionTypes.POST_RESPONSE });

export const postResponseSuccess = response => ({
  type: actionTypes.POST_RESPONSE_SUCCESS,
  response
});

export const postResponseError = error => ({
  type: actionTypes.POST_RESPONSE_FAIL,
  error
});

export const getUserResponses = () => {
  return async (dispatch, getState) => {
    dispatch(fetchUserResponses());

    let axiosResponse;
    try {
      axiosResponse = await axios.get(RESOURCES.responses, {
        params: { userName: getState().currentUser.name }
      });
    } catch (error) {
      return dispatch(fetchUserResponsesError(error.message));
    }

    const responses = axiosResponse.data.responses.map(
      data =>
        new Response(
          data.user,
          data.text,
          data.link,
          moment(data.createdAt),
          data.week
        )
    );
    dispatch(fetchUserResponsesSuccess(responses));
  };
};

export const fetchUserResponses = () => ({
  type: actionTypes.GET_USER_RESPONSES
});

export const fetchUserResponsesSuccess = responses => ({
  type: actionTypes.GET_USER_RESPONSES_SUCCESS,
  responses
});

export const fetchUserResponsesError = error => ({
  type: actionTypes.GET_USER_RESPONSES_FAIL,
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

    const currentResponse = response.data.user.currentResponse;
    if (currentResponse) {
      userObj.currentResponse = new Response(
        userObj,
        currentResponse.text,
        currentResponse.link,
        moment(currentResponse.createdAt),
        currentResponse.week,
        currentResponse.id
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

export const deleteCurrentResponse = () => {
  return async (dispatch, getState) => {
    dispatch(requestDeleteCurrentResponse());

    let response;
    try {
      const responseId = getState().currentUser.currentResponse.id;
      response = await axios.delete(`${RESOURCES.responses}/${responseId}`);
    } catch (error) {
      return dispatch(failDeleteCurrentResponse(error.message));
    }

    ButterToast.raise({
      content: `${response.data.response.id}: deleted`
    });
    return dispatch(succeedDeleteCurrentResponse());
  };
};

export const requestDeleteCurrentResponse = () => ({
  type: actionTypes.DELETE_CURRENT_RESPONSE
});

export const succeedDeleteCurrentResponse = () => ({
  type: actionTypes.DELETE_CURRENT_RESPONSE_SUCCESS
});

export const failDeleteCurrentResponse = error => ({
  type: actionTypes.DELETE_CURRENT_RESPONSE_FAIL,
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

export const updateUser = () => ({
  type: actionTypes.UPDATE_USER
});

export const updateUserSuccess = userObj => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
  user: userObj
});

export const updateUserFail = error => ({
  type: actionTypes.UPDATE_USER_FAIL,
  error
});
