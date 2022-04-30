import React from "react";
import { connect } from "react-redux";
import {
  updateItemOnCurrentBill,
  removeItemOnCurrentBill,
} from "../../../actions/billActions";
import classes from "./ClerkBillItem.module.css";

const ClerkBillItem = ({
  billItem,
  updateItemOnCurrentBill,
  removeItemOnCurrentBill,
}) => {
  const removeItemHandler = () => {
    removeItemOnCurrentBill(billItem);
  };

  const addItemCount = () => {
    updateItemOnCurrentBill({
      ...billItem,
      amount: parseInt(billItem.amount + 1),
    });
  };

  const subtractItemCount = () => {
    if (billItem.amount > 0) {
      updateItemOnCurrentBill({
        ...billItem,
        amount: parseInt(billItem.amount - 1),
      });
    } else {
      updateItemOnCurrentBill({
        ...billItem,
        amount: parseInt(0),
      });
    }
  };

  const itemCountChangeHandler = (e) => {
    updateItemOnCurrentBill({
      ...billItem,
      amount: parseInt(e.target.value),
    });
  };

  return (
    <>
      <div
        className={`card position-relative pe-2 mb-2 ${classes["bill-item"]}`}
      >
        <div className="card-body d-flex align-items-center">
          <div className="d-flex flex-column flex-grow-1">
            <h5 className="card-title">{billItem.name}</h5>
            <p className="card-text">@ $ {billItem.price} / pc</p>
            <p className="card-text">= $ {billItem.amount * billItem.price}</p>
          </div>
          <div className="d-flex flex-column align-items-center">
            <i className="bi bi-caret-up-fill fs-5" onClick={addItemCount}></i>
            <input
              type="text"
              className="text-center"
              style={{ width: "2rem" }}
              value={billItem.amount}
              onChange={itemCountChangeHandler}
            />
            <i
              className="bi bi-caret-down-fill fs-5"
              onClick={subtractItemCount}
            ></i>
          </div>
        </div>
        <button
          type="button"
          className="btn-close position-absolute top-0 end-0"
          aria-label="Close"
          onClick={removeItemHandler}
        ></button>
      </div>
    </>
  );
};

export default connect(null, {
  updateItemOnCurrentBill,
  removeItemOnCurrentBill,
})(ClerkBillItem);
