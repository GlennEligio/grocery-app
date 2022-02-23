import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { resetAuthState } from "../actions/authActions";
import { resetUserState } from "../actions/userActions";

const Home = ({ isLoggedIn, role, resetAuthState, resetUserState }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      if (role === "ROLE_CLERK") {
        navigate("/clerk");
      } else if (role === "ROLE_ADMIN") {
        navigate("/admin");
      } else {
        resetAuthState();
        resetUserState();
      }
    }
  }, []);

  return (
    <div className="home">
      <div className="home-banner">
        <h1>GROCERY BILL APP</h1>
      </div>
      <div className="home-navigation">
        <Link className="btn" to="/login">
          Login
        </Link>
        <Link className="btn" to="/register">
          Register
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  role: state.auth.role,
});

export default connect(mapStateToProps, {
  resetAuthState,
  resetUserState,
})(Home);
