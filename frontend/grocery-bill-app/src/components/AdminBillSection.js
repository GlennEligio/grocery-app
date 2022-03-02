import React, { useEffect, useState } from "react";
import { FaTimesCircle, FaSpinner } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import AdminBill from "./AdminBill";
import { connect } from "react-redux";
import { fetchBills } from "../actions/billActions";
import { setModalComponent } from "../actions/componentActions";

const AdminBillSection = ({ billHistory, loading, error, jwt, fetchBills }) => {
  useEffect(() => {
    fetchBills(jwt);
  }, [billHistory.length]);

  const [query, setQuery] = useState("");

  return (
    <div className="admin-home-bills">
      <div className="admin-home-bills search-bar">
        <input
          type="text"
          value={query}
          placeholder="Search bill here"
          onChange={(e) => setQuery(e.target.value)}
        />
        <FaTimesCircle className="interactable" onClick={() => setQuery("")} />
        <MdRefresh className="interactable" onClick={() => fetchBills(jwt)} />
      </div>
      <div className="admin-home-bills table header">
        {loading && (
          <div className="form-control-loading">
            <div>
              <FaSpinner className="loading-logo" />
            </div>
            <label>Retrieving Bill History</label>
          </div>
        )}
        {error && (
          <div className="form-control-error">
            <FaTimesCircle />
            <label>Something went wrong.</label>
          </div>
        )}
        {!error && !loading && (
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Item count</th>
                <th>Clerk</th>
                <th>Date</th>
                <th>Type</th>
                <th>Total</th>
              </tr>
            </thead>
          </table>
        )}
      </div>
      <div className="admin-home-bills table body">
        {!error && !loading && (
          <table className="table">
            <tbody>
              {billHistory.length > 0 &&
                billHistory
                  .filter((bill) => bill.id.toString().includes(query))
                  .map((bill, index) => {
                    return <AdminBill key={index} bill={bill} />;
                  })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  billHistory: state.bill.billHistory,
  error: state.items.error,
  loading: state.items.loading,
  jwt: state.auth.jwt,
});

export default connect(mapStateToProps, { fetchBills, setModalComponent })(
  AdminBillSection
);
