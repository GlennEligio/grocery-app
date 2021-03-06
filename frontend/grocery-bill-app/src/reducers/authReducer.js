import {
  FETCH_JWT_BEGIN,
  FETCH_JWT_SUCCESS,
  FETCH_JWT_FAILED,
  UPDATE_JWT,
  RESET_AUTH_STATES,
} from "../actions/types";

const initialState = {
  user: {
    username: "",
    jwt: "",
    role: "",
    refreshToken: "",
  },
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
        user: {
          username: action.payload.username,
          jwt: action.payload.jwt,
          role: action.payload.role,
          refreshToken: action.payload.refreshToken,
        },
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
    case UPDATE_JWT:
      return {
        ...state,
        user: {
          ...state.user,
          jwt: action.payload,
        },
      };
    case RESET_AUTH_STATES:
      return {
        ...state,
        user: {
          username: "",
          jwt: "",
          role: "",
          refreshToken: "",
        },
        loading: false,
        error: false,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default authReducer;
