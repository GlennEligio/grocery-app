import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateCurrentBillType } from "../actions/billActions";

const BillTotal = ({ currentBill, updateCurrentBillType }) => {
  const [subTotal, setSubTotal] = useState(0);
  const [subTotalDiscount, setSubTotalDiscount] = useState(0);
  const [discounted, setDiscounted] = useState(false);
  const [tax, setTax] = useState(10);

  useEffect(() => {
    setSubTotal(billTotal(currentBill, false));
    setSubTotalDiscount(billTotal(currentBill, true));
  }, [currentBill]);

  const billTotal = (bill, isDiscounted) => {
    var total = 0;
    var totalDiscounted = 0;

    bill.itemList.forEach((item) => {
      total += item.price * item.amount;
      if (item.discounted) {
        totalDiscounted +=
          item.price * (1 - item.discountPercentage) * item.amount;
      } else {
        totalDiscounted += item.price * item.amount;
      }
    });

    if (isDiscounted) {
      return totalDiscounted;
    } else {
      return total;
    }
  };

  return (
    <div className="bill-total">
      <div className="bill-total-info">
        <sub>Sub Total</sub>
        <sub>
          ${discounted ? subTotalDiscount.toFixed(2) : subTotal.toFixed(2)}
        </sub>
      </div>
      <div className="bill-total-info">
        <sub>Discounted?</sub>
        <input
          type="checkbox"
          value={discounted}
          onChange={(e) => {
            setDiscounted(e.currentTarget.checked);
            updateCurrentBillType(
              e.currentTarget.checked ? "discounted" : "regular"
            );
          }}
        />
      </div>
      <div className="bill-total-info">
        <sub>Tax</sub>
        <sub>${tax}</sub>
      </div>
      <div className="bill-total-info">
        <h3>Total</h3>
        <h3>
          $
          {discounted
            ? (subTotalDiscount - tax).toFixed(2)
            : (subTotal - tax).toFixed(2)}
        </h3>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentBill: state.bill.currentBill,
});

export default connect(mapStateToProps, { updateCurrentBillType })(BillTotal);
