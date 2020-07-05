import React from 'react';
import './settings.css'
import { connect } from 'react-redux';
import * as settingActions from '../../store/admin-settings/admin-setting-actions';
import { UpdatedSettings } from '../../containers/session-manager/session-manager';
import * as webSocketActions from '../../store/web-socket/web-socket-actions';

const SizingControl = props => {

    const showVoteSettingChange = event => {
        var setting  = event.currentTarget.value;
        props.updateShowVoteSetting(setting);
    }

    const resetVoteSettingChange = event => {
        var setting  = event.currentTarget.value;
        props.updateResetVoteSetting(setting);
    }

    const editSizeListSettingChange = event => {
        var setting  = event.currentTarget.value;
        props.updateEditSizeListSetting(setting);
    }

    const controlUserSettingChange = event => {
        var setting  = event.currentTarget.value;
        props.updateControlUserSetting(setting);
    }

    const saveSettings = () => {
        var settings = {
            ShowVoteSetting: props.showVoteSetting,
            ResetVoteSetting: props.resetVoteSetting,
            EditSizeListSetting :props.editSizeListSetting,
            ControlUserSetting: props.controlUserSetting
        }
        UpdatedSettings(props.sessionId, settings)
        .then(res => {

        })
        .catch(err => {
            props.failure("Failed to save the settings. Please try again");
        })
    }

    return (
        <div className = "sizing-controls">
            <label>Configurations</label>
            <div>
                <div className = "control-input">
                    <label>Who can show votes: </label>
                    <div> 
                        <label>
                            <input type = "radio" value = "OnlyAdmin" checked = {props.showVoteSetting == "OnlyAdmin"} onChange = {showVoteSettingChange}></input>
                            Only Admin
                        </label>
                        <label>
                            <input type = "radio" value = "All" checked = {props.showVoteSetting == "All"} onChange = {showVoteSettingChange}></input>
                            All
                        </label>
                    </div>
                </div>
                <hr/>
                <div className = "control-input">
                    <label>Who can reset votes: </label>
                    <div>
                        <label>
                            <input type = "radio" value = "OnlyAdmin" checked = {props.resetVoteSetting == "OnlyAdmin"} onChange = {resetVoteSettingChange}></input>
                            Only Admin
                        </label>
                        <label>
                            <input type = "radio" value = "All" checked = {props.resetVoteSetting == "All"} onChange = {resetVoteSettingChange}></input>
                            All
                        </label>
                    </div>
                </div>
                <hr/>
                <div className = "control-input">
                    <label>Who can modify valid points: </label>
                    <div> 
                        <label>
                            <input type = "radio" value = "OnlyAdmin" checked = {props.editSizeListSetting == "OnlyAdmin"} onChange = {editSizeListSettingChange}></input>
                            Only Admin
                        </label>
                        <label>
                            <input type = "radio" value = "All" checked = {props.editSizeListSetting == "All"} onChange = {editSizeListSettingChange}></input>
                            All
                        </label>
                    </div>
                </div>
                <hr/>
                <div className = "control-input">
                    <label>Who can remove participants: </label>
                    <div> 
                        <label>
                            <input type = "radio" value = "OnlyAdmin" checked = {props.controlUserSetting == "OnlyAdmin"} onChange = {controlUserSettingChange}></input>
                            Only Admin
                        </label>
                        <label>
                            <input type = "radio" value = "All" checked = {props.controlUserSetting == "All"} onChange = {controlUserSettingChange}></input>
                            All
                        </label>
                    </div>
                </div>
                <hr/>
            </div>
            <button onClick = {saveSettings}>Save</button>
        </div>
    )
}

function mapStateToProps(state){
    return {
        showVoteSetting: state.AdminSettingReducer.ShowVoteSetting,
        resetVoteSetting: state.AdminSettingReducer.ResetVoteSetting,
        editSizeListSetting: state.AdminSettingReducer.EditSizeListSetting,
        controlUserSetting: state.AdminSettingReducer.ControlUserSetting,
        sessionId: state.SessionReducer.sessionId
    }
}

function mapDispatchToProps(dispatch){
    return {
        updateShowVoteSetting: (setting) => dispatch(settingActions.updateShowVoteSetting(setting)),
        updateResetVoteSetting: (setting) => dispatch(settingActions.updateResetVoteSetting(setting)),
        updateEditSizeListSetting: (setting) => dispatch(settingActions.updateEditSizeListSetting(setting)),
        updateControlUserSetting: (setting) => dispatch(settingActions.updateControlUserSetting(setting)),
        failure: (err) => dispatch(webSocketActions.error(err))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(SizingControl);