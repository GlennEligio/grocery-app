import React from "react";
import { FaTimesCircle, FaSpinner } from "react-icons/fa";
import { connect } from "react-redux";
import { createBill } from "../../actions/billActions";

const CheckoutBillModal = ({
  jwt,
  loading,
  error,
  currentBill,
  createBill,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();

    var itemList = [];
    currentBill.itemList.forEach((item) => {
      for (let count = 0; count < item.amount; count++) {
        itemList.push({
          id: item.id,
          name: item.name,
          price: item.price,
          discountPercentage: item.discountPercentage,
          isDiscounted: item.isDiscounted,
        });
      }
    });

    createBill(
      {
        itemList: itemList,
        shoppingClerk: currentBill.shoppingClerk,
        type: currentBill.type,
      },
      jwt
    );

    if (!loading && !error) {
      document.getElementById("modal-id").style.display = "none";
    }
  };

  return (
    <>
      <div className="modal-title">
        <h3>Checkout Bill</h3>
      </div>
      <div className="modal-body">
        <form className="form" onSubmit={onSubmit}>
          {loading && (
            <div className="form-control-loading">
              <div>
                <FaSpinner className="loading-logo" />
              </div>
              <label>Checking out Bill</label>
            </div>
          )}
          {error && (
            <div className="form-control-error">
              <FaTimesCircle />
              <label>Check out failed</label>
            </div>
          )}
          <div className="form-control-prompt">
            <label>Are you sure?</label>
          </div>
          <div className="form-control-prompt">
            <button className="btn" type="submit">
              Checkout
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  jwt: state.auth.jwt,
  currentBill: state.bill.currentBill,
  error: state.bill.error,
  loading: state.bill.loading,
});

export default connect(mapStateToProps, { createBill })(CheckoutBillModal);
