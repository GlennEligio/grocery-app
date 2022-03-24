import {
  CREATE_USER_BEGIN,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED,
  FETCH_USERS_BEGIN,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILED,
  RESET_USER_LIST,
  RESET_USER_STATES,
  UPDATE_USER_SELECTED,
} from "./types";

export const registerUserBegin = () => (dispatch) => {
  dispatch({ type: CREATE_USER_BEGIN });
};

export const registerUserSuccess = () => (dispatch) => {
  dispatch({
    type: CREATE_USER_SUCCESS,
  });
};

export const registerUserFailed = () => (dispatch) => {
  dispatch({
    type: CREATE_USER_FAILED,
  });
};

export const fetchUsersBegin = () => (dispatch) => {
  dispatch({
    type: FETCH_USERS_BEGIN,
  });
};

export const fetchUsersSuccess = (users) => (dispatch) => {
  dispatch({
    type: FETCH_USERS_SUCCESS,
    payload: users,
  });
};

export const fetchUsersFailed = () => (dispatch) => {
  dispatch({
    type: FETCH_USERS_FAILED,
  });
};

export const updateUserSelected = (user) => (dispatch) => {
  dispatch({
    type: UPDATE_USER_SELECTED,
    payload: user,
  });
};

export const resetUserList = () => (dispatch) => {
  dispatch({
    type: RESET_USER_LIST,
  });
};

export const resetUserState = () => (dispatch) => {
  dispatch({
    type: RESET_USER_STATES,
  });
};
