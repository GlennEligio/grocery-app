import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateItemOnCurrentBill } from "../actions/billActions";

const ClerkBillItem = ({ billItem, updateItemOnCurrentBill }) => {
  const [amount, setAmount] = useState(billItem.amount);

  useEffect(() => {
    updateItemOnCurrentBill({ ...billItem, amount: parseInt(amount) });
  }, [amount, billItem, updateItemOnCurrentBill]);

  return (
    <li className="list-group-item">
      <div className="row gx-0">
        <div className="col-6 d-flex flex-column justify-content-start text-truncate">
          <strong className="my-auto">{billItem.name}</strong>

          <p className="ms-2">{`@ $${billItem.price}`}</p>
        </div>
        <div className="col-4 d-flex align-items-start">
          <div className="input-group">
            <button
              onClick={() => {
                setAmount(parseInt(amount) === 0 ? 0 : parseInt(amount) - 1);
              }}
              className="btn btn-outline-danger"
            >
              <strong>-</strong>
            </button>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="form-control"
              aria-label="Amount (to the nearest dollar)"
              required
            />
            <button
              onClick={() => {
                setAmount(parseInt(amount) + 1);
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
      </div>
    </li>
  );
};

export default connect(null, { updateItemOnCurrentBill })(ClerkBillItem);