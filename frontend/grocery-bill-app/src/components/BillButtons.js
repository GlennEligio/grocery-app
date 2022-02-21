import React from "react";
import {
  FaClock,
  FaTimesCircle,
  FaCheck,
  FaClipboardList,
} from "react-icons/fa";
import { connect } from "react-redux";
import { resetCurrentBill } from "../actions/billActions";
import {
  setModalComponent,
  setBillComponent,
} from "../actions/componentActions";

const BillButtons = ({
  currentBill,
  resetCurrentBill,
  billName,
  setModalComponent,
  setBillComponent,
}) => {
  return (
    <div className="bill-buttons">
      {billName === "current-bill" && (
        <div
          className="bill-buttons-item"
          onClick={() => setBillComponent("on-hold-bill")}
        >
          <FaClock />
        </div>
      )}
      {billName === "on-hold-bill" && (
        <div
          className="bill-buttons-item"
          onClick={() => setBillComponent("current-bill")}
        >
          <FaClipboardList />
        </div>
      )}
      <div className="bill-buttons-item" onClick={() => resetCurrentBill()}>
        <FaTimesCircle />
        <h4>Cancel</h4>
      </div>
      <div
        className="bill-buttons-item"
        onClick={() => {
          if (currentBill.itemList.length > 0) {
            setModalComponent("checkout-bill-modal");
            document.getElementById("modal-id").style.display = "flex";
          } else {
            alert("Bill must have at least one time to be on hold");
          }
        }}
      >
        <FaCheck />
        <h4>Checkout</h4>
      </div>
      <div
        className="bill-buttons-item"
        onClick={() => {
          if (currentBill.itemList.length > 0) {
            setModalComponent("set-bill-id-modal");
            document.getElementById("modal-id").style.display = "flex";
          } else {
            alert("Bill must have at least one time to be on hold");
          }
        }}
      >
        <FaClock />
        <h4>Hold</h4>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentBill: state.bill.currentBill,
  billName: state.component.billName,
});

export default connect(mapStateToProps, {
  resetCurrentBill,
  setModalComponent,
  setBillComponent,
})(BillButtons);
