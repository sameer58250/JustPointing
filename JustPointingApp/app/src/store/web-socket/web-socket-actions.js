import * as ACTION_TYPES from './web-socket-action-types';

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

export const updateIfUserPointed = (ifUserPointed) => {
    return {
        type: ACTION_TYPES.UPDATE_USER_STORY_POINT,
        payload: ifUserPointed
    };
}