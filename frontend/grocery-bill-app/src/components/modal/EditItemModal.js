import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { editItemInServer } from "../../actions/itemActions";

const EditItemModal = ({
  itemSelected,
  error,
  loading,
  jwt,
  editItemInServer,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [discounted, setDiscounted] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const regexPrice = /^\d+$/;
    const regexDiscount = /^([0-9]|[1-9][0-9]|100)$/;

    if (!name || !price || !discountPercentage) {
      alert("Please fill up all information");
      return;
    }

    if (!regexPrice.test(price)) {
      alert("Please enter a valid price");
      return;
    }

    if (!regexDiscount.test(discountPercentage)) {
      alert("Please enter a valid discount percentage (0-99)");
      return;
    }

    const item = {
      id: parseInt(itemSelected.id),
      name: name,
      price: price,
      discounted: discounted,
      discountPercentage: discountPercentage / 100,
    };

    editItemInServer(item, jwt);

    if (!loading && !error) {
      document.getElementById("modal-id").style.display = "none";
    }
  };

  return (
    <>
      <div className="modal-title">
        <h3>Edit Item</h3>
      </div>
      <div className="modal-body">
        <form className="form" onSubmit={onSubmit}>
          {loading && (
            <div className="form-control-loading">
              <div>
                <FaSpinner className="loading-logo" />
              </div>
              <label>Updating item</label>
            </div>
          )}
          {error && (
            <div className="form-control-error">
              <label>Error updating item</label>
            </div>
          )}
          <div className="form-control">
            <label>Name: </label>
            <input
              type="text"
              name="name"
              autoComplete="off"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <label>Price: </label>
            <input
              type="text"
              name="price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div className="form-control-checkbox">
            <label>Discounted? </label>
            <input
              type="checkbox"
              name="discounted"
              value={discounted}
              onChange={(e) => {
                setDiscounted(e.currentTarget.checked);
              }}
            />
          </div>
          <div className="form-control">
            <label>Discount %: </label>
            <input
              type="text"
              name="discountPercentage"
              value={discountPercentage}
              onChange={(e) => {
                setDiscountPercentage(e.target.value);
              }}
            />
          </div>
          <div className="form-control-button">
            <button className="btn">Update</button>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  itemSelected: state.items.itemSelected,
  error: state.items.error,
  loading: state.items.loading,
  jwt: state.auth.jwt,
});

export default connect(mapStateToProps, { editItemInServer })(EditItemModal);
