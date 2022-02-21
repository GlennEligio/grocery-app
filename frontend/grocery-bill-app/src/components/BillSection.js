import React from "react";
import { connect } from "react-redux";
import { changeCurrentBill } from "../actions/billActions";
import { setBillComponent } from "../actions/componentActions";
import BillItem from "./BillItem";
import BillTotal from "./BillTotal";
import BillButtons from "./BillButtons";

const BillSection = ({
  currentBill,
  onHoldBills,
  billName,
  changeCurrentBill,
  setBillComponent,
}) => {
  const setCurrentBill = (billSelected) => {
    const newOnHoldBill = onHoldBills.filter(
      (bill) => bill.id !== billSelected.id
    );
    const newCurrentBill = billSelected;

    changeCurrentBill(newCurrentBill, newOnHoldBill);
    setBillComponent("current-bill");
  };

  return (
    <div className="bill-section">
      <div className="bills">
        {billName === "current-bill" &&
          currentBill.itemList.map((billItem, index) => {
            return <BillItem key={index} billItem={billItem} />;
          })}
        {billName === "on-hold-bill" &&
          onHoldBills.map((bill, index) => {
            return (
              <div
                className="bill interactable"
                onClick={() => setCurrentBill(bill)}
                key={index}
              >
                <h3>{bill.id}</h3>
              </div>
            );
          })}
      </div>
      <BillTotal />
      <BillButtons />
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentBill: state.bill.currentBill,
  onHoldBills: state.bill.onHoldBills,
  billName: state.component.billName,
});

export default connect(mapStateToProps, {
  changeCurrentBill,
  setBillComponent,
})(BillSection);
