import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import combinedReducer from "./reducers/index";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
const store = compose(applyMiddleware(sagaMiddleware))(createStore)(
  combinedReducer
);

sagaMiddleware.run(rootSaga);
export default store;
