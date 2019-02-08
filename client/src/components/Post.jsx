import React, { Component } from "react";
import { connect } from "react-redux";
import CommentsAuth from "./CommentsAuth";

import { DATA_LOADING, EDIT_ARTICLE, DELETE_POST } from "../actions/types";

export class Post extends Component {
  constructor() {
    super();
    this.state = { visiblity: "invisible", article: "" };
  }
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  componentDidMount() {
    this.props.getData();
  }
  handleEdit = e => {
    if (this.state.visiblity === "invisible") {
      this.setState({ visiblity: "visible" });
    } else {
      this.setState({ visiblity: "invisible" });
    }
  };
  handleSubmit = event => {
    event.preventDefault();
    let id = event.target.id;
    let title = event.target.title;
    const article = {
      article: this.state.article,
      title: title,
      userId: this.props.userId
    };
    this.props.patchArticle(article, id);
    this.setState({ visiblity: "invisible" });
    this.setState({ article: "" });
  };
  render() {
    return (
      <div>
        <ul className="list-group list-group-flush ">
          {this.props.articles.map(el => {
            if (el.userId === this.props.userId) {
              return (
                <li
                  className="overflow-auto list-group-item border border-success m-2 p-2"
                  key={el._id}
                >
                  <p className="display-inline font-weight-bold">
                    {el.title}
                    <span className="float-right badge-info badge badge-sm mt-1">
                      Likes:{el.likedList.length}
                    </span>
                    <button
                      className="badge badge-sm badge-danger mr-2 float-right "
                      onClick={() => this.props.deletePost(el._id)}
                    >
                      Delete
                    </button>{" "}
                    <button
                      className="badge badge-sm badge-warning mr-2 float-right "
                      onClick={this.handleEdit}
                    >
                      Edit
                    </button>
                  </p>

                  <hr />
                  <p className="text-justify text-left font-italic ">
                    {el.article}
                  </p>
                  <small>
                    <p>Comments :</p>
                  </small>
                  <div>
                    <CommentsAuth postId={el._id} />
                  </div>
                  <div className="position-relative zindex-tooltip m-2">
                    <div className={this.state.visiblity}>
                      {" "}
                      <textarea
                        required
                        maxLength="120"
                        onChange={this.handleChange}
                        id="article"
                        rows="3"
                        placeholder="Write something here..."
                      />
                      <button
                        onClick={this.handleSubmit}
                        id={el._id}
                        title={el.title}
                        className="btn btn-sm btn-secondary float-right"
                      >
                        Save Edited
                      </button>
                    </div>
                  </div>
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    articles: state.postCom.remoteArticles,
    userId: state.auth.userId,
    isAuth: state.auth.isAuthenticated,
    jwtToken: state.auth.token,
    userName: state.auth.userName,

    errorMessage: state.auth.errorMessage
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getData: () => dispatch({ type: DATA_LOADING }),
    deletePost: _id => dispatch({ type: DELETE_POST, _id }),
    patchArticle: (article, id) => dispatch({ type: EDIT_ARTICLE, article, id })
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
