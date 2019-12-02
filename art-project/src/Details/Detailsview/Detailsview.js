import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Detailsview.css";
import model from "../../Data/Model";
import { base } from '../../base'
import ImageGallery from 'react-image-gallery';
import FadeIn from 'react-fade-in';
import ImageFadeIn from 'react-image-fade-in';

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
        this.handleChangeImg = this.handleChangeImg.bind(this);
    }

  handleAdd = () => {
    if(this.state.item !== undefined) {
      model.addToCart(this.state.item);
    }
  }

  handleChangeImg({ target }) {
    this.state = {
      selectedProduct: target.parentNode.id,
      status: "LOADING",
    }
    this.setState({
      [target.parentNode.selectedProduct]: target.parentNode.id,
      [target.selectedProduct]: target.parentNode.id,
      status: "LOADING",
    });
    this.update();
  }

  componentWillUnmount() {
    // remove observer
    base.removeBinding("item");
  //  this.update();
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

    base.bindToState('products/', {
      context: this,
      state: "products",
      asArray: true
    });

    model
    .getItem(this.state.selectedProduct)
    .then(result => {
      this.setState({
        status: "LOADED",
        item: result
      });
    })
    .catch(() => {
      this.setState({
        status: "ERROR"
      });
    });

    model
    .getAllItems()
    .then(items => model.returnRecentlyBought(items, this.state.selectedProduct))
    .then(result => {
      this.setState({
        recently_bought: result
      });
    })
    .catch(() => {
      this.setState({
        status: "ERROR"
      });
    });

  }

  update() {
    // set states
    base.removeBinding("item");
    console.log(this.state.selectedProduct);

    model
    .getItem(this.state.selectedProduct)
    .then(result => {
      this.setState({
        status: "LOADED",
        item: result
      });
    })
    .catch(() => {
      this.setState({
        status: "ERROR"
      });
    });
    base.bindToState(`products/${this.state.selectedProduct}`, {
      context: this,
      state: "item",
      asArray: false
    });
  };

  onWrongState(id){
    this.state = {
      status: "LOADED",
      selectedProduct: id,
      item: "",
    }
    this.setState({
      status: "LOADED",
      selectedProduct: id,
      item: "",
    });
    this.update();
  }

  render() {
    // create variables
    let title = "";
    let description = "";
    let price = "";
    let image = "";
    let product = "";
    let recently_bought = [];
    let images = [];
    let urladd = [];
    let btn = "";

    switch(this.state.status) {
      case "LOADING":
        title = "Loading..";
        description = "Loading..";
        price  = "Loading..";
        product = "";
        break;

      case "LOADED":
        let productId = window.location.href;
        let arr = productId.split("/")
        productId = arr[arr.length-1]
        if(this.state.selectedProduct !== productId){
          this.onWrongState(productId);
        }
        title = this.state.item.name;
        description = this.state.item.description;
        price = this.state.item.price;
        image = this.state.item.url;
        urladd = this.state.item.urladd;

        if(this.state.item.quant > 0) {
          btn = <React.Fragment> <button id="add-to-chart-btn" className="btn btn-secondary" onClick={this.handleAdd}>Add to cart</button> </React.Fragment>
        } else {
          btn = <React.Fragment> <button id="add-to-chart-btn" className="btn btn-secondary">SOLD OUT</button> </React.Fragment>
        }

        if(this.state.recently_bought != undefined) {
          let bought = this.state.recently_bought.filter(item => item.id !== this.state.selectedProduct);
          let three_latest = bought.splice(0, 3);

          console.log("three latest bought items");
          console.log( Object.keys(three_latest).forEach(key => console.log("key " + three_latest[key].id)))

          recently_bought = three_latest.map(item => (
            <React.Fragment key={item.id}>
              <div className="col-sm-2">
                <Link id={item.id} name="selectedImage" to={"/details/"+  item.id} onClick={ this.handleChangeImg }>
                  <ImageFadeIn name={item.name} id={"images"} width={80} height={107} src={item.url} opacityTransition={1.5}/>
                </Link>
              </div>
            </React.Fragment>
          ));
        } else {
          recently_bought = "";
        }

        images.push({
          original: image,
          thumbnail: image,
        },)
        if(urladd !== undefined){
          for(let i = 0; i<urladd.length; i++){
            images.push({
              original: urladd[i],
              thumbnail: urladd[i],
            },)
          }
        }

        product = <React.Fragment>
          <div className="col-sm-4">
          <FadeIn>

          <ImageGallery items={images} />
          </FadeIn>
        </div>
          <div className="col-sm-4">
          <FadeIn>
          <h1>{title}</h1>
          <p>{description}</p>

          <div id="price">
            <p> {price} SEK</p>
            {btn}
          </div>
          <div className="row justify-content-center">
            <p> Recently bought products</p>
            </div><div className="row justify-content-center">
            {recently_bought}
          </div>
          </FadeIn>
        </div>

        </React.Fragment>
        break;

      default:
        title = "Failed to load title..";
        description = "Failed to load description of item..";
        break;

    }

    return (
      <div className="Detailview">
        <div className="row justify-content-center">
        {product}
        </div>

      </div>

    );
  }
}

export default Detailview;
