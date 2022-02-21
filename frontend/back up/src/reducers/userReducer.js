import { FETCH_USER, UPDATE_USER, DELETE_USER } from "../actions/types";

const initialState = {
  user: {},
};

const userReducer = function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case DELETE_USER:
      return { ...state, user: {} };
    default:
      return state;
  }
};

export default userReducer;
