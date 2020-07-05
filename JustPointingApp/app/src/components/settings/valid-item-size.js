import React, { useEffect } from 'react';
import './settings.css';
import { connect } from 'react-redux';
import * as actions from '../../store/web-socket/web-socket-actions';
import { UpdateValidStoryPoints } from '../../containers/session-manager/session-manager';

const ValidItemSize = props => {

    useEffect(() => {
        var inputEle = document.querySelectorAll('#valid-item-size input');
        var inputBtnEle = document.querySelectorAll('#valid-item-size button');
        inputEle.forEach(ele => {
            ele.disabled = props.editSizeListSetting == "OnlyAdmin" && !props.isAdmin;
        })
        inputBtnEle.forEach(ele => {
            ele.disabled = props.editSizeListSetting == "OnlyAdmin" && !props.isAdmin;
        })
    }, [props.editSizeListSetting])

    const removePoint = index => {
        props.storyPoints.splice(index, 1);
        updateValidPointState();
    }

    const updatePoint = (event, index) => {
        var point = event.currentTarget.value;
        props.storyPoints[index] = point;
        updateValidPointState();
    }

    const addPoint = event => {
        if(event.keyCode == 13){
            var point = event.currentTarget.value;
            if(point){
                props.storyPoints.unshift(point);
                updateValidPointState();
                event.currentTarget.value = "";
            }
        }
    }

    function updateValidPointState(){
        var newPoints = props.storyPoints.slice();
        UpdateValidStoryPoints(props.sessionId, newPoints)
        .then(res => {
            props.updateValideSizeList(newPoints);
        })
        .catch(err => {
            props.failure("Failed to update size list.");
        })
    }

    return(
        <div className = "valid-item-size" id = "valid-item-size">
            <label>Add or update item size list</label>
            <div>
                <input id = "add-point-input" type = "text" className = "item-size-input" onKeyUp = {(evt) =>addPoint(evt)}></input>
            </div>
            {props.storyPoints.map((point, index) => (
                <div key = {index} className = "input-size-div">
                    <input type = "text" value = {point} onChange = {(event) => updatePoint(event, index)} className = "item-size-input"></input>
                    <button className = "item-size-btn" onClick = {() => removePoint(index)}>X</button>
                </div>
            ))}
        </div>
    )
}

function mapStateToProps(state){
    return {
        storyPoints: state.WebSocketReducer.ValidStoryPoints,
        sessionId: state.SessionReducer.sessionId,
        editSizeListSetting: state.AdminSettingReducer.EditSizeListSetting,
        isAdmin: state.SessionReducer.isAdmin
    }
}

function mapDispatchToProps(dispatch){
    return {
        updateValideSizeList: (sizeList) => dispatch(actions.updateValidStoryPoints(sizeList)),
        failure: (err) => dispatch(actions.error(err))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ValidItemSize);