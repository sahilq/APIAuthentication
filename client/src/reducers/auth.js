import * as types from "../actions/types";

const initialState = {
  isAuthenticated: false,
  token: "",
  errorMessage: "",
  userId: "",
  userName: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_SIGN_UP_ASYNC:
      console.log(
        action.payload.user.name,
        "SIGNED UP WITH ID",
        action.payload.user.id
      );
      return {
        ...state,
        isAuthenticated: true,
        errorMessage: "",
        token: action.payload.token,
        userId: action.payload.user.id,
        userName: action.payload.user.name
      };
    case types.AUTH_SIGN_IN_ASYNC:
      console.log("SIGNED IN WITH ID", action.payload.user.id);
      return {
        ...state,
        isAuthenticated: true,
        errorMessage: "",
        token: action.payload.token,
        userId: action.payload.user.id,
        userName: action.payload.user.name
      };
    case types.AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: action.payload,
        token: "",
        userId: ""
      };
    case types.AUTH_SIGN_OUT_ASYNC:
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: "",
        token: "",
        userId: ""
      };
    default:
      return state;
  }
};
