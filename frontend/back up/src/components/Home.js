import React from "react";
import Welcome from "./Welcome";
import { connect } from "react-redux";

const Home = ({ isLoggedIn }) => {
  return <div className="home">{isLoggedIn ? <div></div> : <Welcome />}</div>;
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps, {})(Home);
