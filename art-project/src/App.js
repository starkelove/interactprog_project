import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import Detail from "./Detail/Detail";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Art by Maria Fällström"
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.state.title}</h1>

          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome} />
          <Route exact path="/detail" component={Detail} />
        </header>
      </div>
    );
  }
}


export default App;
