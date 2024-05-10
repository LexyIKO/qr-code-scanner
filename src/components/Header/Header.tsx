import React from "react";
import logo from '../../images/logo.svg'

function Header () {
    return (
        <div className="Header">
            <img src={logo} alt={'null'}/>
            <h1>Easy<span>QR</span> </h1>
        </div>
    )
}

export default Header