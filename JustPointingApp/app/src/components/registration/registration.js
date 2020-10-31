import "./registration.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import AppError from "../error/error";
import { validateEmail } from "../../utils/validation-utils";
import { RegisterUser } from "../../containers/session-manager/account";
import * as SessionActions from "../../store/session/session-actions";
import { Cookies } from "react-cookie";

const Registration = (props) => {
    var cookies = new Cookies();
    const History = useHistory();
    useEffect(() => {
        if (props.isUserLoggedIn) {
            History.replace("/");
        }
    }, [props.isUserLoggedIn]);

    const [errorText, setError] = useState("");

    const registerUser = () => {
        var password = validatePassword();
        var email = validateUserEmail();
        var phone = validatePhone();
        var name = validateName();
        if (name && email && password && phone) {
            setError("");
            RegisterUser({
                Name: name,
                UserEmail: email,
                Phone: phone,
                Password: password,
            }).then(
                (res) => {
                    props.loginUser(res.data);
                    cookies.set("userdetails", JSON.stringify(res.data));
                    var token = "Basic " + btoa(email + ":" + password);
                    cookies.set("token", token);
                },
                () => {
                    setError("Failed to register user. Please try again.");
                }
            );
        }
    };

    const resetForm = () => {
        var nameEle = document.getElementById("registration-user-name");
        var emailEle = document.getElementById("registration-user-email");
        var passEle = document.getElementById("registration-user-password");
        if (nameEle) {
            nameEle.value = "";
        }
        if (emailEle) {
            emailEle.value = "";
        }
        if (passEle) {
            passEle.value = "";
        }
        setError("");
    };

    function validateName() {
        var nameEle = document.getElementById("registration-user-name");
        if (!nameEle || (nameEle && !nameEle.value)) {
            setError("Please enter name.");
            return;
        }
        return nameEle.value;
    }
    function validatePhone() {
        var phoneEle = document.getElementById("registration-user-phone");
        if (phoneEle) {
            return phoneEle.value;
        }
        return;
    }
    function validateUserEmail() {
        var emailEle = document.getElementById("registration-user-email");
        if (
            !emailEle ||
            (emailEle && !emailEle.value) ||
            !validateEmail(emailEle.value)
        ) {
            setError("Please enter valid email.");
            return;
        }
        return emailEle.value;
    }
    function validatePassword() {
        var passEle = document.getElementById("registration-user-password");
        if (
            !passEle ||
            (passEle && !passEle.value) ||
            passEle.value.length < 8
        ) {
            setError("Please enter valid password atleast 8 characters long.");
            return;
        }
        return passEle.value;
    }

    return (
        <div className="registration">
            <div className="app-table">
                <div className="app-table-row">
                    <div className="app-table-cell registration-labels">
                        <label>Name:</label>
                    </div>
                    <div className="app-table-cell">
                        <input type="text" id="registration-user-name"></input>
                    </div>
                </div>
                <div className="app-table-row">
                    <div className="app-table-cell registration-labels">
                        <label>Phone:</label>
                    </div>
                    <div className="app-table-cell">
                        <input type="text" id="registration-user-phone"></input>
                    </div>
                </div>
                <div className="app-table-row">
                    <div className="app-table-cell registration-labels">
                        <label>Email:</label>
                    </div>
                    <div className="app-table-cell">
                        <input type="text" id="registration-user-email"></input>
                    </div>
                </div>
                <div className="app-table-row">
                    <div className="app-table-cell registration-labels">
                        <label>Password:</label>
                    </div>
                    <div className="app-table-cell">
                        <input
                            type="password"
                            id="registration-user-password"
                            className="input-password"></input>
                    </div>
                </div>
                <div className="app-table-row">
                    <div className="app-table-cell"></div>
                    <div className="app-table-cell">
                        <button onClick={registerUser}>Submit</button>
                        <button onClick={resetForm}>Reset form</button>
                    </div>
                </div>
            </div>
            <AppError errorText={errorText}></AppError>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        isUserLoggedIn: state.SessionReducer.isUserLoggedIn,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginUser: (user) => dispatch(SessionActions.login_user(user)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
