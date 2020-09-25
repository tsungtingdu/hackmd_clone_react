import { all } from "redux-saga/effects";

import userSaga from "./userSaga";
import postSaga from "./postSaga";
import collaboratorSaga from "./collaboratorSaga";

export default function* rootSaga() {
  yield all([userSaga(), postSaga(), collaboratorSaga()]);
}
