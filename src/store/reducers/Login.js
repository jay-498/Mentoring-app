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
import { toast } from "react-toastify";

const userType = localStorage.getItem("type");
const userName = localStorage.getItem("user_name");
const token = localStorage.getItem("user_token");
const google_check = localStorage.getItem("is_google_verified");
let user = { token };
if (!token) {
  user = null;
}

const initialState = user
  ? {
      isLoggedIn: true,
      is_google_verified: google_check,
      user,
      userName: userName,
      userMobile: "",
      userType: userType,
    }
  : {
      isLoggedIn: false,
      is_google_verified: google_check,
      user: null,
      userName: "",
      userMobile: "",
      otpMessage: "",
    };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userType,
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
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      return {
        ...state,
        userName: action.payload.user_name,
        is_google_verified: action.payload.is_google_verified,
        isLoggedIn: true,
        userType,
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
      localStorage.removeItem("user_name");
      localStorage.removeItem("type");
      toast.success("Logout Successfull", {
        position: toast.POSITION.TOP_CENTER,
      });
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
