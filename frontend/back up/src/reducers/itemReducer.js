import { FETCH_ITEMS, UPDATE_ITEM_SELECTED } from "../actions/types";

const initialState = {
  items: [],
  itemSelected: {},
};

const itemReducer = function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEMS:
      console.log(action.payload);
      return {
        ...state,
        items: action.payload,
      };
    case UPDATE_ITEM_SELECTED:
      return {
        ...state,
        itemSelected: action.payload,
      };
    default:
      return state;
  }
};

export default itemReducer;
