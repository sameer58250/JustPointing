import * as sessionReducer from './session/session-reducer';

import { combineReducers } from 'redux';

const AppReducer = combineReducers({
    SessionReducer: sessionReducer.SessionReducer
});

export default AppReducer;