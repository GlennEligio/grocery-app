import React from "react";
import { connect } from "react-redux";
import { resetCurrentBill } from "../actions/billActions";
const ClerkBillButtons = ({ resetCurrentBill }) => {
  return (
    <div className="row mt-3 gx-1 gy-1 text-center">
      <div className="col-4">
        <button
          onClick={() => resetCurrentBill()}
          className="btn btn-outline-dark d-flex justify-content-center align-items-center w-100"
        >
          <i className="bi bi-x fs-3"></i>
          <span className="ms-1 fs-5">Cancel</span>
        </button>
      </div>
      <div className="col-4">
        <button
          className="btn btn-outline-primary d-flex justify-content-center align-items-center w-100"
          data-bs-toggle="modal"
          data-bs-target="#holdBillModal"
        >
          <i className="bi bi-hourglass fs-3"></i>
          <span className="ms-1 fs-5">Hold</span>
        </button>
      </div>
      <div className="col-4">
        <button
          className="btn btn-outline-success d-flex justify-content-center align-items-center w-100"
          data-bs-toggle="modal"
          data-bs-target="#checkoutBillModal"
        >
          <i className="bi bi-clipboard-check fs-3"></i>
          <span className="ms-1 fs-5">Checkout</span>
        </button>
      </div>
    </div>
  );
};

export default connect(null, {
  resetCurrentBill,
})(ClerkBillButtons);
