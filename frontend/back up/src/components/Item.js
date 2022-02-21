import React from "react";
import { FaTimes, FaCheck, FaPen, FaTimesCircle } from "react-icons/fa";
import { updateItemSelected } from "../actions/itemActions";
import { connect } from "react-redux";

const Item = ({ item, setModal, updateItemSelected }) => {
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td>{item.isDiscounted ? <FaCheck /> : <FaTimes />}</td>
      <td>{item.discountPercentage * 100}</td>
      <td>
        <FaPen
          className="interactable"
          onClick={() => {
            setModal("edit-item-modal");
            updateItemSelected(item);
            document.getElementById("modal-id").style.display = "flex";
          }}
        />
        <FaTimesCircle
          className="interactable"
          onClick={() => {
            setModal("delete-item-modal");
            updateItemSelected(item);
            document.getElementById("modal-id").style.display = "flex";
          }}
        />
      </td>
    </tr>
  );
};

Item.defaultProp = {
  item: {
    name: "Test item",
    price: 69420,
    isDiscounter: false,
    discountPercentage: 0.8,
  },
};

export default connect(null, { updateItemSelected })(Item);
