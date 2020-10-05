import React from 'react';
import './app-login.css';
import LoginView from "../login/login";

const AppLogin = (props) => {
    return (
        <div className = "app-login">
            <LoginView></LoginView>
        </div>
    )
}

export default AppLogin;