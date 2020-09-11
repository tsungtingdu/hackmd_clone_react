import { takeLatest, call, put } from 'redux-saga/effects'
import { signInApi, signUpApi, setToken } from '../apis/userApi'

export function* handleSignIn(action) {
  try {
    const data = yield call(signInApi, action.data)
    yield call(setToken, data.data)
    yield put({ type: 'SIGN_IN_SUCCESS', data })
  } catch (err) {
    yield put({ type: 'SIGN_IN_ERROR' })
  }
}

export function* handleSignUp(action) {
  try {
    const data = yield call(signUpApi, action.data)
    yield put({ type: 'SIGN_UP_SUCCESS', data })
  } catch (err) {
    yield put({ type: 'SIGN_UP_ERROR' })
  }
}

export default function* watchUserReq() {
  yield takeLatest('SIGN_IN_REQUEST', handleSignIn)
  yield takeLatest('SIGN_UP_REQUEST', handleSignUp)
}
