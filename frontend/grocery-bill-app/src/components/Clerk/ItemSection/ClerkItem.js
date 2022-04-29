import React from "react";
import { connect } from "react-redux";
import { addItemOnCurrentBill } from "../../../actions/billActions";

const ClerkItem = ({ item, addItemOnCurrentBill }) => {
  return (
    <tr
      onClick={() => {
        addItemOnCurrentBill({ ...item, amount: 0 });
      }}
    >
      <th scope="row">{item.id}</th>
      <td className="mw-20 w-20 text-truncate">{item.name}</td>
      <td className="w-20">{item.price}</td>
      <td className="w-20">{`${item.discountPercentage * 100}%`}</td>
      <td className="w-30">
        {item.discounted ? (
          <i className="bi bi-check2"></i>
        ) : (
          <i className="bi bi-x-lg"></i>
        )}
      </td>
    </tr>
  );
};

export default connect(null, { addItemOnCurrentBill })(ClerkItem);
