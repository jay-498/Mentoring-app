/* eslint-disable import/no-anonymous-default-export */
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
  LOGOUT,
  UPDATE_USER_MOBILE,
  SET_ERROR_MESSAGE,
} from "../actionTypes/index";

const token = localStorage.getItem("user_token");
let user = { token };
if (!token) {
  user = null;
}

const initialState = user
  ? { isLoggedIn: true, user, userMobile: "" }
  : { isLoggedIn: false, user: null, userMobile: "", otpMessage: "" };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };

    case UPDATE_USER_MOBILE:
      return {
        ...state,
        userMobile: payload,
      };

    case SET_ERROR_MESSAGE:
      return {
        ...state,
        otpMessage: action.payload,
      };

    case SIGNIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        otpMessage: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem("user_token");
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
