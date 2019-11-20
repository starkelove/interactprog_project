import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Details.css";
import Topview from "../Topview/Topview";
import Detailsview from "./Detailsview/Detailsview";

class Details extends Component {

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
    let title = null;
    let description = null;

    switch(this.state.status) {
      case "LOADING":
        break;

      case "LOADED":
      title = "Item Title";
        description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        break;

      default:
        title = "Failed to load title..";
        description = "Failed to load description of item..";
        break;

    }

    return (
      <div className="Detail">
      <Topview/>
      <Detailsview/>
      </div>

    );
  }
}

export default Details;
