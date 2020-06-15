import React from "react";
import "./Header.css";

const Header = props => (
    <div className="top-bar">    
        {props.showTitleText()}
        {props.showFilterOption()}
    </div>
);

export default Header;