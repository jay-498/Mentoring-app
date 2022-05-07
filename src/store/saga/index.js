import { all } from "redux-saga/effects";
// import bookingSaga from "./booking";
import userSaga from "./LoginSaga";

export default function* rootSaga() {
  yield all([userSaga()]);
}
