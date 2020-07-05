import * as ACTION_TYPES from './admin-setting-action-types';

export const initialSettings = {
    ShowVoteSetting: "all",
    ResetVoteSetting: "onlyAdmin",
    EditSizeListSetting: "all",
    ControlUserSetting: "onlyAdmin"
}

export const AdminSettingReducer = (state = initialSettings, action) => {
    switch(action.type){
        case ACTION_TYPES.UPDATE_ALL_SETTINGS:
            return {
                ...state,
                ShowVoteSetting: action.payload.ShowVoteSetting,
                ResetVoteSetting: action.payload.ResetVoteSetting,
                EditSizeListSetting: action.payload.EditSizeListSetting,
                ControlUserSetting: action.payload.ControlUserSetting
            }
        case ACTION_TYPES.UPDATE_SHOW_VOTE_SETTING:
            return {
                ...state,
                ShowVoteSetting: action.payload
            };
        case ACTION_TYPES.UPDATE_RESET_VOTE_SETTING:
            return {
                ...state,
                ResetVoteSetting: action.payload
            };
        case ACTION_TYPES.UPDATE_EDIT_SIZE_LIST_SETTING:
            return {
                ...state,
                EditSizeListSetting: action.payload
            };
        case ACTION_TYPES.UPDATE_CONTROL_USER_SETTING:
            return {
                ...state,
                ControlUserSetting: action.payload
            };
        default:
            return state;
    }
}