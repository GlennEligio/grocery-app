import { CREATE_JWT, DELETE_JWT, FETCH_JWT, UPDATE_STATUS } from "./types";

export const createJwt = (jwt) => (dispatch) => {
  dispatch({
    type: CREATE_JWT,
    payload: jwt,
  });
};

export const fetchJwt = () => (dispatch) => {
  dispatch({
    type: FETCH_JWT,
  });
};

export const deleteJwt = () => (dispatch) => {
  dispatch({
    type: DELETE_JWT,
  });
};

export const updateStatus = (status) => (dispatch) => {
  dispatch({
    type: UPDATE_STATUS,
    payload: status,
  });
};
