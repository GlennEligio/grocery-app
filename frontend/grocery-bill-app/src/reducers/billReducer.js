import {
  CREATE_BILL_BEGIN,
  CREATE_BILL_FAILED,
  CREATE_BILL_SUCCESS,
  RESET_BILL_STATES,
  UPDATE_CURRENT_BILL,
  CHANGE_CURRENT_BILL,
  RESET_CURRENT_BILL,
  ADD_ON_HOLD_BILL,
  UPDATE_CURRENT_BILL_TYPE,
  FETCH_BILLS_BEGIN,
  FETCH_BILLS_SUCCESS,
  FETCH_BILLS_FAILED,
  UPDATE_BILL_SELECTED,
} from "../actions/types";

const initialState = {
  billHistory: [],
  onHoldBills: [],
  currentBill: {
    itemList: [],
    shoppingClerk: {},
    id: "",
    type: "regular",
  },
  billSelected: {},
  loading: false,
  error: false,
  status: false,
};

const billReducer = function (state = initialState, action) {
  switch (action.type) {
    case FETCH_BILLS_BEGIN:
      return {
        ...state,
        loading: true,
        error: false,
        status: false,
      };
    case FETCH_BILLS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        status: true,
        billHistory: action.payload,
      };
    }
    case FETCH_BILLS_FAILED: {
      return {
        ...state,
        loading: false,
        error: true,
        status: false,
      };
    }
    case CREATE_BILL_BEGIN:
      return {
        ...state,
        loading: true,
        error: false,
        status: false,
      };
    case CREATE_BILL_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        status: true,
        currentBill: {
          ...state.currentBill,
          itemList: [],
        },
      };
    }
    case CREATE_BILL_FAILED: {
      return {
        ...state,
        loading: false,
        error: true,
        status: false,
      };
    }
    case ADD_ON_HOLD_BILL:
      return {
        ...state,
        onHoldBills: [
          ...state.onHoldBills,
          { ...state.currentBill, id: action.payload },
        ],
        currentBill: {
          ...state.currentBill,
          itemList: [],
          id: "",
          type: "regular",
        },
      };
    case UPDATE_CURRENT_BILL:
      return {
        ...state,
        currentBill: {
          ...state.currentBill,
          itemList: action.payload.items,
          shoppingClerk: action.payload.clerk,
        },
      };
    case UPDATE_CURRENT_BILL_TYPE:
      return {
        ...state,
        currentBill: {
          ...state.currentBill,
          type: action.payload,
        },
      };
    case UPDATE_BILL_SELECTED:
      return {
        ...state,
        billSelected: action.payload,
      };
    case CHANGE_CURRENT_BILL:
      return {
        ...state,
        onHoldBills: action.payload.onHoldBills,
        currentBill: action.payload.currentBill,
      };
    case RESET_CURRENT_BILL:
      return {
        ...state,
        currentBill: {
          ...state.currentBill,
          itemList: [],
        },
      };
    case RESET_BILL_STATES:
      return {
        billHistory: [],
        onHoldBills: [],
        currentBill: {
          itemList: [],
          shoppingClerk: {},
          id: "",
          type: "regular",
        },
        loading: false,
        error: false,
        status: false,
      };
    default:
      return state;
  }
};

export default billReducer;
