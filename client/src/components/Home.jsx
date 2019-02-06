import React, { Component } from "react";
import { connect } from "react-redux";
import Comments from "./Comments";

import { DATA_LOADING } from "../actions/types";

export class Home extends Component {
  componentDidMount() {
    this.props.getData();
  }

  render() {
    return (
      <div className="mb-3">
        <ul className="list-group ">
          {!this.props.articles.length ? (
            <h1 className="m-3 p-3">No Articles</h1>
          ) : null}
          {this.props.articles.map(el => (
            <li
              className="overflow-auto list-group-itemm-2 p-2 list-group-item-secondary my-1"
              key={el._id}
            >
              <p className="display-inline font-weight-bold">{el.title} </p>

              <hr />
              <p className="text-justify text-left">{el.article}</p>
              <small>
                <p>Comments :</p>
              </small>
              <div>
                <Comments postId={el._id} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    articles: state.postCom.remoteArticles,
    isAuth: state.auth.isAuthenticated,
    jwtToken: state.auth.token,
    userName: state.auth.userName,
    userId: state.auth.userId,
    errorMessage: state.auth.errorMessage
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getData: () => dispatch({ type: DATA_LOADING })
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
