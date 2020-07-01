import * as ACTION_TYPES from './web-socket-action-types';

export const initialState = {
    storyPoints: [],
    users: [],
    teamId: "",
    isShowEnabled: false,
    storyDescription: "",
    webSocketId: ""
}

export const WebSocketReducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTION_TYPES.WEB_SOCKET_MESSAGE_RECEIVED:
            return {
                ...state,
                storyPoints: action.payload.ValidStoryPoints,
                users: action.payload.Users,
                teamId: action.payload.TeamId,
                isShowEnabled: action.payload.IsShowEnabled,
                storyDescription: action.payload.StoryDescription
            };
        case ACTION_TYPES.WEB_SOCKET_ID_RECEIVED:
            return {
                ...state,
                webSocketId: action.payload
            };
        case ACTION_TYPES.UPDATE_USER_STORY_POINT:
            return {
                ...state,
                users: action.payload
            };
        case ACTION_TYPES.SHOW_VOTES:
            return {
                ...state,
                isShowEnabled: true
            };
        case ACTION_TYPES.CLEAR_VOTES:
            return {
                ...state,
                users: action.payload
            };
        default:
            return state;
    }
}