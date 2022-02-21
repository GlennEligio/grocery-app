import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  items: itemReducer,
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;
