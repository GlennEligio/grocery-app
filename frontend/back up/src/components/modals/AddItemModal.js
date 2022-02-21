import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { fetchItems } from "../../actions/itemActions";

const AddItemModal = ({ jwt, fetchItems }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [error, setError] = useState(false);

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
      name: name,
      price: price,
      isDiscounted: isDiscounted,
      discountPercentage: discountPercentage / 100,
    };

    fetch("http://localhost:8030/items", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((res) => {
      switch (res.status) {
        case 201:
          document.getElementById("modal-id").style.display = "none";
          setError(false);
          fetchItems(jwt);
          return;
        default:
          setError(true);
          return;
      }
    });
  };

  return (
    <>
      <div className="modal-title">
        <h3>Add Item</h3>
      </div>
      <div className="modal-body">
        <form className="form" onSubmit={onSubmit}>
          {error && (
            <div className="form-control-error">
              <label>Error adding item</label>
            </div>
          )}
          <div className="form-control">
            <label>Name: </label>
            <input
              type="text"
              name="name"
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
          <div className="form-control">
            <label>Discounted?: </label>
            <input
              type="checkbox"
              name="isDiscounted"
              value={isDiscounted}
              onChange={(e) => {
                setIsDiscounted(e.currentTarget.checked);
              }}
            />
          </div>
          <div className="form-control">
            <label>Discount Percentage: </label>
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
            <button className="btn">Add</button>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  jwt: state.auth.jwt,
});

export default connect(mapStateToProps, { fetchItems })(AddItemModal);
