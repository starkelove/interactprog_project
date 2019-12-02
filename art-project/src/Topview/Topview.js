import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Topview.css";
import model from "../Data/Model";
import FontAwesome from 'react-fontawesome'
//import faStyles from 'font-awesome/css/font-awesome.css'

class Topview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      num_items: model.getNumItems()
    }
    

  }

  componentDidMount() {
    model.addObserver(this);
    this.setState({
      num_items : model.getNumItems()
    });

  }

  componentWillUnmount() {
    model.removeObserver(this);
  }


  update() {
    this.setState({
      num_items : model.getNumItems()
    });
  }


  render() {
    return (

     <div className="Topview">

            <div className="row">
                <div className="col">
                  <Link to="/about">
                    <p>ABOUT</p>
                    </Link>
                </div>
                <div className="col">
                    <Link to="/main">
                      <h3>ART BY MARIA FÄLLSTRÖM</h3>
                    </Link>
                </div>
                <div className="col">
                  <Link to="/shoppingcart">
                    {/*<p>Shopping cart ({this.state.num_items})</p> */}
                    <FontAwesome
                      className="super-crazy-colors"
                      name="shopping-cart"
                      size="2x"
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    /> ({this.state.num_items})
                  </Link>
                </div>


            </div>

    </div>
    );
  }
}

export default Topview;
