import { all } from "redux-saga/effects";
import bookingSaga from "./booking";
import userSaga from "./LoginSaga";
import mentorSaga from "./MentorSaga";

export default function* rootSaga() {
  yield all([userSaga(), bookingSaga(), mentorSaga()]);
}
