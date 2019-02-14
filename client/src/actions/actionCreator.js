import { put } from "redux-saga/effects";

import * as types from "./types";
//Auth action creator
//REQUESTS
//Sign Up request
export function signUpRequest(formData) {
  return { type: types.AUTH_SIGN_UP, payload: formData };
}
//Sign In Request
export function signInReq(formData) {
  return { type: types.AUTH_SIGN_IN, payload: formData };
}
//Sign Out request
export function signOutReq() {
  return { type: types.AUTH_SIGN_OUT };
}
//Get Secret Request
export function getSecReq() {
  return { type: types.GET_SECRET };
}
//ASYNCHRONOUS
//SIGN UP SUCCESS

export function* signUpSuccess(data) {
  yield put({ type: types.AUTH_SIGN_UP_ASYNC, payload: data });
}

//SIGN IN SUCCESS
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
//Load request
export function getPosts() {
  return {
    type: types.DATA_LOADING
  };
}
//Add posts request
export function addPost(article) {
  return { type: types.SEND_ARTICLE, article };
}
//Delete request
export function deletePost(_id) {
  return {
    type: types.DELETE_POST,
    _id
  };
}
//Edit request
export function editPost(article, id) {
  return {
    type: types.EDIT_ARTICLE,
    article,
    id
  };
}
//Like/Unlike
export function postVote(info) {
  return {
    type: types.POST_VOTE,
    info
  };
}
//load comments
export function loadComments() {
  return {
    type: types.GET_COMMENTS
  };
}
//Add comment
export function addComment(comment) {
  return { type: types.SEND_COMMENT, comment };
}

//Delete Comment
export function deleteComment(_id) {
  return { type: types.DELETE_COMMENT, _id };
}
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
