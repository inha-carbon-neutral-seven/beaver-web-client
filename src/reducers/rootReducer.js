import { combineReducers } from "redux";
import appStateReducer from "./appStateReducer";
import chatScreenReducer from "./chatScreenReducers";
import serverConnectReducer from "./serverConnectReducer";

const rootReducer = combineReducers({
  appState: appStateReducer,
  chatScreen: chatScreenReducer,
  connected: serverConnectReducer,
});

export default rootReducer;
