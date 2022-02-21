import {
  SET_BILL_COMPONENT,
  SET_MODAL_COMPONENT,
  RESET_COMPONENT_STATES,
} from "./types";

export const setModalComponent = (name) => (dispatch) => {
  dispatch({
    type: SET_MODAL_COMPONENT,
    payload: name,
  });
};

export const setBillComponent = (name) => (dispatch) => {
  dispatch({
    type: SET_BILL_COMPONENT,
    payload: name,
  });
};

export const resetComponentStates = () => (dispatch) => {
  dispatch({
    type: RESET_COMPONENT_STATES,
  });
};
