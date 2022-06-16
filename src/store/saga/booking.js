import { call, put, takeEvery } from "redux-saga/effects";
import { UPDATE_CALENDER_EVENT_REQUESTED ,FETCH_MENTOR_EVENTS_REQUESTED} from "../actionTypes/index";
import {
  fetchMentorEventRequested,
  fetchMentorEventSuccess,
  updateCalenderEventSuccess
} from "../actions/booking";
import { getAllSlots, updateCalenderEvent } from "../../services/booking.service";
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

function* fetchMentorEventsSaga(action) {
  try {
    const res = yield call(getAllSlots, {...action.payload});
    if(res.success){
      yield put(fetchMentorEventSuccess({type:action.payload.type,data:res.data}))
    }
  } catch (e) {
    toast.error(e.message)
  }
}

function* bookingSaga() {
  yield takeEvery(UPDATE_CALENDER_EVENT_REQUESTED, updateCalenderEventSaga);
  yield takeEvery(FETCH_MENTOR_EVENTS_REQUESTED,fetchMentorEventsSaga);
}

export default bookingSaga;
