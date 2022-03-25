import React, { useState, useRef, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  registerUserBegin,
  registerUserFailed,
  registerUserSuccess,
} from "../actions/userActions";
import { resetAuthState } from "../actions/authActions";
import { resetUserState } from "../actions/userActions";
import UserService from "../api/UserService";

const Register = ({
  user,
  isLoggedIn,
  error,
  loading,
  registerUserBegin,
  registerUserFailed,
  registerUserSuccess,
  resetAuthState,
  resetUserState,
}) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [status, setStatus] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (isLoggedIn) {
      if (user.role === "ROLE_CLERK") {
        navigate("/clerk");
      } else if (user.role === "ROLE_ADMIN") {
        navigate("/admin");
      }
    } else {
      resetAuthState();
      resetUserState();
    }
  }, [isLoggedIn, user.role]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!checkFormValidity(e)) {
      return;
    }

    const user = {
      name: name,
      username: username,
      password: password,
    };

    registerUserBegin();

    UserService.register(user)
      .then((res) => {
        switch (res.status) {
          case 200:
            registerUserSuccess();
            setStatus(true);
            break;
          case 409:
            console.log("409");
            registerUserFailed();
            setErrorMessage("Username already in use");
            setStatus(false);
            break;
          default:
            setErrorMessage("Something went wrong");
            registerUserFailed();
            setStatus(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setName("");
    setPassword("");
    setRePassword("");
    setUsername("");

    removeFormValidity(e);
  };

  const checkFormValidity = (e) => {
    let valid = true;

    // Name input
    if (!e.target.name.checkValidity()) {
      e.target.name.classList.add("is-invalid");
      e.target.name.classList.remove("is-valid");
      valid = false;
    } else {
      e.target.name.classList.add("is-valid");
      e.target.name.classList.remove("is-invalid");
    }

    // Username input
    if (!e.target.username.checkValidity()) {
      e.target.username.classList.add("is-invalid");
      e.target.username.classList.remove("is-valid");
      valid = false;
    } else {
      e.target.username.classList.add("is-valid");
      e.target.username.classList.remove("is-invalid");
    }

    // Password input
    if (!e.target.password.checkValidity()) {
      e.target.password.classList.add("is-invalid");
      e.target.password.classList.remove("is-valid");
      valid = false;
    } else {
      e.target.password.classList.add("is-valid");
      e.target.password.classList.remove("is-invalid");
    }

    // Repassword input
    if (!e.target.repassword.checkValidity()) {
      e.target.repassword.classList.add("is-invalid");
      e.target.repassword.classList.remove("is-valid");
      valid = false;
    } else {
      e.target.repassword.classList.add("is-valid");
      e.target.repassword.classList.remove("is-invalid");
    }

    // Password and repassword match
    if (e.target.password.value !== e.target.repassword.value) {
      e.target.repassword.classList.add("is-invalid");
      e.target.repassword.classList.remove("is-valid");
      valid = false;
    }
    return valid;
  };

  const removeFormValidity = (e) => {
    e.target.name.classList.remove("is-valid");
    e.target.username.classList.remove("is-valid");
    e.target.password.classList.remove("is-valid");
    e.target.repassword.classList.remove("is-valid");
  };

  return (
    <main>
      <div className="container vh-100">
        <div className="row h-100">
          {/** Home banner */}
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
          {/** Register form */}
          <div className="col-5 d-flex flex-column justify-content-center">
            <div>
              <p className="lead text-center">Register</p>
            </div>
            {loading && (
              <div className="d-flex align-items-center justify-content-center fs-6">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Registering...</span>
                </div>
                <span className="ms-3 align-middle">
                  <strong>Registering...</strong>
                </span>
              </div>
            )}
            {status && (
              <div className="d-flex align-items-center justify-content-center text-success fs-6">
                <i className="bi bi-check-circle-fill fs-3"></i>
                <span className="ms-2">
                  <strong>Register Success!!</strong>
                </span>
              </div>
            )}
            {error && (
              <div className="d-flex align-items-center justify-content-center text-danger fs-6">
                <i className="bi bi-x-circle-fill fs-3"></i>
                <span className="ms-2">
                  <strong>{errorMessage}</strong>
                </span>
              </div>
            )}
            <form
              onSubmit={onSubmit}
              noValidate
              className="w-100 text-center needs-validation"
            >
              <div className="form-floating my-3">
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder=""
                  required
                />
                <label htmlFor="name">Name</label>
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">Please enter a name!</div>
              </div>
              <div className="form-floating my-3">
                <input
                  className="form-control"
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder=""
                  required
                />
                <label htmlFor="username">Username</label>
                <div className="valid-feedback">Looks good!</div>
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
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">Please enter a password!</div>
              </div>
              <div className="form-floating my-3">
                <input
                  className="form-control"
                  type="password"
                  id="repassword"
                  name="repassword"
                  value={repassword}
                  onChange={(e) => {
                    setRePassword(e.target.value);
                  }}
                  placeholder=""
                  required
                />
                <label htmlFor="username">Re-Password</label>
                <div className="valid-feedback">Looks good</div>
                <div className="invalid-feedback">
                  Password and Repassword does not match
                </div>
              </div>
              <div className="hstack justify-content-end">
                <div className="me-3">
                  <button
                    onClick={() => navigate("/")}
                    className="btn btn-lg btn-dark"
                  >
                    Back
                  </button>
                </div>
                <div>
                  <button type="submit" className="btn btn-lg btn-primary">
                    Register
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
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
  error: state.user.error,
  loading: state.user.loading,
});

export default connect(mapStateToProps, {
  registerUserBegin,
  registerUserFailed,
  registerUserSuccess,
  resetAuthState,
  resetUserState,
})(Register);
