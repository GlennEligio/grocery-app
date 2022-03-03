import React from "react";
import { connect } from "react-redux";
import { setModalComponent } from "../actions/componentActions";
import { updateBillSelected } from "../actions/billActions";

const AdminBill = ({ bill, setModalComponent, updateBillSelected }) => {
  return (
    <tr
      onClick={() => {
        updateBillSelected(bill);
        setModalComponent("bill-details-modal");
        document.getElementById("modal-id").style.display = "flex";
      }}
    >
      <td>{bill.id}</td>
      <td>{bill.itemCount}</td>
      <td>{bill.shoppingClerk.name}</td>
      <td>{bill.dateCreated}</td>
      <td>{bill.type}</td>
      <td>{bill.totalBill.toFixed(2)}</td>
    </tr>
  );
};

export default connect(null, { setModalComponent, updateBillSelected })(
  AdminBill
);
