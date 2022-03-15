import {
  CREATE_BILL_BEGIN,
  CREATE_BILL_SUCCESS,
  CREATE_BILL_FAILED,
  RESET_BILL_STATES,
  CHANGE_CURRENT_BILL,
  ADD_ON_HOLD_BILL,
  RESET_CURRENT_BILL,
  UPDATE_CURRENT_BILL_TYPE,
  FETCH_BILLS_BEGIN,
  FETCH_BILLS_FAILED,
  FETCH_BILLS_SUCCESS,
  UPDATE_BILL_SELECTED,
  ADD_ITEM_ON_CURRENT_BILL,
  RESET_BILL_LIST,
  UPDATE_ITEM_IN_CURRENT_BILL,
} from "../actions/types";

export const createBillBegin = () => (dispatch) => {
  dispatch({ type: CREATE_BILL_BEGIN });
};

export const createBillSuccess = () => (dispatch) => {
  dispatch({ type: CREATE_BILL_SUCCESS });
};

export const createBillFail = () => (dispatch) => {
  dispatch({ type: CREATE_BILL_FAILED });
};

export const fetchBillsBegin = () => (dispatch) => {
  dispatch({
    type: FETCH_BILLS_BEGIN,
  });
};

export const fetchBillsSuccess = (bills) => (dispatch) => {
  dispatch({
    type: FETCH_BILLS_SUCCESS,
    payload: bills,
  });
};

export const fetchBillsFailed = () => (dispatch) => {
  dispatch({
    type: FETCH_BILLS_FAILED,
  });
};

export const fetchBills = (jwt) => (dispatch) => {
  dispatch({
    type: FETCH_BILLS_BEGIN,
  });
  fetch("http://localhost:8080/api/v1/bills/summary", {
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
            type: FETCH_BILLS_FAILED,
          });
          break;
        default:
          dispatch({
            type: FETCH_BILLS_SUCCESS,
            payload: data,
          });
          break;
      }
    })
    .catch(() => dispatch({ type: FETCH_BILLS_FAILED }));
};

export const updateBillSelected = (bill) => (dispatch) => {
  dispatch({
    type: UPDATE_BILL_SELECTED,
    payload: bill,
  });
};

export const addOnHoldBill = (id) => (dispatch) => {
  dispatch({
    type: ADD_ON_HOLD_BILL,
    payload: id,
  });
};

export const addItemOnCurrentBill = (item) => (dispatch) => {
  dispatch({
    type: ADD_ITEM_ON_CURRENT_BILL,
    payload: item,
  });
};

export const updateItemOnCurrentBill = (item) => (dispatch) => {
  dispatch({
    type: UPDATE_ITEM_IN_CURRENT_BILL,
    payload: item,
  });
};

export const updateCurrentBillType = (type) => (dispatch) => {
  dispatch({
    type: UPDATE_CURRENT_BILL_TYPE,
    payload: type,
  });
};

export const changeCurrentBill = (bill) => (dispatch) => {
  dispatch({
    type: CHANGE_CURRENT_BILL,
    payload: bill,
  });
};

export const resetCurrentBill = () => (dispatch) => {
  dispatch({
    type: RESET_CURRENT_BILL,
  });
};

export const resetBillList = () => (dispatch) => {
  dispatch({
    type: RESET_BILL_LIST,
  });
};

export const resetBillStates = () => (dispatch) => {
  dispatch({
    type: RESET_BILL_STATES,
  });
};
