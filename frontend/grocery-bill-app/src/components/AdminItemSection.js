import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchItemsBegin,
  fetchItemsSuccess,
  fetchItemsFailed,
  resetItemList,
} from "../actions/itemActions";
import AdminItem from "./AdminItem";

const AdminItemSection = ({
  items,
  loading,
  error,
  user,
  fetchItemsBegin,
  fetchItemsSuccess,
  fetchItemsFailed,
  resetItemList,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchItemsBegin();
    fetch("http://localhost:8080/api/v1/items", {
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
            fetchItemsFailed();
            break;
          default:
            fetchItemsSuccess(data);
            break;
        }
      })
      .catch(() => {
        fetchItemsFailed();
      });
  }, [items.length, user.jwt]);

  return (
    <div
      className="col tab-pane fade show"
      id="pills-adminItem"
      role="tabpanel"
      aria-labelledby="pills-adminItem-tab"
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
        <button className="btn btn-outline-primary">
          <i
            className="bi bi-plus-lg"
            data-bs-toggle="modal"
            data-bs-target="#addItemModal"
          ></i>
        </button>
        <button
          className="btn btn-outline-dark"
          onClick={() => resetItemList()}
        >
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>
      <div className="mt-3">
        {loading && (
          <div className="hstack align-items-center justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Fetching items...</span>
            </div>
            <strong className="ms-2">Fetching items...</strong>
          </div>
        )}
        {error && (
          <div className="hstack align-items-center justify-content-center text-danger">
            <i className="bi bi-x-circle-fill fs-3"></i>
            <strong className="ms-2">Something went wrong....</strong>
          </div>
        )}
      </div>
      <table className="table table-sm table-hover mt-3 text-center border-radius-2 border-collapse w-100">
        <thead className="table-dark">
          <tr>
            <th scope="col" className="w-20">
              Id
            </th>
            <th scope="col" className="w-20">
              Name
            </th>
            <th scope="col">Discount %</th>
            <th scope="col">Discounted?</th>
            <th scope="col" className="w-20">
              Price
            </th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items
            .filter((item) => item.id.toString().includes(query.toString()))
            .sort()
            .map((item, index) => {
              return <AdminItem key={index} item={item} />;
            })}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.items.items,
  error: state.items.error,
  loading: state.items.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  fetchItemsBegin,
  fetchItemsSuccess,
  fetchItemsFailed,
  resetItemList,
})(AdminItemSection);
