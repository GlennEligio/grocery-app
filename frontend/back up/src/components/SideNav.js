import React from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const SideNav = () => {
  const closeNavBar = () => {
    document.getElementById("sidenav").style.marginLeft = "-50%";
  };

  return (
    <div id="sidenav" className="sidenav">
      <FaTimes className="interactable" onClick={closeNavBar} />
      <Link to="/">Home</Link>
      <Link to="/items">Items</Link>
    </div>
  );
};

export default SideNav;
