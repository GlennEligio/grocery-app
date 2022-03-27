import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateCurrentBillType } from "../actions/billActions";
import billTotal from "../util/billTotal";

const ClerkBillTotal = ({ currentBill, updateCurrentBillType }) => {
  const [subTotal, setSubTotal] = useState(0);
  const [subTotalDiscount, setSubTotalDiscount] = useState(0);
  const [discounted, setDiscounted] = useState(false);

  useEffect(() => {
    setSubTotal(billTotal(currentBill, false));
    setSubTotalDiscount(billTotal(currentBill, true));
  }, [currentBill]);

  return (
    <div className="card-footer m-1 h-25 vstack">
      <div className="row text-secondary">
        <div className="col">Subtotal:</div>
        <div className="col text-end">$ {subTotal}</div>
      </div>
      <div className="row text-secondary">
        <div className="col">Discount:</div>
        <div className="col text-end">
          $ {(subTotal - subTotalDiscount).toFixed(2)}
        </div>
      </div>
      <div className="row text-secondary">
        <div className="col">Discounted?</div>
        <div className="col text-end">
          <input
            type="checkbox"
            value={discounted}
            onChange={(e) => {
              setDiscounted(e.currentTarget.checked);
              updateCurrentBillType(
                e.currentTarget.checked ? "discounted" : "regular"
              );
            }}
            name="isDiscounted"
            id="isDiscounted"
          />
        </div>
      </div>
      <div className="row my-auto">
        <div className="col">
          <p className="h2">Total:</p>
        </div>
        <div className="col text-end">
          <p className="h2">
            $ {discounted ? subTotalDiscount.toFixed(2) : subTotal.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentBill: state.bill.currentBill,
});

export default connect(mapStateToProps, { updateCurrentBillType })(
  ClerkBillTotal
);
