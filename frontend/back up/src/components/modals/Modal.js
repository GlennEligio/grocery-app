import React from "react";
import AddItemModal from "./AddItemModal";
import EditItemModal from "./EditItemModal";
import DeleteItemModal from "./DeleteItemModal";

const Modal = ({ modal }) => {
  return (
    <div id="modal-id" className="modal">
      <div className="modal-content">
        {modal === "add-item-modal" && <AddItemModal />}
        {modal === "edit-item-modal" && <EditItemModal />}
        {modal === "delete-item-modal" && <DeleteItemModal />}
      </div>
    </div>
  );
};

export default Modal;
