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
    const jwt_token = localStorage.getItem("jwt_token");
    const auth = yield call(updateCalenderEvent, {jwt_token});
    if (auth.success) {
      console.log(auth.msg)
    }
  } catch (e) {
    console.log("Failed to add the Calender Event")
  }
}

function* bookingSaga() {
  yield takeEvery(UPDATE_CALENDER_EVENT_REQUESTED, updateCalenderEventSaga);
}

export default bookingSaga;
