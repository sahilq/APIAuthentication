import { fork, takeLatest, all } from "redux-saga/effects";
import * as postCom from "./postCom";
import * as auth from "./auth";

import * as types from "../actions/types";

function* test(action) {
  yield console.log("In Testing", +action.payload);
}

//Authentication Watcher Saga
function* authSaga() {
  yield all([
    yield takeLatest("TESTING", test),
    yield takeLatest(types.AUTH_SIGN_UP, auth.signUp),
    yield takeLatest(types.AUTH_SIGN_IN, auth.signIn),
    yield takeLatest(types.AUTH_SIGN_OUT, auth.signOut),
    yield takeLatest(types.GET_SECRET, auth.getSecret)
  ]);
}
//Post and Comments watcher saga
function* postComSaga() {
  yield all([
    yield takeLatest(types.DATA_LOADING, postCom.getPosts),
    yield takeLatest(types.DELETE_POST, postCom.deletePost),
    yield takeLatest(types.SEND_ARTICLE, postCom.addArticle),
    yield takeLatest(types.DELETE_COMMENT, postCom.deleteComment),
    yield takeLatest(types.SEND_COMMENT, postCom.addComment),
    yield takeLatest(types.GET_COMMENTS, postCom.getComments),
    yield takeLatest(types.EDIT_ARTICLE, postCom.patchArticle)
  ]);
}
//Root SAGA
export default function* mySaga() {
  yield all([yield fork(authSaga), yield fork(postComSaga)]);
}
