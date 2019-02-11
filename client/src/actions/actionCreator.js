import { put } from "redux-saga/effects";

import * as types from "./types";
//Auth action creator

//SIGN UP

export function* signUpSuccess(data) {
  yield put({ type: types.AUTH_SIGN_UP_ASYNC, payload: data });
}

//SIGN IN
export function* signInSuccess(res) {
  yield put({ type: types.AUTH_SIGN_IN_ASYNC, payload: res });
}

//AUTH ERROR
export function* authError() {
  yield put({
    type: types.AUTH_ERROR,
    payload: "Authentication Failed Try Again"
  });
}

//GET SECRET
export function* getSecret(res) {
  yield put({ type: types.GET_SECRET_ASYNC, payload: res.data.message });
}

//SIGN OUT
export function* signOut() {
  yield put({ type: types.AUTH_SIGN_OUT_ASYNC, payload: "" });
}

//Post and Comments Action Creator

//Fetching Posts from api
export function* dataLoading() {
  yield put({
    type: types.DATA_LOADING
  });
}
//Storing posts to redux store
export function* dataLoaded(data) {
  yield put({
    type: types.DATA_LOADED,
    payload: data
  });
}

//Fetching comments from api
export function* getComments() {
  yield put({
    type: types.GET_COMMENTS
  });
}

//storing comments in store
export function* commentsLoaded(data) {
  yield put({
    type: types.COMMENTS_LOADED,
    payload: data
  });
}
