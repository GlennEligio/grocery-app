import React, { useEffect, useState } from "react";
import { FaTimesCircle, FaSpinner } from "react-icons/fa";
import { connect } from "react-redux";
import billConverter from "../util/billConverter";

const BillDetailsModal = ({ jwt, billSelected }) => {
  const [bill, setBill] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/bills/${billSelected.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        switch (res.status) {
          case 200:
            return res.json();
          default:
            return null;
        }
      })
      .then((data) => {
        switch (data) {
          case null:
            setError(true);
            setLoading(false);
            break;
          default:
            setError(false);
            setLoading(false);
            setBill(billConverter(data));
            break;
        }
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, [billSelected]);

  return (
    <>
      <div className="modal-title">
        <h3>Bill Details</h3>
      </div>
      <div className="modal-body">
        <form className="form">
          {loading && (
            <div className="form-control-loading">
              <div>
                <FaSpinner className="loading-logo" />
              </div>
              <label>Fetching Bill details...</label>
            </div>
          )}
          {error && (
            <div className="form-control-error">
              <FaTimesCircle />
              <label>Something went wrong. Please try again later</label>
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
                {bill.itemList &&
                  bill.itemList.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.amount}</td>
                        <td>{item.price}</td>
                        <td>{item.discountPercentage}</td>
                        <td>
                          {bill.type === "regular"
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
  billSelected: state.bill.billSelected,
});

export default connect(mapStateToProps, {})(BillDetailsModal);
