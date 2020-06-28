import * as ACTION_TYPES from './session-action-types';

export const create_session_success = (sessionId) => {
    return {
        type: ACTION_TYPES.SESSION_CREATE_SUCCESS,
        payload: sessionId
    }
}

export const create_session_failure = (errorText) => {
    return {
        type: ACTION_TYPES.CREATE_ACTION_FAILURE,
        payload: errorText
    }
}