import {
  CREATE_USER_BEGIN,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED,
  UPDATE_USER_SELECTED,
  RESET_USER_STATES,
  FETCH_USERS_BEGIN,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILED,
  EDIT_USER_BEGIN,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILED,
  RESET_USER_LIST,
} from "../actions/types";

const initialState = {
  user: {},
  users: [],
  userSelected: {},
  loading: false,
  error: false,
  status: false,
};

const userReducer = function (state = initialState, action) {
  switch (action.type) {
    case CREATE_USER_BEGIN:
      return {
        ...state,
        loading: true,
        error: false,
        status: false,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        status: true,
        users: [],
      };
    case CREATE_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        status: false,
      };
    case FETCH_USERS_BEGIN:
      return {
        ...state,
        loading: true,
        error: false,
        status: false,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        status: true,
        users: action.payload,
      };
    case FETCH_USERS_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        status: false,
      };
    case EDIT_USER_BEGIN:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        users: [],
      };
    case EDIT_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case UPDATE_USER_SELECTED:
      return {
        ...state,
        userSelected: action.payload,
      };
    case RESET_USER_LIST:
      return {
        ...state,
        users: [],
      };
    case RESET_USER_STATES:
      return {
        ...state,
        user: {},
        users: [],
        userSelected: {},
        loading: false,
        error: false,
        status: false,
      };
    default:
      return state;
  }
};

export default userReducer;
