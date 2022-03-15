import React from "react";
import AddItemModal from "./AddItemModal";
import AddUserModal from "./AddUserModal";
import BillDetailsModal from "./BillDetailsModal";
import CheckoutBillModal from "./CheckoutBillModal";
import DeleteItemModal from "./DeleteItemModal";
import DeleteUserModal from "./DeleteUserModal";
import EditItemModal from "./EditItemModal";
import EditUserModal from "./EditUserModal";
import OnHoldBillModal from "./OnHoldBillModal";

const Modal = () => {
  return (
    <div>
      <OnHoldBillModal />
      <CheckoutBillModal />
      <AddUserModal />
      <EditUserModal />
      <DeleteUserModal />
      <AddItemModal />
      <EditItemModal />
      <DeleteItemModal />
      <BillDetailsModal />
    </div>
  );
};

export default Modal;
