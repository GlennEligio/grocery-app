import React from "react";
import { connect } from "react-redux";
import { updateCurrentBill } from "../../actions/billActions";

const RemoveItemInBillModal = ({
  itemSelected,
  currentBill,
  updateCurrentBill,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    var newItemList = currentBill.itemList.filter((item) => {
      return item.id !== itemSelected.id;
    });

    updateCurrentBill(newItemList, currentBill.shoppingClerk);

    // Hides the modal
    document.getElementById("modal-id").style.display = "none";
  };

  return (
    <>
      <div className="modal-title">
        <h3>Remove Item on Bill</h3>
      </div>
      <div className="modal-body">
        <form className="form" onSubmit={onSubmit}>
          <div className="form-control-prompt">
            <label>Are you sure?</label>
          </div>
          <div className="form-control-prompt">
            <button className="btn" type="submit">
              Remove
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentBill: state.bill.currentBill,
  itemSelected: state.items.itemSelected,
});

export default connect(mapStateToProps, { updateCurrentBill })(
  RemoveItemInBillModal
);
