import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Popular from "./components/Popular";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Popular />;
      </div>
    );
  }
}

ReactDOM.render(
  //React Element
  //Where to render the element to.
  <App />,
  document.getElementById("app")
);
