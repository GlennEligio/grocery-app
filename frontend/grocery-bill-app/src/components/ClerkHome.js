import React from "react";
import { connect } from "react-redux";
import BillSection from "./BillSection";
import ItemSection from "./ItemSection";
import CalculatorSection from "./CalculatorSection";
import Modal from "./modal/Modal";
import Toolbar from "./Toolbar";

const ClerkHome = ({ modalName }) => {
  return (
    <>
      <div className="clerk-home">
        <Modal modal={modalName} />
        <BillSection />
        <div className="item-calculator-section">
          <ItemSection />
          {/* <CalculatorSection /> */}
        </div>
      </div>
      <Toolbar />
    </>
  );
};

const mapStateToProps = (state) => ({
  modalName: state.component.modalName,
});

export default connect(mapStateToProps, {})(ClerkHome);
