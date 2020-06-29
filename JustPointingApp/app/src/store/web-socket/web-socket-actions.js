import * as ACTION_TYPES from './web-socket-action-types';

export const webSocketMessageReceived = (teamsData) => {
    return {
        type: ACTION_TYPES.WEB_SOCKET_MESSAGE_RECEIVED,
        payload: teamsData
    };
}