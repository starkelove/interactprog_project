import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Detailsview.css";
import Topview from "../../Topview/Topview";
import pooop from "./pooop.png";

class Detailview extends Component {

  constructor(props) {
        super(props);

        this.state = {
            status: "LOADING"
        };
    }

  handleAdd = (event) => {
    console.log("Add to chart");
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
    let title = null;
    let description = null;
    let image = null;

    switch(this.state.status) {
      case "LOADING":
        break;

      case "LOADED":
        title = "Item Title";
        description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        image = pooop;
        break;

      default:
        title = "Failed to load title..";
        description = "Failed to load description of item..";
        break;

    }

    return (
      <div className="Detailview col-sm-12">
        <div className="row">
            <div className="col-sm-6">
            <h1>{title}</h1>
            <p>{description}</p>
            </div>
            <div className="col-sm-6">
            <img id="item-image" src={image}></img>
            </div>
        </div>
        <button id="add-to-chart-btn" className="btn btn-secondary" onClick={this.handleAdd}>Add to chart</button>
      </div>

    );
  }
}

export default Detailview;
