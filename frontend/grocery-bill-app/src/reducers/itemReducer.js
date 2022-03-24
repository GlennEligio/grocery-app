import {
  FETCH_ITEMS_BEGIN,
  FETCH_ITEMS_FAILED,
  FETCH_ITEMS_SUCCESS,
  UPDATE_ITEM_SELECTED,
  RESET_ITEM_STATES,
  RESET_ITEM_LIST,
} from "../actions/types";

const initialState = {
  items: [],
  loading: false,
  error: false,
  itemSelected: {},
};

const itemReducer = function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEMS_BEGIN:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
        error: false,
      };
    case FETCH_ITEMS_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case UPDATE_ITEM_SELECTED:
      return {
        ...state,
        itemSelected: action.payload,
      };
    case RESET_ITEM_LIST:
      return {
        ...state,
        items: [],
      };
    case RESET_ITEM_STATES:
      return {
        ...state,
        items: [],
        loading: false,
        error: false,
        itemSelected: {},
      };
    default:
      return state;
  }
};

export default itemReducer;
