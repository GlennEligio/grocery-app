import { FETCH_ITEMS, UPDATE_ITEM_SELECTED } from "../actions/types";

export const fetchItems = (jwt) => (dispatch) => {
  fetch("http://localhost:8030/items", {
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
          return [];
      }
    })
    .then((data) =>
      dispatch({
        type: FETCH_ITEMS,
        payload: data,
      })
    );
};

export const updateItemSelected = (item) => (dispatch) => {
  dispatch({
    type: UPDATE_ITEM_SELECTED,
    payload: item,
  });
};
