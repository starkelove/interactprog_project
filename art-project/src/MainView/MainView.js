import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./MainView.css";
import Topview from "../Topview/Topview";
import Items from "../Items/Items";

class MainView extends Component {
    render() {
        return (
            <div className={MainView}> 
                <Topview></Topview>
                <Items></Items>
            </div>
        );
    }
}

export default MainView;