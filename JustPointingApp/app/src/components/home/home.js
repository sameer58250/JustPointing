import React, { useState, useEffect } from 'react';
import './home.css';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/session/session-actions';
import * as SessionManager from '../../containers/session-manager/session-manager';
import AppError from '../error/error';
const Home = props => {

    const History = useHistory();

    useEffect(() => {
        if(props.webSocket){
            props.webSocket.close();
        }
        props.failure("");   
    });

    const startSession = () => {
        SessionManager.StartSession()
        .then(response => {
            History.replace('/' + response.data);
            props.success(response.data);
            props.sessionStarted();
        })
        .catch(error => {
            props.failure("Failed to create session. Please try again.");
        })
    }
    const joinSession = () => {
        var textBox = document.getElementById("session-id-input");
        var sessionId = textBox.value;
        SessionManager.StartSession(sessionId)
        .then(response => {
            History.replace('/' + response.data);
            props.success(response.data);
        })
        .catch(error => {
            props.failure("Session is not found. Please try with different session Id.");
        })
    }

    

    const[sessionIdInput, setSessionIdInput] = useState("");

    const sessionIdInputChange = (event) => {
        setSessionIdInput(event.currentTarget.value);
    }

    return (
        <div>
            <div className = "app-title">
                <p>Collaborate to size your items and make agile development easy</p>
            </div>
            <div className = "home">
                <button onClick = {startSession} className = "primary-btn">Start Session</button>
                <label>Session ID:</label><input type = "text" id = "session-id-input" onChange = {sessionIdInputChange}></input>
                <button onClick = {joinSession}  disabled = {!sessionIdInput}> Join Session</button>
                <AppError errorText = {props.error}></AppError>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return {
        error: state.SessionReducer.sessionError,
        webSocket: state.WebSocketReducer.PointingWebSocket
    }
}

function mapDispatchToProps(dispatch){
    return {
        success: (id) => dispatch(actions.create_session_success(id)),
        failure: (errorText) => dispatch(actions.create_session_failure(errorText)),
        sessionStarted: () => dispatch(actions.session_started())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);