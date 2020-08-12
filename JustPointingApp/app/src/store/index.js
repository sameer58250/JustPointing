import { SessionReducer } from "./session/session-reducer";
import { WebSocketReducer } from "./web-socket/web-socket-reducer";
import { AdminSettingReducer } from "./admin-settings/admin-setting-reducer";
import { RetroReducer } from "./retro/retro-reducer";

import { combineReducers } from "redux";

const AppReducer = combineReducers({
  SessionReducer: SessionReducer,
  WebSocketReducer: WebSocketReducer,
  AdminSettingReducer: AdminSettingReducer,
  RetroReducer: RetroReducer,
});

export default AppReducer;
