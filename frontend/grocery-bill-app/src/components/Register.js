import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FaSpinner, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../actions/userActions";
import { resetAuthState } from "../actions/authActions";
import { resetUserState } from "../actions/userActions";

const Register = ({
  role,
  isLoggedIn,
  error,
  loading,
  status,
  registerUser,
  resetAuthState,
  resetUserState,
}) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      if (role === "ROLE_CLERK") {
        navigate("/clerk");
      } else if (role === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        resetAuthState();
        resetUserState();
      }
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      name: name,
      username: username,
      password: password,
    };

    registerUser(user);

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
  isLoggedIn: state.auth.isLoggedIn,
  role: state.auth.role,
  error: state.user.error,
  loading: state.user.loading,
  status: state.user.status,
});

export default connect(mapStateToProps, {
  registerUser,
  resetAuthState,
  resetUserState,
})(Register);
