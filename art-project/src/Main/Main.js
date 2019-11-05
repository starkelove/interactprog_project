import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Main.css";
import Topview from "../Topview/Topview";
import ItemView from "../ItemView/ItemView";

class Main extends Component {
    render() {
        return (
            <div className="Main"> 
                <Topview></Topview>
                <ItemView></ItemView>
            </div>
        );
    }
}

export default Main;