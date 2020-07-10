import * as ACTION_TYPES from './web-socket-action-types';

export const assignWebSocket = (webSocket) => {
    return {
        type: ACTION_TYPES.ASSIGN_WEB_SOCKET,
        payload: webSocket
    }
}

export const webSocketMessageReceived = (teamsData) => {
    return {
        type: ACTION_TYPES.WEB_SOCKET_MESSAGE_RECEIVED,
        payload: teamsData
    };
}

export const webSocketIdReceived = (socketId) => {
    return {
        type: ACTION_TYPES.WEB_SOCKET_ID_RECEIVED,
        payload: socketId
    };
}

export const updateValidStoryPoints = (sizeList) => {
    return {
        type: ACTION_TYPES.UPDATE_VALID_STORY_POINTS,
        payload: sizeList
    };
}

export const updateIfUserPointed = (users) => {
    return {
        type: ACTION_TYPES.UPDATE_USER_STORY_POINT,
        payload: users
    };
}

export const showVotes = () => {
    return {
        type: ACTION_TYPES.SHOW_VOTES
    };
}

export const clearVotes = (users) => {
    return {
        type: ACTION_TYPES.CLEAR_VOTES,
        payload: users
    };
}

export const setItemDescription = (description) => {
    return {
        type: ACTION_TYPES.SET_ITEM_DESCRIPTION,
        payload: description
    };
}

export const removeUser = (userList) => {
    return {
        type: ACTION_TYPES.REMOVE_USER,
        payload: userList
    };
}

export const error = (errorText) => {
    return {
        type: ACTION_TYPES.FAILURE,
        payload: errorText
    };
}