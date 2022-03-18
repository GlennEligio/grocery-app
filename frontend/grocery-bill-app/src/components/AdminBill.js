import React from "react";
import { connect } from "react-redux";
import { updateBillSelected } from "../actions/billActions";

const AdminBill = ({ bill, updateBillSelected }) => {
  return (
    <tr
      onClick={() => updateBillSelected(bill)}
      data-bs-toggle="modal"
      data-bs-target="#billDetailsModal"
    >
      <th scope="row">{bill.id}</th>
      <td>{bill.itemCount}</td>
      <td>{bill.shoppingClerk.username}</td>
      <td>{bill.dateCreated}</td>
      <td>{bill.type === "regular" ? "Regular" : "Discounted"}</td>
      <td>{`$${bill.totalBill.toFixed(2)}`}</td>
    </tr>
  );
};

export default connect(null, { updateBillSelected })(AdminBill);
