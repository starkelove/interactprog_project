import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import Topview from "./Topview/Topview";
import Shoppingcart from "./Shoppingcart/Shoppingcart";
import Details from "./Details/Details";
import './App.css';
import Main from "./Main/Main";

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
        <header>
          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome} />
          <Route exact path="/details" component={Details} />
          <Route exact path="/shoppingcart" component={Shoppingcart} />
          <Route exact path="/main" component={Main}/>
        </header>
      </div>
    );
  }
}


export default App;
