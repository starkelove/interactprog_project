import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Detailsview.css";
import Topview from "../../Topview/Topview";
import img from "../../imgs/thumbelina/thumbelina1.jpg";
import model from "../../Data/Model";
import { base } from '../../base'


class Detailview extends Component {

  constructor(props) {
        super(props);

        let productId = window.location.href;
        let arr = productId.split("/")
        productId = arr[arr.length-1]

        this.state = {
            status: "LOADING",
            selectedProduct: productId,
        };
    }

  handleAdd = () => {
    console.log("handleAdd");
    console.log(this.state.item);
    if(this.state.item != undefined) {
      model.addToCart(this.state.item);
    }
  }

  componentWillUnmount() {
    // remove observer
  }

  componentDidMount(){

  }
  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    base.bindToState(`products/${this.state.selectedProduct}`, {
      context: this,
      state: "item",
      asArray: false
    });

    model
    .getItem(this.state.selectedProduct)
    .then(result => {
      this.setState({
        status: "LOADED",
        item: result,
      });
      console.log("Here is result");
      console.log(this.state.item);
    })
    .catch(() => {
      this.setState({
        status: "ERROR"
      });
    });

    // when data is retrieved we update the state
    // this will cause the component to re-render

     // add observer
    this.setState({
      status: "LOADED",
      title: "Linocut Thumbelina",
      description: "As a kid I had a pillowcase with a print of a wild grown summers field. It had tall grass, dandelions, lily of the valley and it made me feel like I was so small I could live under the flowers. When I had a daughter I wanted to give her something similar, so I created this Thumbelina-inspired linocut to inspire dreams of adventure and safety.",
      image: img
    });
  }

  update() {
    // set states
  };


  render() {
    // create variables
    let title = "";
    let description = "";
    let image = "";

    switch(this.state.status) {
      case "LOADING":
        title = "Loading...";
        break;

      case "LOADED":
        title = this.state.title;
        description = this.state.description;
        image = this.state.image;
        break;

      default:
        title = "Failed to load title..";
        description = "Failed to load description of item..";
        break;

    }

    return (
      <div className="Detailview">
        <div className="row justify-content-center">
            <div className="col-sm-4">
            <h1>{title}</h1>
            <p>{description}</p>
            </div>
            <div className="col-sm-4">
            <img id="item-image" src={image}></img>
            </div>
        </div>
        <button id="add-to-chart-btn" className="btn btn-secondary" onClick={this.handleAdd}>Add to cart</button>
      </div>

    );
  }
}

export default Detailview;
