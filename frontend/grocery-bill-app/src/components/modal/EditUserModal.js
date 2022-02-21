import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { editUserInServer } from "../../actions/userActions";

const EditUserModal = ({
  userSelected,
  error,
  loading,
  jwt,
  editUserInServer,
}) => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState(false);
  const [roles, setRoles] = useState("ROLE_CLERK");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || !roles) {
      alert("Please fill up all information");
      return;
    }

    const user = {
      id: userSelected.id,
      name: name,
      username: username,
      password: password,
      active: active,
      roles: roles,
    };

    editUserInServer(user, jwt);

    if (!loading && !error) {
      document.getElementById("modal-id").style.display = "none";
    }
  };

  return (
    <>
      <div className="modal-title">
        <h3>Edit User</h3>
      </div>
      <div className="modal-body">
        <form className="form" onSubmit={onSubmit}>
          {loading && (
            <div className="form-control-loading">
              <div>
                <FaSpinner className="loading-logo" />
              </div>
              <label>Updating user</label>
            </div>
          )}
          {error && (
            <div className="form-control-error">
              <label>Error updating user</label>
            </div>
          )}
          <div className="form-control">
            <label>Name: </label>
            <input
              type="text"
              name="name"
              autoComplete="off"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <label>Username: </label>
            <input
              type="text"
              name="username"
              autoComplete="off"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <label>Password: </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="form-control-checkbox">
            <label>Active?: </label>
            <input
              type="checkbox"
              name="active"
              value={active}
              onChange={(e) => {
                setActive(e.currentTarget.checked);
              }}
            />
          </div>
          <div className="form-control">
            <label>Role: </label>
            <select
              name="roles"
              value={roles}
              onChange={(e) => setRoles(e.target.value)}
            >
              <option value="ROLE_CLERK">Clerk</option>
              <option value="ROLE_ADMIN">Admin</option>
            </select>
          </div>
          <div className="form-control-button">
            <button className="btn">Update</button>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  userSelected: state.user.userSelected,
  error: state.user.error,
  loading: state.user.loading,
  status: state.user.status,
  jwt: state.auth.jwt,
});

export default connect(mapStateToProps, { editUserInServer })(EditUserModal);
