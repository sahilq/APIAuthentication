import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";
import store from "./store/index";

import App from "./components/App";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import * as serviceWorker from "./serviceWorker";

import authGuard from "./components/HOCs/authGuard";
import signOnGuard from "./components/HOCs/signOnGuard";

const jwtToken = localStorage.getItem("JWT_TOKEN");
axios.defaults.headers.common["Authorization"] = jwtToken;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={authGuard(Dashboard)} />
        <Route exact path="/signup" component={signOnGuard(SignUp)} />
        <Route exact path="/signin" component={signOnGuard(SignIn)} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
serviceWorker.unregister();
