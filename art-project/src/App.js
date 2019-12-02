import React, { Component } from "react";
import { Route } from "react-router-dom";
import Welcome from "./Welcome/Welcome";
import Topview from "./Topview/Topview";
import Shoppingcart from "./Shoppingcart/Shoppingcart";
import Transactionview from "./Transactionview/Transactionview";
import Details from "./Details/Details";
import Main from "./Main/Main";
import About from "./About/About";
import modelInstance from "./Data/Model";
import './App.css';
import { base } from "./base";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Art by Maria Fällström"
    };
  }

  render() {
    //window.localStorage.clear();
    return (
      <div className="App">
        <header>
          {/* We rended diffrent component based on the path */}
          <Route exact path="/" component={Welcome} />
          <Route
            path="/details"
            render={() => <Details model={modelInstance}/>}
          />
          <Route
            path="/shoppingcart"
            render={() => <Shoppingcart model={modelInstance}/>}
          />
          <Route
            path="/main"
            render={() => <Main model={modelInstance}/>}
          />
          <Route exact path="/about" component={About}/>
          <Route
            path="/transactions"
            render={() => <Transactionview model={modelInstance}/>}
          />
        </header>
      </div>
    );
  }
}


export default App;
