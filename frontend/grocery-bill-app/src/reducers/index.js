import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import billReducer from "./billReducer";

const rootReducer = combineReducers({
  items: itemReducer,
  auth: authReducer,
  user: userReducer,
  bill: billReducer,
});

export default rootReducer;
