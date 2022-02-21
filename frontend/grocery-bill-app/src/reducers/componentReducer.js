import {
  SET_MODAL_COMPONENT,
  SET_BILL_COMPONENT,
  RESET_COMPONENT_STATES,
} from "../actions/types";

const initialState = {
  modalName: "add-item-modal",
  billName: "current-bill",
};

const modalReducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_MODAL_COMPONENT:
      return {
        ...state,
        modalName: action.payload,
      };
    case SET_BILL_COMPONENT:
      return {
        ...state,
        billName: action.payload,
      };
    case RESET_COMPONENT_STATES:
      return {
        modalName: "add-item-modal",
        billName: "current-bill",
      };
    default:
      return state;
  }
};

export default modalReducer;
