import {
  FETCH_ITEMS_BEGIN,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILED,
  UPDATE_ITEM_SELECTED,
  RESET_ITEM_STATES,
  RESET_ITEM_LIST,
} from "../actions/types";

export const fetchItemsBegin = () => (dispatch) => {
  dispatch({
    type: FETCH_ITEMS_BEGIN,
  });
};

export const fetchItemsSuccess = (items) => (dispatch) => {
  dispatch({
    type: FETCH_ITEMS_SUCCESS,
    payload: items,
  });
};

export const fetchItemsFailed = () => (dispatch) => {
  dispatch({
    type: FETCH_ITEMS_FAILED,
  });
};

export const updateItemSelected = (item) => (dispatch) => {
  dispatch({
    type: UPDATE_ITEM_SELECTED,
    payload: item,
  });
};

export const resetItemList = () => (dispatch) => {
  dispatch({
    type: RESET_ITEM_LIST,
  });
};

export const resetItemStates = () => (dispatch) => {
  dispatch({
    type: RESET_ITEM_STATES,
  });
};
