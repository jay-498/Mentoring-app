import { call, put, takeEvery } from "redux-saga/effects";
import { UPDATE_CALENDER_EVENT_REQUESTED } from "../actionTypes/index";
// import {
//   loginSuccess,
//   loginFailure,
//   signinSuccess,
//   signinFailure,
// } from "../actions/Login";
import { updateCalenderEvent } from "../../services/booking.service";

function* updateCalenderEventSaga(action) {
  try {
    const jwt_token = localStorage.getItem("user_token");
    const auth = yield call(updateCalenderEvent, {jwt_token});
    console.log("saga",auth)
//     if (auth.success) {
//       localStorage.setItem("user_token", auth.token);
//     }
//     yield put(loginSuccess(auth));
  } catch (e) {
      console.log("sagafailed");
    // yield put(loginFailure("Invalid Otp"));
  }
}

function* bookingSaga() {
  yield takeEvery(UPDATE_CALENDER_EVENT_REQUESTED, updateCalenderEventSaga);
}

export default bookingSaga;
