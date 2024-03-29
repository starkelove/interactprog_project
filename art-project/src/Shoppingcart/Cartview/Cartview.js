import React, { Component } from "react";
import "./Cartview.css";
import {PayPalButton} from "react-paypal-button-v2"
import model from "../../Data/Model";
import Confirmview from "./Confirmview";
import {Transaction} from "../../Data/Transaction";
import FadeIn from 'react-fade-in';
import { Link } from "react-router-dom";

class Cartview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart : [],
      products : [],
      approved : false
    };
  }

  handleDecrease = (event) => {
    let itemId = event.target.parentNode.id;
    model.getItem(itemId)
    .then((item) => {
      model.removeFromCart(item)
    });
  }

  handleIncrease = (event) => {
    let itemId = event.target.parentNode.id;
    model.getItem(itemId)
    .then((item) => {
      model.addToCart(item)
    });
  }

  handleRemoveAll = (event) => {
    let itemId = event.target.parentNode.id;
    model.getItem(itemId)
    .then((item) => {
      model.removeAll(item)
    });
  }

  onApprove() {
    this.setState({
      approved : true
    })

  }

  componentDidMount() {
    model.addObserver(this);
    this.setState({
      cart : model._cart
    });
  }

  componentWillUnmount() {
    model.removeObserver(this);
  }

  update() {
    this.setState({
      cart : model._cart
    });
  }

  render() {
    let cart = this.state.cart;
    let tot_price = 0;
    let shipping_cost = 60;
    let shoppingList = [];
    let item_ids = [];
    let num_items = 0;
    let description = ""
    var self = this;

    Object.keys(cart)
    .filter((key) => {
      return cart[key].amount > 0
    })
    .forEach(key => {
      tot_price += cart[key].amount*cart[key].item.price;
      shoppingList.push(
        <div className="row justify-content-center">
        <div id={cart[key].item.id} className="item" key={key}> {cart[key].item.name + " - "}
        {cart[key].item.price + " sek"}
          <button onClick={this.handleRemoveAll} className="remove-btn"> X </button>
          <button onClick={this.handleIncrease} className="increase-btn"> + </button>
          <span className="item-name">{cart[key].amount}</span>
          <button onClick={this.handleDecrease} className="decrease-btn"> - </button>
          
        </div>

        </div>
      );
      item_ids.push(cart[key].item.id);
    });

    //tot_price += shipping_cost;
    description = "Shipping cost " + shipping_cost + " SEK";

    shoppingList.push(
      <React.Fragment>
          <div className="row justify-content-center">
            <div id="price" className="item" >
            <p>Total price with shipping: {tot_price+shipping_cost} sek ({shipping_cost} sek for shipping)</p>
    
            </div>
          </div>
          </React.Fragment>
    )



    num_items = model.getNumItems();
    if(num_items === 0) {
      shoppingList = <div className="row justify-content-center">
        <p>You have no items in your cart</p>
        </div>
    }
    
    return (
     <div className="Cartview">
       <FadeIn>
          {this.state.approved ? <Confirmview/> :
            <div className="payment">

                <div className="cart">
                <div className="row justify-content-center">
                    <h3>Your Shopping Cart</h3>
                    </div>
                    {shoppingList}
                </div>
                <div className="row justify-content-center">
                <div id="paypal-div">

                  {/* PayPalButton based on tutorial provided at
                  https://github.com/Luehang/react-paypal-button-v2.git */}
                  {num_items > 0 ?  <PayPalButton

                    // sets up the details of the transaction
                    createOrder={(data, actions) => {
                      let outOfStock = model.enoughItemsInStorage();
                      if(outOfStock.length == 0) {
                        return actions.order.create({
                          "purchase_units": [{
                              "description": description,
                              "amount": {
                                currency_code: "SEK",
                                value: tot_price
                              },
                            },
                            ],
                        });
                      }
                      else {
                      //  alert("Unfortunately, someone has grabbed the last " + outOfStock[0].name + ". ");
                      }
                    }}

                    // called when the buyer approves the transaction on
                    // paypal.com also captures the funds from the transaction
                    onApprove = {(data, actions) => {
                      return actions.order.capture().then(function(details) {
                        alert("The transaction was completed ");
                        let transaction = new Transaction(details, tot_price-shipping_cost, item_ids, num_items);
                        console.log("transaction obj ", transaction);
                        model.updateDatabase();
                        model.updatePopularity();
                        model.updateBoughtTime();
                        model.updateTransactions(transaction);
                        model.emptyCart();
                        self.onApprove();

                        // call your server to save the transaction
                        return fetch("/paypal-transaction-complete", {
                          method: "post",
                          body: JSON.stringify({
                            orderID: data.orderID
                          })
                        });
                      });
                    }}
                    onError = {(error) =>
                      alert(error)}
                    onCancel = {() =>
                      alert("The transaction was cancelled ")}
                    options={{
                      clientId: "sb",
                      currency: "SEK",
                    }}

                  />: ""}
                </div>

                </div>
                <div className="row justify-content-center">
                <Link to="/transactions">
                    <p>Transaction history</p>
                    </Link>
                </div>
            </div>
          }
          </FadeIn>
    </div>

    );
  }
}

export default Cartview;
