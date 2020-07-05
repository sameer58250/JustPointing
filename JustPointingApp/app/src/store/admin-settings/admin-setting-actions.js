import * as ACTION_TYPES from './admin-setting-action-types';

export const updateAllSettings = (settings) => {
    return {
        type: ACTION_TYPES.UPDATE_ALL_SETTINGS,
        payload: settings
    }
}

export const updateShowVoteSetting = (setting) => {
    return {
        type: ACTION_TYPES.UPDATE_SHOW_VOTE_SETTING,
        payload: setting
    }
}

export const updateResetVoteSetting = (setting) => {
    return {
        type: ACTION_TYPES.UPDATE_RESET_VOTE_SETTING,
        payload: setting
    }
}

export const updateEditSizeListSetting = (setting) => {
    return {
        type: ACTION_TYPES.UPDATE_EDIT_SIZE_LIST_SETTING,
        payload: setting
    }
}

export const updateControlUserSetting = (setting) => {
    return {
        type: ACTION_TYPES.UPDATE_CONTROL_USER_SETTING,
        payload: setting
    }
}