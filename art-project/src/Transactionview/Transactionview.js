import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Transactionview.css";
import Topview from "../Topview/Topview";
import ImageFadeIn from 'react-image-fade-in';
import FadeIn from 'react-fade-in';
import modelInstance from "../Data/Model";

class Transactionview extends Component {

    constructor(props) {
          super(props);
  
          this.state = {
              status: "LOADING",
              transactions: [],
              items: []
          };
      }
  
    handleAdd = (event) => {
      console.log("Add to chart");
    }
  
    componentWillUnmount() {
      // remove observer
    }
  
    componentDidMount() {
      // add observer
      modelInstance
      .fetchTransactions()
      .then(results => {
        this.setState({
          status: "LOADING",
          transactions: results,
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      }); 

      modelInstance
      .getAllItems()
      .then(results => {
        this.setState({
          status: "LOADED",
          items: results,
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
    };
  
  
    render() {
      // create variables
      let title = null;
      let description = null;
      let transactionsList = [];

  
      switch(this.state.status) {
        case "LOADING":
          break;
  
        case "LOADED":
        title = "Item Title";
          description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
          let items = this.state.transactions;
          let dbItems = this.state.items;
          
          transactionsList = items.slice(0).reverse().map(item => (
              

                <React.Fragment>
                  <div className="row">
                    <div className="col">
                    <p>
                      Name: {item.transactions.buyer}
                    </p>
                    </div>
                    <div className="col">
                    <p>
                      Date: {item.transactions.date}
                    </p>
                    </div>
                    <div className="col">
                    <p>
                      Email: {item.transactions.email_address}
                    </p>
                    </div>
                    <div className="col">
                    <p>
                      Price: {item.transactions.price}
                    </p>
                    </div>
                    <div className="col">
                    <p>Items: 
                    {item.transactions.item_ids.map(bought =>(
                      <li>{dbItems.find(x => x.id === bought).name}</li>

                    ))}
                    </p>
                    </div>
                  </div>
                </React.Fragment>
            
          ));
          break;
  
        default:
          title = "Failed to load title..";
          description = "Failed to load description of item..";
          break;
  
      }
  
      return (
        <div className="Transactions">
        <Topview/>
        <div className="row justify-content-center">
          <div className="col">
            <h3>Transaction history</h3>
        {transactionsList}
        </div>
        </div>
        </div>
  
      );
    }
  }
  
  export default Transactionview;
  