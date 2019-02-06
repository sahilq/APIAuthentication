import React, { Component } from "react";
import { connect } from "react-redux";

import { GET_SECRET, DATA_LOADING } from "../actions/types";
import Post from "./Post";
import Form from "./Form";

class Dashboard extends Component {
  state = {};

  componentDidMount() {
    this.props.getSecret();

    this.props.getData();

    console.log("GET DATA CALLED FROM DASHBOARD");
  }
  render() {
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-md">
            <h1>
              Welcome <small>{this.props.userName}</small>
            </h1>
            <Form />
          </div>
          <div className="col-md">
            <Post />
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchtoprops(dispatch) {
  return {
    getSecret: () => dispatch({ type: GET_SECRET }),
    getData: () => dispatch({ type: DATA_LOADING })
  };
}

function mapStateToProps(state) {
  return {
    secret: state.dash.secret,
    userName: state.auth.userName,
    isAuth: state.auth.isAuthenticated,
    jwtToken: state.auth.token,
    userId: state.auth.userId,
    errorMessage: state.auth.errorMessage
  };
}

export default connect(
  mapStateToProps,
  mapDispatchtoprops
)(Dashboard);
