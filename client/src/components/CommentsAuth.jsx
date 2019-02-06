import React, { Component } from "react";
import { connect } from "react-redux";

import openSocket from "socket.io-client";

import { SEND_COMMENT, DELETE_COMMENT, GET_COMMENTS } from "../actions/types";

const socket = openSocket("http://localhost:5000");

class CommentsAuth extends Component {
  constructor() {
    super();

    this.state = { body: "" };
    socket.on("comment", async () => {
      console.log("comments received");
      await this.props.getComments();
    });
  }

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const body = this.state.body;
    const postId = this.props.postId;
    const userId = this.props.userId;
    const userName = this.props.userName;
    this.props.addComment({ postId, body, userId, userName });
    socket.emit("comment", body);
    this.setState({ body: "" });
  };
  componentWillMount = () => {
    this.props.getComments();
  };

  render() {
    return (
      <div className="border-white">
        <ul className="list-unstyled">
          {this.props.comments.map(comment => {
            if (comment.postId === this.props.postId) {
              return (
                <li key={comment._id} className="list-group-flus m-3">
                  <div>
                    <p className="text-justify text-left d-table-cell">
                      {comment.body}
                    </p>

                    <button
                      className="btn btn-sm btn-link float-right p-0"
                      onClick={() => this.props.deleteComment(comment._id)}
                    >
                      {" "}
                      <small>Delete</small>
                    </button>
                  </div>
                  <hr />
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              maxLength="120"
              id="body"
              rows="1"
              required
              autoComplete="off"
              className="form-control"
              value={this.state.body}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-success btn-sm">
            Comment
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    comments: state.postCom.comments,
    isAuth: state.auth.isAuthenticated,
    userId: state.auth.userId,

    jwtToken: state.auth.token,
    userName: state.auth.userName,
    errorMessage: state.auth.errorMessage
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addComment: comment => dispatch({ type: SEND_COMMENT, comment }),
    deleteComment: _id => dispatch({ type: DELETE_COMMENT, _id }),
    getComments: () => dispatch({ type: GET_COMMENTS })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsAuth);
