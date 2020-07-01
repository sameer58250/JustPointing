import React from 'react';
import './item-size-list.css';
import UserList from '../user-list/user-list';
import * as actions from '../../store/web-socket/web-socket-actions';
import { connect } from 'react-redux';
import { CastVote, ShowVotes, ClearVotes } from '../../containers/session-manager/session-manager';


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

    return (
        <div>
            <div className = "item-size-list">
                { props.storyPoints.map(point => {
                    return (<button onClick = {vote} key = {point}>{point}</button>)
                })}
            </div>
            <UserList users = {props.userList} isShowEnabled = {props.isShowEnabled} showVotes = {showVotes} clearVotes = {clearVotes}/>
        </div>
    )
}


function mapStateToProps(state){
    return {
        sessionId: state.SessionReducer.sessionId,
        userList: state.WebSocketReducer.users,
        storyPoints: state.WebSocketReducer.storyPoints,
        webSocketId: state.WebSocketReducer.webSocketId,
        isShowEnabled: state.WebSocketReducer.isShowEnabled
    };
}

function mapDispatchToProps(dispatch){
    return {
        vote: (userList) => dispatch(actions.updateIfUserPointed(userList)),
        showVotes: () => dispatch(actions.showVotes()),
        clearVotes: (userList) => dispatch(actions.clearVotes(userList))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(ItemSizeList);