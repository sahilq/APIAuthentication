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
      return {
        ...state,
        isAuthenticated: true,
        errorMessage: "",
        token: action.payload.token,
        userId: action.payload.user.id,
        userName: action.payload.user.name
      };
    case types.AUTH_SIGN_IN_ASYNC:
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
