import React from "react";

const CheckoutBillItem = ({ item }) => {
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.amount}</td>
      <td>{item.price}</td>
      <td>{item.amount * item.price}</td>
    </tr>
  );
};

export default CheckoutBillItem;
