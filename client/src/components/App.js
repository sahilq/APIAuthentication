import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

import Header from "./navBar";

class App extends Component {
  render() {
    return (
      <div>
        <Header />

        <div className="container">{this.props.children}</div>
      </div>
    );
  }
}

export default App;
