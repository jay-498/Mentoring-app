import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCH_COLLEGES_REQUESTED,
  FETCH_COMPANIES_REQUESTED,
  FETCH_CURRENT_MENTOR_DETAILS_REQUESTED,
  FETCH_MENTOR_DETAILS_REQUESTED,
  UPDATE_MENTOR_EXPERIENCE_REQUESTED,
} from "../actionTypes/index";
import {
  fetchCollegesSuccess,
  fetchCompaniesSuccess,
  fetchCurrentMentorDetailsSuccess,
  fetchMentorDetailsRequested,
  fetchMentorDetailsSuccess,
  updateMentorExperienceSuccess,
} from "../actions/Mentor";
import {
  getColleges,
  getCompanies,
  getCurrentMentor,
  getMentorById,
  updateMentorExperience,
} from "../../services/Mentor.service";
import { toast } from "react-toastify";

function* updateMentorExperienceSaga(action) {
  try {
    const res = yield call(updateMentorExperience, action.payload);
    if (res.success) {
      yield put(updateMentorExperienceSuccess(res));
      toast.success(res.msg, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  } catch (e) {
    console.log("saga", e.msg);
    toast.error(e.msg, {
      position: toast.POSITION.TOP_CENTER,
    });
  }
}

function* fetchCompaniesSaga(action) {
  try {
    const res = yield call(getCompanies, action.payload);
    yield put(fetchCompaniesSuccess(res.data));
  } catch (e) {
    console.log(e);
  }
}

function* fetchMentorDetailsSaga(action) {
  try {
    const res = yield call(getMentorById, action.payload);
    yield put(fetchMentorDetailsSuccess(res));
  } catch (e) {
    console.log(e);
  }
}

function* fetchCollegesSaga(action) {
  try {
    const res = yield call(getColleges, action.payload);
    yield put(fetchCollegesSuccess(res));
  } catch (e) {
    console.log(e);
  }
}

function* fetchCurrentMentorDetailsSaga() {
  try {
    const res = yield call(getCurrentMentor);
    if (res.success) {
      yield put(fetchCurrentMentorDetailsSuccess(res.data));
    }
  } catch (e) {
    console.log(e);
  }
}

function* mentorSaga() {
  yield takeEvery(
    UPDATE_MENTOR_EXPERIENCE_REQUESTED,
    updateMentorExperienceSaga
  );
  yield takeEvery(FETCH_COMPANIES_REQUESTED, fetchCompaniesSaga);
  yield takeEvery(FETCH_COLLEGES_REQUESTED, fetchCollegesSaga);
  yield takeEvery(FETCH_MENTOR_DETAILS_REQUESTED, fetchMentorDetailsSaga);
  yield takeEvery(
    FETCH_CURRENT_MENTOR_DETAILS_REQUESTED,
    fetchCurrentMentorDetailsSaga
  );
}

export default mentorSaga;
