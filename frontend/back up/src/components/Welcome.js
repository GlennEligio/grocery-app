import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <>
      <div className="label">
        <h1>Welcome!</h1>
      </div>
      <div className="home-buttons">
        <Link to="/login" className="btn">
          Login
        </Link>
        <br />
        <Link to="/register" className="btn">
          Register
        </Link>
      </div>
    </>
  );
};

export default Welcome;
