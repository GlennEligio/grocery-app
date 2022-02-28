import {
  CREATE_BILL_BEGIN,
  CREATE_BILL_SUCCESS,
  CREATE_BILL_FAILED,
  RESET_BILL_STATES,
  UPDATE_CURRENT_BILL,
  CHANGE_CURRENT_BILL,
  ADD_ON_HOLD_BILL,
  RESET_CURRENT_BILL,
  UPDATE_CURRENT_BILL_TYPE,
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

// export const createBill = (bill, jwt) => (dispatch) => {
//   dispatch({
//     type: CREATE_BILL_BEGIN,
//   });
//   fetch("http://localhost:8080/groceryBills", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${jwt}`,
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify(bill),
//   })
//     .then((res) => {
//       switch (res.status) {
//         case 201:
//           return res.json();
//         default:
//           return null;
//       }
//     })
//     .then((data) => {
//       switch (data) {
//         case null:
//           dispatch({
//             type: CREATE_BILL_FAILED,
//           });
//           break;
//         default:
//           dispatch({
//             type: CREATE_BILL_SUCCESS,
//           });
//           break;
//       }
//     })
//     .catch((error) => {
//       dispatch({
//         type: CREATE_BILL_FAILED,
//       });
//     });
// };

export const addOnHoldBill = (id) => (dispatch) => {
  dispatch({
    type: ADD_ON_HOLD_BILL,
    payload: id,
  });
};

export const updateCurrentBill = (items, clerk) => (dispatch) => {
  dispatch({
    type: UPDATE_CURRENT_BILL,
    payload: {
      items: items,
      clerk: clerk,
    },
  });
};

export const updateCurrentBillType = (type) => (dispatch) => {
  dispatch({
    type: UPDATE_CURRENT_BILL_TYPE,
    payload: type,
  });
};

export const changeCurrentBill = (currentBill, onHoldBills) => (dispatch) => {
  dispatch({
    type: CHANGE_CURRENT_BILL,
    payload: {
      currentBill: currentBill,
      onHoldBills: onHoldBills,
    },
  });
};

export const resetCurrentBill = () => (dispatch) => {
  dispatch({
    type: RESET_CURRENT_BILL,
  });
};

export const resetBillStates = () => (dispatch) => {
  dispatch({
    type: RESET_BILL_STATES,
  });
};
