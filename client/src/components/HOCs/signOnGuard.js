import React, { Component } from "react";
import { connect } from "react-redux";

export default OriginalComponent => {
  class MixedComponent extends Component {
    checkAuth() {
      console.log("checking_auth SIGNIN SIGNUP");
      if (this.props.isAuth) {
        return this.props.history.push("/dashboard");
      }
    }

    componentDidMount() {
      this.checkAuth();
    }

    componentDidUpdate() {
      this.checkAuth();
    }

    render() {
      return <OriginalComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
      isAuth: state.auth.isAuthenticated,
      jwtToken: state.auth.token,

      userName: state.auth.userName,
      userId: state.auth.userId,
      errorMessage: state.auth.errorMessage
    };
  }

  return connect(mapStateToProps)(MixedComponent);
};
