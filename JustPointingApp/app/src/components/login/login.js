import React, {useState} from 'react';
import * as sessionActions from "../../store/session/session-actions";
import { connect } from "react-redux";
import {LoginUser} from "../../containers/session-manager/account";
import LoginError from "../error/error";
import { Cookies } from 'react-cookie';

const Login = props => {
    var cookies = new Cookies();
    const [error, setError] = useState("");
    const login = () => {
        var emailEle = document.getElementById("user-email");
        if(emailEle && emailEle.value) {
            LoginUser(emailEle.value)
            .then((res) => {
                cookies.set('userdetails', JSON.stringify(res.data));
                props.login(res.data);
                props.loginCallback && props.loginCallback(res.data.userId);
            }, (err) => {
                setError("Failed to login. Please try later");
            })
        }
        else {
            setError("Please enter a valid Email ID.");
        }
    }
    const close = () => {
        props.openLogin(false);
    }
    return (
        <div>
          <label>Email: </label><input type="text" placeholder="Enter your email address" id = "user-email"></input>
          <button onClick={login}>Submit</button>
          {props.showCancelButton && <button onClick={close}>Cancel</button>}
          <LoginError errorText = {error}></LoginError>
        </div>
    )
}

function mapStateToProps (state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
      login: (userDetail) => dispatch(sessionActions.login_user(userDetail)),
      openLogin: (openLogin) => dispatch(sessionActions.open_login_popup(openLogin))
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Login);