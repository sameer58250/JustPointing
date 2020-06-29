import { SessionReducer } from './session/session-reducer';
import { WebSocketReducer } from './web-socket/web-socket-reducer';

import { combineReducers } from 'redux';

const AppReducer = combineReducers({
    SessionReducer: SessionReducer,
    WebSocketReducer: WebSocketReducer
});

export default AppReducer;