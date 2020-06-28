import * as ACTION_TYPES from './session-action-types';

export const initialState = {
    sessionId: null,
    sessionError: ""
}

export const SessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTION_TYPES.SESSION_CREATE_SUCCESS:
            return {
                ...state,
                sessionId: action.payload
            };
        case ACTION_TYPES.CREATE_ACTION_FAILURE:
            return {
                ...state,
                sessionError: action.payload
            };
        default:
            return state;
    }
}