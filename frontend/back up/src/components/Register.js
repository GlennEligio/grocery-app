import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [contact, setContact] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const regex = /^(09|\+639)\d{9}$/;
    if (!name || !username || !password || !repassword || !contact) {
      alert("Please fill up all information");
      return;
    }
    if (!regex.test(contact)) {
      alert("Please enter a valid contact number");
      setContact("");
      return;
    }
    if (password !== repassword) {
      alert("Passwords must match");
      setPassword("");
      setRepassword("");
      return;
    }

    const user = {
      name: name,
      username: username,
      contactNumber: contact,
      password: password,
    };

    fetch("http://localhost:8060/users/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((user) => alert(`User '${user.username}' registered successfully`))
      .catch((error) => JSON.stringify(error));
  };

  return (
    <div className="register">
      <div className="label">
        <h1>Register</h1>
      </div>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-control">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            autoComplete="off"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            autoComplete="off"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Contact number</label>
          <input
            type="text"
            placeholder="Enter contact number"
            autoComplete="off"
            value={contact}
            name="contact"
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            autoComplete="off"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label>Re-password</label>
          <input
            type="password"
            placeholder="Re-enter password"
            autoComplete="off"
            value={repassword}
            name="repass"
            onChange={(e) => setRepassword(e.target.value)}
          />
        </div>
        <div className="form-control-button">
          <button type="submit" className="btn">
            Register
          </button>
        </div>
        <div className="form-control-button">
          <Link className="btn" to="/">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
