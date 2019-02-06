import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AUTH_SIGN_OUT } from "../actions/types";

class Header extends Component {
  constructor() {
    super();
    this.signOut = this.signOut.bind(this);
  }
  async signOut() {
    console.log("Sign Out called");
    await this.props.signOut();
  }
  render() {
    return (
      <nav className="navbar navbar-expand navbar-dark bg-dark mb-1">
        <Link className="navbar-brand" to="/">
          Node API Auth
        </Link>

        <div className=" collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
          </ul>

          <ul className="nav navbar-nav ml-auto">
            {!this.props.isAuth
              ? [
                  <li className="nav-item" key="signup">
                    <Link className="nav-link" to="/signup">
                      Sign Up
                    </Link>
                  </li>,
                  <li className="nav-item" key="signin">
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  </li>
                ]
              : null}
            {this.props.isAuth ? (
              <li className="nav-item">
                <Link className="nav-link" to="/signout" onClick={this.signOut}>
                  Sign Out
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </nav>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    signOut: () => dispatch({ type: AUTH_SIGN_OUT })
  };
}
function mapstateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated
  };
}
export default connect(
  mapstateToProps,
  mapDispatchToProps
)(Header);
