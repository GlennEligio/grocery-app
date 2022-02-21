import {
  CREATE_USER_BEGIN,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILED,
  FETCH_USERS_BEGIN,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILED,
  UPDATE_USER,
  RESET_USER_STATES,
  UPDATE_USER_SELECTED,
  EDIT_USER_BEGIN,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILED,
  DELETE_USER_BEGIN,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
} from "./types";

export const createUser = (user) => (dispatch) => {
  dispatch({
    type: CREATE_USER_BEGIN,
  });
  fetch("http://localhost:8080/users/register", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => {
    switch (res.status) {
      case 200:
        dispatch({
          type: CREATE_USER_SUCCESS,
        });
        break;
      default:
        dispatch({
          type: CREATE_USER_FAILED,
        });
    }
  });
};

export const fetchUsers = (jwt) => (dispatch) => {
  dispatch({
    type: FETCH_USERS_BEGIN,
  });
  fetch("http://localhost:8080/users", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
    .then((res) => {
      switch (res.status) {
        case 200:
          return res.json();
        default:
          return null;
      }
    })
    .then((data) => {
      switch (data) {
        case null:
          dispatch({
            type: FETCH_USERS_FAILED,
          });
          break;
        default:
          dispatch({
            type: FETCH_USERS_SUCCESS,
            payload: data,
          });
          break;
      }
    });
};

export const editUserInServer = (user, jwt) => (dispatch) => {
  dispatch({
    type: EDIT_USER_BEGIN,
  });
  fetch("http://localhost:8080/users", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => {
    switch (res.status) {
      case 200:
        dispatch({
          type: EDIT_USER_SUCCESS,
        });
        break;
      default:
        dispatch({
          type: EDIT_USER_FAILED,
        });
        break;
    }
  });
};

export const deleteUserInServer = (id, jwt) => (dispatch) => {
  dispatch({
    type: DELETE_USER_BEGIN,
  });
  fetch(`http://localhost:8080/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    switch (res.status) {
      case 200:
        dispatch({
          type: DELETE_USER_SUCCESS,
        });
        break;
      default:
        dispatch({
          type: DELETE_USER_FAILED,
        });
        break;
    }
  });
};

export const updateUserSelected = (user) => (dispatch) => {
  dispatch({
    type: UPDATE_USER_SELECTED,
    payload: user,
  });
};

export const updateUser = (user, jwt) => (dispatch) => {
  dispatch({
    type: UPDATE_USER,
    payload: user,
  });
};

export const resetUserState = () => (dispatch) => {
  dispatch({
    type: RESET_USER_STATES,
  });
};
