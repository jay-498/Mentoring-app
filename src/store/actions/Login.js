import {
  LOGIN_REQUESTED,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNIN_REQUESTED,
  SIGNIN_SUCCESS,
  SET_ERROR_MESSAGE,
  SIGNIN_FAILURE,
  UPDATE_USER_MOBILE,
} from "../actionTypes/index";

export const signinRequested = (data) => {
  return {
    type: SIGNIN_REQUESTED,
    payload: data,
  };
};

export const setErrorMessage = (data) => {
  return {
    type: SET_ERROR_MESSAGE,
    payload: data,
  };
};

export const updateUserMobile = (data) => {
  return {
    type: UPDATE_USER_MOBILE,
    payload: data,
  };
};

export const signinSuccess = (data) => {
  return {
    type: SIGNIN_SUCCESS,
    payload: data,
  };
};

export const signinFailure = (data) => {
  return {
    type: SIGNIN_FAILURE,
    payload: data,
  };
};

export const loginRequested = (data) => {
  return {
    type: LOGIN_REQUESTED,
    payload: data,
  };
};

export const logOut = (data) => {
  return {
    type: LOGOUT,
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

export const loginFailure = (data) => {
  return {
    type: LOGIN_FAILURE,
    payload: data,
  };
};
