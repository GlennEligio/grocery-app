import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import {
  updateCurrentBill,
  updateCurrentBillType,
} from "../../actions/billActions";

const AddItemToBillModal = ({
  user,
  itemSelected,
  currentBill,
  updateCurrentBill,
  updateCurrentBillType,
}) => {
  const [amount, setAmount] = useState(1);

  const onSubmit = (e) => {
    e.preventDefault();

    const regexAmount = /^\d+$/;

    if (!amount) {
      alert("Please enter an amount");
      return;
    }

    if (!regexAmount.test(amount)) {
      alert("Please enter a valid item amount");
      return;
    }

    var isInCurrentBill = false;

    const item = {
      ...itemSelected,
      amount: parseInt(amount),
    };

    var updatedItemList = [];

    if (currentBill.itemList.length > 0) {
      updatedItemList = currentBill.itemList.map((item) => {
        if (itemSelected.id === item.id) {
          isInCurrentBill = true;
          return {
            ...item,
            amount: item.amount + parseInt(amount),
          };
        }
        return item;
      });
    }

    if (!isInCurrentBill) {
      updatedItemList.push(item);
    }

    updateCurrentBill(updatedItemList, {
      name: user.username,
    });

    if (currentBill.type === "") {
      updateCurrentBillType("regular");
    }

    document.getElementById("modal-id").style.display = "none";
  };

  return (
    <>
      <div className="modal-title">
        <h3>Add Item to Bill</h3>
      </div>
      <div className="modal-body">
        <form className="form" onSubmit={onSubmit}>
          <div className="form-control">
            <label>Item name: </label>
            <input
              type="text"
              name="name"
              value={itemSelected.name}
              readOnly={true}
              className="immutable"
            />
          </div>
          <div className="form-control">
            <label>Price: </label>
            <input
              type="text"
              name="price"
              value={itemSelected.price}
              readOnly={true}
              className="immutable"
            />
          </div>
          <div className="form-control">
            <label>Discount %: </label>
            <input
              type="text"
              name="discountPercentage"
              value={itemSelected.discountPercentage * 100}
              readOnly={true}
              className="immutable"
            />
          </div>
          <div className="form-control">
            <label>Amount: </label>
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
          </div>
          <div className="form-control-button">
            <button className="btn" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  itemSelected: state.items.itemSelected,
  currentBill: state.bill.currentBill,
});

export default connect(mapStateToProps, {
  updateCurrentBill,
  updateCurrentBillType,
})(AddItemToBillModal);
