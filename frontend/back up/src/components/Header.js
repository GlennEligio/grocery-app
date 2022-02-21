import React from "react";
import { FaBars } from "react-icons/fa";
import { connect } from "react-redux";

const Header = ({ isLoggedIn }) => {
  const openNavBar = () => {
    document.getElementById("sidenav").style.marginLeft = "0%";
  };

  return (
    <div className="header">
      {isLoggedIn && <FaBars className="interactable" onClick={openNavBar} />}
      <h2>GROCERY BILL APP</h2>
      <div></div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps, {})(Header);
