import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchUsersBegin,
  fetchUsersFailed,
  fetchUsersSuccess,
} from "../actions/userActions";
import { setModalComponent } from "../actions/componentActions";
import AdminUser from "./AdminUser";

const AdminUserSection = ({
  user,
  users,
  loading,
  error,
  fetchUsersBegin,
  fetchUsersFailed,
  fetchUsersSuccess,
}) => {
  useEffect(() => {
    fetchUsers();
  }, [users.length]);

  const fetchUsers = () => {
    fetchUsersBegin();

    fetch("http://localhost:8080/api/v1/users", {
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
            fetchUsersFailed();
            break;
          default:
            fetchUsersSuccess(data);
            break;
        }
      })
      .catch(() => {
        fetchUsersFailed();
      });
  };

  const [query, setQuery] = useState("");

  return (
    <div
      className="col tab-pane fade show active"
      id="pills-adminUser"
      role="tabpanel"
      aria-labelledby="pills-adminUser-tab"
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
        <button
          className="btn btn-outline-primary"
          data-bs-toggle="modal"
          data-bs-target="#addUserModal"
        >
          <i className="bi bi-plus-lg"></i>
        </button>
        <button onClick={() => fetchUsers()} className="btn btn-outline-dark">
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
      <table className="table table-sm table-hover mt-3 text-center border-radius-2 border-collapse w-100">
        <thead className="table-dark">
          <tr>
            <th scope="col" className="w-20">
              Id
            </th>
            <th scope="col" className="w-20">
              Name
            </th>
            <th scope="col" className="w-20">
              Username
            </th>
            <th scope="col">Active?</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((userItem) =>
              userItem.id.toString().toLowerCase().includes(query.toString())
            )
            .filter((userItem) => userItem.username !== user.username)
            .map((user, index) => {
              return <AdminUser key={index} user={user} />;
            })}
        </tbody>
      </table>
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
