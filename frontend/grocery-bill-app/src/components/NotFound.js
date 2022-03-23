import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main>
      <div className="container vh-100">
        <div className="row h-100">
          <div className="col mt-5 ms-5 d-flex flex-column align-items-start justify-content-start">
            <h1>Not Found</h1>
            <p className="lead">Page doesn't exist</p>
            <Link to="/login">Go back to Login page</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
