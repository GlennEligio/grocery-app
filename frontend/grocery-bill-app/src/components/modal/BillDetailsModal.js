import React, { useLayoutEffect, useState } from "react";
import { connect } from "react-redux";
import billConverter from "../../util/billConverter";

const BillDetailsModal = ({ user, billSelected }) => {
  const [bill, setBill] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    if (billSelected.id === -1) {
      return;
    }
    fetch(`http://localhost:8080/api/v1/bills/${billSelected.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.jwt}`,
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
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [billSelected, user.jwt]);

  return (
    <div
      className="modal fade"
      id="billDetailsModal"
      tabIndex="-1"
      aria-labelledby="billDetailsModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="billDetailsModalLabel">
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
              <div className="d-flex align-items-center justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <strong className="ms-2">Fetching Bill Details</strong>
              </div>
            )}
            {error && (
              <div className="d-flex align-items-center justify-content-center text-danger">
                <i className="bi bi-x-circle-fill fs-4"></i>
                <strong className="ms-2">Something went wrong...</strong>
              </div>
            )}
            <table className="table table-sm text-center">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col" className="w-20 text-truncate">
                    Name
                  </th>
                  <th scope="col" className="w-10">
                    Qty
                  </th>
                  <th scope="col" className="w-10">
                    Each
                  </th>
                  <th scope="col" className="w-25">
                    Discount
                  </th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {bill !== null &&
                  bill.itemList.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.amount}</td>
                        <td>{`$${item.price}`}</td>
                        <td>{`${item.discountPercentage * 100}%`}</td>
                        <td>
                          $
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
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  billSelected: state.bill.billSelected,
});

export default connect(mapStateToProps, {})(BillDetailsModal);
