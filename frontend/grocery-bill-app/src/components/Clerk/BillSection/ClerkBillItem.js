import React from "react";
import { connect } from "react-redux";
import {
  updateItemOnCurrentBill,
  removeItemOnCurrentBill,
} from "../../../actions/billActions";

const ClerkBillItem = ({
  billItem,
  updateItemOnCurrentBill,
  removeItemOnCurrentBill,
}) => {
  const removeItem = () => {
    removeItemOnCurrentBill(billItem);
  };

  return (
    <li className="list-group-item clerk-bill-item">
      <div className="row gx-0">
        <div className="col-5 d-flex flex-column justify-content-start text-truncate">
          <strong className="my-auto">{billItem.name}</strong>

          <p className="ms-2">{`@ $${billItem.price}`}</p>
        </div>
        <div className="col-4 d-flex align-items-start">
          <div className="input-group">
            <button
              onClick={() => {
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
              }}
              className="btn btn-outline-danger"
            >
              <strong>-</strong>
            </button>
            <input
              type="text"
              value={billItem.amount}
              onChange={(e) => {
                updateItemOnCurrentBill({
                  ...billItem,
                  amount: parseInt(e.target.value),
                });
              }}
              className="form-control"
              aria-label="Amount (to the nearest dollar)"
              required
            />
            <button
              onClick={() => {
                updateItemOnCurrentBill({
                  ...billItem,
                  amount: parseInt(billItem.amount + 1),
                });
              }}
              className="btn btn-outline-primary"
            >
              <strong>+</strong>
            </button>
          </div>
        </div>
        <div className="col-2 d-flex justify-content-center align-items-start">
          <p>{`$ ${billItem.amount * billItem.price}`}</p>
        </div>
        <div className="col-1 d-flex justify-content-center align-items-start">
          <i
            onClick={removeItem}
            className="bi bi-x-circle fs-3 text-danger"
          ></i>
        </div>
      </div>
    </li>
  );
};

export default connect(null, {
  updateItemOnCurrentBill,
  removeItemOnCurrentBill,
})(ClerkBillItem);
