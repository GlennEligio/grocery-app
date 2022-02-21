import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchItems } from "../../actions/itemActions";

const DeleteItemModal = ({ itemSelected, fetchItems, jwt }) => {
  const [error, setError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8030/items/${itemSelected.name}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        switch (res.status) {
          case 200:
            document.getElementById("modal-id").style.display = "none";
            setError(false);
            fetchItems(jwt);
            break;
          default:
            setError(true);
            break;
        }
      })
      .catch((error) => console.error());
  };

  return (
    <>
      <div className="modal-title">
        <h3>Delete Item</h3>
      </div>
      <div className="modal-body">
        <form className="form" onSubmit={onSubmit}>
          {error && (
            <div className="form-control-error">
              <label>Error deleting item</label>
            </div>
          )}
          <div className="form-control">
            <label className="prompt">
              <h4>Are you sure?</h4>
            </label>
          </div>
          <div className="form-control">
            <label>Name:</label>
            <input
              type="text"
              class="immutable"
              name="accountID"
              value={itemSelected.name}
              readOnly={true}
            />
          </div>
          <div className="form-control">
            <label>Price: </label>
            <input
              type="text"
              class="immutable"
              name="balance"
              value={itemSelected.price}
              readOnly={true}
            />
          </div>
          <div className="form-control">
            <label>Discounted? </label>
            <input
              type="text"
              class="immutable"
              name="balance"
              value={itemSelected.isDiscounted}
              readOnly={true}
            />
          </div>
          <div className="form-control">
            <label>Discount Percentage: </label>
            <input
              type="text"
              class="immutable"
              name="balance"
              value={itemSelected.discountPercentage}
              readOnly={true}
            />
          </div>
          <div className="form-control-button">
            <button className="btn">Delete</button>
          </div>
        </form>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  itemSelected: state.items.itemSelected,
  jwt: state.auth.jwt,
});

export default connect(mapStateToProps, { fetchItems })(DeleteItemModal);
