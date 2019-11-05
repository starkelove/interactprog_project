import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import Topview from "./Topview/Topview";
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
          

          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome} />
        </div>
    );
  }
}


export default App;
