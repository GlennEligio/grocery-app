import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { createUser } from "../../actions/userActions";

const AddUserModal = ({ error, loading, createUser }) => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || !name) {
      alert("Please fill up all information");
      return;
    }

    const user = {
      name: name,
      username: username,
      password: password,
    };

    createUser(user);

    if (!loading && !error) {
      document.getElementById("modal-id").style.display = "none";
    }
  };

  return (
    <>
      <div className="modal-title">
        <h3>Add User</h3>
      </div>
      <div className="modal-body">
        <form className="form" onSubmit={onSubmit}>
          {loading && (
            <div className="form-control-loading">
              <div>
                <FaSpinner className="loading-logo" />
              </div>
              <label>Adding user</label>
            </div>
          )}
          {error && (
            <div className="form-control-error">
              <label>Error adding user</label>
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
          <div className="form-control-button">
            <button className="btn">Add</button>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  error: state.user.error,
  loading: state.user.loading,
  jwt: state.auth.jwt,
});

export default connect(mapStateToProps, { createUser })(AddUserModal);
