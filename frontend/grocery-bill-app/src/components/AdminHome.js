import React from "react";
import AdminItemSection from "./AdminItemSection";
import AdminUserSection from "./AdminUserSection";
import Toolbar from "./Toolbar";
import Modal from "./modal/Modal";
import { connect } from "react-redux";
import AdminBillSection from "./AdminBillSection";

const AdminHome = ({ modalName }) => {
  return (
    <>
      <div className="admin-home">
        <Modal modal={modalName} />
        <AdminUserSection />
        <AdminItemSection />
        <AdminBillSection />
      </div>
      <Toolbar />
    </>
  );
};

const mapStateToProps = (state) => ({
  modalName: state.component.modalName,
});

export default connect(mapStateToProps, {})(AdminHome);
