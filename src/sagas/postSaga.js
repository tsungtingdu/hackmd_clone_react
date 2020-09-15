import { takeEvery, takeLatest, call, put } from 'redux-saga/effects'
import { getToken } from '../apis/userApi'
import { createPostApi, savePostApi, getPostsApi, getPostApi } from '../apis/postApi'

export function* handleGetPost(action) {
  try {
    yield put({ type: 'DATA_LOADING'})
    const TOKEN = yield call(getToken)
    const reqData = {
      ...action.payload,
      token: TOKEN,
    }
    const resData = yield call(getPostApi, reqData)
    yield put({ type: 'GET_POST_SUCCESS', resData })
    yield put({ type: 'DATA_LOADED' })
  } catch (err) {
    yield put({ type: 'DATA_LOADED' })
   }
}

export function* handleGetPosts(action) {
  try {
    yield put({ type: 'DATA_LOADING' })
    const TOKEN = yield call(getToken)
    const reqData = {
      ...action.data,
      token: TOKEN,
    }
    const resData = yield call(getPostsApi, reqData)
    yield put({ type: 'GET_POSTS_SUCCESS', resData })
    yield put({ type: 'DATA_LOADED' })
  } catch (err) { 
    yield put({ type: 'DATA_LOADED' })
  }
}

export function* handleCreatePost() {
  try {
    yield put({ type: 'DATA_LOADING' })
    const TOKEN = yield call(getToken)
    const data = yield call(createPostApi, TOKEN)
    yield put({ type: 'UPDATE_POST_SUCCESS', data })
    yield put({ type: 'DATA_LOADED' })
  } catch (err) {
    yield put({ type: 'DATA_LOADED' })
  }
}

export function* handleSavePost(action) {
  try {
    yield put({ type: 'DATA_LOADING' })
    const TOKEN = yield call(getToken)
    const reqData = {
      ...action.data,
      token: TOKEN,
    }
    const resData = yield call(savePostApi, reqData)
    yield put({ type: 'UPDATE_POST_SUCCESS', resData })
    yield put({ type: 'DATA_LOADED' })
  } catch (err) {
    yield put({ type: 'DATA_LOADED' })
  }
}

export default function* watchPostReq() {
  yield takeLatest('GET_POST_REQUEST', handleGetPost)
  yield takeLatest('GET_POSTS_REQUEST', handleGetPosts)
  yield takeLatest('CREATE_POST_REQUEST', handleCreatePost)
  yield takeLatest('SAVE_POST_REQUEST', handleSavePost)
}
