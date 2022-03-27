import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { resetCurrentBill } from "../../actions/billActions";
import BillService from "../../api/BillService";
import billTotal from "../../util/billTotal";

const CheckoutBillModal = ({ user, currentBill, resetCurrentBill }) => {
  const [status, setStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const modal = useRef();

  useEffect(() => {
    if (modal.current !== undefined) {
      modal.current.addEventListener("hidden.bs.modal", function () {
        setLoading(false);
        setError(false);
        setStatus(false);
      });
    }
  }, [modal]);

  const checkout = () => {
    setLoading(false);
    setError(false);
    setStatus(false);

    if (currentBill.itemList.length <= 0) {
      setErrorMessage("Current bill doesn't contain any item");
      setError(true);
      return;
    }

    let total = billTotal(
      currentBill,
      currentBill.type === "regular" ? true : false
    );

    if (total <= 0) {
      setErrorMessage("Current bill must have at least one item");
      setError(true);
      return;
    }

    if (currentBill.payment < total) {
      setErrorMessage("Payment must be greater than total bill");
      setError(true);
      return;
    }

    var itemList = [];
    currentBill.itemList
      .filter((item) => item.amount >= 0)
      .forEach((item) => {
        for (let count = 0; count < item.amount; count++) {
          itemList.push({
            id: item.id,
            name: item.name,
            price: item.price,
            discountPercentage: item.discountPercentage,
            discounted: item.discounted,
          });
        }
      });

    var bill = {
      itemList: itemList,
      shoppingClerk: user.username,
      type: currentBill.type,
      payment: currentBill.payment,
    };

    setLoading(true);

    BillService.createBill(user.jwt, bill)
      .then((res) => {
        switch (res.status) {
          case 201:
            setLoading(false);
            setStatus(true);
            resetCurrentBill();
            break;
          case 503:
            setLoading(false);
            setErrorMessage("Service Unavailable");
            setError(true);
            break;
          default:
            setLoading(false);
            setErrorMessage("Something went wrong");
            setError(true);
        }
      })
      .catch(() => {
        setLoading(false);
        setErrorMessage("Something went wrong");
        setError(true);
      });
  };

  return (
    <div
      ref={modal}
      className="modal fade"
      id="checkoutBillModal"
      tabIndex="-1"
      aria-labelledby="checkoutBillModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="checkoutBillModalLabel">
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
            {loading && (
              <div className="hstack align-items-center justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Checking out...</span>
                </div>
                <strong className="ms-2">Checking out...</strong>
              </div>
            )}
            {error && (
              <div className="hstack align-items-center justify-content-center text-danger">
                <i className="bi bi-x-circle-fill fs-3"></i>
                <strong className="ms-2">{errorMessage}</strong>
              </div>
            )}
            {status && (
              <div className="hstack align-items-center justify-content-center text-success">
                <i className="bi bi-check-circle-fill fs-3"></i>
                <strong className="ms-2">Checkout Success</strong>
              </div>
            )}

            <p className="lead">
              Bill type:{" "}
              {currentBill.type === "regular" ? "Regular" : "Discounted"}
            </p>
            <p className="lead">Payment: $ {currentBill.payment}</p>
            <table className="table table-sm table-striped text-centered">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Each</th>
                  <th scope="col">Discount %</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {currentBill.itemList.map((billItem, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{billItem.id}</th>
                      <td>{billItem.name}</td>
                      <td>{billItem.amount}</td>
                      <td>${billItem.price}</td>
                      <td>{billItem.discountPercentage * 100}%</td>
                      <td>
                        {`$ ${
                          currentBill.type === "regular"
                            ? parseFloat(
                                billItem.amount * billItem.price
                              ).toFixed(2)
                            : parseFloat(
                                billItem.amount *
                                  billItem.price *
                                  billItem.discountPercentage
                              ).toFixed(2)
                        }`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button className="btn btn-dark" data-bs-dismiss="modal">
              Close
            </button>
            <button onClick={checkout} className="btn btn-primary">
              <i className="bi bi-clipboard-check"></i>
              <strong className="ms-2">Checkout</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  currentBill: state.bill.currentBill,
});

export default connect(mapStateToProps, {
  resetCurrentBill,
})(CheckoutBillModal);
