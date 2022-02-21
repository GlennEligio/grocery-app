import React, { useState } from "react";
import { addOnHoldBill } from "../../actions/billActions";
import { connect } from "react-redux";

const SetBillIdModal = ({ currentBill, addOnHoldBill }) => {
  const [id, setId] = useState(currentBill.id);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!id) {
      alert("Please enter an id");
      return;
    }

    addOnHoldBill(id);

    document.getElementById("modal-id").style.display = "none";
  };

  return (
    <>
      <div className="modal-title">
        <h3>Set Bill Identifier</h3>
      </div>
      <div className="modal-body">
        <form className="form" onSubmit={onSubmit}>
          <div className="form-control">
            <label>Id: </label>
            <input
              type="text"
              name="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div className="form-control-button">
            <button className="btn" type="submit">
              Hold
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  currentBill: state.bill.currentBill,
});

export default connect(mapStateToProps, { addOnHoldBill })(SetBillIdModal);
