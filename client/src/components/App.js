// import libraries
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

// import navbar
import Header from "./navBar";

class App extends Component {
  render() {
    return (
      <div>
        {/* render nabBar */}
        <Header />
        {/* render components */}
        <div className="container">{this.props.children}</div>
      </div>
    );
  }
}

export default App;
