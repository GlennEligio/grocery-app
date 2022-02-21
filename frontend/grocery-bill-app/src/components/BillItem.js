import React from "react";

const BillItem = ({ billItem }) => {
  return (
    <div className="bill">
      <div className="bill-item">
        <div className="bill-item-name">{billItem.name}</div>
        <div className="bill-item-price">
          {billItem.amount} @ $<strong>{billItem.price}</strong>
        </div>
      </div>
      <div className="bill-item-total">${billItem.amount * billItem.price}</div>
    </div>
  );
};

export default BillItem;
