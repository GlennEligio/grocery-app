import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { resetAuthState } from "../../../actions/authActions";

const NavBar = ({ page, user, resetAuthState }) => {
  return (
    <footer>
      <nav className="navbar fixed-bottom navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link to={"/clerk"} className="navbar-brand">
            <i className="bi bi-shop"></i>
            <span className="ms-2">GBA</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav w-100 mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${page === "clerk" && "active"}`}
                  aria-current="page"
                  to={"/clerk"}
                >
                  Clerk Section
                </Link>
              </li>
              {user.role !== "ROLE_CLERK" && (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${page === "admin" && "active"}`}
                    aria-current="page"
                    to={"/admin"}
                  >
                    Admin Section
                  </Link>
                </li>
              )}

              <li className="nav-item ms-auto">
                <Link
                  className="nav-link"
                  to={"/"}
                  onClick={() => resetAuthState()}
                >
                  <span className="me-2">Logout</span>
                  <i className="bi bi-box-arrow-right"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </footer>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  resetAuthState,
})(NavBar);
