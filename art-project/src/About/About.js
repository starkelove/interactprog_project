import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./About.css";
import Topview from "../Topview/Topview";

class About extends Component {

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
      <div className="row justify-content-center">

          <div className="col-sm-4">
              <img src="https://static.wixstatic.com/media/a0ca6a_b9b6dcc48ff946e898dfa0f3a8590fb4~mv2.jpg/v1/fill/w_253,h_335,al_c,q_90/Me.webp"></img>
          </div>
          <div className="col-sm-4">
              <p>
              This is me! During the days you'll find me at the film production company Diggin Larry where I work as a motion designer. I live in Stockholm with my love Love, our daughter and our two cats. See more of what I do on my instagram account. </p>
              <p>
                +46763067770
                </p>
                <p>
                maria.h.fallstrom@gmail.com
              </p>
          </div>
      </div>
      </div>

    );
  }
}

export default About;
