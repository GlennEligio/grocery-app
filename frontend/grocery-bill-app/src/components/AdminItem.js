import React from "react";
import { FaCheck, FaTimes, FaEdit, FaTrashAlt } from "react-icons/fa";
import { connect } from "react-redux";
import { updateItemSelected } from "../actions/itemActions";
import { setModalComponent } from "../actions/componentActions";

const AdminItem = ({ item, updateItemSelected, setModalComponent }) => {
  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.discounted ? <FaCheck /> : <FaTimes />}</td>
      <td>{item.discountPercentage * 100}%</td>
      <td>{item.price}</td>
      <td>
        <FaEdit
          onClick={() => {
            updateItemSelected(item);
            setModalComponent("edit-item-modal");
            document.getElementById("modal-id").style.display = "flex";
          }}
        />
        <FaTrashAlt
          onClick={() => {
            updateItemSelected(item);
            setModalComponent("delete-item-modal");
            document.getElementById("modal-id").style.display = "flex";
          }}
        />
      </td>
    </tr>
  );
};

export default connect(null, { updateItemSelected, setModalComponent })(
  AdminItem
);
