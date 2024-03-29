import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Itemview.css";
import modelInstance from "../Data/Model";
import ImageFadeIn from 'react-image-fade-in';
import FadeIn from 'react-fade-in';

/*import loadImages from "./Images";*/

class Itemview extends Component {
    constructor(props) {
        super(props);
        this.state = {
          products: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeImg = this.handleChangeImg.bind(this);
      }

    // this methods is called by React lifecycle when the
    // component is actually shown to the user (mounted to DOM)
    // that's a good place to call the API and get the data
    componentDidMount() {
        // when data is retrieved we update the state
        // this will cause the component to re-render
        modelInstance
        .getAllItems()
        .then(results => {
          this.setState({
            status: "LOADED",
            products: results,
          });
        })
        .catch(() => {
          this.setState({
            status: "ERROR"
          });
        }); 
        /*
        this.setState({
            /*images : loadImages(),*/
          /*  status: "LOADED"
        });*/ 
    }

    handleChange({ target }) {
        this.setState({
          [target.name]: target.value
        });
    }
    
    handleChangeImg({ target }) {
        this.setState({
          [target.parentNode.name]: target.parentNode.id
        });
    }

    render() {
        let itemList = [];
        switch (this.state.status) {
            case "LOADING":
              itemList = <em>Loading...</em>;
              break;
            case "LOADED":
              let products = this.state.products;
              modelInstance.returnPopularity(products);
              itemList = products.map(item => (
                <div className="col" id="imgcols" key={item.id}>
                  <React.Fragment>
                    <Link id={item.id} name="selectedImage" to={"/details/"+  item.id} onClick={ this.handleChangeImg }>
                    
                    <ImageFadeIn name={item.name} width={280} height={380} id={"images"} src={item.url} opacityTransition={1.5}/>
                  
                    <FadeIn>
                    <p> {item.name} </p>
                    </FadeIn>
                    </Link> 
                  </React.Fragment>
                </div>
              ));
              break
            default:
              itemList = [];
              break;
        }

        return (
        <div className="Items" >
             <div className="row">{itemList}</div>
        </div>
        );
    }
}


export default Itemview;