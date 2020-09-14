import { takeEvery, takeLatest, call, put } from 'redux-saga/effects'
import { getToken } from '../apis/userApi'
import { createPostApi, savePostApi, getPostsApi } from '../apis/postApi'

export function* handleGetPosts(action) {
  try {
    const TOKEN = yield call(getToken)
    const reqData = {
      ...action.data,
      token: TOKEN,
    }
    const resData = yield call(getPostsApi, reqData)
    yield put({ type: 'GET_POSTS_SUCCESS', resData })
  } catch (err) { }
}

export function* handleCreatePost() {
  try {
    const TOKEN = yield call(getToken)
    const data = yield call(createPostApi, TOKEN)
    yield put({ type: 'UPDATE_POST_SUCCESS', data })
  } catch (err) {}
}

export function* handleSavePost(action) {
  try {
    const TOKEN = yield call(getToken)
    const reqData = {
      ...action.data,
      token: TOKEN,
    }
    const resData = yield call(savePostApi, reqData)
    yield put({ type: 'UPDATE_POST_SUCCESS', resData })
  } catch (err) {}
}

export default function* watchPostReq() {
  yield takeLatest('GET_POSTS_REQUEST', handleGetPosts)
  yield takeLatest('CREATE_POST_REQUEST', handleCreatePost)
  yield takeLatest('SAVE_POST_REQUEST', handleSavePost)
}
