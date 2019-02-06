//required libraries
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import axios from "axios";

//reducers
import reducers from "../reducers/index";

//sagas
import mySaga from "../sagas/saga";
//create saga
const sagaMiddleware = createSagaMiddleware();

//using compose to add redux devtools
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//fetch token and users details from local storage
const jwtToken = localStorage.getItem("JWT_TOKEN");
let user = localStorage.getItem("USER");
console.log(user ? "Logged In" : "Not Logged In");

if (user) {
  //check if session exists
  user = user.split('"'); //spliting user-object-stringfied string stored in localstorage by(")
  console.log("checking value.......", user); //cheacking user array elements
}

//set headers
axios.defaults.headers.common["Authorization"] = jwtToken;

//init store with session details
const store = createStore(
  reducers,
  {
    auth: {
      token: jwtToken,
      userName: user ? user[11] : "", //setting user details as per array element
      userId: user ? user[7] : "",
      isAuthenticated: jwtToken ? true : false
    }
  },
  composeEnhancer(applyMiddleware(sagaMiddleware))
);
//runnig root saga
sagaMiddleware.run(mySaga);

//export store
export default store;
