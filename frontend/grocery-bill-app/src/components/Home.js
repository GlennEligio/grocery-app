import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { resetAuthState } from "../actions/authActions";
import { resetUserState } from "../actions/userActions";
import { resetBillStates } from "../actions/billActions";
import { resetComponentStates } from "../actions/componentActions";
import { resetItemStates } from "../actions/itemActions";

const Home = ({
  isLoggedIn,
  role,
  resetAuthState,
  resetUserState,
  resetBillStates,
  resetComponentStates,
  resetItemStates,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      if (role === "ROLE_CLERK") {
        navigate("/clerk");
      } else if (role === "ROLE_ADMIN") {
        navigate("/admin");
      }
    } else {
      resetAuthState();
      resetUserState();
      resetBillStates();
      resetComponentStates();
      resetItemStates();
    }
  }, [isLoggedIn]);

  return (
    <main>
      <div className="container vh-100">
        <div className="row h-100">
          {/** Grocery Bill Banner */}
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
          {/** Navigation Buttons */}
          <div className="col-5 d-flex flex-column justify-content-center">
            <div className="w-100 px-2 vstack justify-content-center">
              <Link to="/login" className="btn btn-dark my-4">
                Login
              </Link>
              <Link to="/register" className="btn btn-dark my-4">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  role: state.auth.role,
});

export default connect(mapStateToProps, {
  resetAuthState,
  resetUserState,
  resetComponentStates,
  resetItemStates,
  resetBillStates,
})(Home);
