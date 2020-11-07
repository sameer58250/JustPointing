import * as ACTION_TYPES from './session-action-types';

export const initialState = {
    sessionId: null,
    sessionError: "",
    isAdmin: false,
    isObserver: false,
    isUserLoggedIn: false,
    userDetails: {},
    openLoginPopup: false
}

export const SessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTION_TYPES.SESSION_CREATE_SUCCESS:
            return {
                ...state,
                sessionId: action.payload,
                sessionError: ""
            };
        case ACTION_TYPES.CREATE_ACTION_FAILURE:
            return {
                ...state,
                sessionError: action.payload,
                sessionId: null
            };
        case ACTION_TYPES.SESSION_STARTED:
            return {
                ...state,
                isAdmin: true
            };
        case ACTION_TYPES.SET_ROLE:
            return {
                ...state,
                isObserver: action.payload
            }
        case ACTION_TYPES.LOGIN_USER:
            return {
                ...state,
                isUserLoggedIn: true,
                userDetails: action.payload,
                openLoginPopup: false
            }
        case ACTION_TYPES.LOGOUT_USER:
            return {
                ...state,
                isUserLoggedIn: false,
                userDetails: {}
            }
        case ACTION_TYPES.OPEN_LOGIN_POPUP:
            return {
                ...state,
                openLoginPopup: action.payload
            }
        default:
            return state;
    }
}