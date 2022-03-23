import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <main>
      <div className="container vh-100">
        <div className="row h-100">
          <div className="col mt-5 ms-5 d-flex flex-column align-items-start justify-content-start">
            <h1>Unauthorized</h1>
            <p className="lead">You are unauthorized to access this page</p>
            <Link to="/login">Go back to Home page</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Unauthorized;
