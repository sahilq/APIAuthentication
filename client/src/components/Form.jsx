import React, { Component } from "react";
import { connect } from "react-redux";

import { addPost } from "../actions/actionCreator";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      article: ""
    };
  }
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const title = this.state.title;
    const article = this.state.article;
    const userId = this.props.userId;
    const userName = this.props.userName;
    this.props.addArticle({ title, article, userId, userName });
    this.setState({ title: "" });
    this.setState({ article: "" });
  };
  render() {
    const { title } = this.state;
    const { article } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            maxLength="20"
            autoComplete="off"
            required
            className="form-control "
            id="title"
            value={title}
            placeholder="Title for post..."
            onChange={this.handleChange}
          />
          <textarea
            required
            maxLength="400"
            onChange={this.handleChange}
            className="form-control z-depth-1 mt-1"
            id="article"
            rows="3"
            placeholder="Write something here..."
            value={article}
          />
        </div>
        <button type="submit" className="btn btn-success btn-md ">
          POST
        </button>
      </form>
    );
  }
}
function mapStateToProps(state) {
  return {
    userId: state.auth.userId,
    isAuth: state.auth.isAuthenticated,
    jwtToken: state.auth.token,
    userName: state.auth.userName,

    errorMessage: state.auth.errorMessage
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addArticle: article => dispatch(addPost(article))
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
