import React, {useState} from 'react';
import * as sessionActions from "../../store/session/session-actions";
import { connect } from "react-redux";
import {LoginUser} from "../../containers/session-manager/account";
import LoginError from "../error/error";

const Login = props => {
    const [error, setError] = useState("");
    const login = () => {
        var emailEle = document.getElementById("user-email");
        if(emailEle && emailEle.value) {
            LoginUser(emailEle.value)
            .then((res) => {
                console.log(res.data);
                props.login(res.data);
            }, (err) => {
                setError("Failed to login. Please try later");
            })
        }
        else {
            setError("Please enter a valid Email ID.");
        }
    }
    return (
        <div>
          <label>Email: </label><input type="text" placeholder="Enter your email address" id = "user-email"></input>
          <button onClick={login}>Submit</button>
          <LoginError errorText = {error}></LoginError>
        </div>
    )
}

function mapStateToProps (state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
      login: (userDetail) => dispatch(sessionActions.login_user(userDetail))
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Login);