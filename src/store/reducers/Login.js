/* eslint-disable import/no-anonymous-default-export */
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
  LOGOUT,
} from "../actionTypes/index";

const token = localStorage.getItem("user_token");
let user = { token };
if (!token) {
  user = null;
}

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
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
