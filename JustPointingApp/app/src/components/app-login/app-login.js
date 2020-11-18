import React from 'react';
import './app-login.css';
import LoginView from "../login/login";
import Modal from 'react-modal';

const AppLogin = (props) => {
    return (
        <Modal isOpen = {props.openLoginPopup} ariaHideApp={false} overlayClassName="app-login-modal">
            <LoginView showCancelButton={props.showCancelButton && window.location.href.indexOf("retro") === -1} loginCallback={props.loginCallback}/>
        </Modal>
    )
}

export default AppLogin;