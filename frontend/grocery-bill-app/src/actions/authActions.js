import {
  FETCH_JWT_BEGIN,
  FETCH_JWT_FAILED,
  FETCH_JWT_SUCCESS,
  RESET_AUTH_STATES,
  UPDATE_JWT,
} from "./types";

export const fetchJwtBegin = () => (dispatch) => {
  dispatch({
    type: FETCH_JWT_BEGIN,
  });
};

export const fetchJwtSuccess = (user) => (dispatch) => {
  dispatch({
    type: FETCH_JWT_SUCCESS,
    payload: {
      username: user.username,
      jwt: user.jwt,
      refreshToken: user.refreshToken,
      role: user.role,
    },
  });
};

export const fetchJwtFailed = () => (dispatch) => {
  dispatch({
    type: FETCH_JWT_FAILED,
  });
};

export const updateJwt = (jwt) => (dispatch) => {
  dispatch({
    type: UPDATE_JWT,
    payload: jwt,
  });
};

export const resetAuthState = () => (dispatch) => {
  dispatch({
    type: RESET_AUTH_STATES,
  });
};
