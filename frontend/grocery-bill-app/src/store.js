import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {};

const persistConfig = {
  key: "groceryBillApp",
  storage,
};

const middleware = [thunk];

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export const persistor = persistStore(store);
export default store;
