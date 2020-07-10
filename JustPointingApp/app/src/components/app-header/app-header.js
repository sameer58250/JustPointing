import React from 'react';
import './app-header.css';
import { NavLink } from 'react-router-dom';

const AppHeader = (props) => {
    return (
        <div>
            <div className = "app-tabs">
                <div className = "app-header-tab">
                    <NavLink to = "/" exact activeClassName = "tab-is-active">Home</NavLink>
                    <NavLink to = "/retro/" activeClassName = "tab-is-active">Retro</NavLink>
                    <NavLink to = "/about/" activeClassName = "tab-is-active">About</NavLink>
                </div>
                <div className = "app-header-tab login-tabs">
                    <NavLink to = "/register/" activeClassName = "tab-is-active">Register</NavLink>
                    <NavLink to = "/login/" activeClassName = "tab-is-active">Login</NavLink>
                </div>
            </div>
        </div>
    )
}

export default AppHeader;