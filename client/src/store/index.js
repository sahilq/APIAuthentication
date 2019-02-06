import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import axios from "axios";

import reducers from "../reducers/index";
import mySaga from "../sagas/saga";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const jwtToken = localStorage.getItem("JWT_TOKEN");

let user = localStorage.getItem("USER");
console.log(user ? "Logged In" : "Not Logged In");
if (user) {
  user = user.split('"');
  console.log("checking value.......", user);
}

axios.defaults.headers.common["Authorization"] = jwtToken;

const store = createStore(
  reducers,
  {
    auth: {
      token: jwtToken,
      userName: user ? user[11] : "",
      userId: user ? user[7] : "",
      isAuthenticated: jwtToken ? true : false
    }
  },
  composeEnhancer(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(mySaga);

console.log("store.auth", JSON.stringify(store.auth));
export default store;
