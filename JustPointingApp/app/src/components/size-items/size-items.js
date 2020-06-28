import React, { useEffect } from 'react';
import './size-items.css';
import { NavLink, Route } from 'react-router-dom';
import * as SessionManager from '../../containers/session-manager/session-manager';
import { connect } from 'react-redux';
import * as actions from '../../store/session/session-actions';
import { useHistory } from 'react-router-dom';
import WebSocketManager from '../../containers/web-socket-manager/web-socket-manager';

const SizeItems = props => {

    const History = useHistory();

    useEffect(() => {
        SessionManager.StartSession(props.match.params.id)
        .then(response => {
            props.success(response.data);
        })
        .catch(error => {
            History.replace('/');
            props.failure("Session is not found. Please try with different session Id.");
        })
    },[]);

    const joinTeamSizing = () => {
        var nameInputEle = document.getElementById("name-input");
        var name = nameInputEle.value;
        const webSocketmanager = new WebSocketManager(props.sessionId, name);
    }

    return (
        <div className = "size-items">
            Name:<input type = "text" id = "name-input"></input><button onClick = {joinTeamSizing}>Join Team</button>
            <div>   
                <div className = "size-item-tabs">
                    <NavLink to = {props.match.url + '/Size'} activeClassName = "is-active">Size</NavLink>
                    <NavLink to = {props.match.url + '/Settings'}  activeClassName = "is-active">Settings</NavLink>
                    <Route exact path = {props.match.path + '/Size'} render = {() => <div>Size</div>}/>
                    <Route exact path = {props.match.path + '/Settings'} render = {() => <div>Settings</div>}/>
                </div>
            </div>
        </div>
    )
}



function mapStateToProps(state){
    return {
        error: state.SessionReducer.sessionError,
        sessionId: state.SessionReducer.sessionId
    }
}

function mapDispatchToProps(dispatch){
    return {
        success: (id) => dispatch(actions.create_session_success(id)),
        failure: (errorText) => dispatch(actions.create_session_failure(errorText))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SizeItems);