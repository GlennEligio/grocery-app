import {
  FETCH_JWT_BEGIN,
  FETCH_JWT_SUCCESS,
  FETCH_JWT_FAILED,
  RESET_AUTH_STATES,
} from "../actions/types";

const initialState = {
  jwt: "",
  role: "",
  loading: false,
  error: false,
  isLoggedIn: false,
};

const authReducer = function (state = initialState, action) {
  switch (action.type) {
    case FETCH_JWT_BEGIN:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_JWT_SUCCESS:
      return {
        ...state,
        jwt: action.payload.jwt,
        role: action.payload.role,
        loading: false,
        error: false,
        isLoggedIn: true,
      };
    case FETCH_JWT_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case RESET_AUTH_STATES:
      return {
        ...state,
        jwt: "",
        role: "",
        loading: false,
        error: false,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
