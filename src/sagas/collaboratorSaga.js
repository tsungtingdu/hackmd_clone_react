import { takeLatest, call, put } from "redux-saga/effects";
import { getToken } from "../apis/userApi";
import {
  getCollaborators,
  addCollaborator,
  removeCollaborator,
} from "../apis/collaboratorApi";

export function* handleGetCollaborators(action) {
  try {
    yield put({ type: "DATA_LOADING" });
    const reqData = action.reqData;
    const resData = yield call(getCollaborators, reqData);
    yield put({ type: "GET_COLLABORATORS_SUCCESS", resData });
    yield put({ type: "DATA_LOADED" });
  } catch (err) {
    yield put({ type: "DATA_LOADED" });
  }
}
export function* handleInviteCollaborators(action) {
  try {
    yield put({ type: "DATA_LOADING" });
    const TOKEN = yield call(getToken);
    let reqData = {
      id: action.payload.postId,
      email: action.payload.email,
      token: TOKEN,
    };
    yield call(addCollaborator, reqData);

    // renew data
    yield put({ type: "GET_COLLABORATORS_REQUEST", reqData });
    yield put({ type: "DATA_LOADED" });
  } catch (err) {
    yield put({ type: "DATA_LOADED" });
  }
}
export function* handleRemoveCollaborators(action) {
  try {
    yield put({ type: "DATA_LOADING" });
    const TOKEN = yield call(getToken);
    let reqData = {
      id: action.payload.postId,
      email: action.payload.email,
      token: TOKEN,
    };
    yield call(removeCollaborator, reqData);

    // renew data
    yield put({ type: "GET_COLLABORATORS_REQUEST", reqData });
    yield put({ type: "DATA_LOADED" });
  } catch (err) {
    yield put({ type: "DATA_LOADED" });
  }
}

export default function* watchPostReq() {
  yield takeLatest("GET_COLLABORATORS_REQUEST", handleGetCollaborators);
  yield takeLatest("INVITE_COLLABORATOR_REQUEST", handleInviteCollaborators);
  yield takeLatest("REMOVE_COLLABORATOR_REQUEST", handleRemoveCollaborators);
}
