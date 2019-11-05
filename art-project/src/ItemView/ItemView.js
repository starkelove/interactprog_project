import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ItemView.css";
import grattis from "./grattis.jpg";
/*import loadImages from "./Images";*/

class ItemView extends Component {
    constructor(props) {
        super(props);
        this.state = {
          /*images: [],*/
          num_images : 3
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
        this.setState({
            /*images : loadImages(),*/
            status: "LOADED"
        }); 
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
              /*console.log("images");
              console.log(this.state.images[0].src);*/
              for(let i = 0; i < this.state.num_images; i++) {
                itemList.push(<div className="col" key={i}>
                  <React.Fragment>
                    <Link id={i} name="selectedImage" to={"/details/"} onClick={ this.handleChangeImg }>
                    <img name="selectedImage" width="240" height="150" src= {grattis} />
                    <p> image title </p>
                    </Link>
                    
                  </React.Fragment>
                </div>) 
                  
              }
              break
            default:
              itemList = <b>Failed to load data, please try again</b>;
              break;
        }

        return (
        <div className="Items" >
             <div className="row">{itemList}</div>
        </div>
        );
    }
}

export default ItemView;