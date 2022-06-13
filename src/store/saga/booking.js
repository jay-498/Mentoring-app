import { call, put, takeEvery } from "redux-saga/effects";
import { UPDATE_CALENDER_EVENT_REQUESTED ,GET_MENTOR_AVAILABILITY_REQUESTED} from "../actionTypes/index";
import {
  updateCalenderEventSuccess
} from "../actions/booking";
import { updateCalenderEvent,getMentorAvailability } from "../../services/booking.service";
import { toast } from "react-toastify";

function* updateCalenderEventSaga(action) {
  try {
    const jwt_token = localStorage.getItem("user_token");
    const auth = yield call(updateCalenderEvent, {...action.payload,jwt_token});
    if (auth.success) {
      toast.success(auth.msg,{position: toast.POSITION.TOP_CENTER})
      yield put(updateCalenderEventSuccess())
    }
  } catch (e) {
    toast.error("Failed to add the Calender Event",{position: toast.POSITION.TOP_CENTER})
  }
}

function* getMentorAvailabilitySaga(action) {
  try {
    const jwt_token = localStorage.getItem("user_token");
    const auth = yield call(getMentorAvailability, {...action.payload,jwt_token});
  } catch (e) {
    console.log("error",e.msg)
    toast.error(e.msg,{position: toast.POSITION.TOP_CENTER})
  }
}

function* bookingSaga() {
  yield takeEvery(UPDATE_CALENDER_EVENT_REQUESTED, updateCalenderEventSaga);
  yield takeEvery(GET_MENTOR_AVAILABILITY_REQUESTED,getMentorAvailabilitySaga);
}

export default bookingSaga;
