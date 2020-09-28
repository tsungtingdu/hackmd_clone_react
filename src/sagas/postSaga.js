import { takeLatest, call, put } from "redux-saga/effects";
import { getToken } from "../apis/userApi";
import {
  createPostApi,
  updatePostStatusApi,
  getPostsApi,
  getPostApi,
  getViewOnlyPostApi,
  DeletePostApi,
  autoSaveApi,
} from "../apis/postApi";

export function* handleGetPost(action) {
  try {
    yield put({ type: "DATA_LOADING" });
    const TOKEN = yield call(getToken);
    let reqData = {
      ...action.payload,
      token: TOKEN,
    };
    // get post data
    const resData = yield call(getPostApi, reqData);
    yield put({ type: "GET_POST_SUCCESS", resData });
    // get collaborators data
    yield put({ type: "GET_COLLABORATORS_REQUEST", reqData });
    yield put({ type: "DATA_LOADED" });
  } catch (err) {
    yield put({ type: "DATA_LOADED" });
  }
}

export function* handleGetPosts(action) {
  try {
    yield put({ type: "DATA_LOADING" });
    const TOKEN = yield call(getToken);
    const reqData = {
      ...action.data,
      token: TOKEN,
    };
    const resData = yield call(getPostsApi, reqData);
    yield put({ type: "GET_POSTS_SUCCESS", resData });
    yield put({ type: "DATA_LOADED" });
  } catch (err) {
    yield put({ type: "DATA_LOADED" });
  }
}

export function* handleCreatePost() {
  try {
    yield put({ type: "DATA_LOADING" });
    const TOKEN = yield call(getToken);
    const resData = yield call(createPostApi, TOKEN);
    yield put({ type: "UPDATE_POST_SUCCESS", resData });
    yield put({ type: "DATA_LOADED" });
  } catch (err) {
    yield put({ type: "DATA_LOADED" });
  }
}

export function* handleSavePost(action) {
  try {
    yield put({ type: "DATA_LOADING" });
    const TOKEN = yield call(getToken);
    const reqData = {
      ...action.payload,
      token: TOKEN,
    };
    const resData = yield call(updatePostStatusApi, reqData);
    yield put({ type: "UPDATE_POST_SUCCESS", resData });
    yield put({ type: "DATA_LOADED" });
  } catch (err) {
    yield put({ type: "DATA_LOADED" });
  }
}

export function* handleDeletePost(action) {
  try {
    yield put({ type: "DATA_LOADING" });
    const TOKEN = yield call(getToken);
    const reqData = {
      ...action.payload,
      token: TOKEN,
    };
    yield call(DeletePostApi, reqData);
    yield put({ type: "GET_POSTS_REQUEST" });
    yield put({ type: "DATA_LOADED" });
  } catch (err) {
    yield put({ type: "DATA_LOADED" });
  }
}

export function* handleAutoSave(action) {
  try {
    const resData = yield call(autoSaveApi, action.data);
    yield put({ type: "UPDATE_POST_SUCCESS", resData });
  } catch (err) {}
}

export function* handleGetViewOnlyPost(action) {
  try {
    yield put({ type: "DATA_LOADING" });
    let { postId } = action.payload;
    const resData = yield call(getViewOnlyPostApi, postId);
    yield put({ type: "GET_VIEW_ONLY_POST_SUCCESS", resData });
    yield put({ type: "DATA_LOADED" });
  } catch (err) {
    yield put({ type: "GET_VIEW_ONLY_POST_FAIL" });
    yield put({ type: "DATA_LOADED" });
  }
}

export default function* watchPostReq() {
  yield takeLatest("GET_POST_REQUEST", handleGetPost);
  yield takeLatest("GET_POSTS_REQUEST", handleGetPosts);
  yield takeLatest("CREATE_POST_REQUEST", handleCreatePost);
  yield takeLatest("SAVE_POST_REQUEST", handleSavePost);
  yield takeLatest("DELETE_POST_REQUEST", handleDeletePost);
  yield takeLatest("AUTO_SAVE_POST", handleAutoSave);
  yield takeLatest("GET_VIEW_ONLY_POST_REQUEST", handleGetViewOnlyPost);
}
