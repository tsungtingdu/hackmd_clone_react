import { takeLatest, call, put } from "redux-saga/effects";
import {
  signInApi,
  signUpApi,
  setToken,
  signOutApi,
  getUserApi,
} from "../apis/userApi";
import { toast } from "react-toastify";

export function* handleSignIn(action) {
  try {
    yield put({ type: "DATA_LOADING" });
    const data = yield call(signInApi, action.data);
    if (!data) {
      toast.error("something wrong, please try again");
    } else {
      yield call(setToken, data.data);
      yield put({ type: "SIGN_IN_SUCCESS", data });
      yield put({ type: "GET_POSTS_REQUEST" });
    }
    yield put({ type: "DATA_LOADED" });
  } catch (err) {
    yield put({ type: "SIGN_IN_ERROR" });
    yield put({ type: "DATA_LOADED" });
    toast.error("something wrong, please try again");
  }
}

export function* handleSignUp(action) {
  try {
    yield put({ type: "DATA_LOADING" });
    const data = yield call(signUpApi, action.data);
    if (!data) {
      toast.error("something wrong, please try again");
    } else {
      yield put({ type: "SIGN_UP_SUCCESS", data });
      toast.success("Sign up successfully, sign in now!");
    }
    yield put({ type: "DATA_LOADED" });
  } catch (err) {
    yield put({ type: "SIGN_UP_ERROR" });
    yield put({ type: "DATA_LOADED" });
    toast.error("something wrong, please try again");
  }
}

export function* handleSignOut() {
  try {
    yield call(signOutApi);
    yield put({ type: "CLEAR_POST" });
    yield put({ type: "SIGN_OUT_SUCCESS" });
    toast.success("sign out successfully");
  } catch (err) {
    yield put({ type: "SIGN_OUT_ERROR" });
    yield put({ type: "DATA_LOADED" });
    toast.error("please try again");
  }
}

export function* handleGetUser(action) {
  try {
    yield put({ type: "DATA_LOADING" });
    const data = yield call(getUserApi, action.data);
    yield put({ type: "SIGN_IN_SUCCESS", data });
    yield put({ type: "DATA_LOADED" });
  } catch (err) {
    yield put({ type: "DATA_LOADED" });
  }
}

export default function* watchUserReq() {
  yield takeLatest("SIGN_IN_REQUEST", handleSignIn);
  yield takeLatest("SIGN_UP_REQUEST", handleSignUp);
  yield takeLatest("SIGN_OUT_REQUEST", handleSignOut);
  yield takeLatest("GET_USER_REQUEST", handleGetUser);
}
