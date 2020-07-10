import React from 'react';
import './item-size-list.css';
import UserList from '../user-list/user-list';
import * as actions from '../../store/web-socket/web-socket-actions';
import { connect } from 'react-redux';
import { CastVote, ShowVotes, ClearVotes, RemoveUser } from '../../containers/session-manager/session-manager';
import * as Utils from '../../utils/utils';


const ItemSizeList = props => {

    const vote = (event) => {
        var point = event.target.innerText;
        CastVote(props.webSocketId, point)
        .then(res => {
            props.userList.map(user => {
                if(user.SocketId == props.webSocketId){
                    user.HasPointed = true;
                    if(props.isShowEnabled){
                        user.StoryPoint = point;
                    }
                }
                return user;
            });
            props.vote(props.userList);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const showVotes = () => {
        ShowVotes(props.sessionId)
        .then(res => {
            props.showVotes();
        })
        .catch(err => {
            console.log(err);
        })
    }

    const clearVotes = () => {
        ClearVotes(props.sessionId)
        .then(res => {
            props.userList.map(user => {
                user.HasPointed = false;
                user.StoryPoint = "";
                return user;
            });
            props.clearVotes(props.userList);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const removeUser = (socketId) => {
        var i = Utils.findIndexArrayByAttr(props.userList,"SocketId", socketId);
        if(i!=- 1 && !props.userList[i].IsAdmin){
            RemoveUser(socketId)
            .then(res => {
                props.userList.splice(i, 1);
                props.removeUser(props.userList);
            })
            .catch(err => {
                console.log(err);
            })
        }
        else {
            props.failure("Cannot remove an admin.");
        }
    }

    return (
        <div className = "item-size-list">
            <div hidden = {props.isObserver}>
                { props.storyPoints.map((point, index) => {
                    return (<button onClick = {vote} key = {index} disabled = {props.isShowEnabled}>{point}</button>)
                })}
            </div>
            <UserList users = {props.userList} isShowEnabled = {props.isShowEnabled}
                showVotes = {showVotes} clearVotes = {clearVotes} removeUser = {removeUser}
                resetVoteSetting = {props.resetVoteSetting} showVoteSetting = {props.showVoteSetting}
                controlUserSetting = {props.controlUserSetting} isAdmin = {props.isAdmin}
            />
        </div>
    )
}


function mapStateToProps(state){
    return {
        sessionId: state.SessionReducer.sessionId,
        userList: state.WebSocketReducer.Users,
        storyPoints: state.WebSocketReducer.ValidStoryPoints,
        webSocketId: state.WebSocketReducer.WebSocketId,
        isAdmin: state.SessionReducer.isAdmin,
        isShowEnabled: state.WebSocketReducer.IsShowEnabled,
        resetVoteSetting: state.AdminSettingReducer.ResetVoteSetting,
        showVoteSetting: state.AdminSettingReducer.ShowVoteSetting,
        controlUserSetting: state.AdminSettingReducer.ControlUserSetting,
        isObserver: state.SessionReducer.isObserver
    };
}

function mapDispatchToProps(dispatch){
    return {
        vote: (userList) => dispatch(actions.updateIfUserPointed(userList)),
        showVotes: () => dispatch(actions.showVotes()),
        clearVotes: (userList) => dispatch(actions.clearVotes(userList)),
        removeUser: (userList) => dispatch(actions.removeUser(userList)),
        failure: (err) => dispatch(actions.error(err))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ItemSizeList);