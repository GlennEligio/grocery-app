import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { resetItemStates } from "../actions/itemActions";
import { resetBillStates } from "../actions/billActions";
import { resetAuthState } from "../actions/authActions";
import { resetComponentStates } from "../actions/componentActions";

const Toolbar = ({
  resetItemStates,
  resetBillStates,
  resetAuthState,
  resetComponentStates,
}) => {
  const navigate = useNavigate();
  return (
    <div className="toolbar">
      <div className="toolbar-item">
        <div
          className="toolbar-item-icon"
          onClick={() => {
            resetItemStates();
            resetBillStates();
            resetAuthState();
            resetComponentStates();
            navigate("/");
          }}
        >
          <MdOutlineLogout />
        </div>
        <h3>Logout</h3>
      </div>
    </div>
  );
};

export default connect(null, {
  resetItemStates,
  resetBillStates,
  resetAuthState,
  resetComponentStates,
})(Toolbar);
