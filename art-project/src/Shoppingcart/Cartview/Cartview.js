import React, { Component } from "react";
import "./Cartview.css";
import { base } from "../../base";

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
                <button id="confirm-buy" className="btn btn-secondary" onClick={this.handleOrder}>Place order!</button>
                </div>
                
                
            </div>
    </div>
    );
  }
}

export default Cartview;
