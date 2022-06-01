import { call, put, takeEvery } from "redux-saga/effects";
import { LOGIN_REQUESTED, GOOGLE_SIGNIN_REQUESTED } from "../actionTypes/index";
import {
  loginSuccess,
  loginFailure,
  googleSigninSuccess,
  googleSigninFailure,
} from "../actions/Login";
import { verifyOtp, googleSignin } from "../../services/auth.service";

function* loginSaga(action) {
  try {
    const auth = yield call(verifyOtp, action.payload);
    if (auth.success) {
      localStorage.setItem("jwt_token", auth.jwt_token);
    }
    yield put(loginSuccess(auth));
  } catch (e) {
    yield put(loginFailure("Invalid Otp"));
  }
}

function* googleLoginSaga(action) {
  try {
    const jwt_token = localStorage.getItem("jwt_token");
    const data = {...action.payload,jwt_token }
    const auth = yield call(googleSignin, data);
    console.log("googlesaga",auth);
    yield put(googleSigninSuccess());
  } catch (e) {
    yield put(googleSigninFailure());
  }
}

// function* signinSaga(action) {
//   try {
//     const auth = yield call(signinUser, action.payload);
//     console.log(auth);
//     if (auth) {
//       localStorage.setItem("user_token", auth);
//     }
//     yield put(signinSuccess(auth));
//   } catch (e) {
//     yield put(signinFailure(e));
//   }
// }

function* userSaga() {
  yield takeEvery(LOGIN_REQUESTED, loginSaga);
  yield takeEvery(GOOGLE_SIGNIN_REQUESTED, googleLoginSaga);
}

export default userSaga;
