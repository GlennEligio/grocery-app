import React from "react";
import { connect } from "react-redux";
import { updateItemSelected } from "../actions/itemActions";
import { setModalComponent } from "../actions/componentActions";

const BillItem = ({ billItem, updateItemSelected, setModalComponent }) => {
  return (
    <div
      className="bill"
      onClick={() => {
        updateItemSelected(billItem);
        setModalComponent("remove-item-to-bill-modal");
        document.getElementById("modal-id").style.display = "flex";
      }}
    >
      <div className="bill-item">
        <div className="bill-item-name">{billItem.name}</div>
        <div className="bill-item-price">
          {billItem.amount} @ $<strong>{billItem.price}</strong>
        </div>
      </div>
      <div className="bill-item-total">${billItem.amount * billItem.price}</div>
    </div>
  );
};

export default connect(null, { updateItemSelected, setModalComponent })(
  BillItem
);
