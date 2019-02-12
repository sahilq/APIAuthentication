import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";

import CustomInput from "./CustomInput";
import { signInReq } from "../actions/actionCreator";

class SignIn extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(formData) {
    this.props.authSignIn(formData);
  }

  componentDidMount() {}
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md" />
          <div className="col-md" />
          <div className="col-md" />
        </div>
        <div className="row">
          <div className="col-md" />
          <div className="col-md mt-5 p-5">
            <form onSubmit={handleSubmit(this.onSubmit)}>
              <fieldset>
                <Field
                  name="email"
                  id="email"
                  type="email"
                  autoComplete="off"
                  placeholder="example@example.com"
                  component={CustomInput}
                  label="Your Email"
                />
              </fieldset>
              <fieldset>
                <Field
                  name="password"
                  id="password"
                  autoComplete="off"
                  type="password"
                  placeholder="Password..."
                  label="Your Password"
                  component={CustomInput}
                />
              </fieldset>
              {this.props.errorMessage ? (
                <div className="alert alert-danger">
                  {this.props.errorMessage}
                </div>
              ) : null}
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </form>
          </div>
          <div className="col-md" />
        </div>
        <div className="row">
          <div className="col-md" />
          <div className="col-md" />
          <div className="col-md" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  };
}
function mapDispatchToProps(dispatch) {
  return {
    authSignIn: formData => dispatch(signInReq(formData))
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ form: "signin" })
)(SignIn);
