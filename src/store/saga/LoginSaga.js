import { call, put, takeEvery } from "redux-saga/effects";
import { LOGIN_REQUESTED, GOOGLE_SIGNIN_REQUESTED } from "../actionTypes/index";
import {
  loginSuccess,
  loginFailure,
  signinSuccess,
  signinFailure,
} from "../actions/Login";
import { verifyOtp, googleSignin } from "../../services/auth.service";

function* loginSaga(action) {
  try {
    const auth = yield call(verifyOtp, action.payload);
    if (auth.success) {
      localStorage.setItem("user_token", auth.token);
    }
    yield put(loginSuccess(auth));
  } catch (e) {
    yield put(loginFailure("Invalid Otp"));
  }
}

function* googleLoginSaga(action) {
  try {
    const auth = yield call(googleSignin, action.payload);
    console.log("googlesaga",auth);
    if (auth.success) {
      localStorage.setItem("user_token", auth.token);
    }
    yield put(loginSuccess(auth));
  } catch (e) {
    yield put(loginFailure(e.msg));
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
