import * as ACTION_TYPES from './web-socket-action-types';

export const initialState = {
    teamsData: {}
}

export const WebSocketReducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTION_TYPES.WEB_SOCKET_MESSAGE_RECEIVED:
            return {
                ...state,
                teamsData: action.payload
            };
        default:
            return state;
    }
}