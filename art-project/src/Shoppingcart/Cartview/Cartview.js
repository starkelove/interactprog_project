import React, { Component } from "react";
import "./Cartview.css";
import { base } from "../../base";
import {PayPalButton} from "react-paypal-button-v2"
import model from "../../Data/Model";
import { isOptionalMemberExpression } from "@babel/types";

class Cartview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart : []
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
    //Test code for Firebase
    /*
    var immediatelyAvailableReference = base.push('tents', {
      data: {name: 'Jens', type: 'Grizzly'},
      then(err){
        if(!err){
          //Router.transitionTo('dashboard');
        }
      }
    });
    base.fetch('tents', {
      context: this,
      asArray: true,
      then(data){
        console.log(data);
        }
      });*/
    let cart = this.state.cart;
    let num_items = 0;
    let tot_price = 0;
    let shoppingList = [];

    Object.keys(cart).forEach(key => {
      num_items += cart[key].amount;
      tot_price += cart[key].amount*cart[key].item.price;
      shoppingList.push(
        <div id={cart[key].item.id} className="item" key={key}> {cart[key].item.id}
          <button onClick={this.handleRemoveAll} className="remove-btn"> X </button>
          <button onClick={this.handleIncrease} className="increase-btn"> + </button>
          <span className="item-name">{cart[key].amount}</span>
          <button onClick={this.handleDecrease} className="decrease-btn"> - </button>
        </div>
      );
  //    console.log(key);
  //    console.log(cart[key]);
    });

  //  console.log("num_items ", num_items);
  //  console.log("tot_price ", tot_price);
    let description = "You are about to pay for " + num_items + " items";

    return (

     <div className="Cartview">

            <div>
                <div className="cart">
                    <h3>Your Shopping Cart</h3>
                    {shoppingList}
                </div>
                <div id="paypal-div">
                {/* PayPalButton based on tutorial provided at
                https://github.com/Luehang/react-paypal-button-v2.git */}
                <PayPalButton
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      "purchase_units": [{
                          "description": description,
                          "amount": {
                            currency_code: "SEK",
                            value: tot_price
                          }
                        },
                        ],
                    });
                  }}
                  onApprove = {(data, actions) => {
                    return actions.order.capture().then(function(details) {
                      alert("The transaction was completed by " + details.payer.name.given_name);
                      return fetch("/paypal-transaction-complete", {
                        method: "post",
                        body: JSON.stringify({
                          orderID: data.orderID
                        })
                      });
                    });
                  }}
                  // onSuccess = {(details) =>
                  //   alert("The transaction was completed by " + details.payer.name.given_name)}
                  onError = {(error) =>
                    alert(error)}
                  onCancel = {() =>
                    alert("The transaction was cancelled ")
                  }
                  options={{
                    clientId: "sb",
                    currency: "SEK"
                  }}

                />
                </div>
            </div>
    </div>
    );
  }
}

export default Cartview;
