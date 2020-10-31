import "./login.css";
import React, { useState } from "react";
import * as sessionActions from "../../store/session/session-actions";
import { connect } from "react-redux";
import { LoginUser } from "../../containers/session-manager/account";
import LoginError from "../error/error";
import { Cookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const Login = (props) => {
    var cookies = new Cookies();
    const History = useHistory();
    const [error, setError] = useState("");
    const login = () => {
        var emailEle = document.getElementById("user-email");
        var passEle = document.getElementById("user-password");
        if (emailEle && emailEle.value && passEle && passEle.value) {
            var password = passEle.value;
            var email = emailEle.value;
            LoginUser({ userEmail: email, password: password }).then(
                (res) => {
                    cookies.set("userdetails", JSON.stringify(res.data));
                    var token = "Basic " + btoa(email + ":" + password);
                    cookies.set("token", token);
                    props.login(res.data);
                    props.loginCallback && props.loginCallback(res.data.userId);
                },
                (err) => {
                    setError("Failed to login. Please try again");
                }
            );
        } else {
            setError("Please enter valid credentials.");
        }
    };
    const close = () => {
        props.openLogin(false);
    };
    return (
        <div>
            <div className="credentials-input">
                <label>Email: </label>
                <input
                    type="text"
                    placeholder="Enter your email address"
                    id="user-email"
                    className="input-email"></input>
            </div>
            <div className="credentials-input">
                <label>Password: </label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    id="user-password"
                    className="input-password"></input>
            </div>
            <div style={{ marginLeft: "70px" }}>
                <button onClick={login}>Submit</button>
                <button
                    onClick={() => {
                        props.openLogin(false);
                        History.replace("/register/");
                    }}>
                    Sign up
                </button>
                {props.showCancelButton && (
                    <button onClick={close}>Cancel</button>
                )}
            </div>
            <LoginError errorText={error}></LoginError>
        </div>
    );
};

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        login: (userDetail) => dispatch(sessionActions.login_user(userDetail)),
        openLogin: (openLogin) =>
            dispatch(sessionActions.open_login_popup(openLogin)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
