import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetAuthState } from "../actions/authActions";
import UserService from "../api/UserService";
import HomeBanner from "./UI/Banner/HomeBanner";
import Status from "./UI/Prompt/Status";

const Register = ({ user, isLoggedIn, resetAuthState }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [passwords, setPasswords] = useState({
    password: "",
    repassword: "",
  });
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      if (user.role === "ROLE_CLERK") {
        navigate("/clerk");
      } else if (user.role === "ROLE_ADMIN") {
        navigate("/admin");
      }
    } else {
      resetAuthState();
      setLoading(false);
      setStatus(null);
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
      password: passwords.passwprd,
    };

    setLoading(true);
    setStatus(null);

    UserService.register(user)
      .then((res) => {
        switch (res.status) {
          case 200:
            setLoading(false);
            setStatus(true);

            setName("");
            setPasswords({
              password: "",
              repassword: "",
            });
            setUsername("");
            break;
          case 409:
            setLoading(false);
            setStatus(false);
            setErrorMessage("Username already in use");
            break;
          default:
            setLoading(false);
            setStatus(false);
            setErrorMessage("Something went wrong");
        }
      })
      .catch(() => {
        setLoading(false);
        setStatus(false);
      });

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
    } else {
      e.target.repassword.classList.add("is-valid");
      e.target.repassword.classList.remove("is-invalid");
    }
    return valid;
  };

  const removeFormValidity = (e) => {
    e.target.name.classList.remove("is-valid");
    e.target.username.classList.remove("is-valid");
    e.target.password.classList.remove("is-valid");
    e.target.repassword.classList.remove("is-valid");
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPasswords((prevPass) => {
      return {
        password: e.target.value,
        repassword: prevPass.repassword,
      };
    });
  };

  const repasswordChangeHandler = (e) => {
    setPasswords((prevPass) => {
      return {
        password: prevPass.password,
        repassword: e.target.value,
      };
    });
  };

  return (
    <main>
      <div className="container vh-100">
        <div className="row h-100">
          <HomeBanner />
          <div className="col-5 d-flex flex-column justify-content-center">
            <div>
              <p className="lead text-center">Register</p>
            </div>
            <Status
              loading={loading}
              status={status}
              loadingMessage={"Registering..."}
              successMessage={"Register Success"}
              errorMessage={errorMessage}
            />
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
                  onChange={nameChangeHandler}
                  placeholder=""
                  required
                />
                <label htmlFor="name">Name</label>
                <div className="valid-feedback">Looks good!</div>
                <div className="invalid-feedback">
                  Name must be between 6 to 40 characters long.
                </div>
              </div>
              <div className="form-floating my-3">
                <input
                  className="form-control"
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={usernameChangeHandler}
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
                  value={passwords.password}
                  onChange={passwordChangeHandler}
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
                  value={passwords.repassword}
                  onChange={repasswordChangeHandler}
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
});

export default connect(mapStateToProps, {
  resetAuthState,
})(Register);
