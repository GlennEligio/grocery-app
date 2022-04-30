import React, { useEffect, useRef, useState } from "react";
import { addOnHoldBill } from "../../../actions/billActions";
import { connect } from "react-redux";
import billTotal from "../../../util/billTotal";

const OnHoldBillModal = ({ currentBill, onHoldBills, addOnHoldBill }) => {
  const [id, setId] = useState(currentBill.id);
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState();
  const form = useRef();
  const modal = useRef();

  useEffect(() => {
    if (modal.current !== undefined) {
      modal.current.addEventListener("hidden.bs.modal", function (e) {
        setStatus(null);
      });
    }
  }, [currentBill, form]);

  const onSubmit = (e) => {
    e.preventDefault();
    setStatus(null);

    // Checks if currentBill have items
    if (billTotal(currentBill) === 0) {
      setStatus(false);
      setErrorMessage("No items inside the current bill");
      return;
    }
    if (!form.current.checkValidity()) {
      e.stopPropagation();
      form.current.classList.add("was-validated");
    } else {
      var idAlreadyExist = false;
      onHoldBills.forEach((bill) => {
        if (bill.id === id) {
          idAlreadyExist = true;
        }
      });
      if (idAlreadyExist) {
        setStatus(false);
        setErrorMessage("ID already exist");
        form.current.classList.remove("was-validated");
        return;
      } else {
        addOnHoldBill(id);
        form.current.classList.remove("was-validated");
        setStatus(true);
      }
    }
  };

  return (
    <div
      ref={modal}
      className="modal fade"
      id="holdBillModal"
      tabIndex="-1"
      aria-labelledby="holdBillModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="holdBillModalLabel">
              Bill Details
            </h5>
            <button
              type="button"
              className="btn btn-outline-dark"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
          <div className="modal-body">
            {!status && status !== null && (
              <div className="text-center mb-2 text-danger">
                <i className="bi bi-exclamation-circle-fill"></i>
                <strong className="ms-2">{errorMessage}</strong>
              </div>
            )}
            {status && (
              <div className="text-center mb-2 text-success">
                <i className="bi bi-check-circle-fill"></i>
                <strong className="ms-2">Add success</strong>
              </div>
            )}

            <form
              ref={form}
              noValidate={true}
              onSubmit={onSubmit}
              className="needs-validation"
            >
              <div className="form-floating">
                <input
                  type="text"
                  id="holdBillId"
                  name="holdBillId"
                  placeholder=""
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  required
                  className="form-control"
                />
                <label htmlFor="holdBillId">Hold Bill Id</label>
                <div className="invalid-feedback text-center">Required.</div>
              </div>
              <div className="mt-4 hstack justify-content-end">
                <button
                  type="button"
                  className="btn btn-dark"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary ms-3">
                  <i className="bi bi-hourglass"></i>
                  <strong>Hold</strong>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentBill: state.bill.currentBill,
  onHoldBills: state.bill.onHoldBills,
});

export default connect(mapStateToProps, { addOnHoldBill })(OnHoldBillModal);
