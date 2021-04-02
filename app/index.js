import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

//Component
//State
//LifeCycle
//UI

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello World</h1>
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
