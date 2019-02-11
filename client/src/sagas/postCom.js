import { call } from "redux-saga/effects";
import axios from "axios";

import * as actions from "../actions/actionCreator";

const postUri = "http://192.168.1.140:5000/posts";
const commentUri = "http://192.168.1.140:5000/comments";

export function* postVote(action) {
  if (action.info.action === "Like") {
    const user = action.info.user;

    yield axios.patch(
      "http://localhost:5000/posts/like/" + action.info.postId,
      { user }
    );
    yield call(actions.dataLoading);
  } else {
    const user = action.info.user;
    yield axios.patch(
      "http://localhost:5000/posts/unlike/" + action.info.postId,
      {
        user
      }
    );
    yield call(actions.dataLoading);
  }
}

//fetch post
export function* getPosts() {
  try {
    const res = yield call(axios.get, postUri);

    yield call(actions.dataLoaded, res.data);
  } catch (e) {
    console.error(e);
  }
}
//delete post
export function* deletePost(action) {
  try {
    yield axios.delete(postUri + "/" + action._id);
    yield call(actions.dataLoading);
  } catch (e) {
    console.error(e);
  }
}
//add new post
export function* addArticle(action) {
  try {
    yield axios.post(postUri, {
      title: action.article.title,
      article: action.article.article,
      userId: action.article.userId,
      userName: action.article.userName
    });
    yield call(actions.dataLoading);
  } catch (e) {
    console.error(e);
  }
}

//patching post
export function* patchArticle(action) {
  try {
    yield axios.patch(postUri + "/" + action.id, {
      article: action.article.article,
      title: action.article.title
    });
    yield call(actions.dataLoading);
  } catch (e) {
    console.error(e);
  }
}
//delete comment
export function* deleteComment(action) {
  try {
    yield axios.delete(commentUri + "/" + action._id);
    yield call(actions.getComments);
  } catch (e) {
    console.error(e);
  }
}
//fetch comments
export function* getComments() {
  try {
    const res = yield axios.get(commentUri);
    const data = res.data;
    yield call(actions.commentsLoaded, data);
  } catch (e) {
    console.error(e);
  }
}
//adding new comment
export function* addComment(action) {
  try {
    yield axios.post(commentUri, {
      postId: action.comment.postId,
      body: action.comment.body,
      userId: action.comment.userId,
      userName: action.comment.userName
    });
    yield call(actions.getComments);
  } catch (e) {
    console.error(e);
  }
}
