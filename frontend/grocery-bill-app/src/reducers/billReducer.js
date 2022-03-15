import {
  CREATE_BILL_BEGIN,
  CREATE_BILL_FAILED,
  CREATE_BILL_SUCCESS,
  RESET_BILL_STATES,
  CHANGE_CURRENT_BILL,
  RESET_CURRENT_BILL,
  ADD_ON_HOLD_BILL,
  UPDATE_CURRENT_BILL_TYPE,
  FETCH_BILLS_BEGIN,
  FETCH_BILLS_SUCCESS,
  FETCH_BILLS_FAILED,
  UPDATE_BILL_SELECTED,
  ADD_ITEM_ON_CURRENT_BILL,
  UPDATE_ITEM_IN_CURRENT_BILL,
  RESET_BILL_LIST,
} from "../actions/types";

const initialState = {
  billHistory: [],
  onHoldBills: [],
  currentBill: {
    itemList: [],
    id: "",
    type: "regular",
  },
  billSelected: {},
  loading: false,
  error: false,
};

const billReducer = function (state = initialState, action) {
  switch (action.type) {
    case FETCH_BILLS_BEGIN:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_BILLS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        billHistory: action.payload,
      };
    }
    case FETCH_BILLS_FAILED: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case CREATE_BILL_BEGIN:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case CREATE_BILL_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
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
    case ADD_ITEM_ON_CURRENT_BILL:
      var isInCurrentBill = false;
      state.currentBill.itemList.forEach((item) => {
        if (item.id === action.payload.id) {
          isInCurrentBill = true;
        }
      });
      if (!isInCurrentBill) {
        return {
          ...state,
          currentBill: {
            ...state.currentBill,
            itemList: [...state.currentBill.itemList, action.payload],
          },
        };
      } else {
        return state;
      }
    case UPDATE_ITEM_IN_CURRENT_BILL:
      return {
        ...state,
        currentBill: {
          ...state.currentBill,
          itemList: state.currentBill.itemList.map((item) => {
            if (item.id === action.payload.id) {
              return action.payload;
            }
            return item;
          }),
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
      const newOnHoldBill = state.onHoldBills.filter(
        (bill) => bill.id !== action.payload.id
      );
      return {
        ...state,
        onHoldBills: newOnHoldBill,
        currentBill: action.payload,
      };
    case RESET_CURRENT_BILL:
      return {
        ...state,
        currentBill: {
          ...state.currentBill,
          itemList: [],
        },
      };
    case RESET_BILL_LIST:
      return {
        ...state,
        billHistory: [],
      };
    case RESET_BILL_STATES:
      return {
        billHistory: [],
        onHoldBills: [],
        currentBill: {
          itemList: [],
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
