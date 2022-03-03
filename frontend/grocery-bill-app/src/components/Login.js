import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FaSpinner, FaTimesCircle } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { fetchJwt } from "../actions/authActions";
import { updateUser } from "../actions/userActions";
import { resetAuthState } from "../actions/authActions";
import { resetUserState } from "../actions/userActions";

const Login = ({
  user,
  role,
  error,
  loading,
  isLoggedIn,
  fetchJwt,
  updateUser,
  resetAuthState,
  resetUserState,
}) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      updateUser({
        username: username,
      });
      if (role === "ROLE_CLERK") {
        navigate("/clerk");
      } else if (role === "ROLE_ADMIN" || role === "ROLE_SADMIN") {
        navigate("/admin");
      } else {
        resetAuthState();
        resetUserState();
      }
    }
  });

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    fetchJwt(user);
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
              <label>Logging in</label>
            </div>
          )}
          {error && (
            <div className="form-control-error">
              <FaTimesCircle />
              <label>Invalid username/password</label>
            </div>
          )}

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
              Login
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
  user: state.user.user,
  role: state.auth.role,
  error: state.auth.error,
  loading: state.auth.loading,
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps, {
  fetchJwt,
  updateUser,
  resetAuthState,
  resetUserState,
})(Login);
