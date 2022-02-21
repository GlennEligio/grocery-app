import { FETCH_USER, UPDATE_USER, DELETE_USER } from "./types";

export const fetchUser = () => (dispatch) => {
  dispatch({
    type: FETCH_USER,
  });
};

export const updateUser = (user, jwt) => (dispatch) => {
  console.log(user);
  dispatch({
    type: UPDATE_USER,
    payload: user,
  });
};

export const deleteUser = (user) => (dispatch) => {
  dispatch({
    type: DELETE_USER,
    payload: user,
  });
};
