import './size-items.css';
import React, { useEffect, useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as SessionManager from '../../containers/session-manager/session-manager';
import * as sessionActions from '../../store/session/session-actions';
import WebSocketManager from '../../containers/web-socket-manager/web-socket-manager';
import * as webSocketActions from '../../store/web-socket/web-socket-actions';
import { initialState } from '../../store/web-socket/web-socket-reducer';
import ItemSizeList from '../item-size-list/item-size-list';
import Settings from '../settings/settings';
import AppError from '../error/error';
import * as adminSettingActions from '../../store/admin-settings/admin-setting-actions';
import { initialSettings } from '../../store/admin-settings/admin-setting-reducer';
import SizingResults from '../sizing-results/sizing-results';

const SizeItems = props => {

    const webSocketmanager = new WebSocketManager();

    const History = useHistory();

    useEffect(() => {
        SessionManager.StartSession(props.match.params.id)
        .then(response => {
            props.sessionSuccess(response.data);
        })
        .catch(err => {
            console.log(err);
            History.replace('/');
            props.sessionFailure("URL is not found. Please try with different URL.");
        })
    },[]);

    const[isNameInput, setIsNameInput] = useState("");

    const nameInputChange = (event) => {
        setIsNameInput(event.currentTarget.value);
    }

    const[isJoinClicked, setJoinClicked] = useState(false);

    function onmessage(message){
        var data = JSON.parse(message.data);
        if(data.SocketId){
            props.webSocketIdReceived(data.SocketId);
            setAdmin(data.SocketId);
        }
        else{
            props.webSocketMessageReceived(data);
            props.updateAdminSettings(data.AdminSettings);
        }
    }

    function onclose(msg){
        props.sessionFailure("You have been disconnencted.")
        History.replace('/');
        props.webSocketMessageReceived(initialState);
        props.updateAdminSettings(initialSettings);
    }

    function setAdmin(socketId){
        if(props.isAdmin){
            SessionManager.SetAdmin(socketId)
            .then(res => {

            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    const joinTeamSizing = () => {
        var nameInputEle = document.getElementById("name-input");
        var name = nameInputEle.value;
        webSocketmanager.startWebSocket(props.sessionId, name, onmessage, onclose);
        setJoinClicked(true);
        History.replace('/' + props.sessionId + '/size');
    }

    const setDescription = (event) => {
        var description = event.currentTarget.value;
        if(description != props.PreStoryDescription){
            SessionManager.SetItemDescription(props.sessionId, description)
            .then(res => {
                props.setItemDescription(description);
            })
            .catch(err => {
                props.setItemDescription(props.preStoryDescription);
                console.log(err);
            })
        }
    }

    const onDescriptionChange = (event) => {
        props.setItemDescription(event.currentTarget.value);
    }

    return (
        <div className = "size-items">
            {isJoinClicked
                ?
                <div> 
                    <div className = "size-item-block">
                        <div className = "item-description">
                            <label htmlFor = "item-description">Item Description:</label>
                            <textarea id = "item-description" value = {props.storyDescription ? props.storyDescription : ""} onChange = {onDescriptionChange}
                                name = "item-description" placeholder = "Please enter item description" onBlur = {setDescription}
                            />
                        </div>   
                        <div>
                            <div className = "size-item-tabs">
                                <NavLink to = {props.match.url + '/Size'} activeClassName = "is-active">Sizing</NavLink>
                                <NavLink to = {props.match.url + '/Settings'}  activeClassName = "is-active">Settings</NavLink>
                            </div>
                            <Route exact path = {props.match.path + '/Size'} render = {() => <ItemSizeList></ItemSizeList>}/>
                            <Route exact path = {props.match.path + '/Settings'} render = {() => <Settings/>}/>
                        </div>
                    </div>
                    <SizingResults users = {props.users}/>
                </div>
                : 
                <div className = "join-team-sizing">
                    Name:<input type = "text" id = "name-input" onChange = {nameInputChange}></input>
                    <button onClick = {joinTeamSizing} disabled = {!isNameInput}>Join Team</button>
                </div>
            }
            <AppError errorText = {props.error}></AppError>
        </div>
    )
}



function mapStateToProps(state){
    return {
        error: state.WebSocketReducer.error,
        sessionId: state.SessionReducer.sessionId,
        isAdmin: state.SessionReducer.isAdmin,
        storyPoints: state.WebSocketReducer.ValidStoryPoints,
        storyDescription: state.WebSocketReducer.StoryDescription,
        PreStoryDescription: state.WebSocketReducer.PreStoryDescription,
        users: state.WebSocketReducer.Users
    }
}

function mapDispatchToProps(dispatch){
    return {
        sessionSuccess: (id) => dispatch(sessionActions.create_session_success(id)),
        sessionFailure: (errorText) => dispatch(sessionActions.create_session_failure(errorText)),
        webSocketMessageReceived: (teamsData) => dispatch(webSocketActions.webSocketMessageReceived(teamsData)),
        webSocketIdReceived: (socketId) => dispatch(webSocketActions.webSocketIdReceived(socketId)),
        setItemDescription: (description) => dispatch(webSocketActions.setItemDescription(description)),
        updateAdminSettings: (settings) => dispatch(adminSettingActions.updateAllSettings(settings))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SizeItems);