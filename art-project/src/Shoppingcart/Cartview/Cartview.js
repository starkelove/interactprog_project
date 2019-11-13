import React, { Component } from "react";
import "./Cartview.css";
import { base } from "../../base";
//import PaypalButton from "./PaypalButton";
import {PayPalButton} from "react-paypal-button-v2"

/* const CLIENT = {
  sandbox : process.env.PAYPAL_CLIENT_ID_SANDBOX,
  production : process.env.PAYPAL_CLIENT_ID_PRODUCTION,
}

const ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'sandbox';
 */
class Cartview extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  componentWillUnmount() {

  }

  update() {

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
    
    /* const onSuccess = (payment) =>
      console.log("Successful payement ", payment);

    const onError = (error) => 
      console.log("Errorneous payment OR failed to load script ", error);

    const onCancel = (data) =>
      console.log("Cancelled payment ", data); */

    return (

     <div className="Cartview">

            <div className="row">
                <div className="col">
                    <p>You have these items</p>
                    <li>Grej 1</li>
                    <li>Grej 2</li>
                    <li></li>
                </div>
                <div className="col">
                <PayPalButton
                  amount="0.01"
                  onSuccess = {(details) => 
                    alert("Transaction completed by " + details.payer.name.given_name)}
                  /* onSuccess = {(details, data) => {
                    alert("Transaction completed by " + details.payer.name.given_name);

                    return fetch("/paypal-transaction-complete", {
                      method: "post",
                      body: JSON.stringify({
                        orderId: data.orderId
                      })
                    });
                  }}
                  options={{
                    clientId: process.env.PAYPAL_CLIENT_ID_SANDBOX
                  }} */
                />  
                {/* <button id="confirm-buy" className="btn btn-secondary" onClick={this.handleOrder}>Place order!</button> */}
               {/*  <PaypalButton
                  client = {CLIENT}
                  env = {ENV}
                  commit = {true}
                  currency = {'USD'}
                  total = {100}
                  onSuccess = {onSuccess}
                  onError = {onError}
                  onCancel = {onCancel}
                /> */}
                </div>
                
                
            </div>
    </div>
    );
  }
}

export default Cartview;
