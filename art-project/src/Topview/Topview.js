import React, { Component } from "react";
import "./Topview.css";

class Topview extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  componentWillUnmount() {

  }


  update() {

  }

  
  render() {
    return (

     <div className="Topview">
        <header className="Topview-header">
            <div className="row">
                <div className="col">
                    <p>About</p>
                </div>
                <div className="col">
                    <h3>Art by Maria Fällström</h3>
                </div>
                <div className="col">
                    <p>Shopping cart</p>
                </div>
                
                
            </div>
        </header>
    </div>
    );
  }
}

export default Topview;
