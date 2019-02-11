import { call } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions/actionCreator";

//User URI
const userUri = "http://192.168.1.140:5000/users";

//Function to save auth data to Local Storage
function* svAuthInfo(res) {
  yield localStorage.setItem("JWT_TOKEN", res.token);
  yield localStorage.setItem("USER", JSON.stringify(res.user));
  yield (axios.defaults.headers.common["Authorization"] = res.token);
}

//Remove auth info from Local Storage
function* rmAuthInfo() {
  yield localStorage.removeItem("JWT_TOKEN");
  yield localStorage.removeItem("USER");
}

export function* signUp(action) {
  try {
    const res = yield axios
      .post(`${userUri}/signup`, action.payload)
      .then(res => res.data);
    yield call(actions.signUpSuccess, res);
    yield call(svAuthInfo, res);
  } catch (err) {
    console.error("error signup", err);
    yield call(actions.authError);
  }
}
export function* signIn(action) {
  try {
    const res = yield axios
      .post(`${userUri}/signin`, action.payload)
      .then(res => res.data);

    yield call(actions.signInSuccess, res);
    yield call(svAuthInfo, res);
  } catch (err) {
    console.error("error signup", err);
    yield call(actions.authError);
  }
}
export function* signOut() {
  try {
    yield call(rmAuthInfo);
    yield call(actions.signOut);
    yield (axios.defaults.headers.common["Authorization"] = "");
  } catch (e) {
    console.error("err", e);
  }
}

export function* getSecret() {
  try {
    const res = yield axios.get(`${userUri}/secret`);

    console.log(res);
    yield call(actions.getSecret, res);
  } catch (e) {
    console.error(e);
  }
}
