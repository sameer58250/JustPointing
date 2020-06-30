import React, { useEffect, useState } from 'react';
import './size-items.css';
import { NavLink, Route } from 'react-router-dom';
import * as SessionManager from '../../containers/session-manager/session-manager';
import { connect } from 'react-redux';
import * as sessionActions from '../../store/session/session-actions';
import { useHistory } from 'react-router-dom';
import WebSocketManager from '../../containers/web-socket-manager/web-socket-manager';
import * as webSocketActions from '../../store/web-socket/web-socket-actions';
import ItemSizeList from '../item-size-list/item-size-list';

const SizeItems = props => {

    const webSocketmanager = new WebSocketManager();

    const History = useHistory();

    useEffect(() => {
        SessionManager.StartSession(props.match.params.id)
        .then(response => {
            props.success(response.data);
        })
        .catch(error => {
            History.replace('/');
            props.failure("URL is not found. Please try with different URL.");
        })
    },[]);

    const[isNameInput, setIsNameInput] = useState("");

    const nameInputChange = (event) => {
        setIsNameInput(event.currentTarget.value);
    }

    function onmessage(message){
        var data = JSON.parse(message.data);
        if(data.SocketId){
            props.webSocketIdReceived(data);
        }
        else{
            props.webSocketMessageReceived(data);
        }
    }

    const joinTeamSizing = () => {
        var nameInputEle = document.getElementById("name-input");
        var name = nameInputEle.value;
        webSocketmanager.startWebSocket(props.sessionId, name, onmessage);
    }

    return (
        <div className = "size-items">
            Name:<input type = "text" id = "name-input" onChange = {nameInputChange}></input><button onClick = {joinTeamSizing} disabled = {!isNameInput}>Join Team</button>
            <div>   
                <div className = "size-item-tabs">
                    <NavLink to = {props.match.url + '/Size'} activeClassName = "is-active">Size</NavLink>
                    <NavLink to = {props.match.url + '/Settings'}  activeClassName = "is-active">Settings</NavLink>
                    <Route exact path = {props.match.path + '/Size'} render = {() => <ItemSizeList StoryPoints = {props.storyPoints}></ItemSizeList>}/>
                    <Route exact path = {props.match.path + '/Settings'} render = {() => <div>Settings</div>}/>
                </div>
            </div>
        </div>
    )
}



function mapStateToProps(state){
    return {
        error: state.SessionReducer.sessionError,
        sessionId: state.SessionReducer.sessionId,
        storyPoints: state.WebSocketReducer.storyPoints
    }
}

function mapDispatchToProps(dispatch){
    return {
        success: (id) => dispatch(sessionActions.create_session_success(id)),
        failure: (errorText) => dispatch(sessionActions.create_session_failure(errorText)),
        webSocketMessageReceived: (teamsData) => dispatch(webSocketActions.webSocketMessageReceived(teamsData)),
        webSocketIdReceived: (socketId) => dispatch(webSocketActions.webSocketIdReceived(socketId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SizeItems);