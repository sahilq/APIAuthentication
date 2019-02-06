import React, { Component } from "react";

export default class CustomInput extends Component {
  render() {
    const {
      input: { value, onChange }
    } = this.props;
    return (
      <div className="form-group">
        <label className="text-monospace" htmlFor={this.props.id}>
          {this.props.label}
        </label>
        <input
          name={this.props.name}
          autoComplete={this.props.autoComplete}
          id={this.props.id}
          placeholder={this.props.placeholder}
          className="form-control"
          type={this.props.type}
          required={true}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
}
