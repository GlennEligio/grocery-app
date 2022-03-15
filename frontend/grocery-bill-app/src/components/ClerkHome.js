import React from "react";
import { connect } from "react-redux";
import BillSection from "./ClerkBillSection";
import ClerkCalculatorSection from "./ClerkCalculatorSection";
import ClerkItemSection from "./ClerkItemSection";
import Modal from "./modal/Modal";
import NavBar from "./NavBar";

const ClerkHome = ({ modalName }) => {
  return (
    <main>
      <div className="container-lg py-5 vh-100">
        <div className="row h-100">
          <BillSection />
          {/** Clerk Item and Calculator Section */}
          <div className="col-6 h-100 col-lg-6 col-xl-7 pb-5">
            <ClerkItemSection />
            <ClerkCalculatorSection />
          </div>
        </div>
      </div>
      <NavBar page="clerk" />
      <Modal />
    </main>
  );
};

const mapStateToProps = (state) => ({
  modalName: state.component.modalName,
});

export default connect(mapStateToProps, {})(ClerkHome);
