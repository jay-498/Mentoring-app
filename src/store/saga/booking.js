import { call, put, takeEvery } from "redux-saga/effects";
import { UPDATE_CALENDER_EVENT_REQUESTED } from "../actionTypes/index";
import {
  updateCalenderEventSuccess
} from "../actions/booking";
import { updateCalenderEvent } from "../../services/booking.service";

function* updateCalenderEventSaga(action) {
  try {
    const jwt_token = localStorage.getItem("jwt_token");
    const auth = yield call(updateCalenderEvent, {...action.payload,jwt_token});
    console.log("calender success",auth)
    if (auth.success) {
      alert(auth.msg)
      yield put(updateCalenderEventSuccess())
    }
  } catch (e) {
    alert("Failed to add the Calender Event")
  }
}

function* bookingSaga() {
  yield takeEvery(UPDATE_CALENDER_EVENT_REQUESTED, updateCalenderEventSaga);
}

export default bookingSaga;
