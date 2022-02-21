import {
  FETCH_ITEMS_BEGIN,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILED,
  UPDATE_ITEM_SELECTED,
  RESET_ITEM_STATES,
  EDIT_ITEM_BEGIN,
  EDIT_ITEM_SUCCESS,
  EDIT_ITEM_FAILED,
  DELETE_ITEM_BEGIN,
  DELETE_ITEM_FAILED,
  DELETE_ITEM_SUCCESS,
} from "../actions/types";

export const fetchItems = (jwt) => (dispatch) => {
  dispatch({
    type: FETCH_ITEMS_BEGIN,
  });
  fetch("http://localhost:8080/items", {
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
            type: FETCH_ITEMS_FAILED,
          });
          break;
        default:
          dispatch({
            type: FETCH_ITEMS_SUCCESS,
            payload: data,
          });
          break;
      }
    })
    .catch(() => {
      dispatch({
        type: FETCH_ITEMS_FAILED,
      });
    });
};

export const editItemInServer = (item, jwt) => (dispatch) => {
  dispatch({
    type: EDIT_ITEM_BEGIN,
  });
  fetch("http://localhost:8080/items", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(item),
  }).then((res) => {
    switch (res.status) {
      case 200:
        dispatch({
          type: EDIT_ITEM_SUCCESS,
        });
        break;
      default:
        dispatch({
          type: EDIT_ITEM_FAILED,
        });
        break;
    }
  });
};

export const deleteItemInServer = (id, jwt) => (dispatch) => {
  dispatch({
    type: DELETE_ITEM_BEGIN,
  });
  fetch(`http://localhost:8080/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    switch (res.status) {
      case 200:
        dispatch({
          type: DELETE_ITEM_SUCCESS,
        });
        break;
      default:
        dispatch({
          type: DELETE_ITEM_FAILED,
        });
        break;
    }
  });
};

export const updateItemSelected = (item) => (dispatch) => {
  dispatch({
    type: UPDATE_ITEM_SELECTED,
    payload: item,
  });
};

export const resetItemStates = () => (dispatch) => {
  dispatch({
    type: RESET_ITEM_STATES,
  });
};
