import "./registration.css";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const Registration = (props) => {
    const History = useHistory();
    useEffect(() => {
        if (props.isUserLoggedIn) {
            History.replace("/");
        }
    }, [props.isUserLoggedIn]);
    return <div className="registration">App registration goes here.</div>;
};

function mapStateToProps(state) {
    return {
        isUserLoggedIn: state.SessionReducer.isUserLoggedIn,
    };
}

function mapDispatchToProps(dispatch) {}

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
