import React, { Component } from "react";
import { connect } from "react-redux";
import Comments from "./Comments";

import { getPosts, postVote } from "../actions/actionCreator";

export class Home extends Component {
  componentDidMount() {
    this.props.getData();
  }
  act = e => {
    const info = {
      user: this.props.userId,
      postId: e.target.id,
      action: e.target.value
    };
    this.props.postVote(info);
  };
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
              <p className="display-inline font-weight-bold">
                {el.title}{" "}
                <i className="badge-secondary badge-sm badge float-right mt-2">
                  {el.likedList.length / 2}
                </i>
                {this.props.isAuth && (
                  <span className=" float-right">
                    <button
                      className="btn btn-sm btn-info mx-3"
                      id={el._id}
                      onClick={this.act}
                      value={
                        el.likedList.includes(this.props.userId)
                          ? "Unlike"
                          : "Like"
                      }
                    >
                      {el.likedList.includes(this.props.userId)
                        ? "Unlike"
                        : "Like"}
                    </button>
                  </span>
                )}
              </p>

              <hr />
              <p className="text-justify text-left">
                {el.article}
                <br />
                <small>Author: {el.userName}</small>
              </p>
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
    getData: () => dispatch(getPosts()),
    postVote: info => dispatch(postVote(info))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
