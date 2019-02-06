import { put } from "redux-saga/effects";
import axios from "axios";
import * as types from "../actions/types";

export function* signUp(action) {
  try {
    const res = yield axios
      .post("http://192.168.1.140:5000/users/signup", action.payload)
      .then(res => res.data);
    yield put({ type: types.AUTH_SIGN_UP_ASYNC, payload: res });
    yield localStorage.setItem("JWT_TOKEN", res.token);
    yield localStorage.setItem("USER", JSON.stringify(res.user));
    yield (axios.defaults.headers.common["Authorization"] = res.token);
  } catch (err) {
    console.error("error signup", err);
    yield put({
      type: types.AUTH_ERROR,
      payload: "Authentication Failed Try Again"
    });
  }
}
export function* signIn(action) {
  try {
    const res = yield axios
      .post("http://192.168.1.140:5000/users/signin", action.payload)
      .then(res => res.data);

    yield put({ type: types.AUTH_SIGN_IN_ASYNC, payload: res });
    yield localStorage.setItem("JWT_TOKEN", res.token);
    yield localStorage.setItem("USER", JSON.stringify(res.user));
    yield (axios.defaults.headers.common["Authorization"] = res.token);
  } catch (err) {
    console.error("error signup", err);
    yield put({
      type: types.AUTH_ERROR,
      payload: "Authentication Failed Try Again"
    });
  }
}
export function* signOut() {
  try {
    yield localStorage.removeItem("JWT_TOKEN");
    yield localStorage.removeItem("USER");
    yield put({ type: types.AUTH_SIGN_OUT_ASYNC, payload: "" });
    yield (axios.defaults.headers.common["Authorization"] = "");
  } catch (e) {
    console.error("err", e);
  }
}

export function* getSecret() {
  try {
    const res = yield axios.get("http://192.168.1.140:5000/users/secret");

    console.log(res);
    yield put({ type: types.GET_SECRET_ASYNC, payload: res.data.message });
  } catch (e) {
    console.error(e);
  }
}
