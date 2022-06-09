import { call, put, takeEvery } from "redux-saga/effects";
import { UPDATE_CALENDER_EVENT_REQUESTED } from "../actionTypes/index";
import {
  updateCalenderEventSuccess
} from "../actions/booking";
import { updateCalenderEvent } from "../../services/booking.service";
import { toast } from "react-toastify";

function* updateCalenderEventSaga(action) {
  try {
    const jwt_token = localStorage.getItem("user_token");
    const auth = yield call(updateCalenderEvent, {...action.payload,jwt_token});
    if (auth.success) {
      toast.success(auth.msg)
      yield put(updateCalenderEventSuccess())
    }
  } catch (e) {
    toast.error("Failed to add the Calender Event")
  }
}

function* bookingSaga() {
  yield takeEvery(UPDATE_CALENDER_EVENT_REQUESTED, updateCalenderEventSaga);
}

export default bookingSaga;
