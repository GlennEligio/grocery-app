import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import billTotal from "../util/billTotal";
import { updateCurrentBillPayment } from "../actions/billActions";

const ClerkCalculatorSection = ({ currentBill, updateCurrentBillPayment }) => {
  const [payment, setPayment] = useState(0);
  const [totatBill, setTotalBill] = useState(0);
  const [totalBillDiscounted, setTotalBillDiscounted] = useState(0);

  useEffect(() => {
    if (currentBill !== undefined) {
      setTotalBill(billTotal(currentBill, false));
      setTotalBillDiscounted(billTotal(currentBill, true));
      setPayment(currentBill.payment);
    }
  }, [currentBill.payment, currentBill.itemList]);

  return (
    <div className="card h-50 d-flex flex-column justify-content-between">
      <div className="row">
        <div className="col">
          <div className="input-group">
            <span className="input-group-text btn btn-secondary">
              <i className="bi bi-currency-dollar fs-4"></i>
            </span>
            <input
              type="number"
              name="payment"
              id="payment"
              value={payment && payment.toFixed(2)}
              onChange={(e) =>
                updateCurrentBillPayment(parseFloat(e.target.value))
              }
              className="form-control text-end fs-4"
            />
            <button
              onClick={() => updateCurrentBillPayment(0)}
              className="btn btn-secondary"
            >
              <i className="bi bi-x-circle-fill fs-5"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="row g-1 mt-1 flex-grow-1">
        <div className="col-3">
          <button
            onClick={() => updateCurrentBillPayment(payment * 10 + 7)}
            className="btn btn-outline-secondary w-100 h-100 fs-3"
          >
            7
          </button>
        </div>
        <div className="col-3">
          <button
            onClick={() => updateCurrentBillPayment(payment * 10 + 8)}
            className="btn btn-outline-secondary w-100 h-100 fs-3"
          >
            8
          </button>
        </div>
        <div className="col-3">
          <button
            onClick={() => updateCurrentBillPayment(payment * 10 + 9)}
            className="btn btn-outline-secondary w-100 h-100 fs-3"
          >
            9
          </button>
        </div>
        <div className="col-3">
          <button
            onClick={() => updateCurrentBillPayment(payment + 50)}
            className="btn btn-secondary w-100 h-100 fs-3"
          >
            $50
          </button>
        </div>
        <div className="col-3">
          <button
            onClick={() => updateCurrentBillPayment(payment * 10 + 4)}
            className="btn btn-outline-secondary w-100 h-100 fs-3"
          >
            4
          </button>
        </div>
        <div className="col-3">
          <button
            onClick={() => updateCurrentBillPayment(payment * 10 + 5)}
            className="btn btn-outline-primary w-100 h-100 fs-3"
          >
            5
          </button>
        </div>
        <div className="col-3">
          <button
            onClick={() => updateCurrentBillPayment(payment * 10 + 6)}
            className="btn btn-outline-secondary w-100 h-100 fs-3"
          >
            6
          </button>
        </div>
        <div className="col-3">
          <button
            onClick={() => updateCurrentBillPayment(payment + 100)}
            className="btn btn-secondary w-100 h-100 fs-3"
          >
            $100
          </button>
        </div>
        <div className="col-3">
          <button
            onClick={() => updateCurrentBillPayment(payment * 10 + 1)}
            className="btn btn-outline-secondary w-100 h-100 fs-3"
          >
            1
          </button>
        </div>
        <div className="col-3">
          <button
            onClick={() => updateCurrentBillPayment(payment * 10 + 2)}
            className="btn btn-outline-secondary w-100 h-100 fs-3"
          >
            2
          </button>
        </div>
        <div className="col-3">
          <button
            onClick={() => updateCurrentBillPayment(payment * 10 + 3)}
            className="btn btn-outline-secondary w-100 h-100 fs-3"
          >
            3
          </button>
        </div>
        <div className="col-3">
          <button
            onClick={() =>
              updateCurrentBillPayment(
                payment +
                  (currentBill && currentBill.type === "regular"
                    ? Math.ceil(totatBill)
                    : Math.ceil(totalBillDiscounted))
              )
            }
            className="btn btn-secondary w-100 h-100 fs-3"
          >
            $
            {currentBill && currentBill.type === "regular"
              ? Math.ceil(totatBill)
              : Math.ceil(totalBillDiscounted)}
          </button>
        </div>
        <div className="col-3">
          <button
            onClick={() => updateCurrentBillPayment(payment + 0.1)}
            className="btn btn-outline-secondary w-100 h-100 fs-3"
          >
            0.1
          </button>
        </div>
        <div className="col-3">
          <button
            onClick={() => updateCurrentBillPayment(payment * 10)}
            className="btn btn-outline-secondary w-100 h-100 fs-3"
          >
            0
          </button>
        </div>
        <div className="col-3">
          <button
            onClick={() => updateCurrentBillPayment(payment + 0.01)}
            className="btn btn-outline-secondary w-100 h-100 fs-3"
          >
            0.01
          </button>
        </div>
        <div className="col-3">
          <button
            onClick={() =>
              updateCurrentBillPayment(
                payment +
                  (currentBill && currentBill.type === "regular"
                    ? parseFloat(totatBill.toFixed(2))
                    : parseFloat(totalBillDiscounted.toFixed(2)))
              )
            }
            className="btn btn-dark w-100 h-100 fs-3"
          >
            $
            {currentBill && currentBill.type === "regular"
              ? totatBill.toFixed(2)
              : totalBillDiscounted.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentBill: state.bill.currentBill,
});

export default connect(mapStateToProps, { updateCurrentBillPayment })(
  ClerkCalculatorSection
);
