import {
  LOGIN_REQUESTED,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNIN_REQUESTED,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
} from "../actionTypes/index";

export const signinRequested = (data) => {
  return {
    type: SIGNIN_REQUESTED,
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
