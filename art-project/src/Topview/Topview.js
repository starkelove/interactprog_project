import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Topview.css";
import model from "../Data/Model";

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
                    <p>About</p>
                    </Link>
                </div>
                <div className="col">
                    <Link to="/main">
                      <h3>Art by Maria Fällström</h3>
                    </Link>
                </div>
                <div className="col">
                <Link to="/shoppingcart">
                  <p>Shopping cart ({this.state.num_items})</p>
                    </Link>

                </div>


            </div>

    </div>
    );
  }
}

export default Topview;
