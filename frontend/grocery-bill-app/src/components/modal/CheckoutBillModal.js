import React from "react";
import { FaTimesCircle, FaSpinner } from "react-icons/fa";
import { connect } from "react-redux";
import {
  createBillBegin,
  createBillSuccess,
  createBillFail,
} from "../../actions/billActions";

const CheckoutBillModal = ({
  jwt,
  loading,
  error,
  currentBill,
  createBillBegin,
  createBillSuccess,
  createBillFail,
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
          discounted: item.discounted,
        });
      }
    });

    var bill = {
      itemList: itemList,
      shoppingClerk: currentBill.shoppingClerk,
      type: currentBill.type,
    };

    createBillBegin();

    fetch("http://localhost:8080/groceryBills", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
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
            document.getElementById("modal-id").style.display = "none";
            break;
        }
      })
      .catch((error) => {
        createBillFail();
      });

    // createBill(
    //   {
    //     itemList: itemList,
    //     shoppingClerk: currentBill.shoppingClerk,
    //     type: currentBill.type,
    //   },
    //   jwt
    // );

    // if (!loading && !error) {
    //   document.getElementById("modal-id").style.display = "none";
    // }
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
          {/* <div className="form-control-prompt">
            <label>Are you sure?</label>
          </div> */}
          <div className="form-control">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Each</th>
                  <th>Discount %</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {currentBill.itemList.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.amount}</td>
                      <td>{item.price}</td>
                      <td>{item.discountPercentage}</td>
                      <td>
                        {currentBill.type === "regular"
                          ? item.amount * item.price
                          : item.amount *
                            item.price *
                            (1 - item.discountPercentage)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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

export default connect(mapStateToProps, {
  createBillBegin,
  createBillSuccess,
  createBillFail,
})(CheckoutBillModal);
