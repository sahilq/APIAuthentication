import { GET_SECRET_ASYNC } from "../actions/types";

const DEFAULT_STATE = {
  secret: ""
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_SECRET_ASYNC:
      return { ...state, secret: action.payload };
    default:
      return state;
  }
};
