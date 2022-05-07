import { call, put, takeEvery } from "redux-saga/effects";
import { LOGIN_REQUESTED, SIGNIN_REQUESTED } from "../actionTypes/index";
import {
  loginSuccess,
  loginFailure,
  signinSuccess,
  signinFailure,
} from "../actions/Login";
import { loginUser, signinUser } from "../../services/auth.service";

function* loginSaga(action) {
  try {
    const auth = yield call(loginUser, action.payload);
    if (auth.token) {
      localStorage.setItem("user_token", auth.token);
    }
    yield put(loginSuccess(auth));
  } catch (e) {
    yield put(loginFailure(e));
  }
}

function* signinSaga(action) {
  try {
    const auth = yield call(signinUser, action.payload);
    console.log(auth);
    if (auth) {
      localStorage.setItem("user_token", auth);
    }
    yield put(signinSuccess(auth));
  } catch (e) {
    yield put(signinFailure(e));
  }
}

function* userSaga() {
  yield takeEvery(LOGIN_REQUESTED, loginSaga);
  yield takeEvery(SIGNIN_REQUESTED, signinSaga);
}

export default userSaga;
