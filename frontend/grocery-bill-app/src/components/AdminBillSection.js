import React, { useEffect, useState } from "react";
import AdminBill from "./AdminBill";
import { connect } from "react-redux";
import {
  fetchBillsBegin,
  fetchBillsSuccess,
  fetchBillsFailed,
} from "../actions/billActions";

const AdminBillSection = ({
  billHistory,
  loading,
  error,
  user,
  fetchBillsBegin,
  fetchBillsSuccess,
  fetchBillsFailed,
}) => {
  useEffect(() => {
    fetchBills();
  }, [billHistory.length, user]);

  const fetchBills = () => {
    fetchBillsBegin();
    fetch("http://localhost:8080/api/v1/bills/summary", {
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
            fetchBillsFailed();
            break;
          default:
            fetchBillsSuccess(data);
            break;
        }
      })
      .catch(() => fetchBillsFailed());
  };

  const [query, setQuery] = useState("");

  return (
    <div
      className="col tab-pane fade show"
      id="pills-adminBill"
      role="tabpanel"
      aria-labelledby="pills-adminBill-tab"
    >
      <div className="input-group">
        <input
          type="text"
          id="query"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="form-control"
        />
        <button className="btn btn-outline-secondary">
          <i className="bi bi-search"></i>
        </button>
        <button onClick={() => fetchBills()} className="btn btn-outline-dark">
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>
      {loading && (
        <div className="hstack align-items-center justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Fetching bills...</span>
          </div>
          <strong className="ms-2">Fetching bills...</strong>
        </div>
      )}
      {error && (
        <div className="hstack align-items-center justify-content-center text-danger">
          <i className="bi bi-x-circle-fill fs-3"></i>
          <strong className="ms-2">Something went wrong....</strong>
        </div>
      )}
      <table className="table table-sm table-hover mt-3 text-center border-radius-2 border-collapse w-100">
        <thead className="table-dark">
          <tr>
            <th scope="col" className="w-20">
              Id
            </th>
            <th scope="col" className="w-10">
              Item count
            </th>
            <th scope="col" className="w-20">
              Clerk
            </th>
            <th scope="col">Date</th>
            <th scope="col" className="w-10">
              Type
            </th>
            <th scope="col" className="w-10">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {billHistory.length > 0 &&
            billHistory
              .filter((bill) => bill.id.toString().includes(query.toString()))
              .sort()
              .map((bill, index) => {
                return <AdminBill key={index} bill={bill} />;
              })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  billHistory: state.bill.billHistory,
  error: state.items.error,
  loading: state.items.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  fetchBillsBegin,
  fetchBillsSuccess,
  fetchBillsFailed,
})(AdminBillSection);
