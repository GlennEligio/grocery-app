import React, { useEffect } from "react";
import AdminBillSection from "./AdminBillSection";
import AdminItemSection from "./AdminItemSection";
import AdminUserSection from "./AdminUserSection";
import * as Modals from "./modal";
import NavBar from "./NavBar";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminHome = ({ user, isLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      if (user.role === "ROLE_CLERK") {
        navigate("/unauthorized");
      }
    } else {
      navigate("/unauthorized");
    }
  }, [user, isLoggedIn, navigate]);

  return (
    <>
      {/** Main Content */}
      <main>
        <div className="container vh-100 overflow-hidden">
          {/** Nav tabs admin section */}
          <div className="row mt-1">
            <div className="col">
              <ul
                className="nav nav-pills nav-justified mb-3"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-adminUser-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-adminUser"
                    type="button"
                    role="tab"
                    aria-controls="pills-adminUser"
                    aria-selected="true"
                  >
                    User
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-adminItem-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-adminItem"
                    type="button"
                    role="tab"
                    aria-controls="pills-adminItem"
                    aria-selected="false"
                  >
                    Item
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-adminBill-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-adminBill"
                    type="button"
                    role="tab"
                    aria-controls="pills-adminBill"
                    aria-selected="false"
                  >
                    Grocery Bill
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {/** Tab contents for Admin nav tab */}
          <div className="row h-80 tab-content" role="pills-adminTabContent">
            {/** User table */}
            <AdminUserSection />
            {/** Item table */}
            <AdminItemSection />
            {/** Grocery Bill table */}
            <AdminBillSection />
          </div>
        </div>
      </main>
      <NavBar page="admin" />
      <div>
        <Modals.AddItemModal />
        <Modals.EditItemModal />
        <Modals.DeleteItemModal />
        <Modals.UploadItemModal />
        <Modals.AddUserModal />
        <Modals.EditUserModal />
        <Modals.DeleteUserModal />
        <Modals.UploadUserModal />
        <Modals.BillDetailsModal />
        <Modals.UploadBillModal />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps, {})(AdminHome);
