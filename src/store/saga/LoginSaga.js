import { call, put, takeEvery } from "redux-saga/effects";
import { LOGIN_REQUESTED, SIGNIN_REQUESTED } from "../actionTypes/index";
import {
  loginSuccess,
  loginFailure,
  signinSuccess,
  signinFailure,
} from "../actions/Login";
import { verifyOtp, signinUser } from "../../services/auth.service";

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
}

export default userSaga;
