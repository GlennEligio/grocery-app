import React, { useCallback, useEffect, useState } from "react";
import AdminBill from "./AdminBill";
import { connect } from "react-redux";
import {
  fetchBillsBegin,
  fetchBillsSuccess,
  fetchBillsFailed,
  resetBillList,
} from "../actions/billActions";
import BillService from "../api/BillService";
import Pagination from "./Pagination";
import fileDownload from "js-file-download";

const AdminBillSection = ({
  billHistory,
  loading,
  error,
  user,
  fetchBillsBegin,
  fetchBillsSuccess,
  fetchBillsFailed,
  refreshToken,
}) => {
  const [queryType, setQueryType] = useState("billId_query");
  const [queryValue, setQueryValue] = useState("");
  const [sort, setSort] = useState("asc");
  const [field, setField] = useState("billId");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const fetchBills = useCallback((queryType, queryValue) => {
    fetchBillsBegin();
    BillService.fetchBillsWithQueryPagingSorting(
      user.jwt,
      queryType,
      queryValue,
      currentPage,
      pageSize,
      sort,
      field
    )
      .then((res) => {
        switch (res.status) {
          case 200:
            return res.json();
          case 403:
            refreshToken();
            break;
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
            setCurrentPage(data.number + 1);
            setTotalPages(data.totalPages);
            fetchBillsSuccess(data.content);
            break;
        }
      })
      .catch(() => fetchBillsFailed());
  });

  useEffect(() => {
    if (user.role !== "ROLE_CLERK") {
      fetchBills(queryType, queryValue);
    }
  }, [user.jwt, currentPage, sort, field]);

  return (
    <div
      className="col tab-pane fade show h-100"
      id="pills-adminBill"
      role="tabpanel"
      aria-labelledby="pills-adminBill-tab"
    >
      <div className="input-group">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {queryType === "billId_query" ? "Bill ID" : "Shopping Clerk"}:
        </button>
        <ul className="dropdown-menu">
          <li>
            <a
              className="dropdown-item"
              onClick={() => setQueryType("billId_query")}
            >
              Bill ID
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              onClick={() => setQueryType("username_query")}
            >
              Shopping Clerk
            </a>
          </li>
        </ul>
        <input
          type="text"
          id="query"
          name="query"
          value={queryValue}
          onChange={(e) => setQueryValue(e.target.value)}
          className="form-control"
        />
        <button
          onClick={() => fetchBills(queryType, queryValue)}
          className="btn btn-secondary"
        >
          <i className="bi bi-search"></i>
        </button>
        <button
          onClick={() =>
            BillService.download(user.jwt)
              .then((res) => res.blob())
              .then((data) => fileDownload(data, "bills.xlsx"))
              .catch((error) => console.log(error))
          }
          className="btn btn-success"
        >
          <i className="bi bi-download"></i>
        </button>
        <button
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#uploadBillModal"
        >
          <i className="bi bi-upload"></i>
        </button>
        <button
          onClick={() => {
            if (queryValue !== "") setQueryValue("");
            if (currentPage !== 1) setCurrentPage(1);
            if (pageSize !== 20) setPageSize(20);
            if (queryType !== "billId_query") setQueryType("billId_query");
            if (sort !== "asc") setSort("asc");
            if (field !== "id") setField("id");
            fetchBills("billId_query", "");
          }}
          className="btn btn-dark"
        >
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>
      <div className="mt-3">
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
      </div>
      {!loading && !error && (
        <div className="d-flex flex-column h-100 justify-content-between">
          <div className="overflow-auto">
            <table className="table table-sm table-hover text-center border-radius-2 border-collapse w-100">
              <thead className="table-dark">
                <tr>
                  <th
                    onClick={() => {
                      if (field !== "billId") {
                        setField("billId");
                        setSort("asc");
                        return;
                      } else {
                        if (sort === "asc") setSort("desc");
                        if (sort === "desc") setSort("asc");
                      }
                    }}
                    scope="col"
                    className="w-20"
                  >
                    <span className="me-2">Bill ID</span>
                    {field === "billId" && (
                      <span>
                        {sort === "asc" ? (
                          <i className="bi bi-caret-up-fill"></i>
                        ) : (
                          <i className="bi bi-caret-down-fill"></i>
                        )}
                      </span>
                    )}
                  </th>
                  <th scope="col" className="w-10">
                    Item count
                  </th>
                  <th
                    onClick={() => {
                      if (field !== "shoppingClerk.username") {
                        setField("shoppingClerk.username");
                        setSort("asc");
                        return;
                      } else {
                        if (sort === "asc") setSort("desc");
                        if (sort === "desc") setSort("asc");
                      }
                    }}
                    scope="col"
                    className="w-20"
                  >
                    <span className="me-2">Id</span>
                    {field === "shoppingClerk.username" && (
                      <span>
                        {sort === "asc" ? (
                          <i className="bi bi-caret-up-fill"></i>
                        ) : (
                          <i className="bi bi-caret-down-fill"></i>
                        )}
                      </span>
                    )}
                  </th>
                  <th
                    onClick={() => {
                      if (field !== "dateCreated") {
                        setField("dateCreated");
                        setSort("asc");
                        return;
                      } else {
                        if (sort === "asc") setSort("desc");
                        if (sort === "desc") setSort("asc");
                      }
                    }}
                    scope="col"
                  >
                    <span className="me-2">Date</span>
                    {field === "dateCreated" && (
                      <span>
                        {sort === "asc" ? (
                          <i className="bi bi-caret-up-fill"></i>
                        ) : (
                          <i className="bi bi-caret-down-fill"></i>
                        )}
                      </span>
                    )}
                  </th>
                  <th scope="col" className="w-10">
                    Type
                  </th>
                  <th
                    onClick={() => {
                      if (field !== "totalBill") {
                        setField("totalBill");
                        setSort("asc");
                        return;
                      } else {
                        if (sort === "asc") setSort("desc");
                        if (sort === "desc") setSort("asc");
                      }
                    }}
                    scope="col"
                    className="w-10"
                  >
                    <span className="me-2">Total Bill</span>
                    {field === "totalBill" && (
                      <span>
                        {sort === "asc" ? (
                          <i className="bi bi-caret-up-fill"></i>
                        ) : (
                          <i className="bi bi-caret-down-fill"></i>
                        )}
                      </span>
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {billHistory.map((bill, index) => {
                  return <AdminBill key={index} bill={bill} />;
                })}
              </tbody>
            </table>
          </div>
          <div className="flex-shrink-1">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              setCurrentPage={setCurrentPage}
              setPageSize={setPageSize}
            />
          </div>
        </div>
      )}
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
  resetBillList,
})(AdminBillSection);
