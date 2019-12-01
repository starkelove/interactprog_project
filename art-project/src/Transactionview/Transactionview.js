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
          status: "LOADED",
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
     // let list = modelInstance.fetchTransactions();
      console.log(this.state.transactions);
  
      switch(this.state.status) {
        case "LOADING":
          break;
  
        case "LOADED":
        title = "Item Title";
          description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
          let items = this.state.transactions;
          let dbItems = this.state.items;
          console.log(dbItems.thumbelina);
          transactionsList = items.map(item => (
              
            <div className="row">
                <React.Fragment>
                  <div className="row">

                    <p>
                      {item.transactions.buyer}
                    </p>
                    <p>
                      {item.transactions.date}
                    </p>
                    <p>
                      {item.transactions.email_address}
                    </p>

                  </div>
                        
                        

                </React.Fragment>
            </div>
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
        {transactionsList}
        </div>
        </div>
  
      );
    }
  }
  
  export default Transactionview;
  