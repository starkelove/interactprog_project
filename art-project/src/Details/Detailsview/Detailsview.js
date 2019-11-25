import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Detailsview.css";
import Topview from "../../Topview/Topview";
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
    if(this.state.item != undefined) {
      model.addToCart(this.state.item);
      alert(this.state.item.name + " was added to the cart");
    }
  }
      handleChangeImg({ target }) {
        //history.pushState(this.state);
        console.log(target.parentNode.id);
        this.state = {
          selectedProduct: target.parentNode.id,
          status: "LOADING",
        }
        this.setState({
          [target.parentNode.selectedProduct]: target.parentNode.id,
          [target.selectedProduct]: target.parentNode.id,
          status: "LOADING",


        });
        console.log(this.state.selectedProduct);
        this.update();
    }

  componentWillUnmount() {
    // remove observer
    base.removeBinding("item");
    this.update();
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    console.log(this.state.selectedProduct);
    
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
      console.log("Here is result");
      console.log(this.state.item);
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
      console.log("Here is result");
      console.log(this.state.item);
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


  render() {
    // create variables
    let title = "";
    let description = "";
    let price = "";
    let image = "";
    let product = "";
    let related = [];
    let images = [];
    let urladd = [];




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
        console.log(this.state.item.id);
        console.log(productId);
        if(this.state.item.id != productId){
          console.log("Hej");
          //break;
        }
        title = this.state.item.name;
        description = this.state.item.description;
        price = this.state.item.price;
        image = this.state.item.url;
        related = this.state.item.related;
        urladd = this.state.item.urladd;
        console.log(this.state.products)
        if(related != undefined){
          let arr = model.returnRelated(related);
          console.log(arr);
          related = arr.map(item => (
            <React.Fragment>
            <div className="col-sm-2">
            <Link id={item.id} name="selectedImage" to={"/details/"+  item.id} onClick={ this.handleChangeImg }>
                      
            <ImageFadeIn name={item.name} id={"images"} width={80} height={107} src={item.url} opacityTransition={1.5}/>
                    
            <FadeIn>
            <p> {item.name} </p>
            </FadeIn>
            </Link> 
            </div>
            </React.Fragment>
          ));
        }else{
          related = "";
        }
        images.push({
          original: image,
          thumbnail: image,
        },)
        if(urladd != undefined){
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
            <button id="add-to-chart-btn" className="btn btn-secondary" onClick={this.handleAdd}>Add to cart</button>
          </div>
          <div className="row justify-content-center">
            <p>Related products</p>
            </div><div className="row justify-content-center">
            {related}
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
