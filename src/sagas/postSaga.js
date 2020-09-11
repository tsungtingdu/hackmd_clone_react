import { takeLatest, call, put } from 'redux-saga/effects'
import { getToken } from '../apis/userApi'
import { createPostApi, savePostApi } from '../apis/postApi'

export function* handleCreatePost() {
  try {
    const TOKEN = yield call(getToken)
    const data = yield call(createPostApi, TOKEN)
    yield put({ type: 'CREATE_POST_SUCCESS', data })
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
    yield put({ type: 'SAVE_POST_SUCCESS', resData })
  } catch (err) {}
}

export default function* watchPostReq() {
  yield takeLatest('CREATE_POST_REQUEST', handleCreatePost)
  yield takeLatest('SAVE_POST_REQUEST', handleSavePost)
}
