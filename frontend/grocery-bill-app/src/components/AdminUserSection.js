import React, { useEffect, useState } from "react";
import { FaTimesCircle, FaPlus, FaSpinner } from "react-icons/fa";
import { connect } from "react-redux";
import { fetchUsers } from "../actions/userActions";
import { setModalComponent } from "../actions/componentActions";
import User from "./User";

const AdminUserSection = ({
  users,
  loading,
  error,
  jwt,
  fetchUsers,
  setModalComponent,
}) => {
  useEffect(() => {
    fetchUsers(jwt);
  }, [users.length]);

  const [query, setQuery] = useState("");

  return (
    <div className="admin-home-users">
      <div className="admin-home-users search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <FaTimesCircle className="interactable" onClick={() => setQuery("")} />
        <FaPlus
          className="interactable"
          onClick={() => {
            setModalComponent("add-user-modal");
            document.getElementById("modal-id").style.display = "flex";
          }}
        />
      </div>
      <div className="admin-home-users table header">
        {loading && (
          <div className="form-control-loading">
            <div>
              <FaSpinner className="loading-logo" />
            </div>
            <label>Retrieving User List</label>
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
                <th>Username</th>
                <th>Active?</th>
                <th>Role/s</th>
                <th>Actions</th>
              </tr>
            </thead>
          </table>
        )}
      </div>
      <div className="admin-home-users table body">
        {!error && !loading && (
          <table className="table">
            <tbody>
              {users.length > 0 &&
                users
                  .filter((user) =>
                    user.username.toLowerCase().includes(query.toLowerCase())
                  )
                  .map((user, index) => {
                    return <User key={index} user={user} />;
                  })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.user.users,
  error: state.user.error,
  loading: state.user.loading,
  jwt: state.auth.jwt,
});

export default connect(mapStateToProps, { fetchUsers, setModalComponent })(
  AdminUserSection
);
