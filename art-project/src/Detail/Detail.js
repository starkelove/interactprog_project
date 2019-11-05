import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Detail.css";

class Detail extends Component {

  constructor(props) {
        super(props);

        this.state = {
            status: "LOADING"
        };
    }

  componentWillUnmount() {
    // remove observer
  }

  componentDidMount() {
    // add observer
    this.setState({status: "LOADED" });
  }

  update() {
    // set states
  };


  render() {
    // create variables
    switch(this.state.status) {
      case "LOADING":
        break;

      case "LOADED":
        break;

      default:
        break;

    }

    return (
      <div className="Detail container col-sm-12">
        <div className="row">
            <div className="col-sm-6">
            <h1>Item Title</h1>
            <p>Blablalblalba description of pretty item wiiii.</p>
            </div>
            <div className="col-sm-6">
            <img id="item-image" src="pooop.png"></img>
            </div>
        </div>
      </div>

    );
  }
}

export default Detail;
