import React, { Component } from "react";
import "./Main.css";
import Topview from "../Topview/Topview";
import Itemview from "../Itemview/Itemview";

class Main extends Component {
    render() {
        return (
            <div className="Main"> 
                <Topview></Topview>
                <Itemview></Itemview>
            </div>
        );
    }
}

export default Main;