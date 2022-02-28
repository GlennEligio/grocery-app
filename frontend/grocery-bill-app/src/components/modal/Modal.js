import React from "react";
import AddItemModal from "./AddItemModal";
import AddItemToBillModal from "./AddItemToBillModal";
import AddUserModal from "./AddUserModal";
import CheckoutBillModal from "./CheckoutBillModal";
import DeleteItemModal from "./DeleteItemModal";
import DeleteUserModal from "./DeleteUserModal";
import EditItemModal from "./EditItemModal";
import EditUserModal from "./EditUserModal";
import RemoveItemInBill from "./RemoveItemInBill";
import SetBillIdModal from "./SetBillIdModal";

const Modal = ({ modal }) => {
  return (
    <div id="modal-id" className="modal">
      <div className="modal-content">
        {modal === "add-user-modal" && <AddUserModal />}
        {modal === "edit-user-modal" && <EditUserModal />}
        {modal === "delete-user-modal" && <DeleteUserModal />}
        {modal === "add-item-modal" && <AddItemModal />}
        {modal === "edit-item-modal" && <EditItemModal />}
        {modal === "delete-item-modal" && <DeleteItemModal />}
        {modal === "add-item-to-bill-modal" && <AddItemToBillModal />}
        {modal === "set-bill-id-modal" && <SetBillIdModal />}
        {modal === "checkout-bill-modal" && <CheckoutBillModal />}
        {modal === "remove-item-to-bill-modal" && <RemoveItemInBill />}
      </div>
    </div>
  );
};

export default Modal;
