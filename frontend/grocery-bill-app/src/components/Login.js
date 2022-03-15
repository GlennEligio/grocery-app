import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchJwtBegin,
  fetchJwtSuccess,
  fetchJwtFailed,
} from "../actions/authActions";
import { resetAuthState } from "../actions/authActions";
import { resetUserState } from "../actions/userActions";

const Login = ({
  user,
  error,
  loading,
  isLoggedIn,
  fetchJwtBegin,
  fetchJwtSuccess,
  fetchJwtFailed,
  resetAuthState,
  resetUserState,
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
      resetUserState();
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

      fetch("http://localhost:8080/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
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
          <div className="col-7 d-flex align-items-center">
            <div className="row">
              <div className="col-7 text-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-shop"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" />
                </svg>
              </div>
              <div className="col-5 d-flex align-items-center">
                <div className="vstack justify-content-center">
                  <strong className="fs-1">Grocery</strong>
                  <strong className="fs-1">Bill</strong>
                  <strong className="fs-1">App</strong>
                </div>
              </div>
            </div>
          </div>
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
  resetUserState,
})(Login);
