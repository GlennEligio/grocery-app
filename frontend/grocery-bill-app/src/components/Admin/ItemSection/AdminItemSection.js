import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchItemsBegin,
  fetchItemsSuccess,
  fetchItemsFailed,
  resetItemList,
} from "../../../actions/itemActions";
import AdminItem from "./AdminItem";
import ItemService from "../../../api/ItemService";
import Pagination from "../../UI/Navigation/Pagination";
import fileDownload from "js-file-download";

const AdminItemSection = ({
  items,
  loading,
  error,
  user,
  fetchItemsBegin,
  fetchItemsSuccess,
  fetchItemsFailed,
  refreshToken,
}) => {
  const [queryType, setQueryType] = useState("id_query");
  const [queryValue, setQueryValue] = useState("");
  const [sort, setSort] = useState("asc");
  const [field, setField] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const fetchItems = useCallback((queryType, queryValue) => {
    fetchItemsBegin();
    ItemService.fetchItemsWithQueryPagingSorting(
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
            fetchItemsFailed();
            break;
          default:
            setCurrentPage(data.number + 1);
            setTotalPages(data.totalPages);
            fetchItemsSuccess(data.content);
            break;
        }
      })
      .catch(() => {
        fetchItemsFailed();
      });
  });

  useEffect(() => {
    if (user.role !== "ROLE_CLERK") {
      fetchItems(queryType, queryValue);
    }
  }, [user.jwt, currentPage, sort, field]);

  return (
    <div
      className="col tab-pane fade show h-100"
      id="pills-adminItem"
      role="tabpanel"
      aria-labelledby="pills-adminItem-tab"
    >
      <div className="input-group">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {queryType === "id_query" ? "ID" : "Name"}:
        </button>
        <ul className="dropdown-menu">
          <li>
            <a
              className="dropdown-item"
              onClick={() => setQueryType("id_query")}
            >
              ID
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              onClick={() => setQueryType("name_query")}
            >
              Name
            </a>
          </li>
        </ul>
        <input
          type="text"
          name="query"
          value={queryValue}
          onChange={(e) => setQueryValue(e.target.value)}
          className="form-control"
        />
        <button
          onClick={() => fetchItems(queryType, queryValue)}
          className="btn btn-secondary"
        >
          <i className="bi bi-search"></i>
        </button>
        <button className="btn btn-primary">
          <i
            className="bi bi-plus-lg"
            data-bs-toggle="modal"
            data-bs-target="#addItemModal"
          ></i>
        </button>
        <button
          onClick={() =>
            ItemService.download(user.jwt)
              .then((res) => res.blob())
              .then((data) => fileDownload(data, "items.xlsx"))
              .catch((error) => console.log(error))
          }
          className="btn btn-success"
        >
          <i className="bi bi-download"></i>
        </button>
        <button
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#uploadItemModal"
        >
          <i className="bi bi-upload"></i>
        </button>
        <button
          onClick={() => {
            if (queryValue !== "") setQueryValue("");
            if (currentPage !== 1) setCurrentPage(1);
            if (pageSize !== 20) setPageSize(20);
            if (queryType !== "id_query") setQueryType("id_query");
            if (sort !== "asc") setSort("asc");
            if (field !== "id") setField("id");
            fetchItems("id_query", "");
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
      {!loading && !error && (
        <div className="d-flex flex-column h-100 justify-content-between">
          <div className="overflow-auto">
            <table className="table table-sm table-hover text-center">
              <thead className="table-dark">
                <tr>
                  <th
                    onClick={() => {
                      if (field !== "id") {
                        setField("id");
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
                    {field === "id" && (
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
                      if (field !== "name") {
                        setField("name");
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
                    <span className="me-2">Name</span>
                    {field === "name" && (
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
                      if (field !== "discountPercentage") {
                        setField("discountPercentage");
                        setSort("asc");
                        return;
                      } else {
                        if (sort === "asc") setSort("desc");
                        if (sort === "desc") setSort("asc");
                      }
                    }}
                    scope="col"
                  >
                    <span className="me-2">Discount %</span>
                    {field === "discountPercentage" && (
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
                      if (field !== "discounted") {
                        setField("discounted");
                        setSort("asc");
                        return;
                      } else {
                        if (sort === "asc") setSort("desc");
                        if (sort === "desc") setSort("asc");
                      }
                    }}
                    scope="col"
                  >
                    <span className="me-2">Discounted?</span>
                    {field === "discounted" && (
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
                      if (field !== "price") {
                        setField("price");
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
                    <span className="me-2">Price</span>
                    {field === "price" && (
                      <span>
                        {sort === "asc" ? (
                          <i className="bi bi-caret-up-fill"></i>
                        ) : (
                          <i className="bi bi-caret-down-fill"></i>
                        )}
                      </span>
                    )}
                  </th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  return <AdminItem key={index} item={item} />;
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
