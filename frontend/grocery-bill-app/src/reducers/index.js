import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import billReducer from "./billReducer";
import componentReducer from "./componentReducer";

const rootReducer = combineReducers({
  items: itemReducer,
  auth: authReducer,
  user: userReducer,
  bill: billReducer,
  component: componentReducer,
});

export default rootReducer;
