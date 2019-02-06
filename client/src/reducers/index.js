import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./auth";
import dashreducer from "./dash";
import postReducer from "./postComReducer";

export default combineReducers({
  dash: dashreducer,
  form: formReducer,
  auth: authReducer,
  postCom: postReducer
});
