import { call } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions/actionCreator";

export function* signUp(action) {
  try {
    const res = yield axios
      .post("http://192.168.1.140:5000/users/signup", action.payload)
      .then(res => res.data);
    yield call(actions.signUpSuccess, res);
    yield localStorage.setItem("JWT_TOKEN", res.token);
    yield localStorage.setItem("USER", JSON.stringify(res.user));
    yield (axios.defaults.headers.common["Authorization"] = res.token);
  } catch (err) {
    console.error("error signup", err);
    yield call(actions.authError);
  }
}
export function* signIn(action) {
  try {
    const res = yield axios
      .post("http://192.168.1.140:5000/users/signin", action.payload)
      .then(res => res.data);

    yield call(actions.signInSuccess, res);
    yield localStorage.setItem("JWT_TOKEN", res.token);
    yield localStorage.setItem("USER", JSON.stringify(res.user));
    yield (axios.defaults.headers.common["Authorization"] = res.token);
  } catch (err) {
    console.error("error signup", err);
    yield call(actions.authError);
  }
}
export function* signOut() {
  try {
    yield localStorage.removeItem("JWT_TOKEN");
    yield localStorage.removeItem("USER");
    yield call(actions.signOut);
    yield (axios.defaults.headers.common["Authorization"] = "");
  } catch (e) {
    console.error("err", e);
  }
}

export function* getSecret() {
  try {
    const res = yield axios.get("http://192.168.1.140:5000/users/secret");

    console.log(res);
    yield call(actions.getSecret, res);
  } catch (e) {
    console.error(e);
  }
}
