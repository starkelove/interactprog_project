import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ItemView.css";
import { base } from '../base'
import modelInstance from "../Data/Model";
import imageHandler from "../Data/Imagehandler";
import thumbelina from "../imgs/thumbelina/thumbelina1.jpg";
import missar from "../imgs/missar/missar1.png";
import praguestatues from "../imgs/praguestatues/praguestatues1.png";
import model from "../Data/Model";

/*import loadImages from "./Images";*/

class ItemView extends Component {
    constructor(props) {
        super(props);
        this.state = {
          /*images: [],*/
          num_images : 3,
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
        imageHandler.getHelp();
        imageHandler.getImage("thumbelina");
        /*const ref = firebase.storage().ref('gs://art-project-c8e48.appspot.com/missar/missar1.png');
        const url = await ref.getDownloadUrl();
        print(url);*/
       // let itemList = modelInstance.getAllItems();
       // console.log(this.state.products);
        switch (this.state.status) {
            case "LOADING":
              itemList = <em>Loading...</em>;
              break;
            case "LOADED":
              /*console.log("images");
              console.log(this.state.images[0].src);*/
              let products = this.state.products;
              console.log(products[0].name);
              
              for(let i = 0; i < this.state.num_images; i++) {
                let name = products[i].name;
                let id = products[i].id;
                console.log(link + id + "/" + id + "1.jpg");
                console.log(id);
                itemList.push(<div className="col" key={i}>
                  <React.Fragment>
                    <Link id={i} name="selectedImage" to={"/details/"+ id} onClick={ this.handleChangeImg }>
                    <img name="selectedImage" width="240" height="320" src= {thumbelina} />
                    <p> {name} </p>
                    </Link> 
                  </React.Fragment>
                </div>) 
                  
              }
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

const link = "../imgs/";
export default ItemView;