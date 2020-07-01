import React from 'react';
import './user-list.css';


const UserList = props => {
    return (
        <div className = "user-list app-table">
            <div className = "app-table-header">
                <div className = "app-table-cell">Name</div>
                <div className = "app-table-cell">HasVoted</div>
                <div className = "app-table-cell">
                    <button className = "show-button" onClick = {props.showVotes}>Show votes</button>
                    <button className = "clear-button" onClick = {props.clearVotes}>Reset votes</button>
                </div>
            </div>
            {props.users.map(user => {
                return (
                    <div key = {user.SocketId} className = "app-table-row">
                        <div className = "app-table-cell">{user.Name}</div>
                        <div className = "app-table-cell">
                            <input type = "checkbox" checked = {!!user.HasPointed} readOnly></input>
                        </div>
                        <div className = "app-table-cell">{props.isShowEnabled ? user.StoryPoint : ""}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default UserList;