import React, { Component } from "react";
import "./Cartview.css";
import { base } from "../../base";
import {PayPalButton} from "react-paypal-button-v2"

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
                {/* PayPalButton based on tutorial provided at
                https://github.com/Luehang/react-paypal-button-v2.git*/}
                <PayPalButton
                  createOrder={(data, actions) => { 
                    return actions.order.create({
                      purchase_units: [{
                        amount: {
                          value: "0.01"
                        }
                      }],
                    });
                  }}
                  onSuccess = {(details) => 
                    alert("The transaction was completed by " + details.payer.name.given_name)} 
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
