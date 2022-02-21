import React, { useState } from "react";
import { connect } from "react-redux";
import { createUser } from "../actions/userActions";
import { FaSpinner, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = ({ error, loading, status, createUser }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      name: name,
      username: username,
      password: password,
    };

    createUser(user);

    setName("");
    setPassword("");
    setUsername("");
  };

  return (
    <div className="home">
      <div className="home-banner">
        <h1>GROCERY BILL APP</h1>
      </div>
      <div className="home-login">
        <form className="form" onSubmit={onSubmit}>
          {loading && (
            <div className="form-control-loading">
              <div>
                <FaSpinner className="loading-logo" />
              </div>
              <label>Registering User</label>
            </div>
          )}
          {error && (
            <div className="form-control-error">
              <FaTimesCircle />
              <label>Registration failed</label>
            </div>
          )}
          {status && (
            <div className="form-control-success">
              <FaCheckCircle />
              <label>Registration success</label>
            </div>
          )}

          <div className="form-control">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-control-button">
            <button className="btn" type="submit">
              Register
            </button>
          </div>
          <div className="form-control-button">
            <Link to="/" className="btn">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.user.error,
  loading: state.user.loading,
  status: state.user.status,
});

export default connect(mapStateToProps, { createUser })(Register);
