import React, { Component } from "react";
import "./Cartview.css";

class Cartview extends Component {
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

     <div className="Cartview">

            <div className="row">
                <div className="col">
                    <p>You have these items</p>
                    <li>Grej 1</li>
                    <li>Grej 2</li>
                </div>
                <div className="col">
                    <p>Buy it!</p>
                </div>
                
                
            </div>
    </div>
    );
  }
}

export default Cartview;
