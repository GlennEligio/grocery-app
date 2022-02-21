import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { updateUser } from "../actions/userActions";
import { createJwt, updateStatus } from "../actions/authActions";
import { useNavigate } from "react-router-dom";

const Login = ({ updateUser, createJwt, updateStatus }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username or password");
      return;
    }

    const user = {
      username: username,
      password: password,
    };

    // Authenticate login cred and add User in State
    await fetch("http://localhost:8080/users/authenticate", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        switch (res.status) {
          case 200:
            setError(false);
            return res.json();
          case 403:
            setError(true);
            setErrorMessage("Invalid username/password");
            break;
          default:
            setError(true);
            setErrorMessage("Server can't be reached. Please try again later");
            break;
        }
      })
      .then((data) => {
        updateUser(data.user);
        createJwt(data.jwt);
        updateStatus(true);
      });

    // Navigate to home page
    navigate("/");
  };

  return (
    <div className="login">
      <div className="label">
        <h1>Login</h1>
      </div>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-control-error">
          {isError && <label className="error">{errorMessage}</label>}
        </div>
        <div className="form-control">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-control-button">
          <button type="submit" className="btn">
            Login
          </button>
        </div>
        <div className="form-control-button">
          <button className="btn">Back</button>
        </div>
      </form>
    </div>
  );
};

export default connect(null, {
  createJwt,
  updateUser,
  updateStatus,
})(Login);
