import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

class Welcome extends Component {
  render() {
    return (
      <div className="container text-center full-vh d-flex align-items-center justify-content-center flex-column">
      <div className="Welcome">
        <h1>Welcome to Art by Maria Fällström!</h1>
        <p>
        <Link to="/mainview">
          Enter
        </Link>
        </p>
      </div>
      </div>
    );
  }
}

export default Welcome;