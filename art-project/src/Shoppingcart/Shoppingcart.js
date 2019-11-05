import React, { Component } from "react";
import Topview from "../Topview/Topview";
import Cartview from "./Cartview/Cartview";
import "./Shoppingcart.css";


class Shoppingcart extends Component {
  render() {
    return (
      <div className="Shoppingcart">

        {/* We pass the model as property to the Sidebar component */}
              <Topview />
              <Cartview /> 
      </div>
    );
  
  }
}

export default Shoppingcart;