import {
  CREATE_JWT,
  FETCH_JWT,
  DELETE_JWT,
  UPDATE_STATUS,
} from "../actions/types";

const initialState = {
  jwt: "",
  isLoggedIn: false,
};

const authReducer = function (state = initialState, action) {
  switch (action.type) {
    case FETCH_JWT:
      return {
        ...state,
      };
    case CREATE_JWT:
      return {
        ...state,
        jwt: action.payload,
      };
    case DELETE_JWT:
      return {
        ...state,
        jwt: "",
      };
    case UPDATE_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
