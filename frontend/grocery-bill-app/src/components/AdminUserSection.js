import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchUsersBegin,
  fetchUsersFailed,
  fetchUsersSuccess,
} from "../actions/userActions";
import { setModalComponent } from "../actions/componentActions";
import AdminUser from "./AdminUser";
import UserService from "../api/UserService";
import Pagination from "./Pagination";

const AdminUserSection = ({
  user,
  users,
  loading,
  error,
  fetchUsersBegin,
  fetchUsersFailed,
  fetchUsersSuccess,
}) => {
  const [queryType, setQueryType] = useState("id_query");
  const [queryValue, setQueryValue] = useState("");
  const [sort, setSort] = useState("asc");
  const [field, setField] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const fetchUsers = useCallback((queryType, queryValue) => {
    fetchUsersBegin();

    UserService.fetchUsersWithQueryPagingSorting(
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
          default:
            return null;
        }
      })
      .then((data) => {
        switch (data) {
          case null:
            fetchUsersFailed();
            break;
          default:
            setCurrentPage(data.number + 1);
            setTotalPages(data.totalPages);
            fetchUsersSuccess(data.content);
            break;
        }
      })
      .catch(() => {
        fetchUsersFailed();
      });
  });

  useEffect(() => {
    fetchUsers(queryType, queryValue);
  }, [user.jwt, currentPage, sort, field]);

  return (
    <div
      className="col tab-pane fade show active h-100"
      id="pills-adminUser"
      role="tabpanel"
      aria-labelledby="pills-adminUser-tab"
    >
      <div className="input-group">
        <button
          className="btn btn-outline-primary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {queryType === "id_query" && "ID"}
          {queryType === "name_query" && "Name"}
          {queryType === "username_query" && "Username"}
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
          <li>
            <a
              className="dropdown-item"
              onClick={() => setQueryType("username_query")}
            >
              Username
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
          onClick={() => fetchUsers(queryType, queryValue)}
          className="btn btn-outline-secondary"
        >
          <i className="bi bi-search"></i>
        </button>
        <button
          className="btn btn-outline-primary"
          data-bs-toggle="modal"
          data-bs-target="#addUserModal"
        >
          <i className="bi bi-plus-lg"></i>
        </button>
        <button
          onClick={() => {
            if (queryValue !== "") setQueryValue("");
            if (currentPage !== 1) setCurrentPage(1);
            if (pageSize !== 20) setPageSize(20);
            if (queryType !== "id_query") setQueryType("id_query");
            if (sort !== "asc") setSort("asc");
            if (field !== "id") setField("id");
            fetchUsers("id_query", "");
          }}
          className="btn btn-outline-dark"
        >
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>
      <div className="mt-3">
        {loading && (
          <div className="hstack align-items-center justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Fetching users...</span>
            </div>
            <strong className="ms-2">Fetching users...</strong>
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
                      if (field !== "username") {
                        setField("username");
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
                    <span className="me-2">Username</span>
                    {field === "username" && (
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
                      if (field !== "active") {
                        setField("active");
                        setSort("asc");
                        return;
                      } else {
                        if (sort === "asc") setSort("desc");
                        if (sort === "desc") setSort("asc");
                      }
                    }}
                    scope="col"
                  >
                    <span className="me-2">Active?</span>
                    {field === "active" && (
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
                      if (field !== "roles") {
                        setField("roles");
                        setSort("asc");
                        return;
                      } else {
                        if (sort === "asc") setSort("desc");
                        if (sort === "desc") setSort("asc");
                      }
                    }}
                    scope="col"
                  >
                    <span className="me-2">Role</span>
                    {field === "roles" && (
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
                {users.map((user, index) => {
                  return <AdminUser key={index} user={user} />;
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
  user: state.auth.user,
  users: state.user.users,
  error: state.user.error,
  loading: state.user.loading,
});

export default connect(mapStateToProps, {
  fetchUsersBegin,
  fetchUsersFailed,
  fetchUsersSuccess,
  setModalComponent,
})(AdminUserSection);
