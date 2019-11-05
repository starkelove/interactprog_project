import React, { Component } from "react";
import { Link } from "react-router-dom";
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

            <div className="row">
                <div className="col">
                    <p>About</p>
                </div>
                <div className="col">
                    <h3>Art by Maria Fällström</h3>
                </div>
                <div className="col">
                <Link to="/shoppingcart">
                    <p>Shopping cart</p>
                    </Link>
        
                </div>
                
                
            </div>
 
    </div>
    );
  }
}

export default Topview;
