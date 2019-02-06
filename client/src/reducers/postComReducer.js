import * as types from "../actions/types";

const initialState = {
  remoteArticles: [],
  comments: []
};

function postReducer(state = initialState, action) {
  if (action.type === types.DATA_LOADED) {
    return Object.assign({}, state, {
      remoteArticles: action.payload
    });
  }
  if (action.type === types.COMMENTS_LOADED) {
    return Object.assign({}, state, {
      comments: action.payload
    });
  }
  return state;
}
export default postReducer;
