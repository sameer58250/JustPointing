import * as ACTION_TYPES from './web-socket-action-types';

export const initialState = {
    PointingWebSocket: "",
    ValidStoryPoints: [],
    Users: [],
    TeamId: "",
    IsShowEnabled: false,
    StoryDescription: "",
    PreStoryDescription: "",
    WebSocketId: "",
    error: ""
}

export const WebSocketReducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTION_TYPES.ASSIGN_WEB_SOCKET:
            return {
                ...state,
                PointingWebSocket: action.payload
            }
        case ACTION_TYPES.WEB_SOCKET_MESSAGE_RECEIVED:
            return {
                ...state,
                PreStoryDescription: state.StoryDescription,
                ValidStoryPoints: action.payload.ValidStoryPoints,
                Users: action.payload.Users,
                TeamId: action.payload.TeamId,
                IsShowEnabled: action.payload.IsShowEnabled,
                StoryDescription: action.payload.StoryDescription,
                error: ""
            };
        case ACTION_TYPES.WEB_SOCKET_ID_RECEIVED:
            return {
                ...state,
                WebSocketId: action.payload,
                error: ""
            };
        case ACTION_TYPES.UPDATE_USER_STORY_POINT:
            return {
                ...state,
                Users: action.payload,
                error: ""
            };
        case ACTION_TYPES.SHOW_VOTES:
            return {
                ...state,
                IsShowEnabled: true,
                error: ""
            };
        case ACTION_TYPES.CLEAR_VOTES:
            return {
                ...state,
                Users: action.payload,
                IsShowEnabled: false,
                error: ""
            };
        case ACTION_TYPES.SET_ITEM_DESCRIPTION:
            return {
                ...state,
                StoryDescription: action.payload,
                error: ""
            };
        case ACTION_TYPES.REMOVE_USER:
            return {
                ...state,
                Users: action.payload,
                error: ""
            };
        case ACTION_TYPES.FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case ACTION_TYPES.UPDATE_VALID_STORY_POINTS:
            return {
                ...state,
                ValidStoryPoints: action.payload
            }
        default:
            return state;
    }
}