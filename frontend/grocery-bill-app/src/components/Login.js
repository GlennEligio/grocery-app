import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchJwtBegin,
  fetchJwtSuccess,
  fetchJwtFailed,
  resetAuthState,
} from "../actions/authActions";
import UserService from "../api/UserService";
import HomeBanner from "./UI/Banner/HomeBanner";

const Login = ({
  user,
  error,
  loading,
  isLoggedIn,
  fetchJwtBegin,
  fetchJwtSuccess,
  fetchJwtFailed,
  resetAuthState,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const form = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      if (user.role === "ROLE_CLERK") {
        navigate("/clerk");
      } else if (user.role === "ROLE_ADMIN" || user.role === "ROLE_SADMIN") {
        navigate("/admin");
      }
    } else {
      resetAuthState();
    }
  }, [isLoggedIn]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.current.checkValidity()) {
      e.stopPropagation();

      form.current.classList.add("was-validated");
    } else {
      const user = {
        username: username,
        password: password,
      };

      fetchJwtBegin();

      UserService.login(user)
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
              fetchJwtFailed();
              break;
            default:
              fetchJwtSuccess(data);
              break;
          }
        })
        .catch(() => {
          fetchJwtFailed();
        });
    }
  };

  return (
    <main>
      <div className="container vh-100">
        <div className="row h-100">
          {/** Home page banner */}
          <HomeBanner />
          {/** Login form */}
          <div className="col-5 d-flex flex-column justify-content-center">
            <div>
              <p className="lead text-center">Login</p>
            </div>
            {loading && (
              <div className="d-flex align-items-center justify-content-center fs-6">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Logging in...</span>
                </div>
                <span className="ms-3 align-middle">
                  <strong>Logging in...</strong>
                </span>
              </div>
            )}
            {error && (
              <div className="d-flex align-items-center justify-content-center text-danger fs-6">
                <i className="bi bi-x-circle-fill fs-3"></i>
                <span className="ms-2">
                  <strong>Incorrect username/password</strong>
                </span>
              </div>
            )}
            <form
              ref={form}
              onSubmit={onSubmit}
              noValidate={true}
              className="w-100 text-center needs-validation"
            >
              <div className="form-floating my-3">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder=""
                  autoComplete="off"
                  className="form-control"
                  required
                />
                <label htmlFor="username">Username</label>
                <div className="invalid-feedback">Please enter a username!</div>
              </div>
              <div className="form-floating my-3">
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=""
                  required
                />
                <label htmlFor="username">Password</label>
                <div className="invalid-feedback">Please enter a username!</div>
              </div>
              <div className="hstack justify-content-end">
                <div className="me-4">
                  <button
                    className="btn btn-lg btn-dark"
                    onClick={() => navigate("/")}
                  >
                    Back
                  </button>
                </div>
                <div>
                  <button type="submit" className="btn btn-lg btn-primary">
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  error: state.auth.error,
  loading: state.auth.loading,
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps, {
  fetchJwtBegin,
  fetchJwtSuccess,
  fetchJwtFailed,
  resetAuthState,
})(Login);
