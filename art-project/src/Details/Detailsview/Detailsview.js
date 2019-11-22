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
    }

  handleAdd = () => {
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
  };


  render() {
    // create variables
    let title = "";
    let description = "";
    let price = "";
    let image = "";
    let product = "";
    let related = [];

    const images = [
      {
        original: 'https://firebasestorage.googleapis.com/v0/b/art-project-c8e48.appspot.com/o/missar%2Fmissar1.png?alt=media&token=bf518a35-8e24-4d17-bf24-781e9fa32ca3',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/art-project-c8e48.appspot.com/o/missar%2Fmissar1.png?alt=media&token=bf518a35-8e24-4d17-bf24-781e9fa32ca3',

      },
      {
        original: 'https://firebasestorage.googleapis.com/v0/b/art-project-c8e48.appspot.com/o/praguestatues%2Fpraguestatues1.png?alt=media&token=9a87660d-714c-4aa7-abeb-d12df800a5e1',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/art-project-c8e48.appspot.com/o/praguestatues%2Fpraguestatues1.png?alt=media&token=9a87660d-714c-4aa7-abeb-d12df800a5e1',
      },
      {
        original: 'https://firebasestorage.googleapis.com/v0/b/art-project-c8e48.appspot.com/o/thumbelina%2Fthumbelina1.jpg?alt=media&token=616b696b-bfe4-4fd1-b49d-84cb8a11a018',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/art-project-c8e48.appspot.com/o/thumbelina%2Fthumbelina1.jpg?alt=media&token=616b696b-bfe4-4fd1-b49d-84cb8a11a018',
      },
      {
        original: 'https://firebasestorage.googleapis.com/v0/b/art-project-c8e48.appspot.com/o/praguestatues%2Fpraguestatues1.png?alt=media&token=9a87660d-714c-4aa7-abeb-d12df800a5e1',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/art-project-c8e48.appspot.com/o/praguestatues%2Fpraguestatues1.png?alt=media&token=9a87660d-714c-4aa7-abeb-d12df800a5e1',
      },
    ];


    switch(this.state.status) {
      case "LOADING":
        title = "Loading..";
        description = "Loading..";
        price  = "Loading..";
        product = "";
        break;

      case "LOADED":
        title = this.state.item.name;
        description = this.state.item.description;
        price = this.state.item.price;
        image = this.state.item.url;
        related = this.state.item.related;
        if(related != undefined){
          let arr = model.returnRelated(related);
          console.log(arr);
          related = arr.map(item => (
            <React.Fragment>
            <div className="col">
            <Link id={item.id} name="selectedImage" to={"/details/"+  item.id} onClick={ this.handleChangeImg }>
                      
            <ImageFadeIn name={item.name} id={"images"} width={80} height={107} src={'https://firebasestorage.googleapis.com/v0/b/art-project-c8e48.appspot.com/o/missar%2Fmissar1.png?alt=media&token=bf518a35-8e24-4d17-bf24-781e9fa32ca3'} opacityTransition={1.5}/>
                    
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
            </div><div className="row">
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
