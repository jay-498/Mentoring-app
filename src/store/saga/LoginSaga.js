import { call, put, takeEvery } from "redux-saga/effects";
import { LOGIN_REQUESTED, GOOGLE_SIGNIN_REQUESTED,SIGNIN_REQUESTED } from "../actionTypes/index";
import {
  loginSuccess,
  loginFailure,
  googleSigninSuccess,
  googleSigninFailure,
  signinSuccess,
  signinFailure,
  signinRequested,
} from "../actions/Login";
import {
  updateModalNUmber
} from "../actions/booking";
import { verifyOtp, googleSignin, signinUser } from "../../services/auth.service";
import { toast } from "react-toastify";

function* loginSaga(action) {
  try {
    const auth = yield call(verifyOtp, action.payload);
    if (auth.has_user_details) {
      localStorage.setItem("user_token", auth.jwt_token);
      yield put(loginSuccess(auth));
      // localStorage.setItem("is_google_verified", auth.is_google_verified);
    }
    else{
      yield put(updateModalNUmber(2));
    }
  } catch (e) {
    toast.error("Invalid OTP");
    yield put(loginFailure("Invalid Otp"));
  }
}

function* googleLoginSaga(action) {
  try {
    const jwt_token = localStorage.getItem("jwt_token");
    const data = {...action.payload,jwt_token }
    const auth = yield call(googleSignin, data);
    yield put(googleSigninSuccess());
  } catch (e) {
    yield put(googleSigninFailure());
  }
}

function* signinSaga(action) {
  try {
    const auth = yield call(signinUser, action.payload);
    if (auth.success) {
      localStorage.setItem("user_token", auth.jwt_token);
    }
    yield put(signinSuccess(auth));
  } catch (e) {
    yield put(signinFailure(e));
  }
}

function* userSaga() {
  yield takeEvery(LOGIN_REQUESTED, loginSaga);
  yield takeEvery(GOOGLE_SIGNIN_REQUESTED, googleLoginSaga);
  yield takeEvery(SIGNIN_REQUESTED,signinSaga);
}

export default userSaga;
