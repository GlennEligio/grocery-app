import React, { useState } from "react";
import { connect } from "react-redux";
import {
  createBillBegin,
  createBillSuccess,
  createBillFail,
} from "../../actions/billActions";

const CheckoutBillModal = ({
  user,
  loading,
  error,
  currentBill,
  createBillBegin,
  createBillSuccess,
  createBillFail,
}) => {
  const [status, setStatus] = useState(false);
  const checkout = () => {
    if (currentBill.itemList.length === 0) {
      alert("Current bill doesn't contain any item");
      return;
    }
    var itemList = [];
    currentBill.itemList.forEach((item) => {
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
    };

    createBillBegin();

    fetch("http://localhost:8080/api/v1/bills", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.jwt}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(bill),
    })
      .then((res) => {
        switch (res.status) {
          case 201:
            return res.json();
          default:
            return null;
        }
      })
      .then((data) => {
        switch (data) {
          case null:
            createBillFail();
            break;
          default:
            createBillSuccess();
            setStatus(true);
            break;
        }
      })
      .catch((error) => {
        createBillFail();
      });
  };

  return (
    <div
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
                <strong className="ms-2">Something went wrong....</strong>
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
  error: state.bill.error,
  loading: state.bill.loading,
});

export default connect(mapStateToProps, {
  createBillBegin,
  createBillSuccess,
  createBillFail,
})(CheckoutBillModal);
