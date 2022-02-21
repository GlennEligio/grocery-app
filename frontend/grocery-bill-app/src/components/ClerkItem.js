import React from "react";
import { connect } from "react-redux";
import { updateItemSelected } from "../actions/itemActions";
import { setModalComponent } from "../actions/componentActions";

const ClerkItem = ({ item, updateItemSelected, setModalComponent }) => {
  return (
    <div
      className="item"
      onClick={() => {
        updateItemSelected(item);
        setModalComponent("add-item-to-bill-modal");
        document.getElementById("modal-id").style.display = "flex";
      }}
    >
      <div>{item.name}</div>
      <div>${item.price}</div>
    </div>
  );
};

export default connect(null, { updateItemSelected, setModalComponent })(
  ClerkItem
);
