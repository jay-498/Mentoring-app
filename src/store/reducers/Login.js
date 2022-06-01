/* eslint-disable import/no-anonymous-default-export */
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
  GOOGLE_SIGNIN_FAILURE,
  GOOGLE_SIGNIN_SUCCESS,
  LOGOUT,
  UPDATE_USER_MOBILE,
  SET_ERROR_MESSAGE,
} from "../actionTypes/index";

const token = localStorage.getItem("jwt_token");
const google_check = localStorage.getItem("is_google_verified");
let user = { token };
if (!token) {
  user = null;
}

const initialState = user
  ? { isLoggedIn: true,is_google_verified: google_check, user, userMobile: "" }
  : { isLoggedIn: false,is_google_verified: google_check, user: null, userMobile: "", otpMessage: "" };

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

    case GOOGLE_SIGNIN_SUCCESS:
      return {
        ...state,
        is_google_verified: true,
      };

    case GOOGLE_SIGNIN_FAILURE:
      return {
        ...state,
        is_google_verified: false,
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
      console.log("reducer",action.payload)
      return {
        ...state,
        is_google_verified: action.payload.is_google_verified,
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
      localStorage.removeItem("jwt_token");
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
